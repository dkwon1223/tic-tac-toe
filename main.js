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

// GAME LOGIC METHODS

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

function increaseWins(player) {
    player.wins += 1;
    return player;
}

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
    loadGame.classList.add("hidden");

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
        saveButton.classList.remove("hidden");
        quitButton.classList.remove("hidden");
        loadGame.classList.add("hidden");
    }
}

function playTurn(index, playerObject) {
    if(gameBoard[index] === null) {
        turnCounter++;
        gameBoard[index] = playerObject.token;   
    } else {
        alert("Cannot play here!");
    }
}

function trackTurn() {  
    let statusMessage = "";
    if(turnCounter === 0 || turnCounter % 2 === 0) {
        statusMessage = `Player 1's Turn: ${playerOne.token}`;
    } else {
        statusMessage = `Player 2's Turn: ${playerTwo.token}`;
    }
    return statusMessage;
}

function checkWin() {
    let winningMessage = "";
    for(const condition of winCombos) {
        let [x, y, z] = condition;
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

function checkDraw() {
    if(!gameBoard.includes(null) && !checkWin()) {
        setTimeout(() => { resetGame(); }, 3000);
        return "Draw";
    } else {
        return false;
    }
}

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

// DOM RELATED JS

// Player Token Selection Query Selectors
let chooseIconButtonP1 = document.querySelector("#p1EmojiButton");
let emojiSelectorP1 = document.querySelector("#p1EmojiSelector");
let emojiListP1 = document.querySelector("#p1EmojiList");
let emojiSearchP1 = document.querySelector("#p1EmojiSearch");

let chooseIconButtonP2 = document.querySelector("#p2EmojiButton");
let emojiSelectorP2 = document.querySelector("#p2EmojiSelector");
let emojiListP2 = document.querySelector("#p2EmojiList");
let emojiSearchP2 = document.querySelector("#p2EmojiSearch");

// Player Info Section Query Selectors
let infoSectionP1 = document.querySelector("#p1PlayerInfo");
let inputSectionP1 = document.querySelector("#p1PlayerInput");
let playerTokenP1 = document.querySelector("#p1PlayerToken");

let infoSectionP2 = document.querySelector("#p2PlayerInfo");
let inputSectionP2 = document.querySelector("#p2PlayerInput");
let playerTokenP2 = document.querySelector("#p2PlayerToken");

// Render Game Query Selectors
let turnStatus = document.querySelector(".turn-status");
let winsP1 = document.querySelector("#p1Wins");
let winsP2 = document.querySelector("#p2Wins");

// Game Board Query Selectors
let gameBoardDOM = document.querySelector(".game-board");
let loadGame = document.querySelector(".load-game");
let savedGame = document.querySelector("#savedGame");
let saveButton = document.querySelector("#saveButton");
let quitButton = document.querySelector("#quitButton");

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
    let emojis = document.querySelectorAll("#p1EmojiList li");
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
    let emojis = document.querySelectorAll("#p2EmojiList li");
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

// Extension Event Listeners

quitButton.addEventListener("click", () => {
    location.reload();
})

saveButton.addEventListener("click", () => {
    if(JSON.stringify(localStorage).includes("game")) {
        let verifyOverwrite = prompt("This will overwrite your previous saved game. Type Y to continue or N to cancel.");
        if(verifyOverwrite === "Y") {
            let gameState = {
                p1: playerOne,
                p2: playerTwo,
                turnCount: turnCounter,
                game: gameBoard, 
                date: Date.now()
            }
        
            let gameStateSerialized = JSON.stringify(gameState);
            localStorage.setItem("gameState", gameStateSerialized);
            let gameStateDeserialized = JSON.parse(localStorage.getItem("gameState"));
            return gameStateDeserialized;
        } else if(verifyOverwrite === "N") {
            return;
        } else {
            alert("Invalid response!");
        }
    } else {
        let gameState = {
            p1: playerOne,
            p2: playerTwo,
            turnCount: turnCounter,
            game: gameBoard, 
            date: Date.now()
        }
    
        let gameStateSerialized = JSON.stringify(gameState);
        localStorage.setItem("gameState", gameStateSerialized);
        let gameStateDeserialized = JSON.parse(localStorage.getItem("gameState"));
        return gameStateDeserialized;
    }
})

addEventListener("load", () => {
    if(JSON.stringify(localStorage).includes("game")) {
        loadGame.classList.remove("hidden");
        let game = document.createElement("div");
        game.setAttribute("id", "savedGame");
        game.innerHTML = `Saved Game: ${Date(JSON.parse(localStorage.gameState).date)} <button id="deleteSavedGame">X</button>`;
        loadGame.appendChild(game);
    } else {
        loadGame.classList.add("hidden");
    }
})

loadGame.addEventListener("click", (event) => {
    if(event.target.id === "savedGame") {
        startGame();
        gameBoard = JSON.parse(localStorage.gameState).game;
        turnCounter = JSON.parse(localStorage.gameState).turnCount;
        playerOne = JSON.parse(localStorage.gameState).p1;
        playerTwo = JSON.parse(localStorage.gameState).p2;
        playerTokenP1.innerText = playerOne.token;
        playerTokenP2.innerText = playerTwo.token;
            
        inputSectionP1.classList.add("hidden");
        inputSectionP2.classList.add("hidden");

        infoSectionP1.classList.remove("hidden");
        infoSectionP2.classList.remove("hidden");
        renderGame(); 
    }
})

loadGame.addEventListener("click", (event) => {
    if(event.target.id === "deleteSavedGame") {
        localStorage.removeItem("gameState");
        location.reload();
    }
})

