class Match extends Phaser.Scene{

    constructor ()
    {
        super({ key: 'Match', active: true });
    }

preload()
{
this.load.image('bg','sprites/background.png' )
this.load.image('ball','sprites/ball.png');
this.load.image('player1', 'sprites/player1.jpg');
this.load.image('player2', 'sprites/player2.jpg');
}

create()
{
this.bg = this.add.image(700,150,'bg');
this.bg.setScale(1.4);
this.matter.world.setBounds(0, 0, config.width, config.height);
this.cursors1 = this.input.keyboard.createCursorKeys();
this.cursors2 = this.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    right: Phaser.Input.Keyboard.KeyCodes.D
  });
this.player1 = new Player(this, 100, 500, this.cursors1, 'player1');
this.player2 = new Player(this, 1100, 500, this.cursors2, 'player2');
this.ball = new Ball(this, 500, 500, 'ball');
var leftGoal = Phaser.Physics.Matter.Matter.Bodies.circle(500,300,100,{isSensor: true});
this.goal = this.matter.add.sprite(500,0,'player1');
this.goal.setExistingBody(leftGoal);
}

update()
{ 
    this.player1.preUpdate();
    this.player2.preUpdate();
    this.ball.preUpdate();
}

};

var config = {
    type: Phaser.AUTO,
    width: 1400,
    height: 500,
    backgroundColor: '#0072bc',
	physics: {
        default: 'matter',
        matter: {
            gravity: {
              x : 0,
              y : 2
            },
            debug : true
        }
    },
    scene: Match
};

var game = new Phaser.Game(config);
import {Ball} from './ball.js'
import {Player} from './player.js'