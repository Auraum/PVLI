export default class Scoreboard {
    constructor(scene, time) {
        this.rightScore = 0;
        this.leftScore = 0;
        this.scene = scene;
        scene.add.existing(this);
        this.scoreText = scene.add.text(550, 100, "", {
            font: "100px Arial",
            fill: "#000000",
            align: "center"
        });
        this.timerText = scene.add.text(550, 0, "lol", {
            font: "100px Arial",
            fill: "#000000",
            align: "center"
        });
        this.time = time;
        this.timer = scene.time.delayedCall(time * 1000, () => {
        }, [], this);
    }

    showScore() {
        this.scoreText.setText(this.leftScore + " - " + this.rightScore);
    }

    preUpdate() {
        this.timerText.setText(this.time - this.timer.getElapsedSeconds().toString().substr(0, 3));
    }
}