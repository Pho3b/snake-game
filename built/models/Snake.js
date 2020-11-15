import { UtilsComponent } from "../components/UtilsComponent.js";
import { GameManager } from "../GameManager.js";
import { Tail } from './Tail.js';
import { Direction, SoundEffect } from "../components/EnumeratorsComponent.js";
import { SnakePart } from "../abstract_classes/SnakePart.js";
import { SnakeComponent } from "../components/SnakeComponent.js";
import { SoundComponent } from "../components/SoundComponent.js";
export class Snake extends SnakePart {
    constructor(size, posX, posY) {
        super();
        this.direction = Direction.Right;
        this.haveTail = false;
        this.tailPosition = 0;
        this.size = size;
        this.posX = posX;
        this.posY = posY;
        this.soundComponent = SoundComponent.getInstance();
    }
    changeDirection(e) {
        if (GameManager.game_starting > 2 && GameManager.can_press_key === true) {
            GameManager.can_press_key = false;
            let key = e.key || e.keyCode;
            GameManager.snake.direction = SnakeComponent.checkDirectionFromKey(key);
        }
    }
    ;
    update() {
        this.prevPosition.posX = this.posX;
        this.prevPosition.posY = this.posY;
        this.prevPosition.direction = this.direction;
        this.updatePositionFromDirection(this.direction);
        this.draw();
    }
    ;
    die() {
        GameManager.isGameRunning = false;
        this.size = 10;
        this.posX = 0;
        this.posY = 0;
        this.direction = Direction.Right;
        this.haveTail = false;
        this.tailPosition = 0;
        // Updating records list
        UtilsComponent.updateRecordsList(GameManager.current_points);
        // Resetto il punteggio
        UtilsComponent.updatePointsText();
        // Resetto la velocità
        GameManager.FPS = 5;
        // Reset della variabile che serve a far partire il gioco a 3 punti
        GameManager.game_starting = 0;
        // Faccio scomparire temporaneamente il serpente
        GameManager.context.fillStyle = "white";
        GameManager.context.fillRect(this.posX, this.posY, this.size, this.size);
        UtilsComponent.hideTailPieces();
        GameManager.tailPieces = [];
        GameManager.food.disappear();
        UtilsComponent.gameOver();
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
    foodCollisionDetection(foodPosX, foodPosY) {
        if (this.posX === foodPosX && this.posY === foodPosY) {
            UtilsComponent.updatePointsText();
            GameManager.food.randomSpawn();
            if (this.haveTail === false) {
                GameManager.tailPieces.push(new Tail(this.tailPosition));
                this.haveTail = true;
            }
            else {
                GameManager.tailPieces.push(new Tail(this.tailPosition));
            }
            this.tailPosition++;
            if (GameManager.game_starting > 2) {
                this.soundComponent.playSoundEffect(SoundEffect.EatingSound);
            }
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
        for (let i = 0; i < GameManager.tailPieces.length; i++) {
            if (this.posX == GameManager.tailPieces[i]['posX'] && this.posY == GameManager.tailPieces[i]['posY']) {
                this.die();
            }
        }
    }
    ;
}
