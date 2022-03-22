import {Position} from "./position.js";
import {Direction} from "../components/enums-component.js";
import {GameManager} from "../game-manager.js";
import {Unit} from "./unit.js";

export abstract class SnakeUnit extends Unit {
    prevPosition: Position = {
        posX: 0,
        posY: 0,
        direction: Direction.Null
    };


    /**
     * Draws the snake unit on the canvas.
     *
     * @returns void
     */
    protected draw(): void {
        GameManager.context.fillStyle = "black";
        GameManager.context.fillRect(this.posX, this.posY, this.size, this.size);
        GameManager.context.strokeStyle = "white";
        GameManager.context.lineWidth = 0.5;
        GameManager.context.strokeRect(this.posX, this.posY, this.size, this.size);
    }

    /**
     * Updates the snake part position starting from
     * the given direction.
     *
     * @param direction
     */
    protected updatePosition(direction: Direction): void {
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
