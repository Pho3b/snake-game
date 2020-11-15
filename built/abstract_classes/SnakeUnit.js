import { Direction } from "../components/EnumeratorsComponent.js";
import { GameManager } from "../GameManager.js";
import { Unit } from "./Unit.js";
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
        GameManager.context.fillStyle = "black";
        GameManager.context.fillRect(this.posX, this.posY, this.size, this.size);
        GameManager.context.strokeStyle = "white";
        GameManager.context.lineWidth = 0.5;
        GameManager.context.strokeRect(this.posX, this.posY, this.size, this.size);
    }
    /**
     * Updates the snake part position starting from
     * the passed direction.
     *
     * @param direction
     */
    updatePositionFromDirection(direction) {
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
    update() { }
    ;
}
