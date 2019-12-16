export default class End extends Phaser.Scene {

    constructor() {
        super({ key: 'End', active: true });
    }

    init(data) {
        this.loaded = data.loaded;
        this.goals = data.goals;
        this.timelimit = data.timelimit;
        this.minutes = data.minutes;
        this.seconds = data.seconds;
        this.rightScore = data.rightScore;
        this.leftScore = data.leftScore;
    }

    preload() {
        this.load.image('RematchButton', 'sprites/rematchbutton.png');
        this.load.image('MainMenuButton', 'sprites/mainmenubutton.png');
        this.load.image('Textbox', 'sprites/textbox.png');
    }

    create() {
        if (!this.loaded) this.scene.start('Menu');
        this.bg = this.add.image(670, 150, 'bg');
        this.bg.setScale(1.4);
        this.textbox = this.add.image(680, 115, 'Textbox');
        this.textbox.setScale(0.75, 0.5);
        this.textbox.setAngle(2);
        this.endText = this.add.text(360, 30, "", {
            font: "bold 45px Arial Black",
            fill: "#000000",
            align: "center",
        });
        if (this.rightScore == this.leftScore) {
            this.endText.setText("It was a draw! \n The result was " +
                this.leftScore + " - " + this.rightScore + "\nand the match lasted " +
                this.minutes + ":" + this.seconds);
        }
        else {
            if (this.rightScore > this.leftScore) this.winner = "Player 2";
            else this.winner = "Player 1";
            this.endText.setText(this.winner + " wins! \n The result was " +
                this.leftScore + " - " + this.rightScore + "\nand the match lasted " +
                this.minutes + ":" + this.seconds);
        }
        this.RematchButton = this.add.image(680, 300, 'RematchButton');
        this.RematchButton.setScale(0.5);
        this.RematchButton.setInteractive();
        this.RematchButton.on('pointerdown', () => {
            this.scene.start('Match', { loaded: true, timelimit: this.timelimit, goals: this.goals });
        });
        this.MainMenuButton = this.add.image(680, 400, 'MainMenuButton');
        this.MainMenuButton.setScale(0.5);
        this.MainMenuButton.setInteractive();
        this.MainMenuButton.on('pointerdown', () => {
            this.scene.start('Menu');
        });
    }

    update() {
    }
};