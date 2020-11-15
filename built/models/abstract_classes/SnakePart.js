import { Direction } from "../components/HelperComponent.js";
export class SnakePart {
    constructor() {
        this.increment = 10;
        this.prevPosition = {
            posX: 0,
            posY: 0,
            direction: Direction.Still
        };
    }
    draw() { }
    ;
    disappear() { }
    ;
}
