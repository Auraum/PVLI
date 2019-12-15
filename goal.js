import Hitbox from './hitbox.js'

export default class Goal extends Hitbox {
    constructor(scene, x, y, sprite, label, sensors) {
        super(scene, x, y, 250, 400, sprite, label, sensors, 0.3, 0.35);
    }
}