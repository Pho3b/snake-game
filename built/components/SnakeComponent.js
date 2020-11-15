import { Direction } from "./UtilsComponent.js";
import { Main } from "../Main.js";
export class SnakeComponent {
    /**
     * Switches over various browser keyboard keys and returns
     * the according direction.
     * Returns null if the key is invalid.
     *
     * @param key
     * @returns Direction | null
     */
    static checkDirectionFromKey(key) {
        switch (key) {
            case 'ArrowUp':
            case 'w':
            case 87:
            case 38:
                return Main.snake.direction !== Direction.Down ? Direction.Up : Direction.Down;
            case 'ArrowRight':
            case 'd':
            case 68:
            case 39:
                return Main.snake.direction !== Direction.Left ? Direction.Right : Direction.Left;
            case 'ArrowLeft':
            case 'a':
            case 65:
            case 37:
                return Main.snake.direction !== Direction.Right ? Direction.Left : Direction.Right;
            case 'ArrowDown':
            case 's':
            case 83:
            case 40:
                return Main.snake.direction !== Direction.Up ? Direction.Down : Direction.Up;
        }
    }
}
