import {Direction} from "./EnumeratorsComponent.js";
import {GameManager} from "../GameManager.js";

export class SnakeComponent {

    /**
     * Switches over various browser keyboard keys and returns
     * the according direction.
     * Returns null if the key is invalid.
     *
     * @param key
     * @returns Direction | null
     */
    public static checkDirectionFromKey(key: string | number): Direction | null {
        switch (key) {
            case 'ArrowUp':
            case 'w':
            case 87:
            case 38:
                return GameManager.snake.direction !== Direction.Down ? Direction.Up : Direction.Down;
            case 'ArrowRight':
            case 'd':
            case 68:
            case 39:
                return GameManager.snake.direction !== Direction.Left ? Direction.Right : Direction.Left;
            case 'ArrowLeft':
            case 'a':
            case 65:
            case 37:
                return GameManager.snake.direction !== Direction.Right ? Direction.Left : Direction.Right;
            case 'ArrowDown':
            case 's':
            case 83:
            case 40:
                return GameManager.snake.direction !== Direction.Up ? Direction.Down : Direction.Up;
        }
    }
}
