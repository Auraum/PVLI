export default class Menu extends Phaser.Scene {

    constructor() {
        super({ key: 'Menu', active: true });
    }

    preload() {
        this.load.image('MenuButton', 'sprites/playbutton.png');
        this.load.image('logo', 'sprites/logo.png');
    }

    create() {
        this.bg = this.add.image(670, 150, 'bg');
        this.bg.setScale(1.4);
        this.MenuButton = this.add.image(680, 400, 'MenuButton');
        this.MenuButton.setScale(0.5);
        this.MenuButton.setInteractive();
        this.ball = this.add.image(680, 150, 'ball');
        this.logo = this.add.image(680, 170, 'logo');
        this.logo.setScale(0.5);
        this.MenuButton.on('pointerdown', () => this.chooseRuleset());
    }

    chooseRuleset() {
        //this.MenuButton.destroy();
        this.choosePlayer1();
    }

    choosePlayer1() {
        this.choosePlayer2();

    }
    choosePlayer2() {
        { this.scene.start('Match', { loaded: true, goals:2, time : 0 }) }
    }

    update() {
        this.ball.angle++;
    }
};