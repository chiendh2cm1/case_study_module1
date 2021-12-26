class Bird {
    x;
    y;
    width;
    height;

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 38;
        this.height = 26;
    }

    drawBird() {
        ctx.drawImage(document.getElementById("bird"), this.x, this.y, this.width, this.height);

    }

    moveUp() {
        this.y -= 50;
        fly.play();
    }

    moveDown() {
            this.y += 2;
        }
}