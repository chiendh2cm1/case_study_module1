let imgBird = document.getElementById("bird");
let imgGround = document.getElementById("ground");
let imgpipeNorth = document.getElementById("pipeNorth");
let imgpipeSouth = document.getElementById("pipeSouth");
let score = 0;
let maxScore = 0;
let gap = 120;
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let bird = new Bird(40, canvas.clientHeight / 2, 50, 35);
let ground = new Ground(0, canvas.clientHeight - 120, canvas.clientWidth, 120);
let pipeNorths = [new PipeNorth(canvas.clientWidth, -120, 50, 242)];
let pipeSouths = [new PipeSouth(canvas.clientWidth, pipeNorths[0].y + pipeNorths[0].height + gap, 50, 378)];
let fly = new Audio();
let scor = new Audio();
let over = new Audio();
over.src = "sounds/Nhac-chuong-game-over-www_tiengdong_com.mp3"
fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

function musique() {
    document.getElementById("musique").play();
    window.removeEventListener("keydown", musique);
}

function cleanCanvas() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
}


function radom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function move_up() {
    bird.moveUp();
    fly.play();
}

function drawPipes(i) {
    pipeNorths[i].drawPipeNorth();
    pipeSouths[i].drawPipeSouth();
    pipeNorths[i].moveLeft();
    pipeSouths[i].moveLeft();
    if (pipeNorths[i].x === canvas.clientWidth / 2) {
        let pipeY = radom(-250, -150)
        pipeNorths.push(new PipeNorth(canvas.clientWidth + 50, pipeY, 50, 378));
        pipeSouths.push(new PipeSouth(canvas.clientWidth + 50, pipeY + 378 + gap, 50, 378));
    }
    ground.drawGround();
}

function start() {
    cleanCanvas();
    bird.drawBird();
    bird.moveDown();
    window.addEventListener("keydown", move_up)
    window.addEventListener("keydown", musique)
    for (i = 0; i < pipeNorths.length; i++) {
        drawPipes(i);
        if (checkCollition(i) === false) {
            return;
        }
        if (pipeNorths[i].x === bird.x - 50) {
            score = score + 1;
            scor.play();
        }
        if (pipeNorths[i].width === 0) {
            pipeNorths.splice(0, 1);
            pipeSouths.splice(0, 1);
        }
    }
    hightScore();
    ctx.fillStyle = "black";
    ctx.font = " 20px Comic Sans MS";
    ctx.fillText("Score : " + score, 20, canvas.clientHeight - 50);
    ctx.fillText("High : " + localStorage.getItem("hight"), 300, canvas.clientHeight - 50);
    requestAnimationFrame(start);
}

function checkCollition(i) {
    if (
        bird.y <= 0 ||
        bird.y + bird.height - 4 >= ground.y ||
        (bird.x + bird.width - 4 >= pipeNorths[i].x && bird.x <= pipeNorths[i].x + pipeNorths[i].width - 4 && bird.y + 4 <= pipeNorths[i].y + pipeNorths[i].height) ||
        (bird.x + bird.width - 4 >= pipeSouths[i].x && bird.x <= pipeSouths[i].x + pipeSouths[i].width - 4 && bird.y + bird.height - 4 >= pipeSouths[i].y)
    ) {
        over.play();
        document.getElementById("scoreLate").innerText = maxScore;
        document.getElementById("display").style.display = "block";
        document.getElementById("musique").pause();
        window.removeEventListener("keydown", move_up);
        return false;
    }
}

function startGame() {
    start();
    document.getElementById('startGame').style.display = "none";
}

function restartGame() {
    score = 0;
    bird = new Bird(40, canvas.clientHeight / 2, 50, 35)
    pipeNorths = [new PipeNorth(canvas.clientWidth, -120, 50, 242)];
    pipeSouths = [new PipeSouth(canvas.clientWidth, pipeNorths[0].y + pipeNorths[0].height + gap, 50, 378)];
    document.getElementById("display").style.display = "none";
    localStorage.setItem("hight", maxScore);//(tạo bộ nhớ nhỏ trên web); lưu lại maxScore khi load trang.
    start();

}

function hightScore() {
    if (score > maxScore) {
        maxScore = score;
    }
}
