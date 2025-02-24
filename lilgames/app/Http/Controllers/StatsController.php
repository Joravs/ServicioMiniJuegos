<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Stats;
use App\Models\StatsPoint;
use App\Models\StatsTime;
use Illuminate\Support\Facades\Auth;

class StatsController extends Controller
{
    public function createFirst($id)
    {
        $games = new GamesController;
        $games = $games->juegos();
        foreach($games as $game){
            $stats = \DB::insert('INSERT INTO stats (idUsuario,idJuego,partidasJugadas) VALUES (:idUsuario,:idJuego ,0)', ['idUsuario' => $id, 'idJuego' => $game->idJuego]);
            if($game->tipo=='Tiempo'){
                $statsTime = \DB::insert('INSERT INTO statsTime (idUsuario,idJuego,recordTime) VALUES (:idUsuario,:idJuego , "00:00")', ['idUsuario' => $id,'idJuego' => $game->idJuego]);
            }else{
                $statsPoint = \DB::insert('INSERT INTO statsPoints (idUsuario,idJuego,recordPoints) VALUES (:idUsuario,:idJuego , 0)', ['idUsuario' => $id,'idJuego' => $game->idJuego]);
            }
        }
    }
    public function showStatsPoints()
    {
        $statsPuntos = \DB::select('SELECT nombreJuego,partidasJugadas,recordPoints from stats inner join statsPoints on (stats.idJuego = statsPoints.idJuego and stats.idUsuario = statsPoints.idUsuario)
         inner join juegos on stats.idJuego = juegos.idJuego
         where stats.idUsuario=:idUsuario order by recordPoints ASC LIMIT 1', ['idUsuario' => Auth::id()]);
        return compact('statsPuntos');
    }
    public function showStatsTime()
    {
        $statsTiempo = \DB::select('SELECT nombreJuego,partidasJugadas,recordTime from stats inner join statsTime on (stats.idJuego = statsTime.idJuego and stats.idUsuario = statsTime.idUsuario)
         inner join juegos on stats.idJuego = juegos.idJuego
         where stats.idUsuario=:idUsuario order by recordTime ASC LIMIT 1', ['idUsuario' => Auth::id()]);
        return compact('statsTiempo');
    }
}
