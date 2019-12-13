export default class Hitbox extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, h, w, label, sensors, forceX, forceY, duration) {
        super(scene.matter.world, x, y);
        this.sensor = Phaser.Physics.Matter.Matter.Bodies.rectangle(x, y, h, w, { isSensor: true, label: label });
        this.setExistingBody(this.sensor).setIgnoreGravity(true);
        this.setCollidesWith([sensors]);
        scene.add.existing(this);
        this.forceX = forceX;
        this.forceY = forceY;
        this.duration = duration;
    }
    preUpdate(){
        if(this.duration <= 0) this.destroy();
        else this.duration--;
    }
}