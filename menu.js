import Button from './button.js'

export default class Menu extends Phaser.Scene {

    constructor() {
        super({ key: 'Menu'});
    }

    preload() {
        this.load.image('bg', 'sprites/background.png')
        this.load.image('ball', 'sprites/ball.png');
        this.load.image('PlayButton', 'sprites/playbutton1.png');
        this.load.image('logo', 'sprites/logo.png');
        this.load.image('GoalsButton', 'sprites/goalsbutton.png');
        this.load.image('GoalsButton5', 'sprites/goalsbutton5.png');
        this.load.image('GoalsButton7', 'sprites/goalsbutton7.png');
        this.load.image('GoalsButton9', 'sprites/goalsbutton9.png');
        this.load.image('TimeLimitButton', 'sprites/timelimitbutton.png');
        this.load.image('TimeButton1', 'sprites/timebutton1.png');
        this.load.image('TimeButton2', 'sprites/timebutton2.png');
        this.load.image('TimeButton3', 'sprites/timebutton3.png');
        this.load.image('angry1', 'sprites/angry1.jpg');
        this.load.image('angry2', 'sprites/angry2.jpg');
        this.load.image('happy1', 'sprites/happy1.jpg');
        this.load.image('happy2', 'sprites/happy2.jpg');
        this.load.image('dead1', 'sprites/dead1.jpg');
        this.load.image('dead2', 'sprites/dead2.jpg');
        this.load.image('umm1', 'sprites/umm1.jpg');
        this.load.image('umm2', 'sprites/umm2.jpg');
        this.load.image('backbutton', 'sprites/backbutton.png');
        this.load.audio('menumusic', 'music/menu.mp3');
        this.load.audio('button', 'sfx/buttonpress.mp3');
    }

    create() {
        this.sound.stopAll();
        this.goaled = false;
        this.bg = this.add.image(670, 150, 'bg').setScale(1.4);
        this.PlayButton = new Button(this, 680, 400, 'PlayButton', 0.5, 0);
        this.ball = new Button(this, 680, 150, 'ball', 1, 1).setVisible(true)
        this.logo = this.add.image(680, 170, 'logo').setScale(0.5);
        this.GoalsButton = new Button(this, 420, 400, 'GoalsButton', 0.5, 0);
        this.TimeButton = new Button(this, 940, 400, 'TimeLimitButton', 0.5, 0);
        this.GoalsButton5 = new Button(this, 420, 400, 'GoalsButton5', 0.5, 0);
        this.GoalsButton7 = new Button(this, 680, 400, 'GoalsButton7', 0.5, 0);
        this.GoalsButton9 = new Button(this, 940, 400, 'GoalsButton9', 0.5, 0);
        this.TimeButton1 = new Button(this, 420, 400, 'TimeButton1', 0.5, 0);
        this.TimeButton2 = new Button(this, 680, 400, 'TimeButton2', 0.5, 0);
        this.TimeButton3 = new Button(this, 940, 400, 'TimeButton3', 0.5, 0);
        this.angry1 = new Button(this, 400, 400, 'angry1', 0.15, 2);
        this.happy1 = new Button(this, 600, 400, 'happy1', 0.15, -4);
        this.dead1 = new Button(this, 800, 400, 'dead1', 0.15, -0.5);
        this.umm1 = new Button(this, 1000, 400, 'umm1', 0.15, 1);
        this.angry2 = new Button(this, 400, 400, 'angry2', 0.15, 2);
        this.happy2 = new Button(this, 600, 400, 'happy2', 0.15, -4);
        this.dead2 = new Button(this, 800, 400, 'dead2', 0.15, -0.5);
        this.umm2 = new Button(this, 1000, 400, 'umm2', 0.15, 1);
        this.backbutton = new Button(this, 100, 400, 'backbutton', 0.25, 0);
        this.buttonArray = [this.PlayButton, this.GoalsButton, this.TimeButton, this.GoalsButton5, this.GoalsButton7, this.GoalsButton9, this.TimeButton1,
        this.TimeButton2, this.TimeButton3, this.angry1, this.angry2, this.happy1, this.happy2, this.umm1, this.umm2, this.dead1, this.dead2, this.backbutton];
        this.deactivateButtons();
        this.PlayButton.activate(() => this.chooseRuleset());
        this.menumusic = this.sound.add('menumusic');
        this.menumusic.play();
        this.menumusic.setLoop(true);
    }

    deactivateButtons() {
        this.buttonArray.forEach(element => {
            element.deactivate();
        });
    }

    chooseRuleset() {
        this.deactivateButtons();
        this.GoalsButton.activate(() => this.chooseGoals());
        this.TimeButton.activate(() => this.chooseTimeLimit());
    }

    chooseGoals() {
        this.goaled = true;
        this.timelimit = 0;
        this.deactivateButtons();
        this.GoalsButton5.activate(() => {
            this.goals = 5;
            this.choosePlayer1();
        });
        this.GoalsButton7.activate(() => {
            this.goals = 7;
            this.choosePlayer1();
        });
        this.GoalsButton9.activate(() => {
            this.goals = 9;
            this.choosePlayer1();
        });
        this.backbutton.activate(() => this.chooseRuleset());
    }

    chooseTimeLimit() {
        this.goaled = false;
        this.goals = 0;
        this.deactivateButtons();
        this.TimeButton1.activate(() => {
            this.timelimit = 9;
            this.choosePlayer1();
        });
        this.TimeButton2.activate(() => {
            this.timelimit = 120;
            this.choosePlayer1();
        });
        this.TimeButton3.activate(() => {
            this.timelimit = 180;
            this.choosePlayer1();
        });
        this.backbutton.activate(() => this.chooseRuleset());
    }

    choosePlayer1() {
        this.deactivateButtons();
        this.angry1.activate(() => {
            this.player1 = 'angry1';
            this.choosePlayer2();
        });
        this.happy1.activate(() => {
            this.player1 = 'happy1';
            this.choosePlayer2();
        });
        this.dead1.activate(() => {
            this.player1 = 'dead1';
            this.choosePlayer2();
        });
        this.umm1.activate(() => {
            this.player1 = 'umm1';
            this.choosePlayer2();
        });
        if(this.goaled) this.backbutton.activate(() => this.chooseGoals());
        else this.backbutton.activate(() => this.chooseTimeLimit());
    }

    choosePlayer2() {
        this.deactivateButtons();
        this.data = { goals: this.goals, time: this.timelimit, player1type: this.player1 };
        this.angry2.activate(() => {
            this.data.player2type = 'angry2';
            this.scene.start('Match', this.data)
        });
        this.happy2.activate(() => {
            this.data.player2type = 'happy2';
            this.scene.start('Match', this.data)
        });
        this.dead2.activate(() => {
            this.data.player2type = 'dead2';
            this.scene.start('Match', this.data)
        });
        this.umm2.activate(() => {
            this.data.player2type = 'umm2';
            this.scene.start('Match', this.data)
        });
        this.backbutton.activate(() => this.choosePlayer1());
    }

    update() {
    }
};