import {Unit} from "./unit.js";
import {Constant} from "../helper/constant.js";

export class Food extends Unit {
    size: number;
    posX: number;
    posY: number;


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
    public draw(): void {
        Constant.context.fillStyle = "green";
        Constant.context.fillRect(this.posX, this.posY, this.size, this.size);
    };

    /**
     * Draws the food piece on a random spot on the grid
     *
     * @returns void
     */
    public randomSpawn(): void {
        this.posX = Food.generateRandomPosition();
        this.posY = Food.generateRandomPosition();
        this.draw();
    };

    /**
     * Generates a feasible position based on the unit
     * size and the map size.
     * Rounds up the value to the nearest integer and always returns
     * a multiple of the 'unitSize'
     *
     * @returns number
     */
    private static generateRandomPosition(): number {
        let canvasAvailableSize = Constant.canvas.width - Constant.unitSize;
        return Math.round((Math.random() * canvasAvailableSize) / Constant.unitSize) * Constant.unitSize;
    }
}
