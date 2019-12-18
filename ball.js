export default class Ball extends Phaser.Physics.Matter.Sprite {
	constructor(scene, x, y, sprite) {
		super(scene.matter.world, x, y, sprite);
		scene.add.existing(this);
		this.setScale(.25);
		this.setBody({
			type: 'circle',
			width: 75,
			height: 75
		})
		this.setBounce(0.8);
		this.originX = x;
		this.originY = y;
		this.forceX = 0;
		this.forceY = 0;
	}
	reset() {
		this.setPosition(this.originX, this.originY);
		this.setVelocityX(0);
		this.setVelocityY(0);
		this.setBounce(0.8);
	}
	applyForces(x, y) {
		this.forceX += x;
		this.forceY += y;
	}
	preUpdate() {
		if(this.x > this.scene.length || this.y > this.scene.height || this.y < 0 || this.x < 0) this.reset();
		if (this.forceX != 0 || this.forceY != 0) this.applyForce({ x: this.forceX, y: this.forceY });
		this.forceX = 0;
		this.forceY = 0;
	}
}