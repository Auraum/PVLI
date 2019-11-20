export class Goal extends Phaser.Physics.Matter.Sprite{
    constructor(scene, x, y, h, w, sprite){
		super(scene.matter.world, x, y, sprite);
        this.sensor = Phaser.Physics.Matter.Matter.Bodies.rectangle(x,y,h,w,{isSensor: true});
        super.setExistingBody(this.sensor).setIgnoreGravity(true);
    }
}