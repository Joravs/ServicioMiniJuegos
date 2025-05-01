import React, { useState, useEffect, useRef } from 'react';
import getCsrfToken from '@/hooks/getToken';
import APP__URL from '@/hooks/variables';
import { Box, Grid,Button, Typography,Select,MenuItem,FormControl, InputLabel,} from '@mui/material';
import { useUser } from '$/component/levels/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const DIFICULTADES = {
  facil: { rows: 9, cols: 9, mines: 10 },
  medio: { rows: 16, cols: 16, mines: 40 },
  dificil: { rows: 24, cols: 24, mines: 99 },
};

const PUNTOS_POR_DIFICULTAD = {
  facil: { base: 5, tiempoOptimo: 60 },
  medio: { base: 15, tiempoOptimo: 90 },
  dificil: { base: 30, tiempoOptimo: 120 },
};

function crearTablero(rows, cols, minesCount) {
  const board = Array(rows).fill(null).map(() =>
    Array(cols).fill({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      adjacentMines: 0,
    })
  );

  let minesPlaced = 0;
  while (minesPlaced < minesCount) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    if (!board[row][col].isMine) {
      board[row][col] = { ...board[row][col], isMine: true };
      minesPlaced++;
    }
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (!board[i][j].isMine) {
        let count = 0;
        for (let di = -1; di <= 1; di++) {
          for (let dj = -1; dj <= 1; dj++) {
            const ni = i + di;
            const nj = j + dj;
            if (ni >= 0 && ni < rows && nj >= 0 && nj < cols && board[ni][nj].isMine) {
              count++;
            }
          }
        }
        board[i][j] = { ...board[i][j], adjacentMines: count };
      }
    }
  }

  return board;
}

export default function Buscaminas() {
  const [dificultad, setDificultad] = useState('facil');
  const { rows, cols, mines } = DIFICULTADES[dificultad];
  const [board, setBoard] = useState(() => crearTablero(rows, cols, mines));
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [tiempoTranscurrido, setTiempoTranscurrido] = useState(0);
  const timerRef = useRef(null);
  const {user, addExperience} = useUser()

  useEffect(() => {
    setBoard(crearTablero(rows, cols, mines));
    setGameOver(false);
    setGameWon(false);
    setTiempoTranscurrido(0);
  }, [dificultad]);

  useEffect(() => {
    if (!gameOver && !gameWon) {
      timerRef.current = setInterval(() => {
        setTiempoTranscurrido((t) => t + 1);
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [gameOver, gameWon]);

  const calcularPuntajeFinal = (dificultad, tiempo) => {
      const { base, tiempoOptimo } = PUNTOS_POR_DIFICULTAD[dificultad];
      const t = Math.floor(Math.abs(tiempo - tiempoOptimo) / 5);
      const modificador = tiempo <= tiempoOptimo
        ? 1 + (t * 0.1)
        : 1 - (t * 0.1);
    
      const puntos = Math.max(Math.round(base * modificador), 1);
      return puntos;
    };

  const fetchStatTime = async (record, lose) => {
    const body = { record, nombreJuego: 'Buscaminas', lose };
    const difficulty = dificultad === 'facil' ? 1 : dificultad === 'medio' ? 2 : 3;
    addExperience(calcularPuntajeFinal(dificultad, record), difficulty, 1);
    try {
      await fetch(`${APP__URL}/api/newStat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': getCsrfToken(),
        },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error('Error al guardar estadísticas:', error);
    }
  };

  const revelarCelda = (row, col) => {
    if (gameOver || gameWon) return;
    const newBoard = board.map((r) => r.map((c) => ({ ...c })));

    if (newBoard[row][col].isRevealed || newBoard[row][col].isFlagged) return;

    newBoard[row][col].isRevealed = true;

    if (newBoard[row][col].isMine) {
      setGameOver(true);
      clearInterval(timerRef.current);
      fetchStatTime(tiempoTranscurrido, true);
      alert('💥 Juego Terminado. Tocaste una mina.');
      return;
    }

    if (newBoard[row][col].adjacentMines === 0) {
      revelarAdyacentes(newBoard, row, col);
    }

    setBoard(newBoard);

    if (verificarVictoria(newBoard)) {
      setGameWon(true);
      clearInterval(timerRef.current);
      fetchStatTime(tiempoTranscurrido, false);
      alert('🎉 ¡Ganaste!');
    }
  };

  const revelarAdyacentes = (board, row, col) => {
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        const nr = row + dr;
        const nc = col + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !board[nr][nc].isRevealed && !board[nr][nc].isMine) {
          board[nr][nc].isRevealed = true;
          if (board[nr][nc].adjacentMines === 0) {
            revelarAdyacentes(board, nr, nc);
          }
        }
      }
    }
  };

  const verificarVictoria = (board) => {
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (!board[r][c].isMine && !board[r][c].isRevealed) {
          return false;
        }
      }
    }
    return true;
  };

  const alternarBandera = (e, row, col) => {
    e.preventDefault();
    if (gameOver || gameWon) return;
    const newBoard = board.map((r) => r.map((c) => ({ ...c })));
    if (!newBoard[row][col].isRevealed) {
      newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
      setBoard(newBoard);
    }
  };

  const reiniciarJuego = () => {
    clearInterval(timerRef.current);
    setBoard(crearTablero(rows, cols, mines));
    setGameOver(false);
    setGameWon(false);
    setTiempoTranscurrido(0);
  };

  return (
    <Box p={2} textAlign="center">
      <Typography variant="h4" gutterBottom>
        🧨 Buscaminas
      </Typography>

      <FormControl sx={{ minWidth: 200, mb: 2 }}>
        <InputLabel>Dificultad</InputLabel>
        <Select
          value={dificultad}
          label="Dificultad"
          onChange={(e) => setDificultad(e.target.value)}
        >
          <MenuItem value="facil">Fácil (9x9, 10 minas)</MenuItem>
          <MenuItem value="medio">Medio (16x16, 40 minas)</MenuItem>
          <MenuItem value="dificil">Difícil (24x24, 99 minas)</MenuItem>
        </Select>
      </FormControl>

      <Typography variant="h6" gutterBottom>
        Tiempo: {tiempoTranscurrido} s
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={reiniciarJuego}
        sx={{ mb: 2 }}
      >
        Reiniciar Juego
      </Button>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 30px)`,
          gap: '2px',
          margin: '0 auto',
          border: '2px solid #333',
          p: 0.5,
          width: 'fit-content',
        }}
      >
        {board.map((row, rIdx) =>
          row.map((cell, cIdx) => (
            <Box
              key={`${rIdx}-${cIdx}`}
              onClick={() => revelarCelda(rIdx, cIdx)}
              onContextMenu={(e) => alternarBandera(e, rIdx, cIdx)}
              sx={{
                width: 30,
                height: 30,
                bgcolor: cell.isRevealed
                  ? cell.isMine
                    ? 'error.main'
                    : 'grey.300'
                  : 'grey.700',
                color: cell.isMine ? 'white' : 'black',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                userSelect: 'none',
                cursor: 'pointer',
                border: '1px solid #444',
              }}
            >
              {cell.isRevealed && !cell.isMine && cell.adjacentMines > 0
                ? cell.adjacentMines
                : cell.isFlagged
                ? '🚩'
                : ''}
            </Box>
          ))
        )}
      </Box>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={true}
        closeOnClick
        pauseOnHover
      />
    </Box>
  );
}