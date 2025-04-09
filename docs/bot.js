/* Bot Update April 9 12:29pm
Bot logic

*/
import { winningConditions } from './gameLogic.js';

export function botMove(gameBoard, cells, currentPlayer) {
    console.log('Bot thinking...', { gameBoard, currentPlayer });
    const bestMove = minimax(gameBoard, currentPlayer).index;
    console.log('Bot chose move:', bestMove);

    // Don't modify the game state here, just return the move
    return bestMove;
}

function minimax(newBoard, player) {
    const emptyCells = getEmptyCells(newBoard);

    if (checkWinner(newBoard, 'X')) {
        return { score: -10 };
    }
    if (checkWinner(newBoard, 'O')) {
        return { score: 10 };
    }
    if (emptyCells.length === 0) {
        return { score: 0 };
    }

    const moves = [];
    for (let i = 0; i < emptyCells.length; i++) {
        const move = {};
        move.index = emptyCells[i];
        newBoard[emptyCells[i]] = player;

        if (player === 'O') {
            const result = minimax(newBoard, 'X');
            move.score = result.score;
        } else {
            const result = minimax(newBoard, 'O');
            move.score = result.score;
        }

        newBoard[emptyCells[i]] = '';
        moves.push(move);
    }

    let bestMove;
    if (player === 'O') {
        let bestScore = -Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
}

function getEmptyCells(board) {
    return board.reduce((acc, cell, index) => {
        if (cell === '') acc.push(index);
        return acc;
    }, []);
}

function checkWinner(board, player) {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return board[a] === player && board[b] === player && board[c] === player;
    });
}