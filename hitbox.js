export default class Hitbox extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, h, w, sprite, label, sensors, scaleX, scaleY) {
        super(scene.matter.world, x, y, sprite);
        this.setScale(scaleX, scaleY);
        this.sensor = Phaser.Physics.Matter.Matter.Bodies.rectangle(x, y, h, w, { isSensor: true, label: label });
        this.setExistingBody(this.sensor).setIgnoreGravity(true);
        this.setCollidesWith([sensors]);
        scene.add.existing(this);
    }
}