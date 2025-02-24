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
        return view('games.favs');
    }
    public function showFavs()
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
        return compact('gamesfav');
    }
    public function controlFav($request)
    {
        $idJuego = $request;
        $idUsuario = Auth::id();
        $fav = GamesFav::where('idJuego', $idJuego)->where('idUsuario', $idUsuario)->first();
        if ($fav) {
            \DB::delete('DELETE FROM juegosFavs WHERE idJuego = :idJuego AND idUsuario = :idUsuario', ['idJuego' => $idJuego, 'idUsuario' => $idUsuario]);
            return true;
        } else {
            \DB::insert('INSERT INTO juegosFavs (`idJuego`, `idUsuario`) VALUES (:idJuego , :idUsuario)', ['idJuego' => $idJuego, 'idUsuario' => $idUsuario]);
            return false;
        }
    }
}
