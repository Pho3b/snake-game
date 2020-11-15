import {IPosition} from "../interfaces/IPosition.js";
import {Direction} from "../components/UtilsComponent.js";
import {Main} from "../Main";

export abstract class SnakePart {
    size: number;
    increment: number = 10;
    posX: number;
    posY: number;
    prevPosition: IPosition = {
        posX: 0,
        posY: 0,
        direction: Direction.Null
    };

    protected drawRect(): void {
        Main.context.fillStyle = "black";
        Main.context.fillRect(this.posX, this.posY, this.size, this.size);
        Main.context.strokeStyle = "white";
        Main.context.lineWidth = 0.5;
        Main.context.strokeRect(this.posX, this.posY, this.size, this.size);
    }

    public draw() {};
    public disappear() {};
}
