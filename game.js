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
bg = this.add.image(670,150,'bg');
bg.setScale(1.4);
this.matter.world.setBounds(0, 0, config.width, config.height);
cursors1 = this.input.keyboard.createCursorKeys();
cursors2 = this.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    right: Phaser.Input.Keyboard.KeyCodes.D
  });
player1 = new Player(this, 100, 500, cursors1, 'player1');
player2 = new Player(this, 1300, 500, cursors2, 'player2');
ball = new Ball(this, 670, 500, 'ball');
leftGoal = new Hitbox(this, -30, 400, 100, 500, 'lg');
rightGoal = new Hitbox(this, 1400, 400, 100, 500, 'rg');
scoreboard = new Scoreboard(this);
sensors = this.matter.world.nextCategory();
ball.setCollisionCategory(sensors);
leftGoal.setCollidesWith([sensors]);
rightGoal.setCollidesWith([sensors]);
scoreboard.showScore();
this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {      
    if (bodyA.isSensor)
    {       
        ball.setPosition(700,0);
        if(bodyA.label === 'lg') scoreboard.rightScore++;
        else scoreboard.leftScore++;
        scoreboard.showScore();
    }
    else if (bodyB.isSensor)
    {
        ball.setPosition(700,0);
        if(bodyB.label === 'lg') scoreboard.leftScore++; 
        else scoreboard.rightScore++;
        scoreboard.showScore();
    }
});
}

update()
{ 
    player1.preUpdate();
    player2.preUpdate();
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
var bg;
var scoreboard;
var ball;
var player1;
var player2;
var leftGoal;
var rightGoal;
var sensors;
var cursors1;
var cursors2;
import {Ball} from './ball.js'
import {Player} from './player.js'
import {Hitbox} from './hitbox'
import {Scoreboard} from './scoreboard.js'