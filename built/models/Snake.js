import { UtilsComponent } from "../components/UtilsComponent.js";
import { GameManager } from "../GameManager.js";
import { TailUnit } from './TailUnit.js';
import { Direction, SoundEffect } from "../components/EnumeratorsComponent.js";
import { SnakeUnit } from "../abstract_classes/SnakeUnit.js";
import { SnakeComponent } from "../components/SnakeComponent.js";
import { SoundComponent } from "../components/SoundComponent.js";
export class Snake extends SnakeUnit {
    constructor(posX, posY) {
        super();
        this.direction = Direction.Right;
        this.size = GameManager.unitSize;
        this.posX = posX;
        this.posY = posY;
    }
    /**
     * Refresh the element position and attributes.
     *
     * @returns void
     */
    update() {
        this.prevPosition.posX = this.posX;
        this.prevPosition.posY = this.posY;
        this.prevPosition.direction = this.direction;
        this.updatePositionFromDirection(this.direction);
        this.draw();
        this.checkForBorders();
        this.selfCollisionDetection();
        this.foodCollisionDetection(GameManager.food.posX, GameManager.food.posY);
    }
    ;
    changeDirection(e) {
        if (Snake.canPressKey) {
            let key = e.key || e.keyCode;
            Snake.canPressKey = false;
            GameManager.snake.direction = SnakeComponent.checkDirectionFromKey(key);
        }
    }
    ;
    /**
     * Resets the Snake properties to the default state.
     *
     * @returns void
     */
    die() {
        this.size = 10;
        this.posX = 0;
        this.posY = 0;
        this.direction = Direction.Right;
    }
    ;
    /**
     * Checks whether the snake is colliding with the map borders or no.
     * In case it is colliding it calls the die method.
     *
     * @return void
     */
    checkForBorders() {
        if ((this.posX + (this.size / 2)) > GameManager.canvas.width ||
            (this.posY + (this.size / 2)) > GameManager.canvas.height ||
            (this.posX + (this.size / 2)) < 0 ||
            (this.posY + (this.size / 2)) < 0) {
            GameManager.gameOver();
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
    foodCollisionDetection(foodPosX, foodPosY) {
        if (this.posX === foodPosX && this.posY === foodPosY) {
            UtilsComponent.updatePointsText();
            GameManager.food.randomSpawn();
            TailUnit.tailUnits.push(new TailUnit(TailUnit.tailUnits.length));
            SoundComponent.playSoundEffect(SoundEffect.EatingSound);
        }
    }
    ;
    /**
     * Checks whether the snake is colliding with the map borders or no.
     * In case it is colliding it calls the die method.
     *
     * @returns void
     */
    selfCollisionDetection() {
        for (let i = 0; i < TailUnit.tailUnits.length; i++) {
            if (this.posX == TailUnit.tailUnits[i]['posX'] && this.posY == TailUnit.tailUnits[i]['posY']) {
                GameManager.gameOver();
            }
        }
    }
    ;
}
Snake.canPressKey = true;
