/*
Updated April 9, 2025-12:33pm
This will act as the main entry point, importing and initializing the other modules.
*/
console.log('script.js loaded');
import { botMove } from './bot.js';
import { updateMessage, updateBackground, resetUI } from './ui.js';
import { checkWin } from './gameLogic.js';
import { handleCellClick, addEventListeners } from './events.js';

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
let isBotThinking = false;

// Game mode selection
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

// Start game
startGameBtn.addEventListener('click', () => {
    const playerX = playerXInput.value || 'Player X';
    const playerO = playAgainstBot ? 'Bot' : (playerOInput.value || 'Player O');

    playerXDisplay.textContent = playerX;
    playerODisplay.textContent = playerO;

    playerNameInput.style.display = 'none';
    gameContainer.style.display = 'block';

    updateMessage(messageDisplay, currentPlayer);
    updateBackground(currentPlayer, gameActive);
});

// Restart game
restartButton.addEventListener('click', () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    isBotThinking = false;
    resetUI(cells, messageDisplay, restartButton);
    updateMessage(messageDisplay, currentPlayer);
    updateBackground(currentPlayer, gameActive);
});

// Make a move (player or bot)
function makeMove(cellIndex) {
    if (!gameActive || gameBoard[cellIndex] !== '') return false;

    gameBoard[cellIndex] = currentPlayer;
    cells[cellIndex].textContent = currentPlayer;

    const result = checkWin(gameBoard, currentPlayer);
    if (result) {
        gameActive = false;
        if (result.winner === 'draw') {
            messageDisplay.textContent = "It's a draw!";
            document.body.className = 'draw';
        } else {
            messageDisplay.textContent = `${currentPlayer} wins!`;
            result.winningCells.forEach(index => cells[index].classList.add('winning'));
            document.body.className = 'winner';
        }
        restartButton.style.display = 'block';
        return false;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateMessage(messageDisplay, currentPlayer);
    updateBackground(currentPlayer, gameActive);
    return true;
}

// Handle player's move
function handleMove(cellIndex) {
    // Don't allow moves during bot's turn
    if (!gameActive || isBotThinking) return;
    
    // Make the player's move
    if (makeMove(cellIndex)) {
        // If it's the bot's turn
        if (playAgainstBot && currentPlayer === 'O' && gameActive) {
            isBotThinking = true;
            setTimeout(() => {
                const botIndex = botMove(gameBoard, cells, currentPlayer);
                if (botIndex !== undefined && gameBoard[botIndex] === '') {
                    makeMove(botIndex);
                }
                isBotThinking = false;
            }, 500);
        }
    }
}

// Update the cell click event listeners
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (playAgainstBot && currentPlayer === 'O') return; // Prevent clicks during bot's turn
        handleMove(index);
    });
});