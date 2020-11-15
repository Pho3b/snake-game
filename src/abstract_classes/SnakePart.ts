import {IPosition} from "../interfaces/IPosition.js";
import {Direction} from "../components/EnumeratorsComponent.js";
import {GameManager} from "../GameManager.js";

export abstract class SnakePart {
    size: number;
    increment: number = 10;
    posX: number;
    posY: number;
    prevPosition: IPosition = {
        posX: 0,
        posY: 0,
        direction: Direction.Null
    };

    /**
     * Draws a single snake square part on the canvas.
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
                this.posX -= this.increment;
                break;
            case Direction.Right:
                this.posX += this.increment;
                break;
            case Direction.Up:
                this.posY -= this.increment;
                break;
            case Direction.Down:
                this.posY += this.increment;
                break;
        }
    }

    public update() {};
    public disappear() {};
}
