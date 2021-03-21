import {GameManager} from "../GameManager.js";
import {SnakeUnit} from "../abstract_classes/SnakeUnit.js";
import {Snake} from "./Snake.js";

export class TailUnit extends SnakeUnit {
    static tailUnits: TailUnit[] = [];
    tailUnitIndex: number;
    gameManager: GameManager;
    snake: Snake;


    /**
     * @constructor
     * @param tailUnitIndex
     */
    constructor(tailUnitIndex: number) {
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
    public update(): void {
        this.prevPosition.posX = this.posX;
        this.prevPosition.posY = this.posY;

        if (this.tailUnitIndex === 0) {
            this.posX = this.snake.prevPosition['posX'];
            this.posY = this.snake.prevPosition['posY'];

            // Makes the first tail piece to correctly follow the snakes head direction
            this.updatePositionFromDirection( this.snake.prevPosition['direction']);
        } else {
            this.posX = TailUnit.tailUnits[this.tailUnitIndex - 1].prevPosition['posX'];
            this.posY = TailUnit.tailUnits[this.tailUnitIndex - 1].prevPosition['posY'];
        }

        this.draw();
        this.foodCollisionDetection();
    }

    /**
     * Checks if the snake's Tail is colliding with the food piece.
     * If yes, it triggers the food re spawn.
     *
     * @return void
     */
    private foodCollisionDetection(): void {
        if (this.posX === GameManager.food.posX && this.posY === GameManager.food.posY) {
            GameManager.food.randomSpawn();
        }
    }

    /**
     * Cycles over the tail units and trigger
     * the update method.
     *
     * @returns void
     */
    static updateAllUnits(): void {
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
    static hideTailPieces(): void {
        for (let i = 0; i < TailUnit.tailUnits.length; i++) {
            TailUnit.tailUnits[i].disappear();
        }
    }
}
