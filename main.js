let scoreShow = document.getElementById("score");
let score = 0;
let gap = 120;
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let bird = new Bird(40, canvas.clientHeight / 2)
let ground = new Ground(0, canvas.clientHeight - 120, canvas.clientWidth, 120)
let pipeNorths = [new PipeNorth(canvas.clientWidth, -300)];
let pipeSouths = [new PipeSouth(canvas.clientWidth, pipeNorths[0].y + pipeNorths[0].height + gap)];

function radom(min, max) {
    return Math.floor(Math.random() * (max - min) + min); //radom từ min đến max.
}

function drawPipes(i) {
    pipeNorths[i].drawPipeNorth();
    pipeSouths[i].drawPipeSouth();
    ground.drawGround();
    pipeNorths[i].moveLeft();
    pipeSouths[i].moveLeft();
    if (pipeNorths[i].x === canvas.clientWidth / 2) {
        let Y = radom(-300, -138) // ống trên dài 378 tối đa để âm -300 đến -138.
        pipeNorths.push(new PipeNorth(canvas.clientWidth + 50, Y));
        pipeSouths.push(new PipeSouth(canvas.clientWidth + 50, Y + 380 + gap));
    }
}

function checkCollition(i) {
    if (bird.y <= 0 || bird.y + bird.height >= ground.y ||
        bird.x + bird.width >= pipeNorths[i].x && bird.x <= pipeNorths[i].x + pipeNorths[i].width && bird.y <= pipeNorths[i].y + pipeNorths[i].height ||
        bird.x + bird.width >= pipeSouths[i].x && bird.x <= pipeSouths[i].x + pipeSouths[i].width && bird.y + bird.height >= pipeSouths[i].y) {
        window.removeEventListener('keydown', move_up);
        return false;
    }
}


function start() {
    cleanCanvas()
    bird.drawBird();
    bird.moveDown();
    document.addEventListener("keydown", move_up)
    for (i = 0; i < pipeNorths.length; i++) {
        drawPipes(i);
        if (checkCollition(i) === false) {
            return;
        }
        if (pipeNorths[i].x === bird.x - 40) {
            score = score + 1 ;
            scor.play();
            scoreShow.innerText = " score " + score;
        }
        if (pipeNorths[i].x ===0) {
            pipeNorths.splice(0,1);
            pipeSouths.splice(0,1);
        }
    }
    requestAnimationFrame(start)
}


function move_up() {
    bird.moveUp()
}

function startGame() {
    start();
    document.getElementById('startGame').style.display = "none";
}

function cleanCanvas() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
}

let fly = new Audio();
let scor = new Audio();
fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";