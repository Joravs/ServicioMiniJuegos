import { useEffect, useState } from "react";
import '../../../css/animations.css'
import 'animate.css'

const Index = () => {
    const [result, setResult] = useState({ games: [] , gamesFav: []});
    const [loading, setLoading] = useState(true);

    const fetchdata = async () => {
        const response = await fetch('/api/index');
        const data = await response.json();
        setResult(data);
        setLoading(false);
    };
    
    useEffect(() => {
        fetchdata();
    }, []);
    
    return (
      <div id="JuegosCards" className="mx-3 row gap-3">
        {loading ? (
          <h3>Loading...</h3>
        ) : (
          result.games.original.juegos.map(game => (
            <div id={`${game.nombre}`} className="card col-sm-6 col-md my-3 border-white text-center bg-prpl gameCard" 
                key={game.id}

                onMouseLeave={
                  (e)=>{
                    e.target.classList.remove('animate__animated');
                    e.target.classList.remove('animate__bounce');}}
              >
                <a href={`/catalog/${game.nombre}`}>
                    <img className="card-img-top juegos align-self-center img-fluid" src={`src/${game.nombre}.png`} alt={`${game.nombre} Logo`}/>
                    <div className="card-body bg-prpl">
                        <h4 className="card-title titulos fs-5 text-white">{ game.nombre }</h4>
                        <p className="card-text textos d-none d-md-block">{ game.info }</p>
                    </div>
                </a>
            </div>
          ))
        )}
      </div>
    );    
};

export default Index;