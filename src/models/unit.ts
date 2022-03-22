import {GameManager} from "../game-manager.js";

export abstract class Unit {
    size: number = GameManager.unitSize;
    posX: number;
    posY: number;

    /**
     * Makes the unit disappear.
     *
     * @returns void
     */
    public disappear() {
        GameManager.context.fillStyle = "white";
        GameManager.context.fillRect(this.posX, this.posY, this.size, this.size);
    }
}
