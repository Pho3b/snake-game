import { Main } from '../Main.js';
export class Food {
    constructor(size, posX, posY) {
        this.size = size;
        this.posX = posX;
        this.posY = posY;
    }
    /**
     * Spawns the food piece in a random position on the grid
     *
     * @returns void
     */
    randomSpawn() {
        this.posX = Main.randomPos[Math.floor((Math.random() * Main.randomPos.length))];
        this.posY = Main.randomPos[Math.floor((Math.random() * Main.randomPos.length))];
        this.draw();
    }
    ;
    /**
     * Draws the green food piece on the map.
     *
     * @returns void
     */
    draw() {
        Main.context.fillStyle = "green";
        Main.context.fillRect(this.posX, this.posY, this.size, this.size);
    }
    ;
    /**
     * Makes the food piece disappear
     *
     * @returns void
     */
    disappear() {
        Main.context.fillStyle = "white";
        Main.context.fillRect(this.posX, this.posY, this.size, this.size);
    }
}
