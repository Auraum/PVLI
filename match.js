import Ball from './ball.js'
import Player from './player.js'
import Goal from './goal.js'
import Scoreboard from './scoreboard.js'

export default class Match extends Phaser.Scene {

    constructor() {
        super({ key: 'Match', active: true });
        this.loaded = false;
    }

    init(data) {
        this.loaded = data.loaded;
        this.timelimit = data.time;
        this.goals = data.goals;
        this.player1type = data.player1type;
        this.player2type = data.player2type;
    }

    preload() {
        this.load.image('player1', 'sprites/player1.jpg');
        this.load.image('player2', 'sprites/player2.jpg');
        this.load.image('leftgoal', 'sprites/leftgoal.png');
        this.load.image('rightgoal', 'sprites/rightgoal.png');
        this.load.image('weakattack', 'sprites/weakattack.png');
        this.load.image('strongattack', 'sprites/strongattack.png');
        this.load.audio('matchmusic', 'music/syncopika.ogg');
    }

    create() {
        if (!this.loaded) this.scene.start('Menu');
        else {
            this.sound.stopAll();
            this.bg = this.add.image(670, 150, 'bg');
            this.bg.setScale(1.4);
            this.matchmusic = this.sound.add('matchmusic');
            this.matchmusic.play();
            this.matchmusic.setLoop(true);
            this.matter.world.setBounds(0, 0, 1350, 500);
            this.height = 500;
            this.cursors2 = this.input.keyboard.addKeys({
                up: Phaser.Input.Keyboard.KeyCodes.I,
                down: Phaser.Input.Keyboard.KeyCodes.K,
                left: Phaser.Input.Keyboard.KeyCodes.J,
                right: Phaser.Input.Keyboard.KeyCodes.L
            });
            //this.cursors2 = this.input.keyboard.createCursorKeys();
            this.cursors1 = this.input.keyboard.addKeys({
                up: Phaser.Input.Keyboard.KeyCodes.W,
                down: Phaser.Input.Keyboard.KeyCodes.S,
                left: Phaser.Input.Keyboard.KeyCodes.A,
                right: Phaser.Input.Keyboard.KeyCodes.D
            });
            this.weak = this.input.keyboard.addKey('V');
            this.weak2 = this.input.keyboard.addKey('NUMPAD_ONE');
            this.strong = this.input.keyboard.addKey('B');
            this.strong2 = this.input.keyboard.addKey('NUMPAD_TWO');
            this.jump = this.input.keyboard.addKey('N');
            this.jump2 = this.input.keyboard.addKey('NUMPAD_THREE');
            this.special = this.input.keyboard.addKey('M');
            this.special2 = this.input.keyboard.addKey('NUMPAD_FIVE');
            this.sensors = this.matter.world.nextCategory();
            this.player1 = new Player(this, 100, 500, this.cursors1, this.weak, this.strong, this.jump,
                this.special, this.player1type, this.sensors);
            this.player2 = new Player(this, 1240, 500, this.cursors2, this.weak2, this.strong2, this.jump2,
                this.special2, this.player2type, this.sensors);
            this.ball = new Ball(this, 680, 0, 'ball');
            this.leftGoal = new Goal(this, 0, 300, 'leftgoal', 'lg', this.sensors);
            this.rightGoal = new Goal(this, 1350, 300, 'rightgoal', 'rg', this.sensors);
            this.leftPost = this.matter.add.sprite(1270, 100, 'player2').setScale(0.2, 0.05).setStatic(true).setVisible(false);
            this.rightPost = this.matter.add.sprite(70, 100, 'player1').setScale(0.2, 0.05).setStatic(true).setVisible(false);
            this.scoreboard = new Scoreboard(this, this.timelimit, this.goals, this.player1type, this.player2type);
            this.ball.setCollisionCategory(this.sensors);
            this.scoreboard.showScore();
            this.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
                if (bodyB.isSensor) bodyA = bodyB;
                if (bodyA.isSensor) {
                    if (bodyA.label === 'attack') {
                        this.ball.applyForces(bodyA.gameObject.forceX, bodyA.gameObject.forceY);
                        bodyA.destroy();
                    }
                    else {
                        this.ball.setBounce(0);
                        this.timer = this.time.delayedCall(500, () => {
                            this.ball.reset();
                            this.player1.reset();
                            this.player2.reset();
                        }, [], this);
                        if (bodyA.label === 'lg') this.scoreboard.rightScore++;
                        else this.scoreboard.leftScore++;
                        this.scoreboard.showScore();
                    }
                }
            });
        }
    }

    update() {
        this.scoreboard.preUpdate();
    }
};