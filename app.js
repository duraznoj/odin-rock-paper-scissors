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


//get DOM elements
const buttons = document.querySelectorAll("button");
const playerScoreVal = document.querySelector("#playerScoreValue");
const computerScoreVal = document.querySelector("#computerScoreValue");
const gameOverElement = document.querySelector("#gameOverText");


//function to create list node element and add it to the DOM
function createElementDOM(elementName, elementText, elementType) {
  const listElement = document.createElement("li-" + elementName + "-" + currentRound);
  const textNode = document.createTextNode(elementText);
  listElement.appendChild(textNode);

  if(elementType) {
    listElement.classList.add("numWins");
  };

  document.querySelector("ul").appendChild(listElement);
  return listElement;
}

//function to randomly select computer choice
function computerPlay() {
  const randIdx = Math.floor((Math.random() * 300) / 100);
  const computerChoice = OPTIONS_ARRAY[randIdx];
  const computerSelector = createElementDOM("computerChoice", "Computer choice: " + computerChoice.toUpperCase());
  return computerChoice;
}

//function to determine results
function playRound(playerSelection, computerSelection) {

  if (playerSelection === computerSelection) {
    result = "TIE";
    resultClass = "tie";
  } else {
    const firstPlayerMatch = OPTIONS_ARRAY.indexOf(playerSelection);
    const firstComputerMatch = OPTIONS_ARRAY.indexOf(computerSelection);
    const matchDiff = firstPlayerMatch - firstComputerMatch;
    if(matchDiff === 1 || matchDiff === -2) {
      result = `You Win! ${playerSelection.toUpperCase()} beats ${computerSelection.toUpperCase()}`;
      resultClass = "playerWon";
      numPlayerWins++;
    } else {
      result = `You Lose! ${computerSelection.toUpperCase()} beats ${playerSelection.toUpperCase()}`;
      resultClass = "computerWon";
      numComputerWins++;
    }
  }

  const resultSelector = createElementDOM("result", `Round #${currentRound+1} Result: ${result}`);
  resultSelector.classList.add(resultClass);
  return result;
}

//////// MAIN ////////
playerScoreVal.textContent = numPlayerWins;
computerScoreVal.textContent = numComputerWins;

buttons.forEach(btn => {
  btn.addEventListener('click', () => {

    if(currentRound < numRounds) {
      const playerSelector = createElementDOM("playerChoice", "Player choice: " + btn.id);
      playRound(btn.id, computerPlay());
      
      playerScoreVal.textContent = numPlayerWins;
      computerScoreVal.textContent = numComputerWins;

      if(currentRound == numRounds - 1) {
        
        let finalText = "";

        if(numPlayerWins > numComputerWins) {
          finalText = "Player won more games!";
        } else if(numPlayerWins < numComputerWins) {
          finalText = "Computer won more games!";
        } else if(numPlayerWins === numComputerWins) {
          finalText = "It's a tie!";
        } 

        gameOverElement.textContent = finalText;

      }

      currentRound++;
    } else {
      alert("Game over! Refresh the page to play again!");
    }
    
  });
});