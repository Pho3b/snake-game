import { GameManager } from "../GameManager.js";
export class UtilsComponent {
    static backgroundRefresh() {
        GameManager.context.fillStyle = "#FFFFFF";
        GameManager.context.fillRect(0, 0, GameManager.canvas.width, GameManager.canvas.height);
    }
    static updatePointsText() {
        if (GameManager.isGameRunning) {
            GameManager.current_points++;
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
}
