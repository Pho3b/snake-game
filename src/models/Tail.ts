import {Main} from '../Main.js';
import {Direction} from "../HelperComponent.js";
import {IPosition} from "./interfaces/IPosition.js";

export class Tail {
    size: number;
    increment: number;
    tailArrPos: number;
    prevPosition: IPosition = {
        posX: 0,
        posY: 0,
        direction: Direction.Still
    };
    posX: number;
    posY: number;
    direction: Direction;

    constructor(tailArrPos: number) {
        this.tailArrPos = tailArrPos;
        this.size = Main.snake.size;
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
            this.direction = Main.tailPieces[this.tailArrPos - 1].prevPosition['posY'];
        }

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

        Main.context.fillStyle = "black";
        Main.context.fillRect(this.posX, this.posY, this.size, this.size);
        Main.context.strokeStyle = "white";
        Main.context.lineWidth = 0.5;
        Main.context.strokeRect(this.posX, this.posY, this.size, this.size);
    };

    public disappear() {
        Main.context.fillStyle = "white";
        Main.context.fillRect(this.posX, this.posY, this.size, this.size);
    };

    public foodCollisionDetection() {
        if (this.posX === Main.food.posX && this.posY === Main.food.posY) {
            Main.food.randomSpawn();
        }
    };
}
