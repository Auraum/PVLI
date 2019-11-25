export class Ball extends Phaser.Physics.Matter.Sprite {
	constructor(scene, x, y, sprite){
		super(scene.matter.world, x, y, sprite);
		scene.add.existing(this);
		this.setScale(.25);
		this.setBody({
		type: 'circle',
        width: 75,
        height: 75
		})
		this.setBounce(1);
		this.originX = x;
		this.originY = y;
		this.forceX = 0;
		this.forceY = 0;
	}
	reset(){
		this.setVelocityX(0);
		this.setVelocityY(0);
		this.setPosition(this.originX, this.originY);
	}
	applyForces(x,y){
		this.forceX += x;
		this.forceY += y;
	}
	preUpdate(){
	if(this.forceX !=0 || this.forceY !=0 ) this.applyForce({x:this.forceX,y:this.forceY});
	this.forceX =0;
	this.forceY =0;
	}	
}