export class Hitbox extends Phaser.Physics.Matter.Sprite{
    constructor(scene, x, y, h, w, label){
		super(scene.matter.world, x, y);
        this.sensor = Phaser.Physics.Matter.Matter.Bodies.rectangle(x,y,h,w,{isSensor: true, label: label});
        super.setExistingBody(this.sensor).setIgnoreGravity(true);
    }
}