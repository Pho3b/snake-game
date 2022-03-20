import {UtilsComponent} from "./components/UtilsComponent.js";
import {GameState, SoundEffect} from "./components/EnumeratorsComponent.js";
import {Snake} from './models/Snake.js';
import {Food} from './models/Food.js';
import {SoundComponent} from "./components/SoundComponent.js";
import {TailUnit} from './models/TailUnit.js';

export class GameManager {
    static readonly canvas: HTMLCanvasElement = document.getElementById('main-canvas') as HTMLCanvasElement;
    static readonly context: CanvasRenderingContext2D = GameManager.canvas.getContext('2d');
    static readonly displayPointsElement = document.getElementById('points');
    static readonly recordListElements = document.getElementsByClassName('record_list_element');
    static readonly defaultFPS: number = 7;
    static readonly unitSize: number = 15;
    static canPressKey: boolean = true;
    static current_points: number = 0;
    static gameState: GameState = GameState.StartingScreen;
    static records: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    public static snake: Snake;
    public static food: Food;
    static FPS: number = GameManager.defaultFPS;
    private static instance: GameManager;
    private utilsComponent: UtilsComponent;


    /**
     * Singleton related method
     *
     * @returns GameManager
     */
    public static getInstance(): GameManager {
        console.log('getting the instance');

        if(!GameManager.instance) {
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
    private beforeStart(tailStartingLength: number = 2): void {
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
     * Calls the beforeStart method and starts the game main loop.
     * NOTE: This method is bind to the keydown event on the 'Enter' button click,
     * only when the game is in the 'startingScreen' state.
     *
     * @returns void
     */
    public start = (): void =>  {
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

            if (!GameManager.canPressKey) {
                GameManager.canPressKey = true
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
    public gameOver(): void {
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
        UtilsComponent.showTextMessage('You Lost!');

        setTimeout(function () {
            GameManager.startingScreen();
        },1800);
    }
}

const gameManager = GameManager.getInstance();
gameManager.initializeGame();
