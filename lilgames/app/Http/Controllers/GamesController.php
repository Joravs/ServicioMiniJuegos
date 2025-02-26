<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Games;
use Illuminate\Http\Request;

class GamesController extends Controller
{
    public function welcome()
    {
        $games = $this->juegos();
        $gamesFav = new GamesFavController();
        $gamesFav = $gamesFav->showFavs();
        return view('welcome', compact('games', 'gamesFav' ));
    }
    public function updateOrCreate(Request $request)
    {
        $game = Games::updateOrCreate(['nombreJuego'=>$request->nombreJuego],[$validateData]);
        $cg = new StatsController;
        $cg->updateOrCreateStats($game->idJuego);
        return redirect()->route('index')->with('message','Juego añadido correctamente');
    }
    public function createForm()
    {
        return view('games.create');
    }
    public function juegos()
    {
        return Games::all();
    }
    public function search(Request $request)
    {
        $search = $request->search;
        $games = Games::where('nombreJuego','like','%'.$search.'%')->paginate(5);
        $gamesFav = new GamesFavController();
        $gamesFav = $gamesFav->showFavs();
        return view('welcome', compact('games', 'gamesFav'));
    }
    public function buscaminas()
    {
        return Auth::check()?view('games.Buscaminas'):redirect()->route('index')->with('message','Debes iniciar sesión para jugar a este videojuego');
    }
    public function snake()
    {
        return Auth::check()?view('games.Snake'):redirect()->route('index')->with('message','Debes iniciar sesión para jugar a este videojuego');
    }
    public function chess()
    {
        return Auth::check()?view('games.Chess'):redirect()->route('index')->with('message','Debes iniciar sesión para jugar a este videojuego');
    }
    public function stats()
    {
        $statsControl=new StatsController();
        $statsControlPuntos = $statsControl->showStatsPoints();
        $statsControlTime = $statsControl->showStatsTime();
        return Auth::check()?view('stats.stats', compact('statsControlPuntos','statsControlTime')):redirect()->route('index')->with('message','Debes iniciar sesión para ver estas estadisticas');;
    }
    
}
