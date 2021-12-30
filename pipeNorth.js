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
            if (score < 10) {
                this.x -= 2
            } else {
                this.x -= 2.5
            }
        }
}