import { HelperComponent } from '../HelperComponent.js';
import { Main } from '../Main.js';
import { Tail } from './Tail.js';
export class Snake {
    constructor(width, height, posX, posY) {
        this.direction = 'right';
        this.increment = 10;
        this.prevPosition = {
            posX: 0,
            posY: 0,
            direction: 'null'
        };
        this.haveTail = false;
        this.tailPosition = 0;
        this.width = width;
        this.height = height;
        this.posX = posX;
        this.posY = posY;
    }
    changeDirection(e) {
        if (Main.game_starting > 2 && Main.can_press_key === true) {
            Main.can_press_key = false;
            let currentKeyCode = e.keyCode;
            switch (currentKeyCode) {
                case 87:
                    if (Main.snake.direction !== 'down') {
                        Main.snake.direction = 'up';
                    }
                    break;
                case 38:
                    if (Main.snake.direction !== 'down') {
                        Main.snake.direction = 'up';
                    }
                    break;
                case 68:
                    if (Main.snake.direction !== 'left') {
                        Main.snake.direction = 'right';
                    }
                    break;
                case 39:
                    if (Main.snake.direction !== 'left') {
                        Main.snake.direction = 'right';
                    }
                    break;
                case 65:
                    if (Main.snake.direction !== 'right') {
                        Main.snake.direction = 'left';
                    }
                    break;
                case 37:
                    if (Main.snake.direction !== 'right') {
                        Main.snake.direction = 'left';
                    }
                    break;
                case 83:
                    if (Main.snake.direction !== 'up') {
                        Main.snake.direction = 'down';
                    }
                    break;
                case 40:
                    if (Main.snake.direction !== 'up') {
                        Main.snake.direction = 'down';
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
            case 'left':
                this.posX -= this.increment;
                break;
            case 'right':
                this.posX += this.increment;
                break;
            case 'up':
                this.posY -= this.increment;
                break;
            case 'down':
                this.posY += this.increment;
                break;
        }
        //Drawing the rect
        Main.context.fillStyle = "black";
        Main.context.fillRect(this.posX, this.posY, this.width, this.height);
        Main.context.strokeStyle = "white";
        Main.context.lineWidth = 0.5;
        Main.context.strokeRect(this.posX, this.posY, this.width, this.height);
    }
    ;
    die() {
        Main.isGameRunning = false;
        this.width = 10;
        this.height = 10;
        this.posX = 0;
        this.posY = 0;
        this.direction = 'right';
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
        Main.context.fillRect(this.posX, this.posY, this.width, this.height);
        HelperComponent.hideTailPieces();
        Main.tailPieces = [];
        Main.food.disappear();
        HelperComponent.gameOver();
    }
    ;
    checkForBorders() {
        if ((this.posX + (this.width / 2)) > Main.canvas.width || (this.posY + (this.height / 2)) > Main.canvas.height ||
            (this.posX + (this.width / 2)) < 0 || (this.posY + (this.height / 2)) < 0) {
            this.die();
        }
    }
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
                HelperComponent.playSound("sounds/eat.mp3");
            }
        }
    }
    ;
    selfCollisionDetection() {
        //Check for collision with his tail pieces
        for (var i = 0; i < Main.tailPieces.length; i++) {
            if (this.posX == Main.tailPieces[i]['posX'] && this.posY == Main.tailPieces[i]['posY']) {
                this.die();
            }
        }
    }
    ;
}
