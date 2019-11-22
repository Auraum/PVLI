export class Hitbox extends Phaser.Physics.Matter.Sprite{
    constructor(scene, x, y, h, w, label, sensors){
		super(scene.matter.world, x, y);
        this.sensor = Phaser.Physics.Matter.Matter.Bodies.rectangle(x,y,h,w,{isSensor: true, label: label});
        this.setExistingBody(this.sensor).setIgnoreGravity(true);
        this.setCollidesWith([sensors]);
    }
}