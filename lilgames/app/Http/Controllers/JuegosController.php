<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Juegos;
use Illuminate\Http\Request;

class JuegosController extends Controller
{
    public function welcome()
    {
        $games = $this->juegos();
        $gamesFav = new JuegosFavController();
        $gamesFav = $gamesFav->showFavs();
        return view('welcome', compact('games', 'gamesFav' ));
    }
    public function updateOrCreate(Request $request)
    {   
        $actualizar = ['tipo'=>$request->tipo];
        if($request->info!=null){
            $actualizar['info'] = $request->info;
        }
        $game = Juegos::updateOrCreate(['nombreJuego'=>$request->nombreJuego],$actualizar);
        $cg = new StatsController;
        $cg->updateOrCreate($game->idJuego,$game->tipo);
        return redirect('/')->with('message','Juego añadido correctamente');
    }
    public function createForm()
    {
        $user = Auth::user();
        return $user->idUsuario==1?view('control.games.create'):redirect('/');
    }
    public function juegos()
    {
        return Juegos::all();
    }
    public function search(Request $request)
    {
        $search = $request->search;
        $games = Juegos::where('nombreJuego','like','%'.$search.'%')->paginate(5);
        $gamesFav = new JuegosFavController();
        $gamesFav = $gamesFav->showFavs();
        return view('welcome', compact('games', 'gamesFav'));
    }
    public function buscaminas()
    {
        return Auth::check()?view('games.Buscaminas'):redirect('/')->with('message','Debes iniciar sesión para jugar a este videojuego');
    }
    public function snake()
    {
        return Auth::check()?view('games.Snake'):redirect('/')->with('message','Debes iniciar sesión para jugar a este videojuego');
    }
    public function chess()
    {
        return Auth::check()?view('games.Chess'):redirect('/')->with('message','Debes iniciar sesión para jugar a este videojuego');
    }
    public function stats()
    {
        $statsControl=new StatsController();
        $statsControlPuntos = $statsControl->showStatsPoints();
        $statsControlTime = $statsControl->showStatsTime();
        return Auth::check()?view('stats.stats', compact('statsControlPuntos','statsControlTime')):redirect('/')->with('message','Debes iniciar sesión para ver estas estadisticas');;
    }
    
}
