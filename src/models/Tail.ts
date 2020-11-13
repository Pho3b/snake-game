class Tail_ {
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
        this.width = snake.width;
        this.height = snake.height;
        this.increment = snake.increment;
    }

    private draw() {
        this.prevPosition.posX = this.posX;
        this.prevPosition.posY = this.posY;
        this.prevPosition.direction = this.direction;
        if (this.tailArrPos === 0) {
            this.posX = snake.prevPosition['posX'];
            this.posY = snake.prevPosition['posY'];
            this.direction = snake.prevPosition['direction'];
        } else {
            this.posX = tailPieces[this.tailArrPos - 1].prevPosition['posX'];
            this.posY = tailPieces[this.tailArrPos - 1].prevPosition['posY'];
            this.direction = tailPieces[this.tailArrPos - 1].prevPosition['posY'];
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
        context.fillStyle = "black";
        context.fillRect(this.posX, this.posY, this.width, this.height);
        context.strokeStyle = "white";
        context.lineWidth = 0.5;
        context.strokeRect(this.posX, this.posY, this.width, this.height);
    };

    private disappear() {
        context.fillStyle = "white";
        context.fillRect(this.posX, this.posY, this.width, this.height);
    };

    private foodCollisionDetection() {
        if (this.posX === food.posX && this.posY === food.posY) {
            console.log('collision food');
            food.randomSpawn();
        }
    };
}
