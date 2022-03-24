import {Constant} from "../helper/constant.js";

export abstract class Unit {
    size: number = Constant.unitSize;
    posX: number;
    posY: number;

    /**
     * Makes the unit disappear.
     *
     * @returns void
     */
    public disappear() {
        Constant.context.fillStyle = "white";
        Constant.context.fillRect(this.posX, this.posY, this.size, this.size);
    }
}
