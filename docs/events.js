/*
April 9, 2025 12:01pm   
This module will handle all event listeners and their logic.
*/
console.log('events.js: loaded');
import { checkWin } from './gameLogic.js';
import { updateMessage, updateBackground } from './ui.js';

export function handleCellClick(event, gameBoard, currentPlayer, gameActive, playAgainstBot, cells, messageDisplay, restartButton, botMove) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.dataset.index);

    if (gameBoard[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameBoard[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    const result = checkWin(gameBoard, currentPlayer);

    if (result) {
        if (result.winner === 'draw') {
            messageDisplay.textContent = "It's a draw!";
            document.body.className = 'draw';
        } else {
            messageDisplay.textContent = `${result.winner} wins!`;
            result.winningCells.forEach(index => cells[index].classList.add('winning'));
            document.body.className = 'winner';
        }
        restartButton.style.display = 'block';
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateMessage(messageDisplay, currentPlayer);
    updateBackground(currentPlayer, gameActive);

    if (playAgainstBot && currentPlayer === 'O') {
        setTimeout(() => botMove(gameBoard, cells, currentPlayer), 500);
    }
}

// Add event listeners to all cells
export function addEventListeners(cells, callback) {
    cells.forEach((cell, index) => {
        cell.addEventListener('click', (event) => callback(event, index));
    });
}