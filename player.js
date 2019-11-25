import { Hitbox } from './hitbox.js'
export class Player extends Phaser.Physics.Matter.Sprite {
  constructor(scene, x, y, scenecursors, weak, strong, jump, sprite, sensors) {
    super(scene.matter.world, x, y, sprite);
    scene.add.existing(this);
    this.setScale(.15);
    this.setBounce(0.5);
    this.cursors = scenecursors;
    this.scene = scene;
    this.originX = x;
    this.originY = y;
    this.sensors = sensors;
    this.weak = weak;
    this.strong = strong;
    this.jump = jump;
    this.lag = 0;
  }
  reset() {
    this.setVelocityX(0);
    this.setVelocityY(0);
    this.setPosition(this.originX, this.originY);
  }
  preUpdate() {
    if (this.jump.isDown) {
      this.applyForce({ x: 0, y: -0.05 });
    }
    else if (this.cursors.down.isDown) {
      this.applyForce({ x: 0, y: 0.05 });
    }
    if (this.cursors.left.isDown) {
      this.setVelocityX(-5);
    }
    else if (this.cursors.right.isDown) {
      this.setVelocityX(5);
    }

    if (this.lag > 0) this.lag--;   

    if (this.weak.isDown || this.strong.isDown) {
      if (this.lag == 0) {
        var force;
        var lag;
        if (this.weak.isDown) force = 0.25, lag = 25;
        if (this.strong.isDown) force = 0.5, lag = 50;
        var x = this.x;
        var y = this.y;
        var forceX = 0;
        var forceY = 0;
        if (this.cursors.left.isDown) {
          x -= 100;
          forceX -= force;
        }
        else if (this.cursors.right.isDown) {
          x += 100;
          forceX += force;
        }
        if (this.cursors.up.isDown) {
          y -= 100;
          forceY -= force;
        }
        else if (this.cursors.down.isDown) {
          forceX = 0; 
          forceY -= force;
        }
        this.attack = new Hitbox(this.scene, x, y, 100, 100, 'attack', this.sensors, forceX, forceY, 10);
        this.lag = lag;
      }
    }  
  }
}