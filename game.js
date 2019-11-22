import {Ball} from './ball.js'
import {Player} from './player.js'
import {Hitbox} from './hitbox.js'
import {Scoreboard} from './scoreboard.js'

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
this.cursors2 = this.input.keyboard.createCursorKeys();
this.cursors1 = this.input.keyboard.addKeys({
    up: Phaser.Input.Keyboard.KeyCodes.W,
    down: Phaser.Input.Keyboard.KeyCodes.S,
    left: Phaser.Input.Keyboard.KeyCodes.A,
    right: Phaser.Input.Keyboard.KeyCodes.D
  });
this.sensors = this.matter.world.nextCategory();
this.player1 = new Player(this, 100, 500, this.cursors1, 'player1', this.sensors);
this.player2 = new Player(this, 1300, 500, this.cursors2, 'player2', this.sensors);
this.ball = new Ball(this, 670, 0, 'ball');
this.leftGoal = new Hitbox(this, -30, 400, 100, 500, 'lg', this.sensors);
this.rightGoal = new Hitbox(this, 1400, 400, 100, 500, 'rg', this.sensors);
this.scoreboard = new Scoreboard(this);
this.ball.setCollisionCategory(this.sensors);
this.scoreboard.showScore();
this.matter.world.on('collisionstart',  (event, bodyA, bodyB) => {  
    if (!bodyA.isSensor && bodyB.isSensor) bodyA = bodyB;    
    if (bodyA.isSensor)
    {       
        if(bodyA.label === 'attack') {
            this.ball.applyForces(0.5,-0.5);
            bodyA.destroy();
        }
        else{
        this.ball.reset();        
        this.player1.reset();
        this.player2.reset();         
        if(bodyA.label === 'lg') {
            this.scoreboard.rightScore++;           
        }
        else {           
            this.scoreboard.leftScore++;
        }
        this.scoreboard.showScore();
        }
    }
});
}

update()
{ 
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