let gameSeq = [];
let playerSeq = [];
let colorCollection = ["red", "yellow", "purple", "blue"];
let level = 1;
let h3 = document.querySelector("h3");
let inikey = false;
let btns = document.querySelectorAll(".boxes");

let randColorBox;
let randIdx;
let randColorName;

document.addEventListener("keypress", function () {
    if (inikey == false) {

        h3.innerText = `Level ${level}`;
        inikey = true;
        generateRandColor();

    }
});

function levelUpgrader() {
    level++;
    h3.innerText = `Level ${level}`;
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function flash() {
    for (let i = 0; i < level; i++) {
        randColorBox = document.querySelector(`#${gameSeq[i]}`);


        randColorBox.classList.add("flashColor");


        await wait(300);


        randColorBox.classList.remove("flashColor");


        await wait(200);
    }
}

function generateRandColor() {
    randIdx = Math.floor(Math.random() * 4);
    randColorName = colorCollection[randIdx];
    gameSeq.push(randColorName);

    flash();

}

addPlayerSeq();

function addPlayerSeq() {
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function (event) {

            playerSeq.push(event.target.id);
            console.log(event.target.id);
            check();
        });
    }

}

async function gameOver() {
    for(let i=0;i<3;i++){
        document.body.style.backgroundColor = "red";
        await wait(200);
        document.body.style.backgroundColor = "white";
        await wait(200);

    }

}

function check() {

     for (let i = 0; i < playerSeq.length; i++) {
        if (playerSeq[i] !== gameSeq[i]) {
            h3.innerText = "Game Over! Press any key to restart.";
            gameOver();
            resetGame();
            return;
        }
    }

    if (playerSeq.length === gameSeq.length) {
        playerSeq = [];
        levelUpgrader();
        generateRandColor();
    }

}

function resetGame() {
    gameSeq = [];
    playerSeq = [];
    level = 1;
    inikey = false;
}