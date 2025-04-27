import { useEffect, useState } from "react";
import '../../../css/animations.css';
import 'animate.css';
import { Card, CardActionArea,CardContent, CardMedia,Typography, Grid, Box} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const Index = () => {
    const [result, setResult] = useState({ games: [] , gamesFav: []});
    const [loading, setLoading] = useState(true);

    const fetchdata = async () => {
      const response = await fetch('/api/index');
      const data = await response.json();
      setResult(data.games.juegos);
      setLoading(false);
    };
    
    useEffect(() => {
        fetchdata();
    }, []);

    return (
      <Box sx={{px:2,mx:'auto',my:3,maxWidth: { xs: '100%', sm: 540, md: 720, lg: 960, xl: 1140 }}}>
        <Grid container spacing={3}>
          {
            loading ? (
              <CircularProgress color='secondary' size="10rem" sx={{m: 'auto'}} />
            ) : (
              result.map((game)=>(
                <Grid size={{xs:12,sm:8,md:6,lg:3}} key={game.id}>
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
                  </Card>
                </Grid>
              ))
            )}
        </Grid>
      </Box>
    );    
};

export default Index;