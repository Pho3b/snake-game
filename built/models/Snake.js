import { HelperComponent } from '../HelperComponent.js';
import { Main } from '../Main.js';
import { Tail } from './Tail.js';
import { Direction } from "../HelperComponent.js";
export class Snake {
    constructor(size, posX, posY) {
        this.direction = Direction.Right;
        this.increment = 10;
        this.prevPosition = {
            posX: 0,
            posY: 0,
            direction: Direction.Still
        };
        this.haveTail = false;
        this.tailPosition = 0;
        this.size = size;
        this.posX = posX;
        this.posY = posY;
    }
    changeDirection(e) {
        if (Main.game_starting > 2 && Main.can_press_key === true) {
            Main.can_press_key = false;
            let currentKeyCode = e.keyCode;
            switch (currentKeyCode) {
                case 87:
                    if (Main.snake.direction !== Direction.Right) {
                        Main.snake.direction = Direction.Up;
                    }
                    break;
                case 38:
                    if (Main.snake.direction !== Direction.Down) {
                        Main.snake.direction = Direction.Up;
                    }
                    break;
                case 68:
                    if (Main.snake.direction !== Direction.Left) {
                        Main.snake.direction = Direction.Right;
                    }
                    break;
                case 39:
                    if (Main.snake.direction !== Direction.Left) {
                        Main.snake.direction = Direction.Right;
                    }
                    break;
                case 65:
                    if (Main.snake.direction !== Direction.Right) {
                        Main.snake.direction = Direction.Left;
                    }
                    break;
                case 37:
                    if (Main.snake.direction !== Direction.Right) {
                        Main.snake.direction = Direction.Left;
                    }
                    break;
                case 83:
                    if (Main.snake.direction !== Direction.Up) {
                        Main.snake.direction = Direction.Down;
                    }
                    break;
                case 40:
                    if (Main.snake.direction !== Direction.Up) {
                        Main.snake.direction = Direction.Down;
                    }
                    break;
            }
        }
    }
    ;
    draw() {
        this.prevPosition.posX = this.posX;
        this.prevPosition.posY = this.posY;
        this.prevPosition.direction = this.direction;
        switch (this.direction) {
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
        //Drawing the rect
        Main.context.fillStyle = "black";
        Main.context.fillRect(this.posX, this.posY, this.size, this.size);
        Main.context.strokeStyle = "white";
        Main.context.lineWidth = 0.5;
        Main.context.strokeRect(this.posX, this.posY, this.size, this.size);
    }
    ;
    die() {
        Main.isGameRunning = false;
        this.size = 10;
        this.posX = 0;
        this.posY = 0;
        this.direction = Direction.Right;
        this.haveTail = false;
        this.tailPosition = 0;
        // Updating records list
        HelperComponent.updateRecordsList(Main.current_points);
        // Resetto il punteggio
        HelperComponent.updatePointsText();
        // Resetto la velocità
        Main.FPS = 5;
        // Reset della variabile che serve a far partire il gioco a 3 punti
        Main.game_starting = 0;
        // Faccio scomparire temporaneamente il serpente
        Main.context.fillStyle = "white";
        Main.context.fillRect(this.posX, this.posY, this.size, this.size);
        HelperComponent.hideTailPieces();
        Main.tailPieces = [];
        Main.food.disappear();
        HelperComponent.gameOver();
    }
    ;
    /**
     * Checks whether the snake is colliding with the map borders or no.
     * @return void
     */
    checkForBorders() {
        if ((this.posX + (this.size / 2)) > Main.canvas.width ||
            (this.posY + (this.size / 2)) > Main.canvas.height ||
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
            HelperComponent.updatePointsText();
            Main.food.randomSpawn();
            if (this.haveTail === false) {
                Main.tailPieces.push(new Tail(this.tailPosition));
                this.haveTail = true;
            }
            else {
                Main.tailPieces.push(new Tail(this.tailPosition));
            }
            this.tailPosition++;
            if (Main.game_starting > 2) {
                HelperComponent.playEatingSound();
            }
        }
    }
    ;
    selfCollisionDetection() {
        for (let i = 0; i < Main.tailPieces.length; i++) {
            if (this.posX == Main.tailPieces[i]['posX'] && this.posY == Main.tailPieces[i]['posY']) {
                this.die();
            }
        }
    }
    ;
}
