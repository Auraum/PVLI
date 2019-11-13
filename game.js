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
            }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var cursors;
var ball;

function preload ()
{
this.load.image('ball','sprites/ball.png');
}

function create ()
{

ball = this.matter.add.image(config.width/2,config.height/2,'ball');
ball.setBounce(1);
cursors = this.input.keyboard.createCursorKeys();
this.matter.world.setBounds(0, 0, config.width, config.height);
ball.setScale(.25);
}

function update ()
{ 

if (cursors.up.isDown) {
  ball.applyForce({x:0,y:-0.1});
}
else if (cursors.down.isDown) {
  ball.applyForce({x:0,y:0.1});
}
else if (cursors.left.isDown) {
  ball.applyForce({x:-0.1,y:0});
}
else if (cursors.right.isDown) {
  ball.applyForce({x:0.1,y:0});
}
}