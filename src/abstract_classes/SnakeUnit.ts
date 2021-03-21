import {IPosition} from "../interfaces/IPosition.js";
import {Direction} from "../components/EnumeratorsComponent.js";
import {GameManager} from "../GameManager.js";
import {Unit} from "./Unit.js";

export abstract class SnakeUnit extends Unit {
    prevPosition: IPosition = {
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
     * the passed direction.
     *
     * @param direction
     */
    protected updatePositionFromDirection(direction: Direction): void {
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

    public update() {};
}
