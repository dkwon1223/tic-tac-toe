// GAME LOGIC

// GLOBAL VARIABLE(S)/DATA MODEL
let playerOne = null;
let playerTwo = null;
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

/* 
A function that creates the objects that store each players’ information
- properties should include: id (ex: 'one'), token (ex: '⭐️'), wins (ex: 0) 
*/

function createPlayerOne(token, id = 1) {
    playerOne = {
        token: token,
        id: id,
        wins: 0
    };
    return playerOne;
}

function createPlayerTwo(token, id = 2) {
    playerTwo = {
        token: token,
        id: id,
        wins: 0
    };
    return playerTwo;
}

// A function called increaseWins - increases the count of a player’s wins (should work for either player)

function increaseWins(player) {
    player.wins += 1;
    return player;
}

// A function that keeps track of the data for the game board

function renderGame() {
    if(!checkWin() && !checkDraw()) {
        turnStatus.innerText = trackTurn();
    } else {
        if(checkWin().includes("1")) {
            increaseWins(playerOne);
            turnStatus.innerText = checkWin();
        } else if(checkWin().includes("2")) {
            increaseWins(playerTwo);
            turnStatus.innerText = checkWin();
        } else if(checkDraw()) {
            turnStatus.innerText = checkDraw();
        }
    }

    winsP1.innerHTML = `Wins: ${playerOne.wins}`;
    winsP2.innerHTML = `Wins: ${playerTwo.wins}`;

    for(let i = 0; i < gameBoard.length; i++) {
        gameBoardDOM.children[i].innerHTML = gameBoard[i];
    }
}

function startGame() {
    for(let i = 0; i < gameBoard.length; i++) {
        let cell = document.createElement('div');
        cell.setAttribute('id', i);
        cell.setAttribute('class', "cell");
        cell.innerText = gameBoard[i];
        gameBoardDOM.appendChild(cell);
    }
}

// A function for playing a turn
function playTurn(index, playerObject) {
    if(gameBoard[index] === null) {
        turnCounter++;
        gameBoard[index] = playerObject.token;   
    } else {
        alert("Cannot play here!");
    }
}

// A function that keeps track of which player’s turn it currently is
function trackTurn() {  
    let statusMessage = "";
    if(turnCounter === 0 || turnCounter % 2 === 0) {
        statusMessage = `Player 1's Turn: ${playerOne.token}`;
    } else {
        statusMessage = `Player 2's Turn: ${playerTwo.token}`;
    }
    return statusMessage;
}

// A function that checks the game board data for win conditions

function checkWin() {
    let winningMessage = "";
    for(const condition of winCombos) {
        let [x, y, z] = condition
        if(gameBoard[x] && (gameBoard[x] === gameBoard[y] && gameBoard[x] === gameBoard[z])) {
            if(gameBoard[x] === playerOne.token) {
                gameBoardDOM.children[x].style.backgroundColor = "#343F71";
                gameBoardDOM.children[y].style.backgroundColor = "#343F71";
                gameBoardDOM.children[z].style.backgroundColor = "#343F71";
                winningMessage = `Player 1 Wins: ${playerOne.token}`;
                setTimeout(() => { resetGame(); }, 3000);
            } else {
                gameBoardDOM.children[x].style.backgroundColor = "#343F71";
                gameBoardDOM.children[y].style.backgroundColor = "#343F71";
                gameBoardDOM.children[z].style.backgroundColor = "#343F71";
                winningMessage = `Player 2 Wins: ${playerTwo.token}`;
                setTimeout(() => { resetGame(); }, 3000);
            }
        }
    }
    return winningMessage;
}

// A function that detects when a game is a draw (no one has won)

function checkDraw() {
    if(!gameBoard.includes(null) && !checkWin()) {
        setTimeout(() => { resetGame(); }, 3000);
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
    for(let i = 0; i < gameBoardDOM.children.length; i++) {
        gameBoardDOM.children[i].style.backgroundColor = "#7D94B5";
    }
    renderGame();
}

// DOM 


// Player Token Selection Query Selectors
let chooseIconButtonP1 = document.querySelector("#p1-emoji-button");
let emojiSelectorP1 = document.querySelector("#p1-emoji-selector");
let emojiListP1 = document.querySelector("#p1-emoji-list");
let emojiSearchP1 = document.querySelector("#p1-emoji-search");
let chooseIconButtonP2 = document.querySelector("#p2-emoji-button");
let emojiSelectorP2 = document.querySelector("#p2-emoji-selector");
let emojiListP2 = document.querySelector("#p2-emoji-list");
let emojiSearchP2 = document.querySelector("#p2-emoji-search");

// Player Info Section Query Selectors
let infoSectionP1 = document.querySelector("#p1-player-info");
let inputSectionP1 = document.querySelector("#p1-player-input");
let playerTokenP1 = document.querySelector("#p1-player-token");
let infoSectionP2 = document.querySelector("#p2-player-info");
let inputSectionP2 = document.querySelector("#p2-player-input");
let playerTokenP2 = document.querySelector("#p2-player-token");

// Rendering Game Query Selectors
let turnStatus = document.querySelector(".turn-status");
let winsP1 = document.querySelector("#p1-wins");
let winsP2 = document.querySelector("#p2-wins");

// Game Board Query Selectors
let gameBoardDOM = document.querySelector(".game-board");


// Player Token Selection
fetch("https://emoji-api.com/emojis?access_key=6a71a08e92cb8d400ad842d478278d769bc4aec4")
    .then(response => response.json())
    .then(data => loadEmojisP1(data))
    
fetch("https://emoji-api.com/emojis?access_key=6a71a08e92cb8d400ad842d478278d769bc4aec4")
    .then(response => response.json())
    .then(data => loadEmojisP2(data))
    
function loadEmojisP1(data) {
    data.forEach(emoji => {
        let listItem = document.createElement("li");
        listItem.setAttribute("emoji-name", emoji.slug);
        listItem.textContent = emoji.character;
        emojiListP1.appendChild(listItem);
    });
}

function loadEmojisP2(data) {
    data.forEach(emoji => {
        let listItem = document.createElement("li");
        listItem.setAttribute("emoji-name", emoji.slug);
        listItem.textContent = emoji.character;
        emojiListP2.appendChild(listItem);
    });
}

// Player Icon Selection Event Listeners

chooseIconButtonP1.addEventListener("click", () => {
    emojiSelectorP1.classList.toggle("hidden");
});
    
chooseIconButtonP2.addEventListener("click", () => {
    emojiSelectorP2.classList.toggle("hidden");
});

emojiSearchP1.addEventListener("keyup", (event) => {
    let value = event.target.value;
    let emojis = document.querySelectorAll("#p1-emoji-list li");
    emojis.forEach(emoji => {
        if(emoji.getAttribute("emoji-name").toLowerCase().includes(value)) {
            emoji.style.display = "flex";
        } else {
            emoji.style.display = "none";
        }
    });
});

emojiSearchP2.addEventListener("keyup", (event) => {
    let value = event.target.value;
    let emojis = document.querySelectorAll("#p2-emoji-list li");
    emojis.forEach(emoji => {
        if(emoji.getAttribute("emoji-name").toLowerCase().includes(value)) {
            emoji.style.display = "flex";
        } else {
            emoji.style.display = "none";
        }
    })
});

emojiListP1.addEventListener("click", (event) => {
    let icon = event.target.closest("li");
    infoSectionP1.classList.remove("hidden");
    inputSectionP2.classList.remove("hidden");
    inputSectionP1.classList.add("hidden");
    playerTokenP1.innerText = icon.innerHTML;
    createPlayerOne(icon.innerHTML);
});

emojiListP2.addEventListener("click", (event) => {
    let icon = event.target.closest("li");
    if(icon.innerHTML === playerOne.token) {
        alert("You cannot have the same emoji as your opponent! Select a different emoji!");
    } else {
        infoSectionP2.classList.remove("hidden");
        inputSectionP2.classList.add("hidden");
        playerTokenP2.innerText = icon.innerHTML;
        createPlayerTwo(icon.innerHTML);
        startGame();
        renderGame();
    }
});

// Game Board Event Listeners

gameBoardDOM.addEventListener("click", (event) => {
    if(playerTokenP1.innerHTML === "" || playerTokenP2.innerHTML === "") {
        alert("You cannot play yet... select icons");
    } else if (turnStatus.innerText.includes("Wins") || turnStatus.innerText.includes("Draw")) {
        alert("Wait for game to reset...");
    } else {
        if(trackTurn().includes("Player 1")) {
            playTurn((event.target.closest("div").id), playerOne);
            renderGame();
        } else if(trackTurn().includes("Player 2")) {
            playTurn((event.target.closest("div").id), playerTwo);
            renderGame();
        }
    }
})

