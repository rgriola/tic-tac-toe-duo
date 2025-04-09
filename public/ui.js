/*
April 9, 2025 - 12:01pm
This module will handle all DOM manipulation and UI updates.
*/

console.log('ui.js loaded');
export function updateMessage(messageDisplay, currentPlayer) {
    messageDisplay.textContent = `${currentPlayer}'s turn`;
}

export function updateBackground(currentPlayer, gameActive) {
    if (!gameActive) return;
    document.body.className = currentPlayer === 'X' ? 'player1-turn' : 'player2-turn';
}

export function resetUI(cells, messageDisplay, restartButton) {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winning');
    });
    messageDisplay.textContent = '';
    restartButton.style.display = 'none';
    document.body.className = '';
}