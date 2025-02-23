<?php

namespace App\Http\Controllers;

use App\Models\Games;
use Illuminate\Http\Request;

class GamesController extends Controller
{
    public function welcome()
    {
        $games = Games::all();
        return view('welcome', compact('games'));
    }
    public function buscaminas()
    {
        return view('games.buscaminas');
    }
    public function snake()
    {
        return Auth::check()?view('games.snake'):redirect()->route('login') ->with('message','Debes iniciar sesión para jugar a este videjuego');
    }
}
