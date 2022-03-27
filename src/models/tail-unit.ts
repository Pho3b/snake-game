import {GameManager} from "../game-manager.js";
import {SnakeUnit} from "./snake-unit.js";
import {Snake} from "./snake.js";

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

            // Makes the first tailpiece to correctly follow the snake direction
            this.updatePosition(this.snake.prevPosition['direction']);
        } else {
            this.posX = TailUnit.tailUnits[this.tailUnitIndex - 1].prevPosition['posX'];
            this.posY = TailUnit.tailUnits[this.tailUnitIndex - 1].prevPosition['posY'];
        }

        this.draw();
        this.foodCollisionDetection();
    }

    /**
     * Cycles over the tail units triggering the update method.
     *
     * @returns void
     */
    static updateAllUnits(): void {
        for (let i = 0; i < TailUnit.tailUnits.length; i++)
            TailUnit.tailUnits[i].update();
    }

    /**
     * Cycles over the snake tails units triggering the disappear method.
     *
     * @returns void
     */
    static hideTailPieces(): void {
        for (let i = 0; i < TailUnit.tailUnits.length; i++)
            TailUnit.tailUnits[i].disappear();
    }

    /**
     * Triggers the food re-spawn if a tailpiece is colliding with it
     *
     * @return void
     */
    private foodCollisionDetection(): void {
        if (this.posX === GameManager.food.posX && this.posY === GameManager.food.posY)
            GameManager.food.randomSpawn();
    }
}
