<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Juegos;
use App\Models\JuegosFav;
use Illuminate\Support\Facades\Auth;

class JuegosFavController extends Controller
{
    public function favs()
    {
        return view('games.favs');
    }
    public function showFavs()
    {
        /* $hayJuegos = \DB::select('SELECT idJuego FROM juegosFavs WHERE idUsuario = :idUsuario', ['idUsuario' => Auth::id()]);
        if (count($hayJuegos)>0) {
            $ids = array_map(function ($item) {
                return $item->idJuego;
            }, $hayJuegos);
            $gamesfav = Juegos::findMany($ids);
        } else {
            $gamesfav = collect([]);
        } */
       $hayJuegos = JuegosFav::where('idUsuario',Auth::id());
       if($hayJuegos)
       {
        $gamesfav = Juegos::whereIn('idJuego', $hayJuegos->pluck('idJuego'))->get();
       }
        return compact('gamesfav');
    }
    public function controlFav($request)
    {
        $idJuego = $request;
        $idUsuario = Auth::id();
        $fav = JuegosFav::where('idJuego', $idJuego)->where('idUsuario', $idUsuario)->first();
        if ($fav) {
            \DB::delete('DELETE FROM juegosFavs WHERE idJuego = :idJuego AND idUsuario = :idUsuario', ['idJuego' => $idJuego, 'idUsuario' => $idUsuario]);
            return true;
        } else {
            \DB::insert('INSERT INTO juegosFavs (`idJuego`, `idUsuario`) VALUES (:idJuego , :idUsuario)', ['idJuego' => $idJuego, 'idUsuario' => $idUsuario]);
            return false;
        }
    }
}
