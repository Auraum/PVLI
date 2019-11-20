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
this.bg = this.add.image(670,150,'bg');
this.bg.setScale(1.4);
this.matter.world.setBounds(0, 0, config.width, config.height);
var cursors1 = this.input.keyboard.createCursorKeys();
var cursors2 = this.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    right: Phaser.Input.Keyboard.KeyCodes.D
  });
this.player1 = new Player(this, 100, 500, cursors1, 'player1');
this.player2 = new Player(this, 1300, 500, cursors2, 'player2');
this.ball = new Ball(this, 670, 500, 'ball');
this.leftGoal = new Goal(this, -30, 400, 100, 500, 'player1');
this.rightGoal = new Goal(this, 1400, 400, 100, 500, 'player2');
var sensors = this.matter.world.nextCategory();
this.ball.setCollisionCategory(sensors);
this.leftGoal.setCollidesWith([sensors]);
this.rightGoal.setCollidesWith([sensors]);
this.matter.world.on('collisionstart', function (event) {
    var pairs = event.pairs;
    for (var i = 0; i < pairs.length; i++)
    {
        var bodyA = pairs[i].bodyA;
        var bodyB = pairs[i].bodyB;

        if (pairs[i].isSensor)
        {            
            if (bodyA.isSensor)
            {
                bodyB.gameObject.setPosition(500,0);
            }
            else if (bodyB.isSensor)
            {
                bodyA.gameObject.setPosition(500,0);
            }
        }
    }
});
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
import {Goal} from './goal.js'