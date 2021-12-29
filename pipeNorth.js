class PipeNorth {
    x;
    y;
    width;
    height;

    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    drawPipeNorth() {
        ctx.drawImage(imgNorth, this.x, this.y, this.width, this.height);
    }

    moveLeft() {
            this.x -= 2;
        }
}