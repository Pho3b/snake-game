import {UtilsComponent} from "../components/UtilsComponent.js";
import {GameManager} from "../GameManager.js";
import {TailUnit} from './TailUnit.js';
import {Direction, SoundEffect} from "../components/EnumeratorsComponent.js";
import {SnakeUnit} from "../abstract_classes/SnakeUnit.js";
import {SnakeComponent} from "../components/SnakeComponent.js";
import {SoundComponent} from "../components/SoundComponent.js";

export class Snake extends SnakeUnit {
    static canPressKey: boolean = true;
    private direction: Direction = Direction.Right;
    private soundComponent: SoundComponent;

    constructor(posX: number, posY: number) {
        super();
        this.size = GameManager.unitSize;
        this.posX = posX;
        this.posY = posY;
        this.soundComponent = SoundComponent.getInstance();
    }

    /**
     * Refresh the element position and attributes.
     *
     * @returns void
     */
    public update(): void {
        this.prevPosition.posX = this.posX;
        this.prevPosition.posY = this.posY;
        this.prevPosition.direction = this.direction;

        this.updatePositionFromDirection(this.direction);
        this.draw();
        this.checkForBorders();
        this.selfCollisionDetection();
        this.foodCollisionDetection(GameManager.food.posX, GameManager.food.posY);
    };

    public changeDirection(e) {
        if (Snake.canPressKey) {
            let key: string | number = e.key || e.keyCode;
            Snake.canPressKey = false;

            GameManager.snake.direction = SnakeComponent.checkDirectionFromKey(key);
        }
    };

    die() {
        GameManager.isGameRunning = false;
        this.size = 10;
        this.posX = 0;
        this.posY = 0;
        this.direction = Direction.Right;
        // Updating records list
        UtilsComponent.updateRecordsList(GameManager.current_points);
        // Resetto il punteggio
        UtilsComponent.updatePointsText();
        // Resetto la velocità
        GameManager.FPS = 6;
        // Faccio scomparire temporaneamente il serpente
        GameManager.context.fillStyle = "white";
        GameManager.context.fillRect(this.posX, this.posY, this.size, this.size);
        TailUnit.hideTailPieces();
        TailUnit.tailUnits = [];
        GameManager.food.disappear();
        GameManager.gameOver();
    };

    /**
     * Checks whether the snake is colliding with the map borders or no.
     * In case it is colliding it calls the die method.
     *
     * @return void
     */
    checkForBorders(): void {
        if ((this.posX + (this.size / 2)) > GameManager.canvas.width ||
            (this.posY + (this.size / 2)) > GameManager.canvas.height ||
            (this.posX + (this.size / 2)) < 0 ||
            (this.posY + (this.size / 2)) < 0)
        {
            this.die();
        }
    }

    /**
     * Checks if the snake is colliding with the food piece.
     * If yes, it triggers the food re spawn, updates player points
     * and add a tail piece.
     *
     * @param foodPosX
     * @param foodPosY
     * @return void
     */
    foodCollisionDetection(foodPosX, foodPosY): void {
        if (this.posX === foodPosX && this.posY === foodPosY) {
            UtilsComponent.updatePointsText();
            GameManager.food.randomSpawn();
            TailUnit.tailUnits.push(new TailUnit(TailUnit.tailUnits.length));

            this.soundComponent.playSoundEffect(SoundEffect.EatingSound);
        }
    };

    /**
     * Checks whether the snake is colliding with the map borders or no.
     * In case it is colliding it calls the die method.
     *
     * @returns void
     */
    selfCollisionDetection(): void {
        for (let i = 0; i < TailUnit.tailUnits.length; i++) {
            if (this.posX == TailUnit.tailUnits[i]['posX'] && this.posY == TailUnit.tailUnits[i]['posY']) {
                this.die();
            }
        }
    };
}
