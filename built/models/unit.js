import { Constant } from "../helper/constant.js";
export class Unit {
    constructor() {
        this.size = Constant.unitSize;
    }
    /**
     * Makes the unit disappear.
     *
     * @returns void
     */
    disappear() {
        Constant.context.fillStyle = "white";
        Constant.context.fillRect(this.posX, this.posY, this.size, this.size);
    }
}
