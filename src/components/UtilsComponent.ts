import {GameManager} from "../GameManager.js";

export class UtilsComponent {

    /**
     * Colors the canvas background of the game
     * default background color.
     *
     * @returns void
     */
    public static backgroundRefresh(): void {
        GameManager.context.fillStyle = "#FFFFFF";
        GameManager.context.fillRect(0, 0, GameManager.canvas.width, GameManager.canvas.height);
    }

    /**
     * Updates the html list of records.
     * TODO: move the record and points system in a different component.
     *
     * @param entry
     * @returns void
     */
    static updateRecordsList(entry): void {
        for (let i = 0; i < GameManager.records.length; i++) {
            if (entry === GameManager.records[i]) {
                break;
            }
            else if (entry > GameManager.records[i]) {
                GameManager.records[i] = entry;
                GameManager.recordListElements[i].innerHTML = GameManager.records[i].toString();
                break;
            }
        }
    }

    /**
     * TODO: Same as above
     *
     * @returns void
     */
    static updatePointsText(): void {
        if (GameManager.isGameRunning) {
            GameManager.current_points++;
            GameManager.displayPointsElement.innerHTML = GameManager.current_points.toString();
        } else {
            GameManager.current_points = 1;
            GameManager.displayPointsElement.innerHTML = "0";
        }

        GameManager.FPS += 0.2;
    }

    /**
     * Makes the passed message appear in the middle of the canvas.
     *
     * @param msg
     * @param color
     * @param textAlign
     * @returns void
     */
    static showTextMessage(msg: string, color: string = 'black', textAlign: CanvasTextAlign = 'center'): void {
        GameManager.context.font = '25px Consolas';
        GameManager.context.strokeStyle = color;
        GameManager.context.textAlign = textAlign;
        GameManager.context.strokeText(msg, GameManager.canvas.width / 2, GameManager.canvas.height / 2);
    }

    static initEventListeners(): void {
        document.addEventListener("keydown", GameManager.snake.changeDirection);
    }
}
