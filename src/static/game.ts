const colors = ["None", "Red", "Blue", "Green"];

class GameArea {
    public canvas: HTMLCanvasElement; 
    public context: CanvasRenderingContext2D;
    public frameNo: number;
    public interval: NodeJS.Timer;
    private numOfElements: number;
    public pieces: CanvasPiece[] = [];
    
    constructor() {
        this.canvas = document.createElement("canvas");
        this.canvas.id = "game";
        this.canvas.width = 1000;
        this.canvas.height = 600;
        this.canvas.style.border = "1px solid #ACBDBA";
    }

    public start() {
        const parentDiv = document.getElementById("container");
        parentDiv?.appendChild(this.canvas);
        this.context = this.canvas.getContext("2d")!;
        this.numOfElements = randomInt(15);

        for (let index = 0; index < this.numOfElements; index++) {
            this.pieces.push(new CanvasPiece(
                this.context,
                30, 30,
                colors[randomInt(3)],
                randomInt(this.canvas.width - 30), randomInt(this.canvas.height - 30)));
        }

        this.frameNo = 0;
        this.interval = setInterval(() => this.updateGameArea(), 20);
    }

    public stop() {
        clearInterval(this.interval);
    }

    public clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public updateGameArea() {
        this.clear();

        this.context.fillStyle = "#ACBDBA";
        this.context.font = "20px Arial"
        this.context.textAlign='end';
        this.context.textBaseline='top';
        this.context.fillText(
            `${ this.numOfElements - this.pieces.length } / ${ this.numOfElements }`, this.canvas.width - 5, 5);

        for (let piece of this.pieces) {
            piece.newPosition();
            piece.update();
        }
    }
}

function randomInt(bound: number): number {
    const num = Math.ceil(Math.random() * bound);

    if (num == 0) return 1;
    return num;
}

function randomFloat(bound: number) {
    return Math.random() * bound;
}

class CanvasPiece {
    speed_x: number;
    speed_y: number;
    max_speed: number;

    constructor(
        public context: CanvasRenderingContext2D,
        public width: number, 
        public height: number, 
        public color: string, 
        public x: number, 
        public y: number) {
            this.max_speed= randomInt(3)
            this.speed_x = this.max_speed;
            this.speed_y = this.max_speed;
        }
    
    public update() {
        this.context.save();
        this.context.translate(this.x, this.y);
        this.context.fillStyle = this.color;
        this.context.fillRect(this.width / -2, this.height / -2, this.width, this.height);
        this.context.restore();
    }
    
    public newPosition() {
        if (this.x - this.width / 2 < 0)
            this.speed_x = this.max_speed;
        else if ((this.x + this.width / 2) >= this.context.canvas.width) {
            this.changeMaxSpeed();
            this.speed_x = -this.max_speed;
        }

        if (this.y - this.height / 2 < 0)
            this.speed_y = -this.max_speed;
        else if ((this.y + this.height / 2) >= this.context.canvas.height) {
            this.changeMaxSpeed();
            this.speed_y = this.max_speed;
        }
        
        this.x += this.speed_x;
        this.y -= this.speed_y;
    }

    public changeMaxSpeed() {
        const decision = randomInt(2);
        if (decision == 1)
            this.max_speed += randomFloat(0.4);
        else
            this.max_speed        
    }
}


function startGame() {
    const gameArea: GameArea = new GameArea();
    gameArea.start();   
    gameArea.canvas.addEventListener("click", 
        function(event: MouseEvent) {
            handleClick(event, gameArea);
        }
    )
}

function handleClick(event: MouseEvent, area: GameArea) {
    const x = event.pageX - area.canvas.offsetLeft;
    const y = event.pageY - area.canvas.offsetTop;

    area.pieces.forEach((element) => {
        if (y >= element.y - element.height / 2
            && y <= element.y + element.height / 2
            && x >= element.x - element.width / 2
            && x <= element.x + element.width / 2) 
        {
            area.pieces.splice(area.pieces.indexOf(element), 1)
        }
    });
}