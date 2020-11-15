import { Main } from '../Main.js';
import { Direction } from "../components/UtilsComponent.js";
import { SnakePart } from "../abstract_classes/SnakePart.js";
export class Tail extends SnakePart {
    constructor(tailArrPos) {
        super();
        this.tailArrPos = tailArrPos;
        this.size = Main.snake.size;
        this.increment = Main.snake.increment;
    }
    draw() {
        this.prevPosition.posX = this.posX;
        this.prevPosition.posY = this.posY;
        if (this.tailArrPos === 0) {
            this.posX = Main.snake.prevPosition['posX'];
            this.posY = Main.snake.prevPosition['posY'];
            this.followSnakesHeadDirection();
        }
        else {
            this.posX = Main.tailPieces[this.tailArrPos - 1].prevPosition['posX'];
            this.posY = Main.tailPieces[this.tailArrPos - 1].prevPosition['posY'];
        }
        this.drawRect();
    }
    ;
    disappear() {
        Main.context.fillStyle = "white";
        Main.context.fillRect(this.posX, this.posY, this.size, this.size);
    }
    ;
    foodCollisionDetection() {
        if (this.posX === Main.food.posX && this.posY === Main.food.posY) {
            Main.food.randomSpawn();
        }
    }
    ;
    /**
     * Launched only for the first tail piece.
     * Makes it follow the snakes head direction in order to correctly visualize the animation.
     *
     * @returns void
     */
    followSnakesHeadDirection() {
        switch (Main.snake.prevPosition['direction']) {
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
}
