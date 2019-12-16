export default class Menu extends Phaser.Scene {

    constructor() {
        super({ key: 'Menu', active: true });
    }

    preload() {
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
    }

    create() {
        this.bg = this.add.image(670, 150, 'bg');
        this.bg.setScale(1.4);
        this.PlayButton = this.add.image(680, 400, 'PlayButton');
        this.PlayButton.setScale(0.5);
        this.PlayButton.setInteractive();
        this.ball = this.add.image(680, 150, 'ball');
        this.logo = this.add.image(680, 170, 'logo');
        this.logo.setScale(0.5);
        this.PlayButton.on('pointerdown', () => this.chooseRuleset());
    }

    chooseRuleset() {
        this.PlayButton.destroy();
        this.GoalsButton = this.add.image(420, 400, 'GoalsButton');
        this.GoalsButton.setScale(0.5);
        this.GoalsButton.setInteractive();
        this.GoalsButton.on('pointerdown', () => {
            this.chooseGoals();
        });
        this.TimeButton = this.add.image(940, 400, 'TimeLimitButton');
        this.TimeButton.setScale(0.5);
        this.TimeButton.setInteractive();
        this.TimeButton.on('pointerdown', () => {
            this.chooseTimeLimit();
        });
    }

    chooseGoals() {
        this.GoalsButton.destroy();
        this.TimeButton.destroy();
        this.GoalsButton5 = this.add.image(420, 400, 'GoalsButton5');
        this.GoalsButton5.setScale(0.5);
        this.GoalsButton5.setInteractive();
        this.GoalsButton5.on('pointerdown', () => {
            this.goals = 1;
            this.choosePlayer1();
        });
        this.GoalsButton7 = this.add.image(680, 400, 'GoalsButton7');
        this.GoalsButton7.setScale(0.5);
        this.GoalsButton7.setInteractive();
        this.GoalsButton7.on('pointerdown', () => {
            this.goals = 7;
            this.choosePlayer1();
        });
        this.GoalsButton9 = this.add.image(940, 400, 'GoalsButton9');
        this.GoalsButton9.setScale(0.5);
        this.GoalsButton9.setInteractive();
        this.GoalsButton9.on('pointerdown', () => {
            this.goals = 9;
            this.choosePlayer1();
        });
    }

    chooseTimeLimit() {
        this.GoalsButton.destroy();
        this.TimeButton.destroy();
        this.TimeButton1 = this.add.image(420, 400, 'TimeButton1');
        this.TimeButton1.setScale(0.5);
        this.TimeButton1.setInteractive();
        this.TimeButton1.on('pointerdown', () => {
            this.timelimit = 60;
            this.choosePlayer1();
        });
        this.TimeButton2 = this.add.image(680, 400, 'TimeButton2');
        this.TimeButton2.setScale(0.5);
        this.TimeButton2.setInteractive();
        this.TimeButton2.on('pointerdown', () => {
            this.timelimit = 120;
            this.choosePlayer1();
        });
        this.TimeButton3 = this.add.image(940, 400, 'TimeButton3');
        this.TimeButton3.setScale(0.5);
        this.TimeButton3.setInteractive();
        this.TimeButton3.on('pointerdown', () => {
            this.timelimit = 180;
            this.choosePlayer1();
        });
    }

    choosePlayer1() {
        this.choosePlayer2();

    }
    choosePlayer2() {
        { this.scene.start('Match', { loaded: true, goals: this.goals, time: this.timelimit }) }
    }

    update() {
    }
};