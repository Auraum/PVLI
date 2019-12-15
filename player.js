import Attack from './attack.js'

export default class Player extends Phaser.Physics.Matter.Sprite {
  constructor(scene, x, y, scenecursors, weak, strong, jump, run, sprite, sensors) {
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
    this.run = run;
    this.lag = 0;
  }
  reset() {
    this.setVelocityX(0);
    this.setVelocityY(0);
    this.setPosition(this.originX, this.originY);
  }
  preUpdate() {
    if (this.jump.isDown) {
      if(this.y + 50 - this.scene.height > 0) this.applyForce({ x: 0, y: -0.5 });
    }
    else if (this.cursors.down.isDown) {
      this.applyForce({ x: 0, y: 0.05 });
    }
    if (this.cursors.left.isDown) {
      if(this.run.isDown) this.setVelocityX(-10);
      else this.setVelocityX(-5);
    }
    else if (this.cursors.right.isDown) {
      if(this.run.isDown) this.setVelocityX(10);
      else this.setVelocityX(5);
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
          //forceX = 0; 
          y += 100;
          forceY += force;
        }
        var angle = 0;
        // if(forceX = 0) angle = Math.asin(forceY) * 180;
        // else if (forceY = 0) angle = Math.acos(forceX) * 180;
        // else angle = Math.atan(forceY/forceX) * 180;
        this.attack = new Attack(this.scene, x, y, 100, 100, this.sensors, forceX, forceY, 10, angle);
        this.lag = lag;
      }
    }  
  }
}