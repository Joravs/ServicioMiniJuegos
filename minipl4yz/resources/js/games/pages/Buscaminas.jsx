import React, { useState, useEffect, useRef } from 'react';
import getCsrfToken from '@/hooks/getToken';
import APP__URL from '@/hooks/variables';

const DIFICULTADES = {
  facil: { rows: 9, cols: 9, mines: 10 },
  medio: { rows: 16, cols: 16, mines: 40 },
  dificil: { rows: 24, cols: 24, mines: 99 },
};

function crearTablero(rows, cols, minesCount) {
  const board = Array(rows)
    .fill(null)
    .map(() =>
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
            if (
              ni >= 0 &&
              ni < rows &&
              nj >= 0 &&
              nj < cols &&
              board[ni][nj].isMine
            ) {
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

  useEffect(() => {
    setBoard(crearTablero(rows, cols, mines));
    setGameOver(false);
    setGameWon(false);
    setTiempoTranscurrido(0);
  }, [dificultad, rows, cols, mines]);

  useEffect(() => {
    if (!gameOver && !gameWon) {
      timerRef.current = setInterval(() => {
        setTiempoTranscurrido((t) => t + 1);
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [gameOver, gameWon]);

  const revelarCelda = (row, col) => {
    if (gameOver || gameWon) return;
    const newBoard = board.map((r) => r.map((c) => ({ ...c })));

    if (newBoard[row][col].isRevealed || newBoard[row][col].isFlagged) return;

    newBoard[row][col].isRevealed = true;

    if (newBoard[row][col].isMine) {
      setGameOver(true);
      clearInterval(timerRef.current);
      fetchStatTime();
      alert('¡Juego Terminado! Has tocado una mina.');
      return;
    }

    if (newBoard[row][col].adjacentMines === 0) {
      revelarAdyacentes(newBoard, row, col);
    }

    setBoard(newBoard);

    if (verificarVictoria(newBoard)) {
      setGameWon(true);
      clearInterval(timerRef.current);
      fetchStatTime();
      alert('¡Felicidades! Has ganado!');
    }
  };

  const revelarAdyacentes = (board, row, col) => {
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        const nr = row + dr;
        const nc = col + dc;
        if (
          nr >= 0 &&
          nr < rows &&
          nc >= 0 &&
          nc < cols &&
          !board[nr][nc].isRevealed &&
          !board[nr][nc].isMine
        ) {
          board[nr][nc].isRevealed = true;
          if (board[nr][nc].adjacentMines === 0) {
            revelarAdyacentes(board, nr, nc);
          }
        }
      }
    }
  };

  const fetchStatTime = async ()=>{
    const body = {record: tiempoTranscurrido, nombreJuego: 'Buscaminas', lose: gameOver}
    const response = await fetch(APP__URL+'/api/newStat',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': getCsrfToken(),},
                body: JSON.stringify(body),
    })
    const result = await response.json()
    console.log(result)
  }

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
    setBoard(crearTablero(rows, cols, mines));
    setGameOver(false);
    setGameWon(false);
    setTiempoTranscurrido(0);
  };

  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      <h2>Buscaminas</h2>
      <div>
        <label htmlFor="difficulty-select">Seleccionar Dificultad: </label>
        <select
          id="difficulty-select"
          value={dificultad}
          onChange={(e) => setDificultad(e.target.value)}
          style={{ marginBottom: 10 }}
        >
          <option value="facil">Fácil (9x9, 10 minas)</option>
          <option value="medio">Medio (16x16, 40 minas)</option>
          <option value="dificil">Difícil (24x24, 99 minas)</option>
        </select>
      </div>
      <div>Tiempo Transcurrido: {tiempoTranscurrido} segundos</div>
      <button onClick={reiniciarJuego} style={{ margin: '10px 0' }}>
        Reiniciar Juego
      </button>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 30px)`,
          justifyContent: 'center',
          gap: 2,
        }}
      >
        {board.map((row, rIdx) =>
          row.map((cell, cIdx) => (
            <div
              key={`${rIdx}-${cIdx}`}
              onClick={() => revelarCelda(rIdx, cIdx)}
              onContextMenu={(e) => alternarBandera(e, rIdx, cIdx)}
              style={{
                width: 30,
                height: 30,
                backgroundColor: cell.isRevealed
                  ? cell.isMine
                    ? 'red'
                    : '#ddd'
                  : '#999',
                color: cell.isMine ? 'white' : 'black',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontWeight: 'bold',
                cursor: 'pointer',
                userSelect: 'none',
                border: '1px solid #555',
              }}
            >
              {cell.isRevealed && !cell.isMine && cell.adjacentMines > 0
                ? cell.adjacentMines
                : cell.isFlagged
                ? '🚩'
                : ''}
            </div>
          ))
        )}
      </div>
    </div>
  );
}