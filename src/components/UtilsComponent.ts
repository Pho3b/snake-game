import {GameManager} from "../GameManager.js";

export class UtilsComponent {

    public static backgroundRefresh(): void {
        GameManager.context.fillStyle = "#FFFFFF";
        GameManager.context.fillRect(0, 0, GameManager.canvas.width, GameManager.canvas.height);
    }

    static updatePointsText() {
        if (GameManager.isGameRunning) {
            GameManager.current_points++;
            if (GameManager.current_points < 3)
                GameManager.displayPointsElement.innerHTML = "0";
            else
                GameManager.displayPointsElement.innerHTML = GameManager.current_points.toString();
        }
        else {
            GameManager.current_points = 1;
            GameManager.displayPointsElement.innerHTML = "0";
        }
        GameManager.FPS += 0.2;
    }

    static updateRecordsList(entry) {
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

    static hideTailPieces() {
        for (let i = 0; i < GameManager.tailPieces.length; i++) {
            GameManager.tailPieces[i].disappear();
        }
    }

    static gameOver() {
        GameManager.context.font = "30px Comic Sans MS";
        GameManager.context.strokeStyle = "black";
        GameManager.context.textAlign = "center";
        GameManager.context.strokeText("You Lost!", GameManager.canvas.width / 2, GameManager.canvas.height / 2);
        //Restart the game after 2 seconds
        setTimeout(function () {
            GameManager.isGameRunning = true;
            GameManager.mainLoop();
        }, 1800);
    }
}
