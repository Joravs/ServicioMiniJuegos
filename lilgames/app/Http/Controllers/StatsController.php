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
    public function updateOrCreateStats($idJuego)
    {
        $users = \DB::select('SELECT idUsuario FROM usuarios');
        $statsExistentes = \DB::select('SELECT partidasJugadas FROM stats where idJuego = :idJuego',['idJuego' => $idJuego]);
        $statsTime = \DB::select('SELECT recordPoints FROM statsTime where idJuego = :idJuego',['idJuego' => $idJuego]);
        $statsPoint = \DB::select('SELECT recordTime FROM statsPoints where idJuego = :idJuego',['idJuego' => $idJuego]);
        $partidasJugadas=count($statsExistentes)>0?$statsExistentes->partidasJugadas:0; 
        $tiempo=count($statsTime)>0?$tiempo=$statsTime->recordTime:0; 
        $puntos=count($statsPoint)>0?$statsPoint->recordPoints:0;
        foreach($users as $user){
            $stats = Stats::updateOrCreate(['idJuego'=>$idJuego, 'idUsuario' => $user->idUsuario], ['partidasJugadas'=>$partidasJugadas]);
            if($game->tipo=='Tiempo'){
                $statsTime = StatsTime::updateOrCreate(['idUsuario' => $user->idUsuario,'idJuego' => $idJuego],['recordTime'=>$tiempo]);
            }else{
                $statsPoint = StatsPoints::updateOrCreate(['idUsuario' => $user->idUsuario,'idJuego' => $idJuego],['recordPoints'=>$puntos]);
            }
        }
    }
    public function showStatsPoints()
    {
        $statsPuntos = \DB::select('SELECT nombreJuego,partidasJugadas,recordPoints from stats inner join statsPoints on (stats.idJuego = statsPoints.idJuego and stats.idUsuario = statsPoints.idUsuario)
         inner join juegos on stats.idJuego = juegos.idJuego
         where stats.idUsuario=:idUsuario order by recordPoints ASC', ['idUsuario' => Auth::id()]);
        return compact('statsPuntos');
    }
    public function showStatsTime()
    {
        $statsTiempo = \DB::select('SELECT nombreJuego,partidasJugadas,recordTime from stats inner join statsTime on (stats.idJuego = statsTime.idJuego and stats.idUsuario = statsTime.idUsuario)
         inner join juegos on stats.idJuego = juegos.idJuego
         where stats.idUsuario=:idUsuario order by recordTime ASC', ['idUsuario' => Auth::id()]);
        return compact('statsTiempo');
    }
}
