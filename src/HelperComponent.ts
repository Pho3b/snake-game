import {Main} from './Main.js';

export enum Direction {
    Up,
    Down,
    Left,
    Right,
    Still
}

export class HelperComponent {
    static eatingSound: HTMLAudioElement = new Audio("sounds/eat.mp3");
    static instance = null;


    private constructor() {
    }

    /**
     * Singleton related method to retrieve a single
     * instance of the HelperComponent.
     *
     * TODO: use it instead of using all of the static methods
     */
    public getInstance(): HelperComponent {
        if (HelperComponent.instance !== null) {
            return new HelperComponent();
        } else {
            return HelperComponent.instance;
        }
    }

    /**
     * Plays the eating sound
     */
    static playEatingSound(): void {
        let playPromise: Promise<HTMLAudioElement> = HelperComponent.eatingSound.play().then();

        if (playPromise !== undefined) {
            playPromise.then(function() {
                HelperComponent.eatingSound.volume = 0.2;
            }).catch(function(error) {
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
