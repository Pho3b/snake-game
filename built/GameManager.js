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
    static start() {
        GameManager.gameSetup();
        GameManager.mainLoop();
    }
    static mainLoop() {
        if (GameManager.isGameRunning) {
            UtilsComponent.backgroundRefresh();
            TailUnit.updateAllUnits();
            GameManager.snake.update();
            GameManager.food.draw();
            if (!Snake.canPressKey) {
                Snake.canPressKey = true;
            }
            setTimeout(GameManager.mainLoop, 1000 / GameManager.FPS);
        }
    }
    static gameSetup(tailStartingLength = 2) {
        GameManager.isGameRunning = true;
        for (let i = 0; i < tailStartingLength; i++) {
            TailUnit.tailUnits.push(new TailUnit(i));
            GameManager.snake.update();
        }
    }
    static gameOver() {
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
GameManager.canvas = document.getElementById('main-canvas');
GameManager.context = GameManager.canvas.getContext('2d');
GameManager.current_points = 3;
GameManager.isGameRunning = false;
GameManager.records = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
GameManager.displayPointsElement = document.getElementById('points');
GameManager.recordListElements = document.getElementsByClassName('record_list_element');
GameManager.FPS = 6;
GameManager.unitSize = 10;
new GameManager();
