import { showHighscoreList, addPossHighscore, getHighscoreList } from "./highscore";

const playerText = document.querySelector('#playerText');
const computerText = document.querySelector('#computerText');
const resultText = document.querySelector('#resultText');

const computerPoints = document.querySelector('#computerPoints');
const playerPoints = document.querySelector('#playerPoints');

const playerNameTxt = document.querySelector('#playerNameTxt');
const playerNameBtn = document.querySelector('#playerNameBtn');

const choiceBtns = document.querySelectorAll('.choiceBtn');

const restartBtn = document.querySelector('#restartBtn');
const winnerHeadline = document.querySelector('#winnerHeadline');

const welcomeDiv = document.querySelector('.welcomeDiv');
const gameDiv = document.querySelector('.gameDiv');
const winnerDiv = document.querySelector('.winnerDiv');
const highscoreDiv = document.querySelector('.highscoreDiv');

let playerScore = 0;
let computerScore = 0;

let player;
let computer;
let result;
let playerName = "";

choiceBtns.forEach(button => button.addEventListener('click', () => {
    player = button.textContent;
    computerTurn();
    playerText.textContent = `${playerName}: ${player}`;
    computerText.textContent = `Computer: ${computer}`;
    resultText.textContent = checkWinner();
    playerPoints.textContent = `${playerName} Points: ${playerScore}`;
    computerPoints.textContent = `Computers Points: ${computerScore}`;
    if(isThereAWinner()) {
        setWinnerHeadline();
        isGameDivHidden(true);
        isWinnerDivHidden(false);
    }
}))

playerNameBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const inputName = playerNameTxt.value;
    if(inputName){
        setName(playerNameTxt.value);
        isWelcomeDivHidden(true);
        isGameDivHidden(false);
    }
});

restartBtn.addEventListener('click', ()=>{

    addPossHighscore({ name: playerName, score: playerScore });

    playerScore = 0;
    computerScore = 0;

    player = "";
    computer = "";
    result = "";

    playerName = "";
    playerNameTxt.value = "";
    isWinnerDivHidden(true);
    isWelcomeDivHidden(false);
    setTimeout(function(){ window. location. reload(); }, 200);
})

window.onload = function () {
    showHighscoreList(highscoreDiv);
}

function isGameDivHidden(isHidden) {
    if(isHidden) {
        gameDiv.style.display = 'none'
    }
    else {
        gameDiv.style.display = 'block'
    } 
}

function isWelcomeDivHidden(isHidden) {
    if(isHidden) {
        welcomeDiv.style.display = 'none'
    }
    else {
        welcomeDiv.style.display = 'block'
    }
}

function isWinnerDivHidden(isHidden) {
    if(isHidden) {
        winnerDiv.style.display = 'none'
    }
    else {
        winnerDiv.style.display = 'block'
    }
}

function setName(name){
    playerName = name;
    playerText.innerText = name + ':';
}

function isThereAWinner(){
    return computerScore >= 1;
}

function setWinnerHeadline(){
    if(computerScore >= 1){
        winnerHeadline.innerText = 'The Computer beat you...';
    }
}

// Datorns val
function computerTurn() {
    const randomNumber = Math.floor(Math.random()*3+1);

    switch (randomNumber) {
        case 1:
            computer = 'ROCK';
            break;
        case 2:
            computer = 'PAPER';
            break;
        case 3:
            computer = 'SCISSORS';
            break;
    }
}

// Jämför datorns val med spelarens
function checkWinner(){
    if (player === computer) {
        return "Tie!";
    } else if (player === "ROCK" && computer === "SCISSORS") {
        playerScore++;
        return playerName + " wins this round!";
    } else if (player === "PAPER" && computer === "ROCK") {
        playerScore++;
        return playerName + " wins this round!";
    } else if (player === "SCISSORS" && computer === "PAPER") {
        playerScore++;
        return playerName + " wins this round!";
    } else {
        computerScore++;
        return "The Computer wins this round!";
    }
}