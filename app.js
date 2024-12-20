const buttonColor = ["red", "green", "blue", "yellow"];

let level = 0;
let isStarted = false;

let sequence = [];
let userSequence = [];

document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", function () {
        const userChosenColor = this.id;
        userSequence.push(userChosenColor);
        playSound(userChosenColor);
        userPress(userChosenColor);
        btnPressCheck(userSequence.length - 1);
    })
})

document.addEventListener("keypress", () => {
    if(!isStarted){
        document.body.style.backgroundColor = "#024";
        document.getElementById("title").textContent = "Level " + level;
        nextSequence();
        isStarted = true;
    }
    
})

function btnPressCheck(currentLevel){
    if(sequence[currentLevel] ===  userSequence[currentLevel]){
        if(sequence.length === userSequence.length){
            setTimeout(() => {
                userSequence = [];
                nextSequence();
            }, 1000);
        }
    } else{
        gameOver();
    }
}

function nextSequence(){
    level++;
    document.getElementById("title").textContent = "Level " + level;
    const randNum = Math.floor(Math.random() * 4);
    const randomColor = buttonColor[randNum];
    
    sequence.push(randomColor);

    //Blink
    document.getElementById(randomColor).style.opacity = 0;
    setInterval(() => {
        document.getElementById(randomColor).style.opacity = 1;
    }, 100);

    playSound(randomColor);
}

function playSound(name){
    const audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function userPress(name){
    const button = document.getElementById(name);
    button.classList.add("pressedBtn");
    setTimeout(() => {
        button.classList.remove("pressedBtn");
    }, 100);
}

function gameOver(){
    document.getElementById("title").textContent = "GAME OVER! Press to start";
    document.body.style.backgroundColor = "#880808";
    isStarted = false;
    level = 0;
    userSequence = [];
    sequence = [];
}