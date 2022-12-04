/// <reference types="node" />
declare const colors: string[];
declare class GameArea {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    frameNo: number;
    interval: NodeJS.Timer;
    private numOfElements;
    pieces: CanvasPiece[];
    constructor();
    start(): void;
    stop(): void;
    clear(): void;
    updateGameArea(): void;
}
declare function randomInt(bound: number): number;
declare class CanvasPiece {
    context: CanvasRenderingContext2D;
    width: number;
    height: number;
    color: string;
    x: number;
    y: number;
    speed_x: number;
    speed_y: number;
    speed: number;
    constructor(context: CanvasRenderingContext2D, width: number, height: number, color: string, x: number, y: number);
    update(): void;
    newPosition(): void;
}
declare function startGame(): void;
declare function handleClick(event: MouseEvent, area: GameArea): void;
