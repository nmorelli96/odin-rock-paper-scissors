const choices = ['rock', 'paper', 'scissors'];

let playerScore = 0;
let computerScore = 0;
let rounds = 0;

const winStr = 'You Win!';
const loseStr = 'You Lose!';

function game() {
	playRound();
	console.log(
		'Round: ' + rounds,
		'Your Score: ' + playerScore,
		'PC Score: ' +
			computerScore +
			'\n________________________________________________'
	);
	while (playerScore === 3 || computerScore === 3) {
		if (playerScore > computerScore) {
			console.log(
				'||||||||||||||||||||||||||||\n\nYou won the game! Well done!\n\n||||||||||||||||||||||||||||'
			);
			rounds = 0;
			playerScore = 0;
			computerScore = 0;
			break;
		} else {
			console.log(
				'|||||||||||||||||||||||||||||||||||||||||||\n\nYou lost the game :(. Better luck next time\n\n|||||||||||||||||||||||||||||||||||||||||||'
			);
		}
		rounds = 0;
		playerScore = 0;
		computerScore = 0;
		break;
	}
	//while (playerScore < 5 && computerScore < 5) {
	//	playRound();
	//	console.log(playerScore, computerScore);
	//}
	//for (let i = 0; i < 5; i++) {
	//	playRound();
	//}
}

function playRound() {
	let computerSelection = computerPlay();
	let playerSelection = playerPlay();
	let winner = checkWinner(playerSelection, computerSelection);
	if (winner === winStr) {
		playerScore++;
		rounds++;
	} else if (winner === loseStr) {
		computerScore++;
		rounds++;
	} else {
	}
	console.log(
		'You chose: ' + playerSelection,
		'| PC chose: ' + computerSelection,
		'| ' + winner
	);
}

let submit = document.getElementById('submit');
submit.addEventListener('click', (event) => {
	if (playerPlay() !== undefined) {
		game();
	} else {
		console.log('Please, submit only valid choices: rock, paper or scissors');
	}
}); // execute game function when clicking submit choice

function computerPlay() {
	return choices[Math.floor(Math.random() * choices.length)]; //returns the computer choice based on random number
}

function playerPlay() {
	let playerChoice = document.getElementById('choiceField').value;
	playerChoice = playerChoice.toLowerCase();

	let check = validateChoice(playerChoice);
	if (check === true) {
		return playerChoice;
	}
	//console.log('Please, submit only valid choices: rock, paper or scissors');
}

function validateChoice(playerChoice) {
	return choices.includes(playerChoice);
}

function checkWinner(playerSelection, computerSelection) {
	if (
		(playerSelection === 'paper' && computerSelection === 'rock') ||
		(playerSelection === 'rock' && computerSelection === 'scissors') ||
		(playerSelection === 'scissors' && computerSelection === 'paper')
	) {
		return winStr;
	} else if (
		(playerSelection === 'paper' && computerSelection === 'scissors') ||
		(playerSelection === 'rock' && computerSelection === 'paper') ||
		(playerSelection === 'scissors' && computerSelection === 'rock')
	) {
		return loseStr;
	} else {
		return 'Tie! Nobody wins';
	}
}

//document.querySelector('.counter-container #roundCounter').innerHTML =
//	'Round N° ' + rounds;
//document.querySelector('.counter-container #playerScoreCounter').innerHTML =
//	'Player Score: ' + playerScore;
//document.querySelector('.counter-container #computerScoreCounter').innerHTML =
//	'Computer Score: ' + computerScore;
