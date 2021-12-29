class PipeSouth {
    x;
    y;
    width;
    height;

    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;//50
        this.height = 378;//378
    }

    drawPipeSouth() {
        ctx.drawImage(imgSouth, this.x, this.y, this.width, this.height);
    }

    moveLeft() {
            this.x -=2;
        }
}