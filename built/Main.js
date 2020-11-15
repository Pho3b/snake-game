import { UtilsComponent } from "./components/UtilsComponent.js";
import { Snake } from './models/Snake.js';
import { Food } from './models/Food.js';
export class Main {
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
                Main.tailPieces[i].draw();
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
            Main.snake.draw();
            Main.snake.checkForBorders();
            Main.snake.selfCollisionDetection();
            Main.snake.foodCollisionDetection(Main.food.posX, Main.food.posY);
            Main.can_press_key = true;
            setTimeout(Main.mainLoop, 1000 / Main.FPS);
        }
    }
}
Main.canvas = document.getElementById("snakeCanvas");
Main.context = Main.canvas.getContext("2d");
Main.current_points = 1;
Main.tailPieces = [];
Main.isGameRunning = true;
Main.game_starting = 0;
Main.can_press_key = true;
Main.records = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
Main.displayPointsElement = document.getElementById('points');
Main.recordListElements = document.getElementsByClassName('record_list_element');
Main.FPS = 6;
new Main();
