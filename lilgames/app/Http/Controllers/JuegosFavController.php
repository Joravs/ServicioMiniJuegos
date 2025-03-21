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
        $gamesfav = [];
        try{
            if (Auth::check()) {
                $hayJuegos = JuegosFav::where('idUsuario', Auth::id())->get();
                if (!$hayJuegos->isEmpty()) {
                    $gamesfav = Juegos::whereIn('id', $hayJuegos->pluck('idJuego'))->get();
                }
            }
        }catch(\Exception $e){
        }
        return compact('gamesfav');
    }
    public function controlFav($request)
    {
        $idJuego = $request;
        $idUsuario = Auth::id();
        $fav = JuegosFav::firstOrCreate(['idJuego'=>$idJuego,'idUsuario'=>$idUsuario]);
        dd($fav);
        if ($fav) {
            JuegosFav::destroy(['idJuego' => $idJuego, 'idUsuario' => $idUsuario]);
            return true;
        } else {
            JuegosFav::create(['idJuego' => $idJuego, 'idUsuario' => $idUsuario]);
            return false;
        }
    }
}
