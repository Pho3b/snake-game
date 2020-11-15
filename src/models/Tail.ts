import {Main} from '../Main.js';
import {Direction} from "../components/UtilsComponent.js";
import {SnakePart} from "../abstract_classes/SnakePart.js";

export class Tail extends SnakePart {
    tailArrPos: number;


    constructor(tailArrPos: number) {
        super();
        this.tailArrPos = tailArrPos;
        this.size = Main.snake.size;
        this.increment = Main.snake.increment;
    }

    public draw() {
        this.prevPosition.posX = this.posX;
        this.prevPosition.posY = this.posY;

        if (this.tailArrPos === 0) {
            this.posX = Main.snake.prevPosition['posX'];
            this.posY = Main.snake.prevPosition['posY'];

            // Makes the first tail piece to correctly follow the snakes head direction
            this.updatePositionFromDirection(Main.snake.prevPosition['direction']);
        } else {
            this.posX = Main.tailPieces[this.tailArrPos - 1].prevPosition['posX'];
            this.posY = Main.tailPieces[this.tailArrPos - 1].prevPosition['posY'];
        }

        this.drawRect();
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
