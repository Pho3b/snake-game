export class HelperComponent {
    static playSound(sound_src) {
        var snd = new Audio(sound_src);
        snd.play();
        snd.volume = 0.2;
    }
    static colorBackground() {
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
        for (var i = 0; i < Main.tailPieces.length; i++) {
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
