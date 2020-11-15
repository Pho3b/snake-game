import {GameManager} from "../GameManager.js";
import {UtilsComponent} from "../components/UtilsComponent.js";

export class Food {
    size: number;
    posX: number;
    posY: number;


    constructor(size: number, posX: number, posY: number) {
        this.size = size;
        this.posX = posX;
        this.posY = posY;
    }

    /**
     * Assign the posX and posY to random position values
     * and then it calls the draw method.
     *
     * @returns void
     */
    public randomSpawn(): void {
        this.posX = this.generateRandomPosition();
        this.posY = this.generateRandomPosition();
        this.draw();
    };

    /**
     * Draws the green food piece on the map.
     *
     * @returns void
     */
    public draw(): void {
        GameManager.context.fillStyle = "green";
        GameManager.context.fillRect(this.posX, this.posY, this.size, this.size);
    };

    /**
     * Makes the food piece disappear
     *
     * @returns void
     */
    public disappear(): void {
        GameManager.context.fillStyle = "white";
        GameManager.context.fillRect(this.posX, this.posY, this.size, this.size);
    }

    /**
     * Generates a feasible position based on the unit
     * size and the map size.
     * Rounds up the value to the nearest integer and always returns
     * a multiple of the 'unitSize'
     *
     * @returns number
     */
    private generateRandomPosition(): number {
        let canvasAvailableSize = GameManager.canvas.width - GameManager.unitSize;
        return Math.round((Math.random() * canvasAvailableSize) / GameManager.unitSize) * GameManager.unitSize;
    }
}
