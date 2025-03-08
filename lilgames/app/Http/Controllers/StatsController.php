<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Stats;
use App\Models\StatsPoints;
use App\Models\StatsTime;
use Illuminate\Support\Facades\Auth;

class StatsController extends Controller
{
    public function createFirst($id)
    {
        $games = new JuegosController;
        $games = $games->juegos();
        foreach($games as $game){
            $stats = Stats::create(['idUsuario' => $id, 'idJuego' => $game->id]);
          
            if($game->tipo=='Tiempo'){
                $statsTime = StatsTime::create(['idUsuario' => $id, 'idJuego' => $game->id]);
            }else{
                $statsPoints= StatsPoints::create(['idUsuario' => $id, 'idJuego' => $game->id]);
            }
        }
    }
    public function updateOrCreate($idJuego,$tipo)
    {
        $users = Usuario::all();
        foreach($users as $user){
            $stats = Stats::updateOrCreate(['idJuego' => $idJuego, 'idUsuario' => $user->id], ['partidasJugadas' => 0]);
            $statsTime = \DB::select('SELECT recordTime FROM statsTime where idJuego = :idJuego and idUsuario = :idUsuario',['idJuego' => $idJuego, 'idUsuario'=>$user->id]);
            $statsPoints = \DB::select('SELECT recordPoints FROM statsPoints where idJuego = :idJuego and idUsuario = :idUsuario',['idJuego' => $idJuego, 'idUsuario'=>$user->id]);
            
            if($tipo=='Tiempo'){
                if($statsPoints){
                    $statsPoints = StatsPoints::delete(['idJuego' => $idJuego, 'idUsuario' => $user->id]);
                }
                $statsTime = StatsTime::updateOrCreate(['idJuego' => $idJuego, 'idUsuario' => $user->id], ['recordTime' => '00:00']);
            }else if($tipo=='Puntos'){
                if($statsTime){
                    $statsTiempo = StatsTime::delete(['idJuego' => $idJuego, 'idUsuario' => $user->id]);
                }
                $statsPoints = StatsPoints::updateOrCreate(['idJuego' => $idJuego, 'idUsuario' => $user->id], ['recordPoints' => 0]);
            }
        }
    }
    public function showStatsPoints()
    {
        $statsPuntos = \DB::select('SELECT nombre,partidasJugadas,recordPoints from stats inner join statsPoints on (stats.idJuego = statsPoints.idJuego and stats.idUsuario = statsPoints.idUsuario)
         inner join juegos on stats.idJuego = juegos.id
         where stats.idUsuario=:idUsuario order by recordPoints ASC', ['idUsuario' => Auth::id()]);
        return compact('statsPuntos');
    }
    public function showStatsTime()
    {
        $statsTiempo = \DB::select('SELECT nombre,partidasJugadas,recordTime from stats inner join statsTime on (stats.idJuego = statsTime.idJuego and stats.idUsuario = statsTime.idUsuario)
         inner join juegos on stats.idJuego = juegos.id
         where stats.idUsuario=:idUsuario order by recordTime ASC', ['idUsuario' => Auth::id()]);
        return compact('statsTiempo');
    }
}