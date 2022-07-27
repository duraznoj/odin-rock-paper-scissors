//////// CONSTANTS AND FUNCTION DEFINITIONS ////////
//define array of possible choices
const OPTIONS_ARRAY = ["ROCK", "PAPER", "SCISSORS"];

//define game logic and outcome variables
let currentRound = 0;
let isGameOver = false;
let playerInputValid = false;
let result;
let resultClass;
let numPlayerWins = 0;
let numComputerWins = 0;
const numRounds = 5;
const numPoints = 5;
let finalText;
let finalClass;

//get DOM elements
const container = document.querySelector(".container");
const choiceButtons = document.querySelectorAll(".choiceButtons > *");
const playerScoreVal = document.querySelector("#playerScoreValue");
const computerScoreVal = document.querySelector("#computerScoreValue");
const gameActionElem = document.querySelector(".gameAction");
const resultTextElem =  document.querySelector("#resultText");
const playerChoiceElem = document.querySelector("#playerChoice");
const computerChoiceElem = document.querySelector("#computerChoice");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector("#modalContent");
const finalResultText = document.querySelector("#finalResult");
const finalScoreText = document.querySelector("#finalScore");
const restartButton = document.querySelector("#restartButton");

//function to reset values
const initGameState = () => {
  currentRound = 0;
  isGameOver = false;
  playerInputValid = false;
  result = "";
  resultClass = "";
  numPlayerWins = 0;
  numComputerWins = 0;
  playerScoreVal.textContent = numPlayerWins;
  computerScoreVal.textContent = numComputerWins;
  finalText = "";
  finalClass = "";
}

//function to randomly select computer choice
function computerPlay() {
  const randIdx = Math.floor((Math.random() * 300) / 100);
  const computerChoice = OPTIONS_ARRAY[randIdx];
  return computerChoice;
}

//function to determine results
function playRound(playerSelection, computerSelection) {
  playerChoiceElem.textContent = `Player chose ${playerSelection}`;
  computerChoiceElem.textContent = `Computer chose ${computerSelection}`;

  if (playerSelection === computerSelection) {
    result = "TIE";
    resultClass = "tieText";
  } else {
    const firstPlayerMatch = OPTIONS_ARRAY.indexOf(playerSelection);
    const firstComputerMatch = OPTIONS_ARRAY.indexOf(computerSelection);
    const matchDiff = firstPlayerMatch - firstComputerMatch;
    if(matchDiff === 1 || matchDiff === -2) {
      result = `You Win! ${playerSelection.toUpperCase()} beats ${computerSelection.toUpperCase()}`;
      resultClass = "playerWonText";
      numPlayerWins++;
    } else {
      result = `You Lose! ${computerSelection.toUpperCase()} beats ${playerSelection.toUpperCase()}`;
      resultClass = "computerWonText";
      numComputerWins++;
    }
  }

  resultTextElem.textContent = `Round #${currentRound+1} Result: ${result}`;
  resultTextElem.removeAttribute("class");
  resultTextElem.classList.add(resultClass);
  return result;
}

//////// MAIN ////////
playerScoreVal.textContent = numPlayerWins;
computerScoreVal.textContent = numComputerWins;

restartButton.addEventListener('click', () => {
  initGameState();
  container.classList.remove("is-blurred");
  modal.style.display = "none";
  modalContent.removeAttribute("class");
  resultTextElem.textContent = "";
  playerChoiceElem.textContent = "";
  computerChoiceElem.textContent = "";
  resultTextElem.removeAttribute("class");
})

choiceButtons.forEach(btn => {
  btn.addEventListener('click', () => {

      if(numPlayerWins <= numPoints && numComputerWins <= numPoints) {
      playRound(btn.id, computerPlay());
      
      playerScoreVal.textContent = numPlayerWins;
      computerScoreVal.textContent = numComputerWins;

      if(numPlayerWins === numPoints || numComputerWins === numPoints) {

        if(numPlayerWins > numComputerWins) {
          finalText = "Player won more games!";
          finalClass = "playerWonBG";
        } else if(numPlayerWins < numComputerWins) {
          finalText = "Computer won more games!";
          finalClass = "computerWonBG";
        } else if(numPlayerWins === numComputerWins) {
          finalText = "It's a tie!";
          finalClass = "tieBG";
        } 

        finalScoreText.textContent = `Player won ${numPlayerWins}, Computer won ${numComputerWins}`;
        finalResultText.textContent = finalText;
        modalContent.classList.add(finalClass);
        container.classList.add("is-blurred")
        modal.style.display = "block";
      }

      currentRound++;
    } else {
      alert("Game over! Refresh the page to play again!");
    }
    
  });
});