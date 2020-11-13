class Food_ {
    width: number;
    height: number;
    posX: number;
    posY: number;


    constructor(width: number, height: number, posX: number, posY: number) {
        this.width = width;
        this.height = height;
        this.posX = posX;
        this.posY = posY;
    }

    /**
     * Spawn the food piece in a random position on the grid
     */
    randomSpawn() {
        this.posX = randomPos[Math.floor((Math.random() * randomPos.length))];
        this.posY = randomPos[Math.floor((Math.random() * randomPos.length))];
        this.draw();
    };

    /**
     * Actually draws the green food piece on the grid
     */
    draw() {
        context.fillStyle = "green";
        context.fillRect(this.posX, this.posY, this.width, this.height);
    };

    /**
     * Change the food position in case the snake is colliding with it
     */
    collisionDetection() {
        if (this.posX === snake.posX && this.posY === snake.posY) {
            this.randomSpawn();
        }
    };

    /**
     * Makes the food piece disappear
     */
    disappear() {
        context.fillStyle = "white";
        context.fillRect(this.posX, this.posY, this.width, this.height);
    }
}
