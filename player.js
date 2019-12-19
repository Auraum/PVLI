import Attack from './attack.js'

export default class Player extends Phaser.Physics.Matter.Sprite {
  constructor(scene, x, y, scenecursors, weak, strong, jump, special, sprite, sensors) {
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
    this.special = special;
    this.lag = 0;
    this.lag2 = 0;
    this.type = sprite;
  }
  reset() {
    this.setVelocityX(0);
    this.setVelocityY(0);
    this.setPosition(this.originX, this.originY);
  }
  preUpdate() {
    if (this.x > this.scene.length || this.y > this.scene.height || this.y < 0 || this.x < 0) this.reset();
    if (this.jump.isDown) {
      if (this.y + 50 > this.scene.height) this.applyForce({ x: 0, y: -0.55 });
    }
    else if (this.cursors.down.isDown) {
      this.applyForce({ x: 0, y: 0.05 });
    }
    if (this.cursors.left.isDown) {
      this.setVelocityX(-10);
    }
    else if (this.cursors.right.isDown) {
      this.setVelocityX(10);
    }

    if (this.lag > 0) this.lag--;
    if (this.lag2 > 0) this.lag2--;


    if (this.special.isDown && this.lag2 == 0) {
      switch (this.type.substr(0, 1)) {
        case "a":
          this.applyForce({ x: 0, y: 2 });
          this.lag2 += 50;
          break;
        case "h":
          this.reset();
          this.lag2 += 10;
          break;
        case "d":
          this.applyForce({ x: 0, y: -1 });
          this.lag2 += 50;
          break;
        case "u":
          if (this.cursors.left.isDown && this.x > 200) {
            this.setPosition(this.x - 200, this.y);
          }
          else if (this.cursors.right.isDown && this.x < 1150) {
            this.setPosition(this.x + 200, this.y);
          }
          this.lag2 += 50;
          break;
      }
    }

    else if (this.weak.isDown || this.strong.isDown) {
      if (this.lag == 0) {
        let force;
        let lag;
        let sprite;
        if (this.weak.isDown) force = 0.15, lag = 20, sprite = 'weakattack';
        if (this.strong.isDown) force = 0.4, lag = 50, sprite = 'strongattack';
        let x = this.x;
        let y = this.y;
        let forceX = 0;
        let forceY = 0;
        let flipX = 1;
        let angle;
        let distance = 100;
        if (this.cursors.left.isDown) {
          x -= distance;
          forceX -= force;
        }
        else if (this.cursors.right.isDown) {
          x += distance;
          forceX += force;
        }
        if (this.cursors.up.isDown) {
          y -= distance;
          forceY -= force;
        }
        else if (this.cursors.down.isDown) {
          if (this.y + 50 > this.scene.height) {
            forceX = 0;
            forceY -= force;
          }
          else {
            y += distance;
            forceY += force;
          }
        }
        if (forceX == 0 && forceY == -force) angle = 0;
        else if (forceX == 0 && forceY == force) angle = 180;
        else if (forceY == 0) angle = 90;
        else if (forceY == force) angle = 135;
        else if (forceY == -force) angle = 45;
        if (x < this.x) angle = -angle;
        if (x != this.x || y != this.y) this.attack = new Attack(this.scene, x, y, 100, 100, this.sensors, forceX, forceY, 10, flipX, angle, sprite);
        this.lag = lag;
      }
    }
  }
}