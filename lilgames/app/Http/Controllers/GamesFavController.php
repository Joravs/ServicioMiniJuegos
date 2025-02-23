<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Games;
use App\Models\GamesFav;
use Illuminate\Support\Facades\Auth;

class GamesFavController extends Controller
{
    public function favs()
    {
        $hayJuegos = \DB::select('SELECT idJuego FROM juegosFavs WHERE idUsuario = :idUsuario', ['idUsuario' => Auth::id()]);
        
        if (count($hayJuegos)>0) {
            $ids = array_map(function ($item) {
                return $item->idJuego;
            }, $hayJuegos);
            $gamesfav = Games::findMany($ids);
        } else {
            $gamesfav = collect([]);
        }

        return Auth::check()?view('games.favs', compact('gamesfav')):redirect()->route('login')->with('message','Debes iniciar sesión para ver tus juegos favoritos');
    }
    public function controlFav($request)
    {
        $idJuego = $request->idJuego;
        $idUsuario = Auth::id();
        $fav=GamesFav::where('idJuego', $idJuego)->where('idUsuario', $idUsuario)->get();
        if ($fav->isNotEmpty()) {
            $fav->first()->delete();
        } else {
            GamesFav::create(['idJuego' => $idJuego, 'idUsuario' => $idUsuario]);
        }
    }
}
