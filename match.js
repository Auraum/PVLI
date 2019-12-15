import Ball from './ball.js'
import Player from './player.js'
import Goal from './goal.js'
import Scoreboard from './scoreboard.js'

export default class Match extends Phaser.Scene {

    constructor() {
        super({ key: 'Match', active: true });
    }

    preload() {
        this.load.image('bg', 'sprites/background.png')
        this.load.image('ball', 'sprites/ball.png');
        this.load.image('player1', 'sprites/player1.jpg');
        this.load.image('player2', 'sprites/player2.jpg');
        this.load.image('leftgoal', 'sprites/leftgoal.png');
        this.load.image('rightgoal', 'sprites/rightgoal.png');
        this.load.image('attacksprite', 'sprites/normalattack1.png');
    }

    create() {
        this.bg = this.add.image(670, 150, 'bg');
        this.bg.setScale(1.4);
        this.matter.world.setBounds(0, 0, 1350, 500);
        this.height = 500;
        this.cursors2 = this.input.keyboard.createCursorKeys();
        this.cursors1 = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });
        this.weak = this.input.keyboard.addKey('B');
        this.weak2 = this.input.keyboard.addKey('NUMPAD_ONE');
        this.strong = this.input.keyboard.addKey('N');
        this.strong2 = this.input.keyboard.addKey('NUMPAD_TWO');
        this.jump = this.input.keyboard.addKey('SPACE');
        this.jump2 = this.input.keyboard.addKey('NUMPAD_THREE');
        this.run = this.input.keyboard.addKey('M');
        this.run2 = this.input.keyboard.addKey('NUMPAD_FOUR');
        this.sensors = this.matter.world.nextCategory();
        this.player1 = new Player(this, 100, 500, this.cursors1, this.weak, this.strong, this.jump, this.run, 'player1', this.sensors);
        this.player2 = new Player(this, 1240, 500, this.cursors2, this.weak2, this.strong2, this.jump2, this.run2, 'player2', this.sensors);
        this.ball = new Ball(this, 670, 0, 'ball');
        this.leftGoal = new Goal(this, 0, 300, 'leftgoal', 'lg', this.sensors);
        this.rightGoal = new Goal(this, 1350, 300, 'rightgoal', 'rg', this.sensors);
        this.leftPost = this.matter.add.sprite(1270, 100, 'player2').setScale(0.2, 0.05).setStatic(true).setVisible(false);
        this.rightPost = this.matter.add.sprite(70, 100, 'player1').setScale(0.2, 0.05).setStatic(true).setVisible(false);
        this.scoreboard = new Scoreboard(this, 180);
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

    update() {
        this.scoreboard.preUpdate();
    }
};