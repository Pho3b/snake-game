export class Constant {
    // HTML references
    static readonly canvas: HTMLCanvasElement = document.getElementById('main-canvas') as HTMLCanvasElement;
    static readonly context: CanvasRenderingContext2D = Constant.canvas.getContext('2d');
    static readonly displayPointsElement = document.getElementById('points');
    static readonly recordListElements = document.getElementsByClassName('record_list_element');

    // Generic constants
    static readonly defaultFPS: number = 7;
    static readonly unitSize: number = 15;
}