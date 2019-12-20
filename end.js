import Button from './button.js'

export default class End extends Phaser.Scene {

    constructor() {
        super({ key: 'End'});
    }

    init(data) {
        this.goals = data.goals;
        this.timelimit = data.timelimit;
        this.minutes = data.minutes;
        this.seconds = data.seconds;
        this.rightScore = data.rightScore;
        this.leftScore = data.leftScore;
        this.player1type = data.player1type;
        this.player2type = data.player2type;
    }

    preload() {
        this.load.image('RematchButton', 'sprites/rematchbutton.png');
        this.load.image('MainMenuButton', 'sprites/mainmenubutton.png');
        this.load.image('Textbox', 'sprites/textbox.png');
        this.load.audio('endmusic', 'music/end.mp3');
        this.load.audio('button', 'sfx/buttonpress.mp3');
    }

    create() {
        this.sound.stopAll();
        this.endmusic = this.sound.add('endmusic');
        this.endmusic.play();
        this.endmusic.setLoop(true);
        this.bg = this.add.image(670, 150, 'bg').setScale(1.4);
        this.textbox = this.add.image(680, 115, 'Textbox').setScale(0.75, 0.5).setAngle(2);
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
        this.RematchButton = new Button(this, 680, 300, 'RematchButton', 0.5, 0);
        this.RematchButton.activate(() => {
            this.scene.start('Match', {
                loaded: true, timelimit: this.timelimit, goals: this.goals,
                player1type: this.player1type, player2type: this.player2type
            });
        });
        this.MainMenuButton = new Button(this, 680, 400, 'MainMenuButton', 0.5, 0);
        this.MainMenuButton.activate(() => this.scene.start('Menu'));
        this.player1 = new Button(this, 400, 350, this.player1type, 0.25, 1).setVisible(true);
        this.player2 = new Button(this, 950, 350, this.player2type, 0.25, -1).setVisible(true);
        this.player2.setScale(0.25);
    }

    update() {
    }
};