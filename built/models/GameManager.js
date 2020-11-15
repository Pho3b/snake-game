import { Snake } from "./Snake";
import { Food } from "./Food";
import { UtilsComponent } from "../components/UtilsComponent";
export class GameManager {
    constructor() {
        Main.randomPos = UtilsComponent.populateRandomPos(10);
        Main.snake = new Snake(10, 0, 0);
        Main.food = new Food(10, 0, 0);
        document.addEventListener("keydown", Main.snake.changeDirection);
        setTimeout(Main.mainLoop, 1000 / Main.FPS);
    }
    static mainLoop() {
        if (Main.isGameRunning) {
            UtilsComponent.backgroundRefresh();
            //Tail pieces update
            for (let i = 0; i < Main.tailPieces.length; i++) {
                Main.tailPieces[i].update();
                Main.tailPieces[i].foodCollisionDetection();
            }
            // Starting the game with 3 points as the original game did.
            if (Main.game_starting <= 2) {
                if (Main.game_starting < 2) {
                    Main.food.posX = (Main.snake.posX + Main.snake.increment);
                    Main.food.posY = Main.snake.posY;
                }
                Main.game_starting++;
            }
            Main.food.draw();
            Main.snake.update();
            Main.snake.checkForBorders();
            Main.snake.selfCollisionDetection();
            Main.snake.foodCollisionDetection(Main.food.posX, Main.food.posY);
            Main.can_press_key = true;
            setTimeout(Main.mainLoop, 1000 / Main.FPS);
        }
    }
    static gameSetup() {
    }
}
GameManager.canvas = document.getElementById("snakeCanvas");
GameManager.context = Main.canvas.getContext("2d");
GameManager.current_points = 1;
GameManager.tailUnits = [];
GameManager.isGameRunning = true;
GameManager.game_starting = 0;
GameManager.can_press_key = true;
GameManager.records = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
GameManager.displayPointsElement = document.getElementById('points');
GameManager.recordListElements = document.getElementsByClassName('record_list_element');
GameManager.FPS = 6;
