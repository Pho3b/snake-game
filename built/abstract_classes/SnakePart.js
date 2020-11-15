import { Direction } from "../components/UtilsComponent.js";
import { Main } from "../Main";
export class SnakePart {
    constructor() {
        this.increment = 10;
        this.prevPosition = {
            posX: 0,
            posY: 0,
            direction: Direction.Null
        };
    }
    drawRect() {
        Main.context.fillStyle = "black";
        Main.context.fillRect(this.posX, this.posY, this.size, this.size);
        Main.context.strokeStyle = "white";
        Main.context.lineWidth = 0.5;
        Main.context.strokeRect(this.posX, this.posY, this.size, this.size);
    }
    draw() { }
    ;
    disappear() { }
    ;
}
