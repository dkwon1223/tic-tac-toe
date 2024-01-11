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
