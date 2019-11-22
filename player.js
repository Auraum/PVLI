import {Hitbox} from './hitbox.js'
export class Player extends Phaser.Physics.Matter.Sprite{
  constructor(scene, x, y, scenecursors, sprite, sensors){
    super(scene.matter.world, x, y, sprite);
    scene.add.existing(this);
    this.setScale(.15);
    this.setBounce(1);
    this.cursors = scenecursors;
    this.scene = scene;
    this.originX = x;
    this.originY = y;
    this.sensors = sensors;
  }
  reset(){
    this.setVelocityX(0);
    this.setVelocityY(0);
    this.setPosition(this.originX, this.originY);
  }
	preUpdate(){
    if (this.cursors.up.isDown) {
      this.applyForce({x:0,y:-0.05});
    }
    else if (this.cursors.down.isDown) {
      this.applyForce({x:0,y:0.05});
      var attack = new Hitbox(this.scene, this.x + 100, this.y, 100, 100, 'attack', this.sensors);
    }
    if (this.cursors.left.isDown) {
      this.setVelocityX(-5);
    }
    else if (this.cursors.right.isDown) {
      this.setVelocityX(5);      
    }	
  }
}