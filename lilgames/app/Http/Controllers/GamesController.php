<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Games;
use Illuminate\Http\Request;

class GamesController extends Controller
{
    public function welcome()
    {
        $games = Games::all();
        return view('welcome', compact('games'));
    }
    public function search(Request $request)
    {
        $search = $request->search;
        $games = Games::where('nombreJuego','like','%'.$search.'%')->paginate(5);
        return view('welcome', compact('games'));
    }
    public function buscaminas()
    {
        return Auth::check()?view('games.buscaminas'):redirect()->route('login')->with('message','Debes iniciar sesión para jugar a este videojuego');
    }
    public function snake()
    {
        return Auth::check()?view('games.snake'):redirect()->route('login')->with('message','Debes iniciar sesión para jugar a este videojuego');
    }
    public function stats()
    {
        return Auth::check()?view('stats.stats'):redirect()->route('login')->with('message','Debes iniciar sesión para ver las estadisticas');
    }
}
