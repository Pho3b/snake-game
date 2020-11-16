import {UtilsComponent} from "./components/UtilsComponent.js";
import {Snake} from './models/Snake.js';
import {TailUnit} from './models/TailUnit.js';
import {Food} from './models/Food.js';

export class GameManager {
    static readonly canvas: HTMLCanvasElement = document.getElementById('main-canvas') as HTMLCanvasElement;
    static readonly context: CanvasRenderingContext2D = GameManager.canvas.getContext('2d');
    static readonly defaultFPS: number = 6;
    static readonly unitSize: number = 10;
    static current_points: number = 3;
    static isGameRunning: boolean = false;
    static records: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    static displayPointsElement = document.getElementById('points');
    static recordListElements = document.getElementsByClassName('record_list_element');
    static snake: Snake;
    static food: Food;
    static FPS: number = GameManager.defaultFPS;


    constructor() {
        GameManager.snake = new Snake(0, 0);
        GameManager.food = new Food();
        document.addEventListener("keydown", GameManager.snake.changeDirection);
        GameManager.start();
    }

    /**
     * Calls the gameSetup method and starts the game main loop.
     *
     * @private
     * @returns void
     */
    private static start(): void {
        GameManager.gameSetup();
        GameManager.mainLoop();
    }

    /**
     * Performs all the task that needs to be done
     * before starting the game mainLoop.
     *
     * @param tailStartingLength
     * @private
     * @returns void
     */
    private static gameSetup(tailStartingLength: number = 2): void {
        GameManager.isGameRunning = true;

        for (let i = 0; i < tailStartingLength; i++) {
            TailUnit.tailUnits.push(new TailUnit(i));
            GameManager.snake.update();
        }
    }

    /**
     * Game main loop.
     *
     * @returns void
     */
    static mainLoop(): void {
        if (GameManager.isGameRunning) {
            UtilsComponent.backgroundRefresh();

            TailUnit.updateAllUnits();
            GameManager.food.draw();
            GameManager.snake.update();

            if (!Snake.canPressKey) {
                Snake.canPressKey = true
            }

            setTimeout(GameManager.mainLoop, 1000 / GameManager.FPS);
        }
    }

    /**
     * Updates the various component to reset themselves.
     * Also resets the points and texts.
     *
     * @returns void
     */
    public static gameOver(): void {
        GameManager.isGameRunning = false;
        UtilsComponent.backgroundRefresh();
        GameManager.food.disappear();
        GameManager.snake.die();
        TailUnit.hideTailPieces();
        TailUnit.tailUnits = [];
        UtilsComponent.updateRecordsList(GameManager.current_points);
        UtilsComponent.updatePointsText();
        GameManager.FPS = GameManager.defaultFPS;
        UtilsComponent.showTextMessage("You Lost!");

        setTimeout(function () {
            GameManager.start();
        },1800);
    }
}

new GameManager();
