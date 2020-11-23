import { UtilsComponent } from "./components/UtilsComponent.js";
import { GameState, SoundEffect } from "./components/EnumeratorsComponent.js";
import { Snake } from './models/Snake.js';
import { Food } from './models/Food.js';
import { SoundComponent } from "./components/SoundComponent.js";
import { TailUnit } from './models/TailUnit.js';
export class GameManager {
    constructor() {
        /**
         * Calls the beforeStart method and starts the game main loop.
         * NOTE: This method is bind to the keydown event on the 'Enter' button click,
         * only when the game is in the 'startingScreen' state.
         *
         * @returns void
         */
        this.start = () => {
            this.beforeStart();
            GameManager.mainLoop();
        };
    }
    /**
     * Singleton related method
     *
     * @returns GameManager
     */
    static getInstance() {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager();
        }
        return GameManager.instance;
    }
    /**
     * Initialize all of the games main objects and properties.
     *
     * @returns void
     */
    initializeGame() {
        GameManager.snake = Snake.getInstance();
        GameManager.food = new Food();
        SoundComponent.init();
        this.utilsComponent = new UtilsComponent();
        this.utilsComponent.initEventListeners();
        GameManager.startingScreen();
    }
    /**
     * Performs all the task that needs to be done
     * before starting the game mainLoop.
     *
     * @param tailStartingLength
     * @private
     * @returns void
     */
    beforeStart(tailStartingLength = 2) {
        GameManager.gameState = GameState.Running;
        GameManager.canPressKey = false;
        // Adding by default the first 2 pieces of tail
        for (let i = 0; i < tailStartingLength; i++) {
            GameManager.snake.update();
            let temp = new TailUnit(i);
            TailUnit.tailUnits.push(temp);
            temp.update();
        }
    }
    /**
     *
     * @private
     * @returns void
     */
    static startingScreen() {
        GameManager.gameState = GameState.StartingScreen;
        UtilsComponent.backgroundRefresh();
        UtilsComponent.showTextMessage("Press ENTER to start");
    }
    /**
     * Game main loop.
     *
     * @returns void
     */
    static mainLoop() {
        if (GameManager.gameState === GameState.Running) {
            UtilsComponent.backgroundRefresh();
            TailUnit.updateAllUnits();
            GameManager.food.draw();
            GameManager.snake.update();
            if (!GameManager.canPressKey) {
                GameManager.canPressKey = true;
            }
            setTimeout(GameManager.mainLoop, 1000 / GameManager.FPS);
        }
    }
    /**
     * Updates the various component to reset themselves.
     * Also resets the points and texts.
     *
     * @returns void
     */
    gameOver() {
        GameManager.gameState = GameState.Stopped;
        SoundComponent.playSoundEffect(SoundEffect.GameOverSound);
        UtilsComponent.backgroundRefresh();
        GameManager.food.disappear();
        GameManager.snake.die();
        TailUnit.hideTailPieces();
        TailUnit.tailUnits = [];
        UtilsComponent.updateRecordsList(GameManager.current_points);
        UtilsComponent.updatePointsText();
        GameManager.FPS = GameManager.defaultFPS;
        UtilsComponent.showTextMessage("You Lost!");
        setTimeout(function () {
            GameManager.startingScreen();
        }, 1800);
    }
}
GameManager.canvas = document.getElementById('main-canvas');
GameManager.context = GameManager.canvas.getContext('2d');
GameManager.displayPointsElement = document.getElementById('points');
GameManager.recordListElements = document.getElementsByClassName('record_list_element');
GameManager.defaultFPS = 7;
GameManager.unitSize = 10;
GameManager.canPressKey = true;
GameManager.current_points = 0;
GameManager.gameState = GameState.StartingScreen;
GameManager.records = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
GameManager.FPS = GameManager.defaultFPS;
const gameManager = GameManager.getInstance();
gameManager.initializeGame();
