/*Your game is going to play against the computer, so begin with a 
function called computerPlay that will randomly return either 
(DONE)‘Rock’, ‘Paper’ or ‘Scissors’. We’ll use this function in the game 
to make the computer’s play. Tip: use the console to make sure this is returning the expected output before moving to the next step!
(DONE) Write a function that plays a single round of Rock Paper Scissors. 
The function qshould take two parameters - the playerSelection and computerSelection - and then return a string that 
declares the winner of the round like so: "You Lose! Paper beats Rock"
(DONE) Make your function’s playerSelection parameter case-insensitive (so users can input rock, ROCK, RocK or any other variation).
Write a NEW function called game(). Call the playRound function inside of this one to play a 5 round game that keeps score and reports a winner or loser at the end.
*/

//////// CONSTANTS AND FUNCTION DEFINITIONS ////////
//define array of possible choices
const OPTIONS_ARRAY = ["ROCK", "PAPER", "SCISSORS"];

//define game logic and outcome variables
let currentRound = 0;
let isGameOver = false;
//let playerInput;
//let playerChoice;
//let computerChoice;
let playerInputValid = false;
let result;
let resultClass;
let numPlayerWins = 0;
let numComputerWins = 0;

//console.log(playerChoiceDiv.textContent);

function createElement(elementName, elementText) {
  const listElement = document.createElement("li-" + elementName + "-" + currentRound);
  const textNode = document.createTextNode(elementText);
  listElement.appendChild(textNode);
  document.querySelector("ul").appendChild(listElement);
  //const newElementSelector = document.querySelector("li-" + currentRound);
  //console.log(listElement);
  return listElement;
}

//function to randomly select computer choice
function computerPlay() {
  //const OPTIONS_ARRAY = ["ROCK", "PAPER", "SCISSORS"];
  const randIdx = Math.floor((Math.random() * 300) / 100);
  //console.log(randIdx);
  const computerChoice = OPTIONS_ARRAY[randIdx];
  //computerChoiceDiv.textContent = "Computer choice: " + computerChoice.toUpperCase();
  const computerSelector = createElement("computerChoice", "Computer choice: " + computerChoice.toUpperCase());
  return computerChoice;
}

//function to get player choice
function playerPlay() {
  //let playerInput = window.prompt("What do you choose to play (rock, paper, or scissors)?");
  //let playerInput = "paper";
  //let playerInput;

  do {
    console.log("do loop");
    const playerInput = window.prompt("What do you choose to play (rock, paper, or scissors)?");
    if (playerInput === null) {
      isGameOver = true;
      //return "cancel";
      //console.log("game should be over");
      break;
    }
    //console.log("player input: " + playerInput.toUpperCase());

    //playerInputValid = playerInput.match(/rock/i) || playerInput.match(/paper/i) || playerInput.match(/scissors/i);
    playerInputValid = playerInput.toUpperCase() === "ROCK" || playerInput.toUpperCase() === "PAPER" || playerInput.toUpperCase() === "SCISSORS";

    if(playerInputValid) {
      //let playerChoice = playerInput.toLowerCase();
      const playerChoice = playerInput.toUpperCase();
      //console.log("playerChoice: " + playerChoice);
      //playerChoiceDiv.textContent = "Player choice: " + playerChoice.toUpperCase();
      const playerSelector = createElement("playerChoice", "Player choice: " + playerChoice.toUpperCase());
      //console.log("valid player input");
      return playerChoice;

    } else {
      alert("Please enter a valid choice (rock, paper, or scissors)");
      console.log("player input error");
    }
  } while(!playerInputValid);
}


//function to determine results
function playRound(playerSelection, computerSelection) {

  if (playerSelection === computerSelection) {
    result = "TIE";
    resultClass = "tie";
  } else {
    const firstPlayerMatch = OPTIONS_ARRAY.indexOf(playerSelection);
    const firstComputerMatch = OPTIONS_ARRAY.indexOf(computerSelection);
    //console.log("firstPlayerMatch: " + firstPlayerMatch);
    //console.log("firstComputerMatch: " + firstComputerMatch);
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

  const resultSelector = createElement("result", "Result: " + result);
  resultSelector.classList.add(resultClass);
  return result;
}

//function to run a round of 
function initAndPlayRound() {
    //console.log(currentRound);

    const playerSel = playerPlay();

    //console.log("playerSel: " + playerSel);

    if(isGameOver) {
      return;

    } else {
      playerInputValid = false; //reset input check condition for next time 
      const computerSel = computerPlay();
      playRound(playerSel, computerSel);
      //currentRound++; //iterate the number of rounds (make sure to comment this out if changing iterator in another place as well)
    }   
} 

//////// MAIN ////////

//recursive function to play game for five rounds
let game = function() {

  if(currentRound >= 5) {
    //console.log(currentRound);
    const gameOverElement = createElement("gameOver", "Game over!");
    gameOverElement.classList.add("gameOver");
    const numWinsElement = createElement("numWins", `Player wins: ${numPlayerWins}, Computer wins: ${numComputerWins}. ${numPlayerWins > numComputerWins ? "Player won more games!" : "Computer won more games!"}`);
    numWinsElement.classList.add('gameOver');
    return;
  }

  if(isGameOver) {
    //("Game Over!");
    const gameOverElement = createElement("gameOver", "Player cancelled game. See you next time!");
    gameOverElement.classList.add("gameOver");
    return;

  } else {
    initAndPlayRound();
    currentRound++;
    //setTimeout(game(++currentRound), 300);
    setTimeout(game, 100);
    //console.log("continuing to next iteration");
    return;
  } 
  //return;
}

//run game
game();




/////////// NOT USED ///////////////

/*if( !playerInput.match(/rock/i) && !playerInput.match(/paper/i) && !playerInput.match(/scissors/i)) {
    alert("Please enter a valid choice (rock, paper, or scissors)");
    console.log("player input error")
    playerPlay();
  } else {
    let playerChoice = playerInput.toLowerCase();
    //console.log("playerChoice: " + playerChoice);
    //playerChoiceDiv.textContent = "Player choice: " + playerChoice.toUpperCase();
    let playerSelector = createElement("playerChoice", "Player choice: " + playerChoice.toUpperCase());
    console.log("valid player input");
    return playerChoice;
  }*/

//get player and computer choices
//playerPlay();
//computerPlay();

/*let game = function() {

  return function() {
    if(currentRound >= 5) {
      console.log(currentRound);
      const gameOverElement = createElement("gameOver", "Game over!");
      gameOverElement.classList.add("gameOver");
      return;
    }
    if(isGameOver) {
      console.log("Game Over!");
    } else {
      initAndPlayRound();
      setTimeout(game(++currentRound), 300);
      console.log("continuing to next iteration");
    }
  }

}*/

//get results
//playRound(playerChoice, computerChoice);
/*function game() {
  for (let i = 0; i < 5; i++) {
    //console.log(i);
    if(!isGameOver) {
      //setTimeout(initAndPlayRound, i * 1000);
      setTimeout(initAndPlayRound, 500);
    } else {
        console.log("break out of main loop")
        break;
    }
    //game();
  }
}

//run game
game();*/

//setTimeout(game, 0);
//game(currentRound);