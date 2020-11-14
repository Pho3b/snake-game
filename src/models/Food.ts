import {Main} from '../Main.js';

export class Food {
    size: number;
    posX: number;
    posY: number;


    constructor(size: number, posX: number, posY: number) {
        this.size = size;
        this.posX = posX;
        this.posY = posY;
    }

    /**
     * Spawns the food piece in a random position on the grid
     */
    public randomSpawn(): void {
        this.posX = Main.randomPos[Math.floor((Math.random() * Main.randomPos.length))];
        this.posY = Main.randomPos[Math.floor((Math.random() * Main.randomPos.length))];
        this.draw();
    };

    /**
     * Draws the green food piece on the map.
     */
    public draw(): void {
        Main.context.fillStyle = "green";
        Main.context.fillRect(this.posX, this.posY, this.size, this.size);
    };

    /**
     * Makes the food piece disappear
     */
    public disappear(): void {
        Main.context.fillStyle = "white";
        Main.context.fillRect(this.posX, this.posY, this.size, this.size);
    }
}
