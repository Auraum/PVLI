var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
	physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
this.load.image('ball','sprites/ball.png');
}

function create ()
{
this.cursors = this.input.keyboard.createCursorKeys();
ball = this.physics.add.sprite(400,300,'ball');
}

function update ()
{
if (this.cursors.up.isDown) {
  ball.body.setVelocityY(-200);
}
else if (this.cursors.down.isDown) {
  ball.body.setVelocityY(+200);
}
else if (this.cursors.left.isDown) {
  ball.body.setVelocityX(-200);
}
else if (this.cursors.right.isDown) {
  ball.body.setVelocityX(200);
}
else {
  ball.body.setVelocityY(0);
  ball.body.setVelocityX(0);
}
}