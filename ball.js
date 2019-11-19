export class Ball extends Phaser.Physics.Matter.Sprite {
	constructor(scene, x, y, sprite){
		super(scene.matter.world, x, y, sprite);
		scene.sys.displayList.add(this);
		super.setScale(.25);
		super.setBounce(2);
		super.setBody({
		type: 'circle',
        width: 75,
        height: 75
		})
	}
	preUpdate(){
	super.preUpdate()
	}	
}