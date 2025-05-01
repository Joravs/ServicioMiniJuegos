import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button, Box, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import getCsrfToken from '@/hooks/getToken';
import APP__URL from '@/hooks/variables';
import { useUser } from '$/component/levels/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const DIRECTIONS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};

const BOARD_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = DIRECTIONS.ArrowRight;
const SPEEDS = {
  slow: 300,
  normal: 150,
  fast: 75,
};

export default function Snake() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [speed, setSpeed] = useState('normal');
  const {addExperience} = useUser()

  const moveRef = useRef(direction);
  moveRef.current = direction;

  const foodRef = useRef(food);
  foodRef.current = food;

  const placeFood = useCallback((snakePositions) => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE),
      };
    } while (snakePositions.some(pos => pos.x === newFood.x && pos.y === newFood.y));
    setFood(newFood);
  }, []);

  const isCollision = (head, snakePositions) =>
    head.x < 0 || head.x >= BOARD_SIZE ||
    head.y < 0 || head.y >= BOARD_SIZE ||
    snakePositions.some(segment => segment.x === head.x && segment.y === head.y);

  const moveSnake = () => {
    setSnake(prevSnake => {
      const head = prevSnake[0];
      const newHead = {
        x: head.x + moveRef.current.x,
        y: head.y + moveRef.current.y
      };

      if (isCollision(newHead, prevSnake)) {
        setGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];
      if (newHead.x === foodRef.current.x && newHead.y === foodRef.current.y) {
        setScore(prev => prev + 1);
        placeFood(newSnake);
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const newDirection = DIRECTIONS[e.key];
      if (newDirection) {
        e.preventDefault();
        const lastDirection = moveRef.current;
        if (newDirection.x !== -lastDirection.x || newDirection.y !== -lastDirection.y) {
          setDirection(newDirection);
        }
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  

  useEffect(() => {
    if (gameOver) return;

    const interval = setInterval(moveSnake, SPEEDS[speed]);
    return () => clearInterval(interval);
  }, [gameOver, speed]);

  useEffect(() => {
    if (gameOver) {
      fetchStatPoints(score);
    }
  }, [gameOver]);

  const fetchStatPoints = async (finalScore) => {
    try {
      addExperience(finalScore,1,speed);
      
      const body = { record: finalScore, nombreJuego: 'Snake', lose: false };
      await fetch(APP__URL + '/api/newStat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': getCsrfToken(),
        },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error("Error al enviar los puntos", error);
    }
  };

  const restartGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood({ x: 5, y: 5 });
    setScore(0);
    setGameOver(false);
  };

  return (
    <Box sx={{ p: 4, textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
      <h1 className="titulos">🐍 Snake Game</h1>

      <FormControl sx={{ mb: 3, minWidth: 160 }}>
        <InputLabel id="speed-select-label">Velocidad</InputLabel>
        <Select
          labelId="speed-select-label"
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
          disabled={gameOver}
        >
          <MenuItem value="slow">🐢 Lento</MenuItem>
          <MenuItem value="normal">⚡ Normal</MenuItem>
          <MenuItem value="fast">🚀 Rápido</MenuItem>
        </Select>
      </FormControl>

      <div className="textos" style={{ marginBottom: '12px' }}>
        Puntuación: <strong>{score}</strong>
      </div>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(${BOARD_SIZE}, 22px)`,
          justifyContent: 'center',
          gap: '2px',
          mb: 3,
          userSelect: 'none',
          backgroundColor: 'grey.200',
          padding: '10px',
          borderRadius: '16px',
          boxShadow: 3,
        }}
      >
        {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, idx) => {
          const x = idx % BOARD_SIZE;
          const y = Math.floor(idx / BOARD_SIZE);
          const isSnake = snake.some(segment => segment.x === x && segment.y === y);
          const isHead = snake.length > 0 && snake[0].x === x && snake[0].y === y;
          const isFood = food.x === x && food.y === y;

          let bgColor = 'white';
          if (isFood) bgColor = '#d32f2f';
          if (isSnake) bgColor = '#0288d1';
          if (isHead) bgColor = '#0d47a1';

          return (
            <Box
              key={idx}
              sx={{
                width: 22,
                height: 22,
                backgroundColor: bgColor,
                borderRadius: '4px',
                boxShadow: isFood ? 'inset 0 0 4px #b71c1c' : 'inset 0 0 2px #ccc',
              }}
            />
          );
        })}
      </Box>

      {gameOver ? (
        <>
          <div className="titulos" style={{ color: '#d32f2f' }}>💀 ¡Juego Terminado!</div>
          <Button variant="contained" size="large" color="primary" onClick={restartGame} sx={{ mt: 2 }}>
            🔄 Reiniciar
          </Button>
        </>
      ) : (
        <div className="textos">
          Usa las <strong>flechas del teclado</strong> para mover la serpiente. Come la comida roja para crecer.
        </div>
      )}
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