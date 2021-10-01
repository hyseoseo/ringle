const startButton = document.getElementById('start-button');
const selectionButtons = document.querySelectorAll('[data-selection]');
const gameCountSpan = document.querySelector('.game-count');
const timeCountSpan = document.querySelector('.time-count');
const playerResultSpan = document.querySelector('.player-result');
const computerResultSpan = document.querySelector('.computer-result');
const sessionWinnerSpan = document.querySelector('.session-winner');
const scoreSpan = document.querySelector('.session-score');
const finalWinnerSpan = document.querySelector('.final-winner');
const winningRateSpan = document.querySelector('.winning-rate');
const finalResultSection = document.querySelector('.final-result');
const newGameButton = document.getElementById('new-game');

const GAME_COUNT = 3;

let gameCount = 0;
let playerScore = 0;
let computerScore = 0;
let playerResult, computerResult;
let sessionWinner, finalWinner;

const SELECTIONS = [
  {
    name: '✊',
    beats: '✌',
    loses: '✋',
  },
  {
    name: '✋',
    beats: '✊',
    loses: '✌',
  },
  {
    name: '✌',
    beats: '✋',
    loses: '✊',
  },
];

const timeCountdown = () => {
  let count = 3;
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      timeCountSpan.innerText = count;
      if (count === 0) {
        clearInterval(interval);
        resolve('success');
      }
      count--;
    }, 1000);
  });
};

const startGame = () => {
  startButton.setAttribute('disabled', '');
  if (gameCount === GAME_COUNT) {
    makeFinalResult();
    return;
  }
  gameCount++;
  gameCountSpan.innerText = gameCount;

  timeCountdown()
    .then(() => setTimeout(makeSessionResult, 200))
    .then(() => setTimeout(startNewSession, 2000));
};

startButton.addEventListener('click', startGame);

selectionButtons.forEach((selectionButton) => {
  const selectButton = () => {
    const selectedName = selectionButton.dataset.selection;
    const selected = SELECTIONS.find(
      (selection) => selection.name === selectedName,
    );
    playerResult = selected.name;
    playerResultSpan.innerText = `You: ${playerResult}`;
  };
  selectionButton.addEventListener('click', selectButton);
});

const randomSelection = () => {
  const randomIndex = Math.floor(Math.random() * SELECTIONS.length);
  computerResult = SELECTIONS[randomIndex].name;
};

const makeSessionResult = () => {
  const selected = SELECTIONS.find(
    (selection) => selection.name === playerResult,
  );
  if (!selected) {
    alert('Please select in 3 seconds!');
    return;
  }
  randomSelection();
  computerResultSpan.innerText = `Computer: ${computerResult}`;
  if (computerResult === selected.beats) {
    sessionWinner = 'You won';
    playerScore++;
  } else if (computerResult === selected.loses) {
    sessionWinner = 'Computer won';
    computerScore++;
  } else {
    sessionWinner = 'Draw';
  }
  sessionWinnerSpan.innerText = sessionWinner;
  scoreSpan.innerText = `player: ${playerScore}, computer: ${computerScore}`;
};

const startNewSession = () => {
  playerResult = '';
  computerResult = '';
  playerResultSpan.innerText = playerResult;
  computerResultSpan.innerText = computerResult;
  sessionWinnerSpan.innerText = '';
  startGame();
};

const makeFinalResult = () => {
  let winningRate = 0;
  if (playerScore > computerScore) {
    finalWinner = 'You';
    winningRate = playerScore / GAME_COUNT;
  } else if (playerScore < computerScore) {
    finalWinner = 'Computer';
    winningRate = computerScore / GAME_COUNT;
  } else {
    finalWinner = 'No one';
    winningRate = 0;
  }
  finalWinnerSpan.innerText = `Final Winner is ${finalWinner}.`;
  winningRateSpan.innerText = `Final Winning Rate is ${winningRate}.`;
  newGameButton.removeAttribute('disabled', '');
};

const startNewGame = () => {
  gameCount = 0;
  playerScore = 0;
  computerScore = 0;
  gameCountSpan.innerText = gameCount;
  scoreSpan.innerText = '';
  finalWinnerSpan.innerText = '';
  winningRateSpan.innerText = '';
  startButton.removeAttribute('disabled', '');
  newGameButton.setAttribute('disabled', '');
  gameCountSpan.innerText = '';
  timeCountSpan.innerText = 'n';
};

newGameButton.addEventListener('click', startNewGame);
