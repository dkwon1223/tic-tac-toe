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