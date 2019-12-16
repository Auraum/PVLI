import Hitbox from './hitbox.js'

export default class Attack extends Hitbox {
    constructor(scene, x, y, h, w, sensors, forceX, forceY, duration, flipX, angle) {
        super(scene, x, y, h, w, 'attacksprite', 'attack', sensors, 1, 1);
        this.setAngle(angle);
        this.setScale(flipX * 2, 2);
        this.forceX = forceX;
        this.forceY = forceY;
        this.duration = duration;
    }
    preUpdate() {
        if (this.duration <= 0) this.destroy();
        else this.duration--;
    }
}