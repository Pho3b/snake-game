import {Direction, GameState, SoundEffect} from "../components/enums-component.js";
import {UtilsComponent} from "../components/utils-component.js";
import {GameManager} from "../game-manager.js";
import {TailUnit} from './tail-unit.js';
import {SnakeUnit} from "./snake-unit.js";
import {SoundComponent} from "../components/sound-component.js";

export class Snake extends SnakeUnit {
    static instance: Snake;
    direction: Direction;
    lastInsertedDirection: Direction;
    gameManager: GameManager;


    /**
     * @constructor
     * @param posX
     * @param posY
     * @param direction
     * @private
     */
    private constructor(posX: number, posY: number, direction: number) {
        super();
        this.gameManager = GameManager.getInstance();
        this.size = GameManager.unitSize;
        this.posX = posX;
        this.posY = posY;
        this.direction = direction;
        this.lastInsertedDirection = this.direction;
    }

    /**
     * Singleton related method.
     *
     * @returns GameManager
     */
    public static getInstance(): Snake {
        if (!Snake.instance)
            Snake.instance = new Snake(0, 0, 3);

        return Snake.instance;
    }

    /**
     * Refresh the element position and attributes.
     *
     * @returns void
     */
    public update(): void {
        this.direction = this.lastInsertedDirection;
        this.prevPosition.posX = this.posX;
        this.prevPosition.posY = this.posY;
        this.prevPosition.direction = this.direction;

        this.updatePosition(this.direction);
        this.draw();
        this.checkForBorders();
        this.selfCollisionDetection();
        this.foodCollisionDetection(GameManager.food.posX, GameManager.food.posY);
    }

    /**
     * Changes the snake current direction based on the
     * player pressed key.
     *
     * @param e
     */
    public changeDirection = (e) => {
        if (GameManager.gameState === GameState.Running)
            this.lastInsertedDirection = this.checkDirectionFromKey(e.key);
    }


    /**
     * Resets the Snake properties to the default state.
     *
     * @returns void
     */
    public die(): void {
        this.size = GameManager.unitSize;
        this.posX = 0;
        this.posY = 0;
        this.direction = Direction.Right;
    }

    /**
     * Checks whether the snake is colliding with the map borders or no.
     * In case it is colliding it calls the die method.
     *
     * @return void
     */
    public checkForBorders(): void {
        if ((this.posX + (this.size / 2)) > GameManager.canvas.width ||
            (this.posY + (this.size / 2)) > GameManager.canvas.height ||
            (this.posX + (this.size / 2)) < 0 ||
            (this.posY + (this.size / 2)) < 0) {
            this.gameManager.gameOver();
        }
    }

    /**
     * Checks if the snake is colliding with the food piece.
     * If yes, it triggers the food re-spawn, updates player points
     * and add a tailpiece.
     *
     * @param foodPosX
     * @param foodPosY
     * @return void
     */
    public foodCollisionDetection(foodPosX, foodPosY): void {
        if (this.posX === foodPosX && this.posY === foodPosY) {
            UtilsComponent.updatePointsText();
            GameManager.food.randomSpawn();
            TailUnit.tailUnits.push(new TailUnit(TailUnit.tailUnits.length));

            SoundComponent.playSoundEffect(SoundEffect.EatingSound);
        }
    }

    /**
     * Checks whether the snake is colliding with the map borders or no.
     * In case it is colliding it calls the die method.
     *
     * @returns void
     */
    public selfCollisionDetection(): void {
        for (let i = 0; i < TailUnit.tailUnits.length; i++) {
            if (this.posX == TailUnit.tailUnits[i]['posX'] &&
                this.posY == TailUnit.tailUnits[i]['posY']) {
                this.gameManager.gameOver();
            }
        }
    }

    /**
     * Switches over various browser keyboard keys and returns
     * the according direction.
     * Returns null if the key is invalid.
     *
     * @param key
     * @returns Direction | null
     */
    public checkDirectionFromKey(key: string | number): Direction | null {
        switch (key) {
            case 'ArrowUp':
            case 'w':
            case 87:
            case 38:
                return this.direction !== Direction.Down ? Direction.Up : Direction.Down;
            case 'ArrowRight':
            case 'd':
            case 68:
            case 39:
                return this.direction !== Direction.Left ? Direction.Right : Direction.Left;
            case 'ArrowLeft':
            case 'a':
            case 65:
            case 37:
                return this.direction !== Direction.Right ? Direction.Left : Direction.Right;
            case 'ArrowDown':
            case 's':
            case 83:
            case 40:
                return this.direction !== Direction.Up ? Direction.Down : Direction.Up;
        }
    }
}
