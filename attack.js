import Hitbox from './hitbox.js'

export default class Attack extends Hitbox {
    constructor(scene, x, y, h, w, sensors, forceX, forceY, duration, flipX, angle, sprite) {
        super(scene, x, y, h, w, sprite, 'attack', sensors, flipX * 2, 2);
        this.setAngle(angle);
        this.forceX = forceX;
        this.forceY = forceY;
        this.duration = duration;
    }
    preUpdate() {
        if (this.duration <= 0) this.destroy();
        else this.duration--;
    }
}