import { GameManager } from "../GameManager.js";
import { SnakeUnit } from "../abstract_classes/SnakeUnit.js";
export class TailUnit extends SnakeUnit {
    /**
     * @constructor
     * @param tailUnitIndex
     */
    constructor(tailUnitIndex) {
        super();
        this.gameManager = GameManager.getInstance();
        this.snake = GameManager.snake;
        this.tailUnitIndex = tailUnitIndex;
    }
    /**
     * Refresh the element position and attributes.
     *
     * @returns void
     */
    update() {
        this.prevPosition.posX = this.posX;
        this.prevPosition.posY = this.posY;
        if (this.tailUnitIndex === 0) {
            this.posX = this.snake.prevPosition['posX'];
            this.posY = this.snake.prevPosition['posY'];
            // Makes the first tail piece to correctly follow the snakes head direction
            this.updatePositionFromDirection(this.snake.prevPosition['direction']);
        }
        else {
            this.posX = TailUnit.tailUnits[this.tailUnitIndex - 1].prevPosition['posX'];
            this.posY = TailUnit.tailUnits[this.tailUnitIndex - 1].prevPosition['posY'];
        }
        this.draw();
        this.foodCollisionDetection();
    }
    ;
    foodCollisionDetection() {
        if (this.posX === GameManager.food.posX && this.posY === GameManager.food.posY) {
            GameManager.food.randomSpawn();
        }
    }
    ;
    /**
     * Cycles over the tail units and trigger
     * the update method.
     *
     * @returns void
     */
    static updateAllUnits() {
        for (let i = 0; i < TailUnit.tailUnits.length; i++) {
            TailUnit.tailUnits[i].update();
        }
    }
    /**
     * Cycles over the snake tails units and
     * triggers the disappear method.
     *
     * @returns void
     */
    static hideTailPieces() {
        for (let i = 0; i < TailUnit.tailUnits.length; i++) {
            TailUnit.tailUnits[i].disappear();
        }
    }
}
TailUnit.tailUnits = [];
