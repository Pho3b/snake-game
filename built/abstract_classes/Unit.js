import { GameManager } from "../GameManager.js";
export class Unit {
    constructor() {
        this.size = GameManager.unitSize;
    }
    /**
     * Makes the unit disappear.
     *
     * @returns void
     */
    disappear() {
        GameManager.context.fillStyle = "white";
        GameManager.context.fillRect(this.posX, this.posY, this.size, this.size);
    }
    ;
}
