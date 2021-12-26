class Ground {
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

    drawGround() {
        ctx.drawImage(document.getElementById("ground"), this.x, this.y, this.width, this.height);
    }
}