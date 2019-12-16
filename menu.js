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
        this.load.image('angry1', 'sprites/angry1.jpg')
        this.load.image('angry2', 'sprites/angry2.jpg')
        this.load.image('happy1', 'sprites/happy1.jpg')
        this.load.image('happy2', 'sprites/happy2.jpg')
        this.load.image('dead1', 'sprites/dead1.jpg')
        this.load.image('dead2', 'sprites/dead2.jpg')
        this.load.image('umm1', 'sprites/umm1.jpg')
        this.load.image('umm2', 'sprites/umm2.jpg')
    }

    create() {
        this.goaled = false;
        this.part2 = false;
        this.bg = this.add.image(670, 150, 'bg');
        this.bg.setScale(1.4);
        this.PlayButton = this.add.image(680, 400, 'PlayButton');
        this.PlayButton.setScale(0.5);
        this.PlayButton.setInteractive();
        this.ball = this.add.image(680, 150, 'ball');
        this.logo = this.add.image(680, 170, 'logo');
        this.logo.setScale(0.5);
        this.PlayButton.on('pointerdown', () => this.chooseRuleset());
        this.angry1 = this.add.image(400, 400, 'angry1').setVisible(false);
        this.happy1 = this.add.image(600, 400, 'happy1').setVisible(false);
        this.dead1 = this.add.image(800, 400, 'dead1').setVisible(false);
        this.umm1 = this.add.image(1000, 400, 'umm1').setVisible(false);
        this.angry2 = this.add.image(400, 400, 'angry2').setVisible(false);
        this.happy2 = this.add.image(600, 400, 'happy2').setVisible(false);
        this.dead2 = this.add.image(800, 400, 'dead2').setVisible(false);
        this.umm2 = this.add.image(1000, 400, 'umm2').setVisible(false);
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
        this.goaled = true;
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
        if (this.goaled) {
            this.GoalsButton5.destroy();
            this.GoalsButton7.destroy();
            this.GoalsButton9.destroy();
        }
        else {
            this.TimeButton1.destroy();
            this.TimeButton2.destroy();
            this.TimeButton3.destroy();
        }
        this.angry1.setVisible(true);
        this.angry1.setScale(0.15);
        this.angry1.setInteractive();
        this.angry1.on('pointerdown', () => {
            this.player1 = 'angry1';
            this.choosePlayer2();
        });
        this.happy1.setVisible(true);
        this.happy1.setScale(0.15);
        this.happy1.setInteractive();
        this.happy1.on('pointerdown', () => {
            this.player1 = 'happy1';
            this.choosePlayer2();
        });
        this.dead1.setVisible(true);
        this.dead1.setScale(0.15);
        this.dead1.setInteractive();
        this.dead1.on('pointerdown', () => {
            this.player1 = 'dead1';
            this.choosePlayer2();
        });
        this.umm1.setVisible(true);
        this.umm1.setScale(0.15);
        this.umm1.setInteractive();
        this.umm1.on('pointerdown', () => {
            this.player1 = 'umm1';
            this.choosePlayer2();
        });
    }
    choosePlayer2() {
        this.angry1.destroy();
        this.happy1.destroy();
        this.dead1.destroy();
        this.umm1.destroy();
        this.part2 = true;
        this.angry2.setVisible(true);
        this.angry2.setScale(0.15);
        this.angry2.setInteractive();
        this.angry2.on('pointerdown', () => {
            this.player2 = 'angry2';
            this.scene.start('Match', {
                loaded: true, goals: this.goals, time: this.timelimit,
                player1type: this.player1, player2type: this.player2
            })
        });
        this.happy2.setVisible(true);
        this.happy2.setScale(0.15);
        this.happy2.setInteractive();
        this.happy2.on('pointerdown', () => {
            this.player2 = 'happy2';
            this.scene.start('Match', {
                loaded: true, goals: this.goals, time: this.timelimit,
                player1type: this.player1, player2type: this.player2
            })
        });
        this.dead2.setVisible(true);
        this.dead2.setScale(0.15);
        this.dead2.setInteractive();
        this.dead2.on('pointerdown', () => {
            this.player2 = 'dead2';
            this.scene.start('Match', {
                loaded: true, goals: this.goals, time: this.timelimit,
                player1type: this.player1, player2type: this.player2
            })
        });
        this.umm2.setVisible(true);
        this.umm2.setScale(0.15);
        this.umm2.setInteractive();
        this.umm2.on('pointerdown', () => {
            this.player2 = 'umm2';
            this.scene.start('Match', {
                loaded: true, goals: this.goals, time: this.timelimit,
                player1type: this.player1, player2type: this.player2
            })
        });
    }

    update() {
        this.ball.angle++;
        if(!this.part2){
            this.umm1.angle++;
            this.angry1.angle += 2;
            this.dead1.angle -= 0.05;
            this.happy1.angle -= 4;
        }
        else{
            this.umm2.angle--;
            this.angry2.angle -= 2;
            this.dead2.angle += 0.05;
            this.happy2.angle += 4;
        }
    }
};