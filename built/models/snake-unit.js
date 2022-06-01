import { Direction } from "../helper/enum.js";
import { Unit } from "./unit.js";
import { Constant } from "../helper/constant.js";
export class SnakeUnit extends Unit {
    constructor() {
        super(...arguments);
        this.prevPosition = {
            posX: 0,
            posY: 0,
            direction: Direction.Null
        };
    }
    /**
     * Draws the snake unit on the canvas.
     *
     * @returns void
     */
    draw() {
        Constant.context.fillStyle = "black";
        Constant.context.fillRect(this.posX, this.posY, this.size, this.size);
        Constant.context.strokeStyle = "white";
        Constant.context.lineWidth = 0.5;
        Constant.context.strokeRect(this.posX, this.posY, this.size, this.size);
    }
    /**
     * Updates the snake part position starting from
     * the given direction.
     *
     * @param direction
     */
    updatePosition(direction) {
        switch (direction) {
            case Direction.Left:
                this.posX -= this.size;
                break;
            case Direction.Right:
                this.posX += this.size;
                break;
            case Direction.Up:
                this.posY -= this.size;
                break;
            case Direction.Down:
                this.posY += this.size;
                break;
        }
    }
}
