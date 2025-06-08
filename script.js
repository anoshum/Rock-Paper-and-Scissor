let ComputerChoice;
let result;
let userScore = 0;
let computerScore=0;

function ComputerCall() {
    let randomNumber = Math.random() * 3;
    if (randomNumber > 0 && randomNumber <= 1) {
        ComputerChoice = 'Rock';
    } else if (randomNumber > 1 && randomNumber <= 2) {
        ComputerChoice = 'Paper';
    } else {
        ComputerChoice = 'Scissors';
    }
}

function updateScore() {
    document.getElementById("user-score").innerText = userScore;
    document.getElementById("computer-score").innerText = computerScore;
}

function displayChoices(UserCall, ComputerChoice) {
    document.querySelector(".Result.User").innerText = `Your choice: ${UserCall}`;
    document.querySelector(".Result.Computer").innerText = `Computer's choice: ${ComputerChoice}`;
}

function displayStatus3(result) {
    document.querySelector(".Result.Final").innerText = `Result: ${result}`;
}

function checkWinner(userChoice) {
    if (ComputerChoice === userChoice) {
        result = `Game Tie..!!`;
    } else if (
        (userChoice === 'Rock' && ComputerChoice === 'Scissors') ||
        (userChoice === 'Paper' && ComputerChoice === 'Rock') ||
        (userChoice === 'Scissors' && ComputerChoice === 'Paper')
    ) {
        result = `User Won🥳`;
        userScore++;
    } else {
        result = `Computer Won `;
        computerScore++;
    }
    updateScore();
    displayChoices(userChoice, ComputerChoice);
    displayStatus3(result);
}

document.querySelector('.Stone').addEventListener('click', function () {
    ComputerCall();
    checkWinner('Rock');
});

document.querySelector('.Paper').addEventListener('click', function () {
    ComputerCall();
    checkWinner('Paper');
});

document.querySelector('.Scissors').addEventListener('click', function () {
    ComputerCall();
    checkWinner('Scissors');
});

const resetButton = document.querySelector(".reset-btn");
const resultsContainer = document.querySelector(".results");
const scoreboard = document.querySelector(".scoreboard");
const popupContainer = document.createElement('div');
popupContainer.classList.add('popup-container');
const popupMessage = document.createElement('p');
const popupCloseButton = document.createElement('button');
popupCloseButton.innerText = 'Close';
popupCloseButton.classList.add('close-btn');

popupContainer.appendChild(popupMessage);
popupContainer.appendChild(popupCloseButton);
document.body.appendChild(popupContainer);
popupContainer.style.display = 'none'; // Initially hide the popup

let soundEffect;
try {
    soundEffect = new Audio('balloon_pop.mp3'); // Replace 'balloon_pop.mp3' with your sound file
} catch (e) {
    console.warn("Could not load sound effect:", e);
}

resetButton.addEventListener("click", function () {
    document.querySelector(".Result.User").innerText = "";
    document.querySelector(".Result.Computer").innerText = "";
    document.querySelector(".Result.Final").innerText = "";

    resultsContainer.classList.add('balloon-effect');

    // Play sound effect
    if (soundEffect) {
        soundEffect.play();
    }

    let finalMessage = '';
    if (userScore > computerScore) {
        finalMessage = `Hurrah! You won 🤩🥳🥳.. <br> Your Score: ${userScore} | Computer Score: ${computerScore}`;
    } else if (computerScore > userScore) {
        finalMessage = `Ohh.. You Lost 😔😔, <br> Try Again.., <br> Your Score: ${userScore} | Computer Score: ${computerScore}`;
    } else {
        finalMessage = `It's a Tie! <br> Your Score: ${userScore} | Computer Score: ${computerScore}`;
    }

    popupMessage.innerHTML = finalMessage;
    popupContainer.style.display = 'flex';
    userScore = 0;
    computerScore = 0;
    updateScore();

});

popupCloseButton.addEventListener('click', function() {
    popupContainer.style.display = 'none';
});
