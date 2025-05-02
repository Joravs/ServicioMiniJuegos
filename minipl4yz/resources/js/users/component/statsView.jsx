import { useEffect, useState } from "react";
import { Box, Typography, Card, CardMedia, CardContent, CircularProgress, Fade } from "@mui/material";
import APP__URL from '@/hooks/variables';
import apiFetch from '@/hooks/apiFetch';
import 'animate.css';

export default function StatsView() {
  const [games, setGames] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState(null);

  const fetchStats = async () => {
    const data = await apiFetch(APP__URL + '/api/stats', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (data) {
      setStats(data.stats);
    }
  };
  
  const fetchGames = async () => {
    const data = await apiFetch(APP__URL + '/api/index');
    if (data) {
      setGames(data.games);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGames();
    fetchStats();
  }, []);

  const getStatsForGame = (gameId) => {
    return stats.find(stat => stat.nombre === gameId);
  };

  if (loading) {
    return <CircularProgress color="secondary" sx={{ m: 'auto', display: 'block' }} />;
  }

  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Typography variant="h4" align="center" sx={{ color: 'white', mb: 3 }}>
        Estadisticas
      </Typography>

      <Box sx={{
        display: 'flex',
        overflowX: 'auto',
        gap: 3,
        pb: 2,
        px: 1,
        backgroundColor: 'transparent'
      }}>
        {games.map((game) => (
          <Card
            key={game.id}
            onMouseEnter={() => setSelectedGame(game)}
            onMouseLeave={() => setSelectedGame(null)}
            className="animate__animated"
            sx={{
              minWidth: 220,
              maxWidth: 220,
              backgroundColor: selectedGame?.id === game.id ? 'rgba(108, 92, 231, 0.6)' : 'rgba(45, 52, 54, 0.5)',
              backdropFilter: 'blur(4px)',
              color: 'white',
              border: '1px solid #999',
              transition: 'transform 0.3s ease',
              transform: selectedGame?.id === game.id ? 'scale(1.05)' : 'scale(1)',
              cursor: 'pointer',
            }}
          >
            <CardMedia
              component="img"
              image={`/src/${game.nombre}.png`}
              alt={game.nombre}
              sx={{ height: 140, objectFit: 'contain', p: 2 }}
            />
            <CardContent>
              <Typography variant="h6">{game.nombre}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Fade in={Boolean(selectedGame)}>
        <Box
          sx={{
            mt: 4,
            p: 3,
            backgroundColor: 'rgba(34, 34, 34, 0.6)',
            backdropFilter: 'blur(5px)',
            borderRadius: 2,
            color: 'white',
            transition: '0.3s',
            minHeight: 100
          }}
        >
          {selectedGame && (() => {
            const stat = getStatsForGame(selectedGame.nombre);
            return (
              <>
                <Typography variant="h5" gutterBottom>
                  Estadísticas de {selectedGame.nombre}
                </Typography>
                {stat ? (
                  <>
                    <Typography>Partidas jugadas: {stat.partidasJugadas}</Typography>
                    {stat.recordTime && <Typography>Mejor Tiempo: {stat.recordTime}</Typography>}
                    {stat.recordPoints && <Typography>Record en Puntos: {stat.recordPoints}</Typography>}
                  </>
                ) : (
                  <Typography>No hay estadísticas disponibles.</Typography>
                )}
              </>
            );
          })()}
        </Box>
      </Fade>
    </Box>
  );
}