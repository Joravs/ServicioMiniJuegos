import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../../../css/animations.css';
import 'animate.css';
import { Card, CardActionArea,CardContent, CardMedia,Typography, Grid, Box} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import StarIcon from '@mui/icons-material/Star';
import getCsrfToken from '@/hooks/getToken';
import APP__URL from '@/hooks/variables';
import apiFetch from '@/hooks/apiFetch';

const GamesFavShow = () => {
    const [resultFav, setResultFav] = useState({ gamesFav: []});
    const [loading, setLoading] = useState(true);
    let fav = 0;

    const fetchData = async () => {
      const data = await apiFetch(APP__URL + '/api/index');
      if(data){
        setResultFav(data.gamesFav);
        setLoading(false);
      }
    };
    
    useEffect(() => {
      fetchData();
    }, []);
    
    const fetchFavControl = async (idJuego) => {
      const result = await apiFetch(APP__URL + '/api/catalog/fav/control/' + idJuego, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': getCsrfToken(),
        },
      });;
      return result;
    };    

    const toggleFavorite = (game) => {
      let result = fetchFavControl(game.id)
      if (result)
        setResultFav(prev => prev.filter(favGame => favGame.id !== game.id));
    };

    return (
      <Box sx={{px:2,mx:'auto',my:3,maxWidth: { xs: '100%', sm: 540, md: 720, lg: 960, xl: 1140 }}}>
        <Grid container spacing={3}>
          {
            loading ? (
              <CircularProgress color='secondary' size="10rem" sx={{m: 'auto'}} />
            ) : (
              resultFav.map((game)=>(
                <Grid size={{xs:12,sm:8,md:6,lg:3}} key={game.id} sx={{ position: 'relative' }}>
                  <Card
                    id={`g${game.id}`}
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
                    <CardActionArea component={Link} to={`/catalog/g${game.id}`}>
                      <CardMedia
                        component="img"
                        image={`src/g${game.id}.png`}
                        alt={`${game.nombre} Logo`}
                        sx={{ height: 200, objectFit: 'contain', p: 2 }}
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
                        color: 'yellow',
                      }}
                    >
                      <StarIcon fontSize="large" />
                    </Box>
                  </Card>
                </Grid>
              ))
            )}
        </Grid>
      </Box>
    );    
};

export default GamesFavShow;