/*
const COUNT = 5;
let player = "";
//let computer = "";
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

const gameStart = () => {
  let count = 3;
  const interval = setInterval(() => {
    if (count === 0) {
      clearInterval(interval);
      return;
    }
    count--;
    showCountdown.innerHTML = count;
  }, 1000);

  const p = new Promise((resolve) => {
    const computer = rpsArray[Math.floor(Math.random() * 3)];
    computerResult.innerHTML += computer;
    const playerTimeout = setTimeout(() => {
      setPlayer();
      resolve([player, computer]);
    }, 3200);
  });

  p.then((result) => setGame(result)).then((result) => displayResult(result));
};

console.log(playerWin);
console.log(computerWin);

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

const setGame = ([player, computer]) => {
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
  return [playerWin, computerWin];
};

const displayResult = ([playerWin, computerWin]) => {
  const winner = playerWin > computerWin ? "player" : "computer";
  resultPara.innerHTML = `you won ${playerWin} times and computer won ${computerWin} times, so ${winner} won the game!`;
};
*/

const selectionButtons = document.querySelectorAll("[data-selection]");
const startgameSection = document.querySelector(".start-game");
const computerScoreSpan = document.querySelector("[data-computer-score");
const yourScoreSpan = document.querySelector("[data-your-score]");
const finalColoumn = document.querySelector("[data-final-column]");
let gameCount = 0;

const SELECTIONS = [
  {
    name: "rock",
    beats: "scissors",
  },
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
];

selectionButtons.forEach((selectionButton) => {
  const selectButton = () => {
    const selectedName = selectionButton.dataset.selection;
    const selected = SELECTIONS.find(
      (selection) => selection.name === selectedName
    );
    makeSelection(selected);
  };
  selectionButton.addEventListener("click", selectButton);
});

const isWinner = (selection, opponent) => {
  return selection.beats === opponent.name;
};

const increaseScore = (scoreSpan) => {
  scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1;
};

const showWinningRate = (scoreSpan) => {
  const winNum = parseInt(scoreSpan.innerText);
  const winRate = winNum / 3;
  const div = document.createElement("div");
  div.innerHTML = `you won ${winNum} times. Winning rate is ${winRate}`;
  addResetButton(div);
  startgameSection.appendChild(div);
};

const resetGame = () => {
  gameCount = 0;
  yourScoreSpan.innerText = 0;
  computerScoreSpan.innerText = 0;
};

const addResetButton = (div) => {
  const button = document.createElement("button");
  button.innerText = "Another Game";
  button.addEventListener("click", resetGame);
  div.appendChild(button);
};

const makeSelection = (selected) => {
  const computerSelection = randomSelection();
  const youWinner = isWinner(selected, computerSelection);
  const comWinner = isWinner(computerSelection, selected);
  console.log([youWinner, comWinner]);
  if (youWinner) {
    increaseScore(yourScoreSpan);
  }
  if (comWinner) {
    increaseScore(computerScoreSpan);
  }
  addSelectionResult(computerSelection, comWinner);
  addSelectionResult(selected, youWinner);
  gameCount++;
  if (gameCount === 3) {
    showWinningRate(yourScoreSpan);
  }
};

const addSelectionResult = (selection, winner) => {
  const div = document.createElement("div");
  div.innerHTML = selection.name;
  div.classList.add("result-selection");
  if (winner) {
    div.classList.add("winner");
  }
  finalColoumn.after(div);
};

const randomSelection = () => {
  const randomIndex = Math.floor(Math.random() * SELECTIONS.length);
  return SELECTIONS[randomIndex];
};
