import { Main } from '../Main.js';
export var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
    Direction[Direction["Still"] = 4] = "Still";
})(Direction || (Direction = {}));
export class HelperComponent {
    constructor() {
    }
    /**
     * Singleton related method to retrieve a single
     * instance of the HelperComponent.
     *
     * TODO: use it instead of using all of the static methods
     */
    getInstance() {
        if (HelperComponent.instance !== null) {
            return new HelperComponent();
        }
        else {
            return HelperComponent.instance;
        }
    }
    /**
     * Plays the eating sound
     */
    static playEatingSound() {
        HelperComponent.eatingSound.load();
        let playPromise = HelperComponent.eatingSound.play();
        if (playPromise !== undefined) {
            playPromise.then(function () {
                HelperComponent.eatingSound.volume = 0.2;
            }).catch(function (error) {
                console.log('Error while playing sound : ' + error);
            });
        }
    }
    static backgroundRefresh() {
        Main.context.fillStyle = "#FFFFFF";
        Main.context.fillRect(0, 0, Main.canvas.width, Main.canvas.height);
    }
    static populateRandomPos(position_increment) {
        let single = 0;
        let randomPos = [];
        while (single <= (Main.canvas.width - position_increment)) {
            randomPos.push(single);
            single += position_increment;
        }
        return randomPos;
    }
    static updatePointsText() {
        if (Main.isGameRunning) {
            Main.current_points++;
            if (Main.current_points < 3)
                Main.displayPointsElement.innerHTML = "0";
            else
                Main.displayPointsElement.innerHTML = Main.current_points.toString();
        }
        else {
            Main.current_points = 1;
            Main.displayPointsElement.innerHTML = "0";
        }
        Main.FPS += 0.2;
    }
    static updateRecordsList(entry) {
        for (let i = 0; i < Main.records.length; i++) {
            if (entry === Main.records[i]) {
                break;
            }
            else if (entry > Main.records[i]) {
                Main.records[i] = entry;
                Main.recordListElements[i].innerHTML = Main.records[i].toString();
                break;
            }
        }
    }
    static hideTailPieces() {
        for (let i = 0; i < Main.tailPieces.length; i++) {
            Main.tailPieces[i].disappear();
        }
    }
    static gameOver() {
        Main.context.font = "30px Comic Sans MS";
        Main.context.strokeStyle = "black";
        Main.context.textAlign = "center";
        Main.context.strokeText("You Lost!", Main.canvas.width / 2, Main.canvas.height / 2);
        //Restart the game after 2 seconds
        setTimeout(function () {
            Main.isGameRunning = true;
            Main.mainLoop();
        }, 1800);
    }
}
HelperComponent.eatingSound = new Audio("sounds/eat.mp3");
HelperComponent.instance = null;
