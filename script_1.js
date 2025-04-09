/* this is the old logic and script file with a bot and friend mode
it was replaced April 8 with an advanced bot mode and friend mode */


const gameModeSelection = document.getElementById('gameModeSelection');
const playerNameInput = document.getElementById('playerNameInput');
const gameContainer = document.getElementById('gameContainer');
const playBotButton = document.getElementById('playBot');
const playFriendButton = document.getElementById('playFriend');
const startGameBtn = document.getElementById('startGameBtn');
const playerXInput = document.getElementById('playerXName');
const playerOInput = document.getElementById('playerOName');
const playerXDisplay = document.getElementById('playerXDisplay');
const playerODisplay = document.getElementById('playerODisplay');
const cells = document.querySelectorAll('.cell');
const messageDisplay = document.querySelector('.message');
const restartButton = document.getElementById('restartBtn');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let playAgainstBot = false;

// Winning conditions
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Update the background based on the current player
function updateBackground() {
    if (!gameActive) return; // Do not update background if the game is over

    if (currentPlayer === 'X') {
        document.body.className = 'player1-turn'; // Set background for Player 1
    } else {
        document.body.className = 'player2-turn'; // Set background for Player 2
    }
}

// Handle game mode selection
playBotButton.addEventListener('click', () => {
    playAgainstBot = true;
    gameModeSelection.style.display = 'none';
    playerNameInput.style.display = 'block';
    playerOInput.value = 'Bot';
    playerOInput.disabled = true;
});

playFriendButton.addEventListener('click', () => {
    playAgainstBot = false;
    gameModeSelection.style.display = 'none';
    playerNameInput.style.display = 'block';
    playerOInput.value = '';
    playerOInput.disabled = false;
});

// Start the game
startGameBtn.addEventListener('click', () => {
    const playerX = playerXInput.value || 'Player X';
    const playerO = playAgainstBot ? 'Bot' : (playerOInput.value || 'Player O');

    playerXDisplay.textContent = playerX;
    playerODisplay.textContent = playerO;

    playerNameInput.style.display = 'none';
    gameContainer.style.display = 'block';

    updateMessage();
    updateBackground(); // Set initial background
});

// Handle cell click
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.dataset.index);

    if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameBoard[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    checkWin();

    if (gameActive) {
        if (playAgainstBot && currentPlayer === 'X') {
            currentPlayer = 'O';
            updateMessage();
            updateBackground();
            setTimeout(botMove, 500); // Bot makes a move after a short delay
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateMessage();
            updateBackground(); // Update background after turn change
        }
    }
}

//                      <!-- old logic Bot move logic -->
/* function botMove() {
    const emptyCells = gameBoard.reduce((acc, cell, index) => {
        if (cell === '') acc.push(index);
        return acc;
    }, []);

    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const botMoveIndex = emptyCells[randomIndex];

        gameBoard[botMoveIndex] = currentPlayer;
        cells[botMoveIndex].textContent = currentPlayer;

        checkWin();

        if (gameActive) {
            currentPlayer = 'X';
            updateMessage();
            updateBackground(); // Update background after bot's turn
        }
    }
} */

// Check for a win or draw
function checkWin() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            messageDisplay.textContent = `${currentPlayer} wins!`;
            gameActive = false;
            document.body.className = 'winner'; // Set background to green for winner
            restartButton.style.display = 'block';
            return;
        }
    }

    if (!gameBoard.includes('')) {
        messageDisplay.textContent = "It's a draw!";
        gameActive = false;
        document.body.className = 'draw'; // Set background to gray for draw
        restartButton.style.display = 'block';
    }
}

// Update the message display
function updateMessage() {
    messageDisplay.textContent = `${currentPlayer}'s turn`;
}

// Restart the game
restartButton.addEventListener('click', () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => (cell.textContent = ''));
    messageDisplay.textContent = '';
    restartButton.style.display = 'none';
    document.body.className = ''; // Reset background
    updateMessage();
    updateBackground(); // Set background for the first turn
});

// Add event listeners to cells
cells.forEach(cell => cell.addEventListener('click', handleCellClick));