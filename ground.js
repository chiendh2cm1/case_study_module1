class Ground {
    x;
    y;
    width;
    height;

    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;//canvas
        this.height = height;//120
    }

    drawGround() {
        ctx.drawImage(imgGround, this.x, this.y, this.width, this.height);
    }
}