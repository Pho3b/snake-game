import { Unit } from "./unit.js";
import { Constant } from "../helper/constant.js";
export class Food extends Unit {
    /**
     * Default constructor
     */
    constructor() {
        super();
        this.size = Constant.unitSize;
        this.randomSpawn();
    }
    /**
     * Draws the green food piece on the map.
     *
     * @returns void
     */
    draw() {
        Constant.context.fillStyle = "green";
        Constant.context.fillRect(this.posX, this.posY, this.size, this.size);
    }
    ;
    /**
     * Draws the food piece on a random spot on the grid
     *
     * @returns void
     */
    randomSpawn() {
        this.posX = Food.generateRandomPosition();
        this.posY = Food.generateRandomPosition();
        this.draw();
    }
    ;
    /**
     * Generates a feasible position based on the unit
     * size and the map size.
     * Rounds up the value to the nearest integer and always returns
     * a multiple of the 'unitSize'
     *
     * @returns number
     */
    static generateRandomPosition() {
        let canvasAvailableSize = Constant.canvas.width - Constant.unitSize;
        return Math.round((Math.random() * canvasAvailableSize) / Constant.unitSize) * Constant.unitSize;
    }
}
