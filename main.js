// GAME LOGIC

// GLOBAL VARIABLE(S)/DATA MODEL
let turnCounter = 0;

let gameBoard = [
    null, null, null,
    null, null, null,
    null, null, null
];

const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


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

function renderGame() {
    
}

// A function for playing a turn
function playTurn(index, playerObject) {
    if(gameBoard[index] === null) {
        turnCounter++;
        gameBoard[index] = playerObject.token;   
        console.log("Track Turn:",trackTurn());
        console.log(gameBoard.slice(0,3));   
        console.log(gameBoard.slice(3,6));
        console.log(gameBoard.slice(6));
        console.log("Check Win:",checkWin());
        console.log("Check Draw:", checkDraw());
        console.log("\n");
    } else {
        console.log("Cannot play here");
    }
}

// A function that keeps track of which player’s turn it currently is
function trackTurn() {  
    if(turnCounter === 0 || turnCounter % 2 === 0) {
        return "Player 1's Turn";
    } else {
        return "Player 2's Turn";
    }
}

// A function that checks the game board data for win conditions

function checkWin() {
    for(const condition of winCombos) {
        let [x, y, z] = condition
        if(gameBoard[x] && (gameBoard[x] === gameBoard[y] && gameBoard[x] === gameBoard[z])) {
            resetGame();
            return [x, y, z];
        }
    }
    return false;
}

// A function that detects when a game is a draw (no one has won)

function checkDraw() {
    if(!gameBoard.includes(null) && !checkWin()) {
        resetGame();
        return "Draw";
    } else {
        return false;
    }
}

// A function that resets the game board’s data to begin a new game

function resetGame() {
    gameBoard = [
        null, null, null,
        null, null, null,
        null, null, null
    ];
}

let playerOne = createPlayer("P1", "⭐️");
let playerTwo = createPlayer("P2", "🩷");

console.log("Player One:",playerOne);
console.log("Player Two:",playerTwo);
console.log("\n");

playTurn(0, playerOne);
playTurn(1, playerTwo);
playTurn(3, playerOne);
playTurn(6, playerTwo);
playTurn(4, playerOne);
playTurn(5, playerTwo);
playTurn(7, playerOne);
playTurn(8, playerTwo);
playTurn(2, playerOne);




