import { GameManager } from "../GameManager.js";
import { SnakePart } from "../abstract_classes/SnakePart.js";
export class Tail extends SnakePart {
    constructor(tailArrPos) {
        super();
        this.tailArrPos = tailArrPos;
        this.size = GameManager.snake.size;
        this.increment = GameManager.snake.increment;
    }
    update() {
        this.prevPosition.posX = this.posX;
        this.prevPosition.posY = this.posY;
        if (this.tailArrPos === 0) {
            this.posX = GameManager.snake.prevPosition['posX'];
            this.posY = GameManager.snake.prevPosition['posY'];
            // Makes the first tail piece to correctly follow the snakes head direction
            this.updatePositionFromDirection(GameManager.snake.prevPosition['direction']);
        }
        else {
            this.posX = GameManager.tailPieces[this.tailArrPos - 1].prevPosition['posX'];
            this.posY = GameManager.tailPieces[this.tailArrPos - 1].prevPosition['posY'];
        }
        this.draw();
    }
    ;
    disappear() {
        GameManager.context.fillStyle = "white";
        GameManager.context.fillRect(this.posX, this.posY, this.size, this.size);
    }
    ;
    foodCollisionDetection() {
        if (this.posX === GameManager.food.posX && this.posY === GameManager.food.posY) {
            GameManager.food.randomSpawn();
        }
    }
    ;
}
