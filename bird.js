class Bird {
    x;
    y;
    width;
    height;
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;//50
        this.height = height;//35
    }

    drawBird() {
        ctx.drawImage(imgBird, this.x, this.y, this.width, this.height);

    }

    moveUp() {
        this.y -= 40;
    }

    moveDown() {
            this.y += 2;
        }
}