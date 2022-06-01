export var SoundEffect;
(function (SoundEffect) {
    SoundEffect[SoundEffect["EatingSound"] = 0] = "EatingSound";
    SoundEffect[SoundEffect["GameOverSound"] = 1] = "GameOverSound";
    SoundEffect[SoundEffect["VictorySound"] = 2] = "VictorySound";
    SoundEffect[SoundEffect["RecordPassedSound"] = 3] = "RecordPassedSound";
})(SoundEffect || (SoundEffect = {}));
export var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
    Direction[Direction["Null"] = 4] = "Null";
})(Direction || (Direction = {}));
export var GameState;
(function (GameState) {
    GameState[GameState["StartingScreen"] = 0] = "StartingScreen";
    GameState[GameState["Running"] = 1] = "Running";
    GameState[GameState["Stopped"] = 2] = "Stopped";
})(GameState || (GameState = {}));
