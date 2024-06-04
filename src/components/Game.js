import React, { useState, useEffect } from 'react';
import Board from './Board';
import './Game.css';

function Game() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    if (!isXNext && !winner) {
      const computerMove = getComputerMove(board);
      if (computerMove !== -1) {
        const newBoard = board.slice();
        newBoard[computerMove] = 'O';
        setBoard(newBoard);
        setIsXNext(true);
        setWinner(calculateWinner(newBoard));
      }
    }
  }, [isXNext, winner, board]);

  const handleClick = (i) => {
    if (winner || board[i] || !isXNext) return;
    const newBoard = board.slice();
    newBoard[i] = 'X';
    setBoard(newBoard);
    setIsXNext(false);
    setWinner(calculateWinner(newBoard));
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const getComputerMove = (squares) => {
    const emptySquares = squares.reduce((acc, val, idx) => (val === null ? acc.concat(idx) : acc), []);
    return emptySquares.length > 0 ? emptySquares[Math.floor(Math.random() * emptySquares.length)] : -1;
  };

  return (
    <div className="game">
      <Board squares={board} onClick={handleClick} />
      <div className="game-info">
        {winner ? (
          <div className="status">Winner: {winner}</div>
        ) : (
          <div className="status">Next player: {isXNext ? 'X' : 'O'}</div>
        )}
        <button className="reset-button" onClick={resetGame}>
          Reset Game
        </button>
      </div>
    </div>
  );
}

export default Game;
