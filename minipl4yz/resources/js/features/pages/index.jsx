import { useEffect, useState } from "react";
import '../../../css/animations.css';
import 'animate.css';
import { Card, CardActionArea,CardContent, CardMedia,Typography, Grid, Box} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import getCsrfToken from '@/hooks/getToken';

const Index = () => {
    const [result, setResult] = useState({ games: []});
    const [resultFav, setResultFav] = useState({ gamesFav: []});
    const [loading, setLoading] = useState(true);
    let fav = 0;

    const fetchdata = async () => {
      const response = await fetch('/api/index');
      const data = await response.json();
      setResult(data.games);
      setResultFav(data.gamesFav)
      setLoading(false);
    };
    
    useEffect(() => {
        fetchdata();
    }, []);

    // Check if a game is favorite by id
    const isFavorite = (game) => {
      return resultFav.some(favGame => favGame.id === game.id);
    };
    const fetchFavControl = async(idJuego)=>{ 
      const response = await fetch('/api/catalog/fav/control/'+idJuego,{
          method: 'POST',
          headers: {'Content-Type': 'application/json',
              'X-CSRF-TOKEN': getCsrfToken(),},
      })
      const result = await response.json()

      return result
    }
    // Toggle favorite status of a game
    const toggleFavorite = (game) => {
      if (isFavorite(game)) {
        let result = fetchFavControl(game.id)
        if (result)
          setResultFav(prev => prev.filter(favGame => favGame.id !== game.id));
      } else {
        let result = fetchFavControl(game.id)
        if (result)
          setResultFav(prev => [...prev, game]);
      }
    };

    return (
      <Box sx={{px:2,mx:'auto',my:3,maxWidth: { xs: '100%', sm: 540, md: 720, lg: 960, xl: 1140 }}}>
        <Grid container spacing={3}>
          {
            loading ? (
              <CircularProgress color='secondary' size="10rem" sx={{m: 'auto'}} />
            ) : (
              result.map((game)=>(
                <Grid size={{xs:12,sm:8,md:6,lg:3}} key={game.id} sx={{ position: 'relative' }}>
                  <Card
                    id={game.nombre}
                    className="gameCard animate__animated"
                    sx={{
                      backgroundColor: '#514559',
                      color: 'white',
                      textAlign: 'center',
                      border: '1px solid white',
                      maxwidth: 320,
                      height: 320,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      position: 'relative',
                    }}
                  >
                    <CardActionArea href={`/catalog/${game.nombre}`}>
                      <CardMedia
                        component="img"
                        image={`src/${game.nombre}.png`}
                        alt={`${game.nombre} Logo`}
                        sx={{ height: 180, objectFit: 'contain', p: 2 }}
                      />
                      <CardContent sx={{flexFrow: 1}}>
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
                      {isFavorite(game) ? <StarIcon fontSize="large" /> : <StarOutlineIcon fontSize="large" />}
                    </Box>
                  </Card>
                </Grid>
              ))
            )}
        </Grid>
      </Box>
    );    
};

export default Index;
