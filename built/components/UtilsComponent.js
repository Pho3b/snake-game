import { GameManager } from "../GameManager.js";
import { GameState } from "./EnumeratorsComponent.js";
import { Snake } from "../models/Snake.js";
export class UtilsComponent {
    /**
     * @constructor
     */
    constructor() {
        /**
         * Initialize all of the document event listeners.
         * @returns void
         */
        this.initEventListeners = () => {
            document.addEventListener("keydown", this.snake.changeDirection);
            document.addEventListener("keydown", (e) => {
                if (GameManager.gameState === GameState.StartingScreen) {
                    let key = e.key || e.keyCode;
                    if (key === 'Enter' || key === 13) {
                        this.gameManager.start();
                    }
                }
            });
        };
        this.gameManager = GameManager.getInstance();
        this.snake = Snake.getInstance();
    }
    /**
     * Colors the canvas background of the game
     * default background color.
     * @returns void
     */
    static backgroundRefresh() {
        GameManager.context.fillStyle = "#FFFFFF";
        GameManager.context.fillRect(0, 0, GameManager.canvas.width, GameManager.canvas.height);
    }
    /**
     * Updates the html list of records.
     * TODO: move the record and points system in a different component.
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
                GameManager.recordListElements[i].children[0].innerHTML = GameManager.records[i].toString();
                break;
            }
        }
    }
    /**
     * TODO: Same as above
     * @returns void
     */
    static updatePointsText() {
        if (GameManager.gameState === GameState.Running) {
            GameManager.current_points++;
            GameManager.displayPointsElement.innerHTML = GameManager.current_points.toString();
        }
        else {
            GameManager.current_points = 1;
            GameManager.displayPointsElement.innerHTML = "0";
        }
        GameManager.FPS += 0.2;
    }
    /**
     * Makes the passed message appear in the middle of the canvas.
     * @param msg
     * @param color
     * @param font
     * @param textAlign
     * @returns void
     */
    static showTextMessage(msg, color = 'black', font = '12px pixel', textAlign = 'center') {
        GameManager.context.font = font;
        GameManager.context.lineWidth = 1;
        GameManager.context.fillStyle = "black";
        GameManager.context.strokeStyle = color;
        GameManager.context.textAlign = textAlign;
        GameManager.context.fillText(msg, GameManager.canvas.width / 2, GameManager.canvas.height / 2);
    }
}
