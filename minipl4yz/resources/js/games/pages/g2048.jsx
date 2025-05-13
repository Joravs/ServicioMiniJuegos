import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import getCsrfToken from '@/hooks/getToken';
import APP__URL from '@/hooks/variables';
import { useUser } from '$/auth/UserContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SIZE = 4;
const createEmptyBoard = () => Array.from({ length: SIZE }, () => Array(SIZE).fill(0));

const getRandomEmptyCell = (board) => {
  const emptyCells = [];
  board.forEach((row, y) =>
    row.forEach((cell, x) => {
      if (cell === 0) emptyCells.push({ x, y });
    })
  );
  if (emptyCells.length === 0) return null;
  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
};

const addRandomTile = (board) => {
  const newBoard = board.map(row => [...row]);
  const cell = getRandomEmptyCell(newBoard);
  if (cell) newBoard[cell.y][cell.x] = Math.random() < 0.9 ? 2 : 4;
  return newBoard;
};

const cloneBoard = (board) => board.map(row => [...row]);

const G2048 = () => {
  const boardRef = useRef(null);
  const [board, setBoard] = useState(addRandomTile(addRandomTile(createEmptyBoard())));
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const { addExperience } = useUser();

  const fetchStatPoints = (finalScore) => {
    const body = { record: finalScore, nombreJuego: 'T2048', lose: false };
    fetch(APP__URL + '/api/newStat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': getCsrfToken(),
      },
      body: JSON.stringify(body),
    })
    .catch((error)=>console.error("Error al enviar los puntos", error));
  };

  const restartGame = () => {
    setBoard(addRandomTile(addRandomTile(createEmptyBoard())));
    setScore(0);
    setGameOver(false);
    boardRef.current.focus();
  };

  const moveRowLeft = (row) => {
    let newRow = row.filter(v => v !== 0);
    let gained = 0;

    for (let i = 0; i < newRow.length - 1; i++) {
      if (newRow[i] === newRow[i + 1]) {
        newRow[i] *= 2;
        gained += newRow[i];
        addExperience(newRow[i] / 5, 1, 1);
        newRow.splice(i + 1, 1);
      }
    }

    while (newRow.length < SIZE) newRow.push(0);
    return { newRow, gained };
  };

  const moveRowRight = (row) => {
    let newRow = row.filter(v => v !== 0);
    let gained = 0;

    for (let i = newRow.length - 1; i > 0; i--) {
      if (newRow[i] === newRow[i - 1]) {
        newRow[i] *= 2;
        gained += newRow[i];
        addExperience(newRow[i] / 5, 1, 1);
        newRow.splice(i - 1, 1);
      }
    }

    while (newRow.length < SIZE) newRow.unshift(0);
    return { newRow, gained };
  };

  const moveColumnUp = (board, colIdx) => {
    let column = board.map(row => row[colIdx]).filter(v => v !== 0);
    let gained = 0;

    for (let i = 0; i < column.length - 1; i++) {
      if (column[i] === column[i + 1]) {
        column[i] *= 2;
        gained += column[i];
        addExperience(column[i] / 5, 1, 1);
        column.splice(i + 1, 1);
      }
    }

    while (column.length < SIZE) column.push(0);

    for (let y = 0; y < SIZE; y++) {
      board[y][colIdx] = column[y];
    }

    return gained;
  };

  const moveColumnDown = (board, colIdx) => {
    let column = board.map(row => row[colIdx]).filter(v => v !== 0);
    let gained = 0;

    for (let i = column.length - 1; i > 0; i--) {
      if (column[i] === column[i - 1]) {
        column[i] *= 2;
        gained += column[i];
        addExperience(column[i] / 5, 1, 1);
        column.splice(i - 1, 1);
      }
    }

    while (column.length < SIZE) column.unshift(0);

    for (let y = 0; y < SIZE; y++) {
      board[y][colIdx] = column[y];
    }

    return gained;
  };

  const move = (dir) => {
    if (gameOver) return;

    let moved = false;
    let newBoard = cloneBoard(board);
    let newScore = score;

    if (dir === 'left') {
      for (let y = 0; y < SIZE; y++) {
        const before = newBoard[y].toString();
        const { newRow, gained } = moveRowLeft(newBoard[y]);
        newBoard[y] = newRow;
        newScore += gained;
        if (newRow.toString() !== before) moved = true;
      }
    }

    if (dir === 'right') {
      for (let y = 0; y < SIZE; y++) {
        const before = newBoard[y].toString();
        const { newRow, gained } = moveRowRight(newBoard[y]);
        newBoard[y] = newRow;
        newScore += gained;
        if (newRow.toString() !== before) moved = true;
      }
    }

    if (dir === 'up') {
      for (let x = 0; x < SIZE; x++) {
        const before = newBoard.map(r => r[x]).toString();
        const gained = moveColumnUp(newBoard, x);
        newScore += gained;
        if (newBoard.map(r => r[x]).toString() !== before) moved = true;
      }
    }

    if (dir === 'down') {
      for (let x = 0; x < SIZE; x++) {
        const before = newBoard.map(r => r[x]).toString();
        const gained = moveColumnDown(newBoard, x);
        newScore += gained;
        if (newBoard.map(r => r[x]).toString() !== before) moved = true;
      }
    }

    if (moved) {
      newBoard = addRandomTile(newBoard);
      setBoard(newBoard);
      setScore(newScore);
      if (checkGameOver(newBoard)) {
        setGameOver(true);
        fetchStatPoints(newScore);
      }
    }
  };

  const checkGameOver = (board) => {
    for (let y = 0; y < SIZE; y++) {
      for (let x = 0; x < SIZE; x++) {
        if (board[y][x] === 0) return false;
        if (x < SIZE - 1 && board[y][x] === board[y][x + 1]) return false;
        if (y < SIZE - 1 && board[y][x] === board[y + 1][x]) return false;
      }
    }
    return true;
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
        if (e.key === 'ArrowLeft') move('left');
        if (e.key === 'ArrowRight') move('right');
        if (e.key === 'ArrowUp') move('up');
        if (e.key === 'ArrowDown') move('down');
      }
    };

    const currentBoard = boardRef.current;
    if (currentBoard) {
      currentBoard.focus();
      currentBoard.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (currentBoard) currentBoard.removeEventListener('keydown', handleKeyDown);
    };
  }, [board]);

  const getTileColor = (value) => {
    switch (value) {
      case 0: return 'grey.200';
      case 2: return '#eee4da';
      case 4: return '#ede0c8';
      case 8: return '#f2b179';
      case 16: return '#f59563';
      case 32: return '#f67c5f';
      case 64: return '#f65e3b';
      case 128: return '#edcf72';
      case 256: return '#edcc61';
      case 512: return '#edc850';
      case 1024: return '#edc53f';
      case 2048: return '#edc22e';
      default: return '#3c3a32';
    }
  };

  return (
    <Box ref={boardRef} tabIndex={0} sx={{ p: 4, textAlign: 'center', outline: 'none' }}>
      <Typography variant="h4" className="titulos" gutterBottom>2048</Typography>
      <Typography variant="h6" className="textos">Puntuación: {score}</Typography>

      <Box sx={{ display: 'inline-grid', gridTemplateColumns: `repeat(${SIZE}, 80px)`, gap: '5px', backgroundColor: '#bbada0', p: '5px', borderRadius: '8px', mt: 3 }}>
        {board.flat().map((value, idx) => (
          <Paper key={idx} elevation={3} sx={{ width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: getTileColor(value), color: value > 4 ? '#f9f6f2' : '#776e65', fontSize: '1.5rem', fontWeight: 'bold', borderRadius: '4px' }}>
            {value !== 0 ? value : ''}
          </Paper>
        ))}
      </Box>

      {gameOver && <Typography variant="h5" color="error" sx={{ mt: 2 }} className="textos">¡Game Over!</Typography>}

      <Box sx={{ mt: 3 }}>
        <Button onClick={restartGame} variant="contained" color="secondary">Reiniciar</Button>
      </Box>

      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover />
    </Box>
  );
};

export default G2048;