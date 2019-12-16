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
    }

    create() {
        if (!this.loaded) this.scene.start('Menu');
        this.bg = this.add.image(670, 150, 'bg');
        this.bg.setScale(1.4);
        this.endText = this.add.text(340, 20, "", {
            font: "bold 50px Arial Black",
            fill: "#00ffff",
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
        this.RematchButton = this.add.image(680, 300, 'MenuButton');
        this.RematchButton.setScale(0.5);
        this.RematchButton.setInteractive();
        this.RematchButton.on('pointerdown', () => {
            this.scene.start('Match', { loaded: true, timelimit: this.timelimit, goals: this.goals });
        });
        this.MenuButton = this.add.image(680, 400, 'MenuButton');
        this.MenuButton.setScale(0.5);
        this.MenuButton.setInteractive();
        this.MenuButton.on('pointerdown', () => {
            this.scene.start('Menu');
        });
    }

    update() {
    }
};