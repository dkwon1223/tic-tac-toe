// GAME LOGIC

// GLOBAL VARIABLE(S)/DATA MODEL
let gameBoard = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
];

let turnCounter = 0;

// FUNCTIONS
// DOM 

/* 
A function that creates the objects that store each players’ information
- properties should include: id (ex: 'one'), token (ex: '⭐️'), wins (ex: 0) 
*/

function createPlayer(id, token) {
    return {
        id: id,
        token: token,
        wins: 0
    };
}

// A function called increaseWins - increases the count of a player’s wins (should work for either player)

function increaseWins(player) {
    player.wins += 1;
    return player;
}

// A function that keeps track of the data for the game board

function displayGameStats() {
    return {
        playerOneID: null,
        playerTwoID: null,
        playerOneWins: null,
        playerTwoWins: null,
        currentTurn: null
    };
}

// A function for playing a turn
function playTurn(index, playerNum) {
    if(gameBoard[index] === 0) {
        turnCounter++;
        gameBoard[index] = playerNum;
        console.log(gameBoard.slice(0,3));
        console.log(gameBoard.slice(3,6));
        console.log(gameBoard.slice(6));
        trackTurn();
        checkWin();
        checkDraw();
        console.log("\n");
    } else {
        console.log(gameBoard.slice(0,3));
        console.log(gameBoard.slice(3,6));
        console.log(gameBoard.slice(6));
        console.log("\nCannot play here.");
        trackTurn();
        console.log("\n");
    }
}

// A function that keeps track of which player’s turn it currently is

function trackTurn() {
    if(turnCounter === 0 || turnCounter % 2 === 0) {
        console.log("Player 1's Turn");
    } else {
        console.log("Player 2's Turn");
    }
}

// A function that checks the game board data for win conditions

function checkWin() {
    let result = "";
    if(gameBoard[0] === 1 && gameBoard[1] === 1 && gameBoard[2] === 1) {
        result = "Player 1 Wins!"
    } else if(gameBoard[3] === 1 && gameBoard[4] === 1 && gameBoard[5] === 1) {
        result = "Player 1 Wins!"
    } else if(gameBoard[6] === 1 && gameBoard[7] === 1 && gameBoard[8] === 1) {
        result = "Player 1 Wins!"
    } else if(gameBoard[0] === 1 && gameBoard[3] === 1 && gameBoard[6] === 1) {
        result = "Player 1 Wins!"
    } else if(gameBoard[1] === 1 && gameBoard[4] === 1 && gameBoard[7] === 1) {
        result = "Player 1 Wins!"
    } else if(gameBoard[2] === 1 && gameBoard[5] === 1 && gameBoard[8] === 1) {
        result = "Player 1 Wins!"
    } else if(gameBoard[0] === 1 && gameBoard[4] === 1 && gameBoard[8] === 1) {
        result = "Player 1 Wins!"
    } else if(gameBoard[6] === 1 && gameBoard[4] === 1 && gameBoard[2] === 1) {
        result = "Player 1 Wins!"
    } else if(gameBoard[0] === 2 && gameBoard[1] === 2 && gameBoard[2] === 2) {
        result = "Player 2 Wins!"
    } else if(gameBoard[3] === 2 && gameBoard[4] === 2 && gameBoard[5] === 2) {
        result = "Player 2 Wins!"
    } else if(gameBoard[6] === 2 && gameBoard[7] === 2 && gameBoard[8] === 2) {
        result = "Player 2 Wins!"
    } else if(gameBoard[0] === 2 && gameBoard[3] === 2 && gameBoard[6] === 2) {
        result = "Player 2 Wins!"
    } else if(gameBoard[1] === 2 && gameBoard[4] === 2 && gameBoard[7] === 2) {
        result = "Player 2 Wins!"
    } else if(gameBoard[2] === 2 && gameBoard[5] === 2 && gameBoard[8] === 2) {
        result = "Player 2 Wins!"
    } else if(gameBoard[0] === 2 && gameBoard[4] === 2 && gameBoard[8] === 2) {
        result = "Player 2 Wins!"
    } else if(gameBoard[6] === 2 && gameBoard[4] === 2 && gameBoard[2] === 2) {
        result = "Player 2 Wins!"
    } else {
        result = "No winner yet";
    }
    console.log(result);
}
