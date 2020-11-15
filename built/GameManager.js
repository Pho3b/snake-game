import { UtilsComponent } from "./components/UtilsComponent.js";
import { Snake } from './models/Snake.js';
import { Food } from './models/Food.js';
export class GameManager {
    constructor() {
        GameManager.snake = new Snake(0, 0);
        GameManager.food = new Food(0, 0);
        document.addEventListener("keydown", GameManager.snake.changeDirection);
        setTimeout(GameManager.mainLoop, 1000 / GameManager.FPS);
    }
    static mainLoop() {
        if (GameManager.isGameRunning) {
            UtilsComponent.backgroundRefresh();
            //Tail pieces update
            for (let i = 0; i < GameManager.tailPieces.length; i++) {
                GameManager.tailPieces[i].update();
                GameManager.tailPieces[i].foodCollisionDetection();
            }
            // Starting the game with 3 points as the original game did.
            if (GameManager.game_starting <= 2) {
                if (GameManager.game_starting < 2) {
                    GameManager.food.posX = (GameManager.snake.posX + GameManager.unitSize);
                    GameManager.food.posY = GameManager.snake.posY;
                }
                GameManager.game_starting++;
            }
            GameManager.food.draw();
            GameManager.snake.update();
            GameManager.snake.checkForBorders();
            GameManager.snake.selfCollisionDetection();
            GameManager.snake.foodCollisionDetection(GameManager.food.posX, GameManager.food.posY);
            GameManager.can_press_key = true;
            setTimeout(GameManager.mainLoop, 1000 / GameManager.FPS);
        }
    }
    static gameSetup() {
    }
}
GameManager.canvas = document.getElementById('main-canvas');
GameManager.context = GameManager.canvas.getContext('2d');
GameManager.current_points = 1;
GameManager.tailPieces = [];
GameManager.isGameRunning = true;
GameManager.game_starting = 0;
GameManager.can_press_key = true;
GameManager.records = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
GameManager.displayPointsElement = document.getElementById('points');
GameManager.recordListElements = document.getElementsByClassName('record_list_element');
GameManager.FPS = 6;
GameManager.unitSize = 10;
new GameManager();
