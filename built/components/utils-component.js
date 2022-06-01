import { GameManager } from "../game-manager.js";
import { GameState } from "../helper/enum.js";
import { Snake } from "../models/snake.js";
import { Constant } from "../helper/constant.js";
export class UtilsComponent {
    /**
     * @constructor
     */
    constructor() {
        /**
         * Initializes all the document event listeners.
         *
         * @returns void
         */
        this.initEventListeners = () => {
            document.addEventListener('keydown', (e) => {
                if (GameManager.gameState === GameState.StartingScreen && e.key === 'Enter') {
                    this.gameManager.start();
                }
                else {
                    this.snake.changeDirection(e);
                }
            });
        };
        this.gameManager = GameManager.getInstance();
        this.snake = Snake.getInstance();
    }
    /**
     * Colors the canvas background of the game
     * default background color.
     *
     * @returns void
     */
    static backgroundRefresh() {
        Constant.context.fillStyle = "#FFFFFF";
        Constant.context.fillRect(0, 0, Constant.canvas.width, Constant.canvas.height);
    }
    /**
     * Updates the html list of records.
     * TODO: move the record and points system in a different component.
     *
     * @param entry
     * @returns void
     */
    static updateRecordsList(entry) {
        for (let i = 0; i < GameManager.records.length; i++) {
            if (entry === GameManager.records[i]) {
                break;
            }
            else if (entry > GameManager.records[i]) {
                GameManager.records[i] = entry;
                Constant.recordListElements[i].children[0].innerHTML = GameManager.records[i].toString();
                break;
            }
        }
    }
    /**
     * TODO: Same as above
     *
     * @returns void
     */
    static updatePointsText() {
        if (GameManager.gameState === GameState.Running) {
            GameManager.current_points++;
            Constant.displayPointsElement.innerHTML = GameManager.current_points.toString();
        }
        else {
            GameManager.current_points = 0;
            Constant.displayPointsElement.innerHTML = "0";
        }
        GameManager.FPS += 0.2;
    }
    /**
     * Makes the passed message appear in the middle of the canvas.
     *
     * @param msg
     * @param color
     * @param font
     * @param textAlign
     * @returns void
     */
    static showTextMessage(msg, color = 'black', font = '14px pixel', textAlign = 'center') {
        Constant.context.font = font;
        Constant.context.lineWidth = 1;
        Constant.context.fillStyle = "black";
        Constant.context.strokeStyle = color;
        Constant.context.textAlign = textAlign;
        Constant.context.fillText(msg, Constant.canvas.width / 2, Constant.canvas.height / 2);
    }
}
