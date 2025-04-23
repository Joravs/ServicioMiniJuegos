import { useEffect, useState } from "react";

const Index = () => {
    const [title, setTitle] = useState('MiniPl4yz');
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
      <div>
        <h1 className="Titulo"
          onMouseEnter={() => setTitle('Juega Ya!!')} 
          onMouseLeave={() => setTitle('MiniPl4yz')}
        >
          {title}
        </h1>
    
        {loading ? (
          <h3>Loading...</h3>
        ) : (
          result.games.original.juegos.map(game => (
            <div className="card col-sm-5 col-md my-3 border-white text-center bg-prpl" key={game.id}>
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