import {UtilsComponent} from "./components/utils-component.js";
import {GameState, SoundEffect} from "./helper/enum.js";
import {Snake} from './models/snake.js';
import {Food} from './models/food.js';
import {SoundComponent} from "./components/sound-component.js";
import {TailUnit} from './models/tail-unit.js';
import {Constant} from "./helper/constant.js";

export class GameManager {
    static current_points: number = 0;
    static gameState: GameState = GameState.StartingScreen;
    static records: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    public static snake: Snake;
    public static food: Food;
    static FPS: number = Constant.defaultFPS;
    private static instance: GameManager;
    private utils: UtilsComponent;


    /**
     * Singleton related method
     *
     * @returns GameManager
     */
    public static getInstance(): GameManager {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager();
        }

        return GameManager.instance;
    }

    /**
     * Initialize all the games main objects and properties.
     *
     * @returns void
     */
    public initializeGame(): void {
        GameManager.snake = Snake.getInstance();
        GameManager.food = new Food();
        this.utils = new UtilsComponent();
        SoundComponent.init();
        this.utils.initEventListeners();
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
    private beforeStart(tailStartingLength: number = 2): void {
        GameManager.gameState = GameState.Running;

        // Adding the first 2 pieces of tail by default
        for (let i = 0; i < tailStartingLength; i++) {
            GameManager.snake.update();
            let temp = new TailUnit(i);
            TailUnit.tailUnits.push(temp);
            temp.update();
        }
    }

    /**
     * Calls the beforeStart method and starts the game main loop.
     * NOTE: This method is bind to the keydown event on the 'Enter' button click,
     * only when the game is in the 'startingScreen' state.
     *
     * @returns void
     */
    public start = (): void => {
        this.beforeStart();
        GameManager.mainLoop();
    }

    /**
     * @private
     * @returns void
     */
    private static startingScreen(): void {
        GameManager.gameState = GameState.StartingScreen;
        UtilsComponent.backgroundRefresh();
        UtilsComponent.showTextMessage('Press ENTER to start');
    }

    /**
     * Game main loop.
     *
     * @returns void
     */
    public static mainLoop(): void {
        if (GameManager.gameState === GameState.Running) {
            UtilsComponent.backgroundRefresh();

            TailUnit.updateAllUnits();
            GameManager.food.draw();
            GameManager.snake.update();

            setTimeout(GameManager.mainLoop, 1000 / GameManager.FPS);
        }
    }

    /**
     * Updates the various component to reset themselves.
     * Also resets the points and texts.
     *
     * @returns void
     */
    public gameOver(): void {
        GameManager.gameState = GameState.Stopped;
        SoundComponent.playSoundEffect(SoundEffect.GameOverSound);
        UtilsComponent.backgroundRefresh();
        GameManager.food.disappear();
        GameManager.snake.die();
        TailUnit.hideTailPieces();
        TailUnit.tailUnits = [];
        // UtilsComponent.updateRecordsList(GameManager.current_points);
        UtilsComponent.updatePointsText();
        GameManager.FPS = Constant.defaultFPS;
        UtilsComponent.showTextMessage('You Lost!');

        setTimeout(function () {
            GameManager.startingScreen();
        }, 1800);
    }
}

const gameManager = GameManager.getInstance();
gameManager.initializeGame();
