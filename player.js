import {Hitbox} from './hitbox.js'
export class Player extends Phaser.Physics.Matter.Sprite{
  constructor(scene, x, y, scenecursors, sprite, sensors){
    super(scene.matter.world, x, y, sprite);
    scene.sys.displayList.add(this);
    super.setScale(.15);
    super.setBounce(1);
    this.cursors = scenecursors;
    this.scene = scene;
  }
	preUpdate(){
    super.preUpdate()
    if (this.cursors.up.isDown) {
      super.applyForce({x:0,y:-0.05});
      //this.scene.matter.world.resume();
    }
    else if (this.cursors.down.isDown) {
      super.applyForce({x:0,y:0.05});
      //this.scene.matter.world.pause();
    }

    if (this.cursors.left.isDown) {
      super.setVelocityX(-5);
    }
    else if (this.cursors.right.isDown) {
      super.setVelocityX(5);
      //var attack = new Hitbox(this.scene, this.x, this.y, 100, 100, 'attack', sensors);
    }	
  }
}