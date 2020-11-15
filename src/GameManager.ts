import {UtilsComponent} from "./components/UtilsComponent.js";
import {Snake} from './models/Snake.js';
import {TailUnit} from './models/TailUnit.js';
import {Food} from './models/Food.js';

export class GameManager {
    static canvas: HTMLCanvasElement = document.getElementById('main-canvas') as HTMLCanvasElement;
    static context: CanvasRenderingContext2D = GameManager.canvas.getContext('2d');
    static current_points: number = 1;
    static tailPieces: TailUnit[] = [];
    static isGameRunning: boolean = true;
    static game_starting: number = 0;
    static can_press_key: boolean = true;
    static records: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    static displayPointsElement = document.getElementById('points');
    static recordListElements = document.getElementsByClassName('record_list_element');
    static snake: Snake;
    static food: Food;
    static FPS: number = 6;
    static readonly unitSize: number = 10;


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

    private static gameSetup() {

    }
}

new GameManager();
