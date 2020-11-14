import {Main} from '../Main.js';

export class Tail {
    width: number;
    height: number;
    increment: number;
    tailArrPos: number;
    prevPosition = {
        posX: 0,
        posY: 0,
        direction: 'null'
    };
    posX: number;
    posY: number;
    direction: string;

    constructor(tailArrPos: number) {
        this.tailArrPos = tailArrPos;
        this.width = Main.snake.width;
        this.height = Main.snake.height;
        this.increment = Main.snake.increment;
    }

    public draw() {
        this.prevPosition.posX = this.posX;
        this.prevPosition.posY = this.posY;
        this.prevPosition.direction = this.direction;
        if (this.tailArrPos === 0) {
            this.posX = Main.snake.prevPosition['posX'];
            this.posY = Main.snake.prevPosition['posY'];
            this.direction = Main.snake.prevPosition['direction'];
        } else {
            this.posX = Main.tailPieces[this.tailArrPos - 1].prevPosition['posX'];
            this.posY = Main.tailPieces[this.tailArrPos - 1].prevPosition['posY'];
            this.direction = Main.tailPieces[this.tailArrPos - 1].prevPosition['direction'];
        }
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
        // Drawing the rect
        Main.context.fillStyle = "black";
        Main.context.fillRect(this.posX, this.posY, this.width, this.height);
        Main.context.strokeStyle = "white";
        Main.context.lineWidth = 0.5;
        Main.context.strokeRect(this.posX, this.posY, this.width, this.height);
    };

    public disappear() {
        Main.context.fillStyle = "white";
        Main.context.fillRect(this.posX, this.posY, this.width, this.height);
    };

    public foodCollisionDetection() {
        if (this.posX === Main.food.posX && this.posY === Main.food.posY) {
            console.log('collision food');
            Main.food.randomSpawn();
        }
    };
}
