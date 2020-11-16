import { UtilsComponent } from "./components/UtilsComponent.js";
import { Snake } from './models/Snake.js';
import { TailUnit } from './models/TailUnit.js';
import { Food } from './models/Food.js';
export class GameManager {
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
    static start() {
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
    static gameSetup(tailStartingLength = 2) {
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
    static mainLoop() {
        if (GameManager.isGameRunning) {
            UtilsComponent.backgroundRefresh();
            TailUnit.updateAllUnits();
            GameManager.food.draw();
            GameManager.snake.update();
            if (!Snake.canPressKey) {
                Snake.canPressKey = true;
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
    static gameOver() {
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
        }, 1800);
    }
}
GameManager.canvas = document.getElementById('main-canvas');
GameManager.context = GameManager.canvas.getContext('2d');
GameManager.defaultFPS = 6;
GameManager.unitSize = 10;
GameManager.current_points = 3;
GameManager.isGameRunning = false;
GameManager.records = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
GameManager.displayPointsElement = document.getElementById('points');
GameManager.recordListElements = document.getElementsByClassName('record_list_element');
GameManager.FPS = GameManager.defaultFPS;
new GameManager();
