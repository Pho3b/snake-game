import {UtilsComponent} from "../components/UtilsComponent.js";
import {Main} from '../Main.js';
import {Tail} from './Tail.js';
import {Direction, SoundEffect} from "../components/EnumeratorsComponent.js";
import {SnakePart} from "../abstract_classes/SnakePart.js";
import {SnakeComponent} from "../components/SnakeComponent.js";
import {SoundComponent} from "../components/SoundComponent.js";

export class Snake extends SnakePart {
    direction: Direction = Direction.Right;
    haveTail: boolean = false;
    tailPosition: number = 0;
    soundComponent: SoundComponent;


    constructor(size: number, posX: number, posY: number) {
        super();
        this.size = size;
        this.posX = posX;
        this.posY = posY;
        this.soundComponent = SoundComponent.getInstance();
    }

    public changeDirection(e) {
        if (Main.game_starting > 2 && Main.can_press_key === true) {
            Main.can_press_key = false;
            let key: string | number = e.key || e.keyCode;

            Main.snake.direction = SnakeComponent.checkDirectionFromKey(key);
        }
    };

    public draw() {
        this.prevPosition.posX = this.posX;
        this.prevPosition.posY = this.posY;
        this.prevPosition.direction = this.direction;

        this.updatePositionFromDirection(this.direction);
        this.drawRect();
    };

    die() {
        Main.isGameRunning = false;
        this.size = 10;
        this.posX = 0;
        this.posY = 0;
        this.direction = Direction.Right;
        this.haveTail = false;
        this.tailPosition = 0;
        // Updating records list
        UtilsComponent.updateRecordsList(Main.current_points);
        // Resetto il punteggio
        UtilsComponent.updatePointsText();
        // Resetto la velocità
        Main.FPS = 5;
        // Reset della variabile che serve a far partire il gioco a 3 punti
        Main.game_starting = 0;
        // Faccio scomparire temporaneamente il serpente
        Main.context.fillStyle = "white";
        Main.context.fillRect(this.posX, this.posY, this.size, this.size);
        UtilsComponent.hideTailPieces();
        Main.tailPieces = [];
        Main.food.disappear();
        UtilsComponent.gameOver();
    };

    /**
     * Checks whether the snake is colliding with the map borders or no.
     * In case it is colliding it calls the die method.
     *
     * @return void
     */
    checkForBorders(): void {
        if ((this.posX + (this.size / 2)) > Main.canvas.width ||
            (this.posY + (this.size / 2)) > Main.canvas.height ||
            (this.posX + (this.size / 2)) < 0 ||
            (this.posY + (this.size / 2)) < 0)
        {
            this.die();
        }
    }

    /**
     * Checks if the snake is colliding with the food piece.
     * If yes, it triggers the food re spawn, updates player points
     * and add a tail piece.
     *
     * @param foodPosX
     * @param foodPosY
     * @return void
     */
    foodCollisionDetection(foodPosX, foodPosY): void {
        if (this.posX === foodPosX && this.posY === foodPosY) {
            UtilsComponent.updatePointsText();
            Main.food.randomSpawn();

            if (this.haveTail === false) {
                Main.tailPieces.push(new Tail(this.tailPosition));
                this.haveTail = true;
            } else {
                Main.tailPieces.push(new Tail(this.tailPosition));
            }

            this.tailPosition++;

            if (Main.game_starting > 2) {
                this.soundComponent.playSoundEffect(SoundEffect.EatingSound);
            }
        }
    };

    /**
     * Checks whether the snake is colliding with the map borders or no.
     * In case it is colliding it calls the die method.
     *
     * @returns void
     */
    selfCollisionDetection(): void {
        for (let i = 0; i < Main.tailPieces.length; i++) {
            if (this.posX == Main.tailPieces[i]['posX'] && this.posY == Main.tailPieces[i]['posY']) {
                this.die();
            }
        }
    };
}
