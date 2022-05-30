const choices = ["Rock", "Paper", "Scissors"];

let playerScore = 0;
let computerScore = 0;
let rounds = 0;

const winStr = "<span style='color:limegreen'>You Win !</span>";
const loseStr = "<span style='color:crimson'>You Lose !</span>";
const tieStr = "<span style='color:sandybrown'>It's a Tie !</span>";

const resultsContainer = document.querySelector("#results");
const scoreContainer = document.querySelector("#scores");
const roundContainer = document.querySelector("#rounds");
const winnerContainer = document.querySelector("#winner");

const roundPara = document.createElement("p");
const scorePara = document.createElement("p");
const playerChoicePara = document.createElement("p");
const computerScorePara = document.createElement("p");
const roundWinnerPara = document.createElement("p");

const rockBtn = document.getElementById("rockBtn");
const paperBtn = document.getElementById("paperBtn");
const scissorsBtn = document.getElementById("scissorsBtn");

const computerIcon = document.getElementById("computerIcon");

const showWinner = document.getElementById("showWinner");
const showWinnerPara = document.getElementById("showWinnerPara");
const replay = document.getElementById("replay-btn");
const overlay = document.getElementById("overlay");

const restartGame = document.getElementById("replay-btn");

const tapSound = document.getElementById("tap-s");
const victorySound = document.getElementById("victory-s");
const defeatSound = document.getElementById("defeat-s");

//rock inputs

let submitRock = document.getElementsByClassName("choiceBtn")[0];
submitRock.addEventListener("click", (event) => {
  game("Rock");
  tapSound.currentTime = 0;
  tapSound.play();
  submitScissors.classList.remove("selected");
  submitPaper.classList.remove("selected");
  submitRock.classList.add("selected");
});
document.addEventListener("keydown", (event) => {
  if (event.key == 1 && overlay.classList.contains('inactive')) {
    //avoid to allow pressing keys with the game finished
    if (event.repeat) { return }	//avoid key spamming
    game("Rock");
    tapSound.currentTime = 0;
    tapSound.play();
    submitScissors.classList.remove("selected");
    submitPaper.classList.remove("selected");
    submitRock.classList.add("selected");
  }
});

//paper inputs

let submitPaper = document.getElementsByClassName("choiceBtn")[1];
submitPaper.addEventListener("click", (event) => {
  game("Paper");
  tapSound.currentTime = 0;
  tapSound.play();
  submitRock.classList.remove("selected");
  submitScissors.classList.remove("selected");
  submitPaper.classList.add("selected");
});
document.addEventListener("keydown", (event) => {
  if (event.key == 2 && overlay.classList.contains('inactive')) {
    if (event.repeat) { return }
    game("Paper");
    tapSound.currentTime = 0;
    tapSound.play();
    submitRock.classList.remove("selected");
    submitScissors.classList.remove("selected");
    submitPaper.classList.add("selected");
  }
});

//scissors inputs

let submitScissors = document.getElementsByClassName("choiceBtn")[2];
submitScissors.addEventListener("click", (event) => {
  game("Scissors");
  tapSound.currentTime = 0;
  tapSound.play();
  submitRock.classList.remove("selected");
  submitPaper.classList.remove("selected");
  submitScissors.classList.add("selected");
});
document.addEventListener("keydown", (event) => {
  if (event.key == 3 && overlay.classList.contains('inactive')) {
    if (event.repeat) { return }
    game("Scissors");
    tapSound.currentTime = 0;
    tapSound.play();
    submitRock.classList.remove("selected");
    submitPaper.classList.remove("selected");
    submitScissors.classList.add("selected");
  }
});

//'play again' inputs

restartGame.addEventListener("click", (event) => {
  restart();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && overlay.classList.contains('overlay')) {
    restart();
  }
});


function restart() {
  rounds = 0;
  playerScore = 0;
  computerScore = 0;
  overlay.classList.replace("overlay", "inactive");
  showWinner.classList.replace("showWinner", "inactive");
  location.reload()
}

function game(play) {
  playRound(play);

  if (playerScore === 3 || computerScore === 3) {
    if (playerScore > computerScore) {
      showWinner.classList.replace("inactive", "showWinner");
      overlay.classList.replace("inactive", "overlay");
      showWinnerPara.innerHTML = "You won the game! <br> Well done!";
      victorySound.play();
    } else {
      showWinner.classList.replace("inactive", "showWinner");
      overlay.classList.replace("inactive", "overlay");
      showWinnerPara.innerHTML =
        "You lost the game :( <br> Better luck next time";
      defeatSound.play();
    }
  }
}

function playRound(play) {
  let computerSelection = computerPlay();
  playerSelection = play;
  let winner = checkWinner(playerSelection, computerSelection);
  if (winner === winStr) {
    playerScore++;
    rounds++;
  } else if (winner === loseStr) {
    computerScore++;
    rounds++;
  } else {
    rounds++;
  }
  roundPara.classList.add("round-p");
  roundPara.innerHTML = "Round: " + rounds;
  scoreContainer.appendChild(roundPara);

  scorePara.classList.add("score-p");
  scorePara.innerHTML =
    "<span style='color:rgb(255, 173, 65)'>Player </span>" + playerScore + " - " + computerScore + "<span style='color:rgb(101, 196, 255)'> Robot</span>";
  scoreContainer.appendChild(scorePara);

  roundWinnerPara.classList.add("round-winner-p");
  roundWinnerPara.innerHTML = winner;
  scoreContainer.appendChild(roundWinnerPara);
}

function computerPlay() {
  return choices[Math.floor(Math.random() * choices.length)]; //returns the computer choice based on random number
}

function checkWinner(playerSelection, computerSelection) {
  if (computerSelection === "Rock") {
    computerIcon.classList.remove("zoom");
    computerIcon.classList.remove("fa-question", "fa-hand", "fa-hand-scissors");
    computerIcon.classList.add("fa-hand-fist");
    /*computerIcon.style.animation =
      "zoom-in-zoom-out 1s linear 0s 1 normal initial running";*/
    window.setTimeout(function () {
      computerIcon.classList.add("zoom");
    }, 50);
  } else if (computerSelection === "Paper") {
    computerIcon.classList.remove("zoom");
    computerIcon.classList.remove(
      "fa-question",
      "fa-hand-fist",
      "fa-hand-scissors"
    );
    computerIcon.classList.add("fa-hand");
    window.setTimeout(function () {
      computerIcon.classList.add("zoom");
    }, 50);
  } else if (computerSelection === "Scissors") {
    computerIcon.classList.remove("zoom");
    computerIcon.classList.remove("fa-question", "fa-hand-fist", "fa-paper");
    computerIcon.classList.add("fa-hand-scissors");
    window.setTimeout(function () {
      computerIcon.classList.add("zoom");
    }, 50);
  }

  if (
    (playerSelection === "Paper" && computerSelection === "Rock") ||
    (playerSelection === "Rock" && computerSelection === "Scissors") ||
    (playerSelection === "Scissors" && computerSelection === "Paper")
  ) {
    return winStr;
  } else if (
    (playerSelection === "Paper" && computerSelection === "Scissors") ||
    (playerSelection === "Rock" && computerSelection === "Paper") ||
    (playerSelection === "Scissors" && computerSelection === "Rock")
  ) {
    return loseStr;
  } else {
    return tieStr;
  }
}

