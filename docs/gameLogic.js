/*
April 9, 2024 - 12:02pm 
This module will handle the core game logic, such as checking for wins 
and updating the game board.
*/
console.log('gameLogic: loaded');
export const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

export function checkWin(gameBoard, currentPlayer) {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return { winner: currentPlayer, winningCells: condition };
        }
    }
    return gameBoard.includes('') ? null : { winner: 'draw' };
}