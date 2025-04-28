import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardActionArea, CardContent, CardMedia, CircularProgress } from '@mui/material';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import getCsrfToken from '@/hooks/getToken';

export default function GamesFavShow() {
  const [favGames, setFavGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFavGames() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/catalog/fav', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': getCsrfToken(),
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error!: ${response.status}`);
        }
        const data = await response.json();
        setFavGames(data);
      } catch (err) {
        setError(err.message || 'Fallo al obtener los Favoritos');
      } finally {
        setLoading(false);
      }
    }

    fetchFavGames();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%" p={4}>
        <CircularProgress />
        <Typography variant="body1" color="textSecondary" ml={2}>
          Loading favorite games...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%" p={4}>
        <Typography color="error" variant="body1">{error}</Typography>
      </Box>
    );
  }

  if (favGames.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%" p={4}>
        <Typography variant="body1" color="textSecondary">
          Agrega Juegos para verlos aqui!
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ px: 2, mx: 'auto', my: 3, maxWidth: { xs: '100%', sm: 540, md: 720, lg: 960, xl: 1140 } }}>
      <Grid container spacing={3}>
        {favGames.map((game) => (
          <Grid item xs={12} sm={8} md={6} lg={3} key={game.idJuego || game.id} sx={{ position: 'relative' }}>
            <Card
              id={game.nombreJuego || game.nombre}
              className="gameCard"
              sx={{
                backgroundColor: '#514559',
                color: 'white',
                textAlign: 'center',
                border: '1px solid white',
                maxWidth: 320,
                height: 320,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
              }}
            >
              <CardActionArea href={`/catalog/${game.nombreJuego || game.nombre}`}>
                <CardMedia
                  component="img"
                  image={`src/${game.nombreJuego || game.nombre}.png`}
                  alt={`${game.nombreJuego || game.nombre} Logo`}
                  sx={{ height: 180, objectFit: 'contain', p: 2 }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6">{game.nombreJuego || game.nombre}</Typography>
                  <Typography variant="body2" className="d-none d-md-block">
                    {game.info || game.descripcion || 'No description available.'}
                  </Typography>
                </CardContent>
              </CardActionArea>
              {/* Favorite star icon could be added here if toggle functionality is implemented */}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
