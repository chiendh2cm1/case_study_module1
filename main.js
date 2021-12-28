let score = 0;
let maxScore = 0;
let gap = 120;
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let bird = new Bird(40, canvas.clientHeight / 2)
let ground = new Ground(0, canvas.clientHeight - 120, canvas.clientWidth, 120)
let pipeNorths = [new PipeNorth(canvas.clientWidth, -300)];
let pipeSouths = [new PipeSouth(canvas.clientWidth, pipeNorths[0].y + pipeNorths[0].height + gap)];
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
    return Math.floor(Math.random() * (max - min) + min); //radom từ min đến max.
}

function drawPipes(i) {
    pipeNorths[i].drawPipeNorth();
    pipeSouths[i].drawPipeSouth();
    ground.drawGround();
    pipeNorths[i].moveLeft();
    pipeSouths[i].moveLeft();
    if (pipeNorths[i].x === canvas.clientWidth/2) {
        let Y = radom(-300, -138) // ống trên dài 378 tối đa để âm -300 đến -138.
        pipeNorths.push(new PipeNorth(canvas.clientWidth + 50, Y));
        pipeSouths.push(new PipeSouth(canvas.clientWidth + 50, Y + 380 + gap));
    }
}


function start() {
    cleanCanvas()
    bird.drawBird();
    bird.moveDown();
    window.addEventListener("keydown", move_up)
    window.addEventListener("keydown", musique)
    for (i = 0; i < pipeNorths.length; i++) {
        drawPipes(i);
        if (checkCollition(i) === 0) {
            return;
        }
        if (pipeNorths[i].x === bird.x - 40) {
            score = score + 1;
            scor.play();
        }
        if (pipeNorths[i].x === 0) {
            pipeNorths.splice(0, 1);
            pipeSouths.splice(0, 1);
        }
    }
    hightScore();
    ctx.fillStyle = "black";
    ctx.font = " 20px Comic Sans MS";
    ctx.fillText("Score : " + score, 20, canvas.clientHeight - 50);
    ctx.fillText("Hight : " + maxScore, 300, canvas.clientHeight - 50);
    requestAnimationFrame(start);
}

function checkCollition(i) {
    if (
        bird.y <= 0 || bird.y + bird.height - 2 >= ground.y ||
        (
            bird.x + bird.width - 2 >= pipeNorths[i].x &&
            bird.x <= pipeNorths[i].x + pipeNorths[i].width - 3)
        &&

        (
            bird.y + 2 <= pipeNorths[i].y + pipeNorths[i].height ||
            bird.y + bird.height - 2 >= pipeSouths[i].y
        )
    ) {
        stopGame();
        window.removeEventListener("keydown", move_up);
        return 0;
    }
}

function stopGame() {
    over.play()
    document.getElementById("display").style.display = "block";
    document.getElementById("musique").pause();
}

function move_up() {
    bird.moveUp();
    fly.play();
}

function startGame() {
    start();
    document.getElementById('startGame').style.display = "none";
}

function restartGame() {
    score = 0;
    bird = new Bird(40, canvas.clientHeight / 2)
    pipeNorths = [new PipeNorth(canvas.clientWidth, -300)];
    pipeSouths = [new PipeSouth(canvas.clientWidth, pipeNorths[0].y + pipeNorths[0].height + gap)];
    document.getElementById("display").style.display = "none";
    start();
}

function hightScore() {
    if (score > maxScore) {
        maxScore = score;
    }
}