const choices = ['Rock', 'Paper', 'Scissors'];

let playerScore = 0;
let computerScore = 0;
let rounds = 0;

const winStr = 'You Win!';
const loseStr = 'You Lose!';
const tieStr = 'Tie! Nobody wins';

const body = document.getElementById('body')

const resultsContainer = document.querySelector('#results');
const scoreContainer = document.querySelector('#scores');
const roundContainer = document.querySelector('#rounds');
const winnerContainer = document.querySelector('#winner');

const roundPara = document.createElement('p');
const scorePara = document.createElement('p');
const playerChoicePara = document.createElement('p');
const computerScorePara = document.createElement('p');
const roundWinnerPara = document.createElement('p');

const rockBtn = document.getElementById('rockBtn');
const paperBtn = document.getElementById('paperBtn');
const scissorsBtn = document.getElementById('scissorsBtn');

const showWinner = document.getElementById('showWinner');
const showWinnerPara = document.getElementById('showWinnerPara')
const replay = document.getElementById('replay-btn');
const overlay = document.getElementById('overlay');

const restartGame = document.getElementById('replay-btn');
console.log(restartGame);
restartGame.addEventListener('click', (event) => {
	restart();
})

//rockBtn.addEventListener('click', () => playerPlay('rock'));
//paperBtn.addEventListener('click', () => playerPlay('paper'));
//scissorsBtn.addEventListener('click', () => playerPlay('scissors'));

let submitRock = document.getElementsByClassName('choiceBtn')[0];
submitRock.addEventListener('click', (event) => {
	game('Rock');
});
let submitPaper = document.getElementsByClassName('choiceBtn')[1];
submitPaper.addEventListener('click', (event) => {
	game('Paper');
});
let submitScissors = document.getElementsByClassName('choiceBtn')[2];
submitScissors.addEventListener('click', (event) => {
	game('Scissors');
});
// execute game function when clicking an option



function restart() {
	rounds = 0;
	playerScore = 0;
	computerScore = 0;
	overlay.classList.remove('overlay');
	overlay.classList.add('inactive');
	showWinner.classList.remove('showWinner');
	showWinner.classList.add('inactive');
}

function game(play) {
	playRound(play);

	if (playerScore === 3 || computerScore === 3) {
		if (playerScore > computerScore) {
			showWinner.classList.remove('inactive');
			showWinner.classList.add('showWinner');
			overlay.classList.remove('inactive');
			overlay.classList.add('overlay');
			showWinnerPara.innerHTML = 'You won the game! Well done!';
			;
		} else {
			showWinner.classList.remove('inactive');
			showWinner.classList.add('showWinner');
			overlay.classList.remove('inactive');
			overlay.classList.add('overlay');
			showWinnerPara.innerHTML = 'You lost the game :( Better luck next time';
		};
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
		rounds++
	}
	roundPara.classList.add('round-p');
	roundPara.textContent = ('Round: ' + rounds);
	scoreContainer.appendChild(roundPara);

	scorePara.classList.add('score-p');
	scorePara.textContent = ('Player ' + playerScore + ' - ' + computerScore + ' Computer');
	scoreContainer.appendChild(scorePara);

	playerChoicePara.classList.add('player-choice-p');
	playerChoicePara.textContent = ('You chose: ' + playerSelection);
	roundContainer.appendChild(playerChoicePara);

	computerScorePara.classList.add('pc-choice-p');
	computerScorePara.textContent = ('PC chose: ' + computerSelection);
	roundContainer.appendChild(computerScorePara);

	roundWinnerPara.classList.add('round-winner-p');
	roundWinnerPara.textContent = (winner);
	roundContainer.appendChild(roundWinnerPara);

}

function computerPlay() {
	return choices[Math.floor(Math.random() * choices.length)]; //returns the computer choice based on random number
}

/*
function playerPlay(playerChoice) {
	console.log(playerChoice)	
	return playerChoice;
}
*/

function checkWinner(playerSelection, computerSelection) {
	if (
		(playerSelection === 'Paper' && computerSelection === 'Rock') ||
		(playerSelection === 'Rock' && computerSelection === 'Scissors') ||
		(playerSelection === 'Scissors' && computerSelection === 'Paper')
	) {
		return winStr;
	} else if (
		(playerSelection === 'Paper' && computerSelection === 'Scissors') ||
		(playerSelection === 'Rock' && computerSelection === 'Paper') ||
		(playerSelection === 'Scissors' && computerSelection === 'Rock')
	) {
		return loseStr;
	} else {
		return tieStr;
	}
}

//document.querySelector('.counter-container #roundCounter').innerHTML =
//	'Round N° ' + rounds;
//document.querySelector('.counter-container #playerScoreCounter').innerHTML =
//	'Player Score: ' + playerScore;
//document.querySelector('.counter-container #computerScoreCounter').innerHTML =
//	'Computer Score: ' + computerScore;
