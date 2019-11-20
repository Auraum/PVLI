export class Player extends Phaser.Physics.Matter.Sprite{
  constructor(scene, x, y, scenecursors, sprite){
    super(scene.matter.world, x, y, sprite);
    scene.sys.displayList.add(this);
    super.setScale(.15);
    super.setBounce(1);
    this.cursors = scenecursors;
  }
	preUpdate(){
  super.preUpdate()
	if (this.cursors.up.isDown) {
  super.applyForce({x:0,y:-0.05});
}
else if (this.cursors.down.isDown) {
  super.applyForce({x:0,y:0.05});
}

if (this.cursors.left.isDown) {
  super.setVelocityX(-5);
}
else if (this.cursors.right.isDown) {
  super.setVelocityX(5);
	}	
}
}