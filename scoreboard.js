export default class Scoreboard {
    constructor(scene, time, goals) {
        this.rightScore = 0;
        this.leftScore = 0;
        this.scene = scene;
        scene.add.existing(this);
        this.scoreText = scene.add.text(550, 120, "", {
            font: "bold 100px Arial Black",
            fill: "#00ffff",
            align: "center",
        });
        this.timerText = scene.add.text(550, 20, "", {
            font: "bold 100px Arial Black",
            fill: "#00ffff",
            align: "center"
        });
        this.scoreText.alpha = 0.7;
        this.timerText.alpha = 0.7;
        this.time = time;
        this.goals = goals;
        if (this.time > 0) this.timer = scene.time.delayedCall(time * 1000, () => {
            scene.scene.start('End', {
                loaded: true, timelimit: this.time, minutes: Math.floor(this.time / 60), 
                seconds: Math.floor(this.time % 60), goals: this.goals,
                rightScore: this.rightScore, leftScore: this.leftScore
            });
        }, [], this);
        else this.timer = scene.time.delayedCall(1000000, () => { }, [], this);
    }

    showScore() {
        this.scoreText.setText(this.leftScore + " - " + this.rightScore);
    }

    preUpdate() {
        if (this.goals > 0) {
            if (this.rightScore == this.goals || this.leftScore == this.goals) {
                this.scene.scene.start('End', {
                    loaded: true, timelimit: this.time, minutes: this.minutes, seconds: this.seconds, goals: this.goals,
                    rightScore: this.rightScore, leftScore: this.leftScore
                });
            }
        }
        this.minutes = Math.floor(this.timer.getElapsedSeconds() / 60);
        this.seconds = Math.floor(this.timer.getElapsedSeconds() % 60);
        if (this.time > 0) {
            this.minutes = Math.floor((this.time / 60) - this.minutes);
            this.seconds = Math.floor((this.time % 60) - this.seconds);
        }
        if (this.seconds < 10) this.seconds = "0" + this.seconds;
        this.timerText.setText(this.minutes + ":" + this.seconds);
    }
}