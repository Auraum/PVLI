export default class Button extends Phaser.GameObjects.Image {
    constructor(scene, x, y, sprite, scale, angleChange) {
        super(scene, x, y, sprite);
        scene.add.existing(this);
        this.setScale(scale);
        this.setInteractive();
        this.setVisible(false);
        this.angleChange = angleChange;
        this.scaleChange = scale;
        this.scene = scene;
    }

    activate(action) {
        this.setVisible(true);
        this.on('pointerover', () => { this.setScale(this.scaleChange * 1.2) });
        this.on('pointerout', () => { this.setScale(this.scaleChange) });
        this.on('pointerdown', action);
    }

    preUpdate() {
        this.angle += this.angleChange;
    }
}