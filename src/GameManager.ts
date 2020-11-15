import {UtilsComponent} from "./components/UtilsComponent.js";
import {Snake} from './models/Snake.js';
import {TailUnit} from './models/TailUnit.js';
import {Food} from './models/Food.js';

export class GameManager {
    static readonly canvas: HTMLCanvasElement = document.getElementById('main-canvas') as HTMLCanvasElement;
    static readonly context: CanvasRenderingContext2D = GameManager.canvas.getContext('2d');
    static current_points: number = 3;
    static isGameRunning: boolean = false;
    static records: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    static displayPointsElement = document.getElementById('points');
    static recordListElements = document.getElementsByClassName('record_list_element');
    static snake: Snake;
    static food: Food;
    static FPS: number = 6;
    static readonly unitSize: number = 10;


    constructor() {
        GameManager.snake = new Snake(0, 0);
        GameManager.food = new Food();
        document.addEventListener("keydown", GameManager.snake.changeDirection);
        GameManager.start();
    }

    private static start(): void {
        GameManager.gameSetup();
        GameManager.mainLoop();
    }

    static mainLoop() {
        if (GameManager.isGameRunning) {
            UtilsComponent.backgroundRefresh();

            TailUnit.updateAllUnits();
            GameManager.food.draw();
            GameManager.snake.update();

            setTimeout(GameManager.mainLoop, 1000 / GameManager.FPS);
        }
    }

    private static gameSetup(tailStartingLength: number = 2): void {
        GameManager.isGameRunning = true;

        for (let i = 0; i < tailStartingLength; i++) {
            TailUnit.tailUnits.push(new TailUnit(i));
            GameManager.snake.update();
        }
    }

    public static gameOver() {
        GameManager.context.font = "30px Consolas";
        GameManager.context.strokeStyle = "black";
        GameManager.context.textAlign = "center";
        GameManager.context.strokeText("You Lost!", GameManager.canvas.width / 2, GameManager.canvas.height / 2);
        //Restart the game after 2 seconds
        setTimeout(function () {
            GameManager.start();
        }, 1800);
    }
}

new GameManager();
