import { GameManager } from "../GameManager.js";
import { SnakeUnit } from "../abstract_classes/SnakeUnit.js";
export class TailUnit extends SnakeUnit {
    constructor(tailArrPos) {
        super();
        this.tailPieceIndex = tailArrPos;
    }
    update() {
        this.prevPosition.posX = this.posX;
        this.prevPosition.posY = this.posY;
        if (this.tailPieceIndex === 0) {
            this.posX = GameManager.snake.prevPosition['posX'];
            this.posY = GameManager.snake.prevPosition['posY'];
            // Makes the first tail piece to correctly follow the snakes head direction
            this.updatePositionFromDirection(GameManager.snake.prevPosition['direction']);
        }
        else {
            this.posX = GameManager.tailPieces[this.tailPieceIndex - 1].prevPosition['posX'];
            this.posY = GameManager.tailPieces[this.tailPieceIndex - 1].prevPosition['posY'];
        }
        this.draw();
    }
    ;
    foodCollisionDetection() {
        if (this.posX === GameManager.food.posX && this.posY === GameManager.food.posY) {
            GameManager.food.randomSpawn();
        }
    }
    ;
}
