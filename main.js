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
