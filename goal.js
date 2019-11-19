export class Goal extends Phaser.Physics.Matter.Sprite{
    constructor(scene, x, y, h, w, sprite){
        super(scene.matter.world, x, y, sprite)
        this = Phaser.Physics.Matter.Matter.Bodies.rectangle(x, y, h, w, {isSensor: true});
    }
    preUpdate(){
        super.preUpdate()
        }	
}