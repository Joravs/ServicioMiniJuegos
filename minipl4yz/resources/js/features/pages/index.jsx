import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import '../../../css/animations.css';
import 'animate.css';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Grid, Box, Alert, CircularProgress } from '@mui/material';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import getCsrfToken from '@/hooks/getToken';
import APP__URL from '@/hooks/variables';
import apiFetch from '@/hooks/apiFetch';
import { useAuth } from '$/auth/AuthContext';

const Index = () => {
  const [result, setResult] = useState({ games: [] });
  const [resultFav, setResultFav] = useState({ gamesFav: [] });
  const [loading, setLoading] = useState(true);
  const { isAuth } = useAuth();
  const location = useLocation();
  const [message, setMessage] = useState('');
  let fav = 0;

  const fetchData = async () => {
      const data = await apiFetch(APP__URL + '/api/index');
      if(data){
        setResult(data.games);
        setResultFav(data.gamesFav);
        setLoading(false);
      }
  };  

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (location.state && location.state.message) {
      setMessage(location.state.message);

      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const isFavorite = (game) => {
    return resultFav.some(favGame => favGame.id === game.id);
  };

  const toggleFavorite = async (game) => {  
    const result = await apiFetch(APP__URL + '/api/catalog/fav/control/' + game.id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': getCsrfToken(),
      },
    });

    if (isFavorite(game)) {
      if (result) {
        setResultFav(prev => prev.filter(favGame => favGame.id !== game.id));
      }
    } else {
      if (result) {
        setResultFav(prev => [...prev, game]);
      }
    }
  };  

  return (
    <Box sx={{ px: 2, mx: 'auto', my: 3, maxWidth: { xs: '100%', sm: 540, md: 720, lg: 960, xl: 1140 } }}>
      {message && <Alert severity="warning" sx={{ mb: 2 }}>{message}</Alert>}
      <Grid container spacing={3}>
        {
          loading ? (
            <CircularProgress color='secondary' size="10rem" sx={{ m: 'auto' }} />
          ) : (
            result.map((game) => (
              <Grid size={{ xs: 12, sm: 8, md: 6, lg: 3 }} key={game.id} sx={{ position: 'relative' }}>
                <Card
                  id={game.nombre}
                  className="gameCard animate__animated"
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
                  <CardActionArea component={Link} to={`/catalog/${game.nombre}`}>
                    <CardMedia
                      component="img"
                      image={`src/${game.nombre}.png`}
                      alt={`${game.nombre} Logo`}
                      sx={{ height: 180, objectFit: 'contain', p: 2 }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6">{game.nombre}</Typography>
                      <Typography variant="body2" className="d-none d-md-block">
                        {game.info}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <Box
                    onClick={() => toggleFavorite(game)}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      cursor: 'pointer',
                      color: isFavorite(game) ? 'yellow' : 'white',
                    }}
                  >
                    {isAuth ? (isFavorite(game) ? <StarIcon fontSize="large" /> : <StarOutlineIcon fontSize="large" />) : ''}
                  </Box>
                </Card>
              </Grid>
            ))
          )
        }
      </Grid>
    </Box>
  );
};

export default Index;