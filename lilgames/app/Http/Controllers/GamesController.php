<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Games;
use App\Models\GamesFav;
use Illuminate\Http\Request;

class GamesController extends Controller
{
    public function welcome()
    {
        $games = Games::all();
        $gamesFav = new GamesFavController();
        $gamesFav = $gamesFav->showFavs();
        return view('welcome', compact('games', 'gamesFav' ));
    }
    public function search(Request $request)
    {
        $search = $request->search;
        $games = Games::where('nombreJuego','like','%'.$search.'%')->paginate(5);
        return view('welcome', compact('games'));
    }
    public function buscaminas()
    {
        return Auth::check()?view('games.Buscaminas'):redirect()->route('login')->with('message','Debes iniciar sesión para jugar a este videojuego');
    }
    public function snake()
    {
        return Auth::check()?view('games.Snake'):redirect()->route('login')->with('message','Debes iniciar sesión para jugar a este videojuego');
    }
    public function stats()
    {
        return Auth::check()?view('stats.stats'):redirect()->route('login')->with('message','Debes iniciar sesión para ver las estadisticas');
    }
}
