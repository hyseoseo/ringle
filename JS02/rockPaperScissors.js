const COUNT = 5;
let player = "";
let computer = "";
let playerWin = 0;
let computerWin = 0;
let start = 3;
const rpsArray = ["rock", "paper", "scissors"];

const resultBoard = document.getElementById("resultBoard");
const resultPara = document.getElementById("resultPara");
const startButton = document.getElementById("start-button");
const showCountdown = document.getElementById("countdown");

const rockButton = document.getElementById("rock-button");
const paperButton = document.getElementById("paper-button");
const scissorsButton = document.getElementById("scissors-button");

const playerResult = document.getElementById("player-result");
const computerResult = document.getElementById("computer-result");

showCountdown.innerHTML = start;

const timer = () => {
  if (start === 0) return;
  start--;
  showCountdown.innerHTML = start;
};

const gameStart = () => {
  //countThree();
  setInterval(timer, 1000);
  setTimeout(() => setPlayer(), 3200);
  setTimeout(() => setComputer(), 3200);
  setTimeout(() => setGame(), 3500);
  setTimeout(() => displayResult(), 3600);
  player = "";
  computer = "";
  start = 3;
};

const chooseRock = () => {
  player = "rock";
};

const choosePaper = () => {
  player = "paper";
};

const chooseScissors = () => {
  player = "scissors";
};

const setComputer = () => {
  computer = rpsArray[Math.floor(Math.random() * 3)];
  computerResult.innerHTML += computer;
};

const setPlayer = () => {
  if (player === "") {
    alert("you have to choose!");
  }
  playerResult.innerHTML += player;
};

const setGame = () => {
  switch (player) {
    case "rock":
      switch (computer) {
        case "rock":
          break;
        case "scissors":
          playerWin++;
          break;
        case "paper":
          computerWin++;
          break;
      }
    case "paper":
      switch (computer) {
        case "rock":
          playerWin++;
          break;
        case "scissors":
          computerWin++;
          break;
        case "paper":
          break;
      }
    case "scissors":
      switch (computer) {
        case "rock":
          computerWin++;
          break;
        case "scissors":
          break;
        case "paper":
          playerWin++;
          break;
      }
  }
};

const displayResult = () => {
  console.log(playerWin);
  console.log(computerWin);
  const winner = playerWin > computerWin ? "player" : "computer";
  resultPara.innerHTML = `you won ${playerWin} times and computer won ${computerWin} times, so ${winner} won the game!`;
};
