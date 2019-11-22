export class Scoreboard{
    constructor(scene){
        this.rightScore = 0;
        this.leftScore = 0;
        this.scene = scene;
        this.text = scene.add.text(550, 50, "", {
            font: "100px Arial",
            fill: "#ff0044",
            align: "center"
        });    
    }
    showScore() {
        this.text.setText(this.leftScore  + " - " + this.rightScore);
    }
}