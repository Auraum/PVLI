export default class Menu extends Phaser.Scene {

    constructor() {
        super({ key: 'Menu', active: true });
    }

    preload() {
        this.load.image('MenuButton', 'sprites/player1.jpg');
    }

    create() {
        this.MenuButton = this.add.image(700,200,'MenuButton');
        this.MenuButton.setScale(0.5);
        this.MenuButton.setInteractive();
        this.MenuText = this.add.text(550, 200, "PLAY", {
            font: "100px Arial",
            fill: "#000000",
            align: "center"
        });
        this.MenuButton.on('pointerdown',()=> {this.scene.start('Match')});
    }

    update() {
    }
};