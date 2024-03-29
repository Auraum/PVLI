export default class Scoreboard {
    constructor(scene, time, goals, player1type, player2type) {
        this.rightScore = 0;
        this.leftScore = 0;
        this.scene = scene;
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
        this.end = false;
        this.player1type = player1type;
        this.player2type = player2type;
        if (this.time > 0) this.timer = scene.time.delayedCall(time * 1000, () => {
                this.end = true;
                scene.whistle.play();
                this.secondduration = Math.floor(this.time % 60);
                if(this.secondduration < 10) this.secondduration = "0" + this.secondduration;
                scene.scene.start('End', {
                    loaded: true, timelimit: this.time, minutes: Math.floor(this.time / 60),
                    seconds: this.secondduration, goals: this.goals,
                    rightScore: this.rightScore, leftScore: this.leftScore,
                    player1type: this.player1type, player2type: this.player2type
                });
            }, [], this);        
        else this.timer = scene.time.delayedCall(1000000, () => { }, [], this);
    }

    showScore() {
        this.scoreText.setText(this.leftScore + " - " + this.rightScore);
        if (this.goals > 0) {
            if (this.rightScore >= this.goals || this.leftScore >= this.goals) {
                this.end = true;
                this.scene.whistle.play();
                this.timer2 = this.scene.time.delayedCall(this.scene.whistle.totalDuration * 1000, () => {
                    this.scene.scene.start('End', {
                        loaded: true, timelimit: this.time, minutes: this.minutes,
                        seconds: this.seconds, goals: this.goals,
                        rightScore: this.rightScore, leftScore: this.leftScore,
                        player1type: this.player1type, player2type: this.player2type
                    });
                }, [], this); 
            }
        }
    }

    preUpdate() {      
        this.seconds = Math.floor(this.timer.getElapsedSeconds());
        if (this.time > 0) {
            this.seconds = this.time - this.seconds;
        }
        this.minutes = Math.floor(this.seconds / 60);
        this.seconds = this.seconds % 60;
        if (this.seconds < 10) this.seconds = "0" + this.seconds;
        this.timerText.setText(this.minutes + ":" + this.seconds);
    }
}