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
    public function createStats($idJuego,$tipo)
    {
        $users = \DB::select('SELECT idUsuario FROM usuarios');
        foreach($users as $key=>$user){
            $statsExistentes = \DB::select('SELECT partidasJugadas FROM stats where idJuego = :idJuego and idUsuario = :idUsuario',['idJuego' => $idJuego, 'idUsuario'=>$user->idUsuario]);
            $partidasJugadas = count($statsExistentes)>0?$statsExistentes[0]->partidasJugadas:0;
            
            if($statsExistentes){
                $updateOrCreate='update';
                $stats = \DB::update('UPDATE stats SET partidasJugadas = :partidasJugadas WHERE idJuego = :idJuego and idUsuario= :idUsuario',['idJuego'=>$idJuego, 'idUsuario' => $user->idUsuario,'partidasJugadas'=>$partidasJugadas]);
            }else{
                $updateOrCreate='insert';
                $stats = \DB::insert('INSERT INTO stats (idJuego,idUsuario,partidasJugadas) values (:idJuego,:idUsuario,:partidasJugadas)',['idJuego'=>$idJuego, 'idUsuario' => $user->idUsuario,'partidasJugadas'=>$partidasJugadas]);
            }
            $statsTime = \DB::select('SELECT recordTime FROM statsTime where idJuego = :idJuego and idUsuario = :idUsuario',['idJuego' => $idJuego, 'idUsuario'=>$user->idUsuario]);
            $statsPoints = \DB::select('SELECT recordPoints FROM statsPoints where idJuego = :idJuego and idUsuario = :idUsuario',['idJuego' => $idJuego, 'idUsuario'=>$user->idUsuario]);
            
            if($tipo=='Tiempo'){
                $time = count($statsTime)>0?$statsTime[0]->recordTime:"00:00";
                if($statsTime){
                    if($statsPoints){$statsPoints = \DB::delete('DELETE FROM statsPoints WHERE idJuego = :idJuego and idUsuario = :idUsuario', ['idJuego' => $idJuego, 'idUsuario'=>$user->idUsuario]);}                    
                    $statsTime = \DB::update('UPDATE statsTime SET recordTime = :recodTime WHERE idJuego = :idJuego and idUsuario= :idUsuario',['idJuego'=>$idJuego, 'idUsuario' => $user->idUsuario,'recodTime'=>$time]);
                }else{
                    if($statsPoints){$statsPoints = \DB::delete('DELETE FROM statsPoints WHERE idJuego = :idJuego and idUsuario = :idUsuario', ['idJuego' => $idJuego, 'idUsuario'=>$user->idUsuario]);}                    
                    $statsTime = \DB::insert('INSERT INTO statsTime (idJuego,idUsuario,recordTime) values (:idJuego,:idUsuario,:recodTime)',['idJuego'=>$idJuego, 'idUsuario' => $user->idUsuario,'recodTime'=>$time]);
                }
            }else if($tipo=='Puntos'){
                $points = count($statsPoints)>0?$statsPoints[0]->recordPoints:0;
                if($statsPoints){
                    if($statsTime){$statsTiempo = \DB::delete('DELETE FROM statsTime WHERE idJuego = :idJuego and idUsuario = :idUsuario', ['idJuego' => $idJuego, 'idUsuario'=>$user->idUsuario]);}
                    $statsPoints = \DB::update('UPDATE statsPoints SET recordPoints=:recordPoints WHERE idJuego = :idJuego and idUsuario= :idUsuario',['idJuego'=>$idJuego, 'idUsuario' => $user->idUsuario,'recordPoints'=>$points]);
                }else{
                    if($statsTime){$statsTiempo = \DB::delete('DELETE FROM statsTime WHERE idJuego = :idJuego and idUsuario = :idUsuario', ['idJuego' => $idJuego, 'idUsuario'=>$user->idUsuario]);}
                    $statsPoints = \DB::insert('INSERT INTO statsPoints (idJuego,idUsuario,recordPoints) values (:idJuego,:idUsuario,:recordPoints)',['idJuego'=>$idJuego, 'idUsuario' => $user->idUsuario,'recordPoints'=>$points]);
                }
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
