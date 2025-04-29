<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Stats;
use App\Models\StatsPoints;
use App\Models\StatsTime;
use App\Models\Juegos;
use Illuminate\Support\Facades\Auth;

class StatsController extends Controller
{
    public function createFirst($id)
    {
        $games = (new JuegosController)->juegos();
        $statsData = [];
        $statsTimeData = [];
        $statsPointsData = [];

        foreach ($games as $game) {
            $statsData[] = ['idUsuario' => $id, 'idJuego' => $game->id];
            if ($game->tipo == 'Tiempo') {
                $statsTimeData[] = ['idUsuario' => $id, 'idJuego' => $game->id];
            } else {
                $statsPointsData[] = ['idUsuario' => $id, 'idJuego' => $game->id];
            }
        }

        Stats::insert($statsData);
        if (!empty($statsTimeData)) {
            StatsTime::insert($statsTimeData);
        }
        if (!empty($statsPointsData)) {
            StatsPoints::insert($statsPointsData);
        }
    }

    public function updateOrCreate($idJuego, $tipo)
    {
        $users = Usuario::all();
        $statsData = [];
        $statsTimeData = [];
        $statsPointsData = [];

        foreach ($users as $user) {
            $statsData[] = ['idJuego' => $idJuego, 'idUsuario' => $user->id, 'partidasJugadas' => 0];
            if ($tipo == 'Tiempo') {
                $statsTimeData[] = ['idJuego' => $idJuego, 'idUsuario' => $user->id, 'recordTime' => '00:00'];
            } else if ($tipo == 'Puntos') {
                $statsPointsData[] = ['idJuego' => $idJuego, 'idUsuario' => $user->id, 'recordPoints' => 0];
            }
        }

        foreach ($statsData as $data) {
            Stats::updateOrCreate(
                ['idJuego' => $data['idJuego'], 'idUsuario' => $data['idUsuario']],
                ['partidasJugadas' => $data['partidasJugadas']]
            );
        }

        foreach ($statsTimeData as $data) {
            StatsTime::updateOrCreate(
                ['idJuego' => $data['idJuego'], 'idUsuario' => $data['idUsuario']],
                ['recordTime' => $data['recordTime']]
            );
        }

        foreach ($statsPointsData as $data) {
            StatsPoints::updateOrCreate(
                ['idJuego' => $data['idJuego'], 'idUsuario' => $data['idUsuario']],
                ['recordPoints' => $data['recordPoints']]
            );
        }
    }

    public function showStatsPoints()
    {
        return Stats::join('statsPoints', function ($join) {
            $join->on('stats.idJuego', '=', 'statsPoints.idJuego')
                ->on('stats.idUsuario', '=', 'statsPoints.idUsuario');
        })
        ->join('juegos', 'stats.idJuego', '=', 'juegos.id')
        ->where('stats.idUsuario', Auth::id())
        ->orderBy('statsPoints.recordPoints', 'ASC')
        ->get(['juegos.nombre', 'stats.partidasJugadas', 'statsPoints.recordPoints']);
    }

    public function showStatsTime()
    {
        return Stats::join('statsTime', function ($join) {
            $join->on('stats.idJuego', '=', 'statsTime.idJuego')
                ->on('stats.idUsuario', '=', 'statsTime.idUsuario');
        })
        ->join('juegos', 'stats.idJuego', '=', 'juegos.id')
        ->where('stats.idUsuario', Auth::id())
        ->orderBy('statsTime.recordTime', 'ASC')
        ->get(['juegos.nombre', 'stats.partidasJugadas', 'statsTime.recordTime']);
    }

    public function newStat(Request $request)
    {
        $user = Auth::id();
        $Juego = Juegos::where('nombre', 'like', $request->nombreJuego)->first();
        if (!$Juego) {
            return response()->json(['error' => 'Juego no encontrado'], 404);
        }

        \DB::update('UPDATE stats SET partidasJugadas = partidasJugadas + 1 WHERE idJuego = ? AND idUsuario = ?', [$Juego->id, $user]);

        if (!$request->lose) {
            return response()->json(false);
        }

        if ($Juego->tipo == 'Tiempo') {
            $recordTimeResult = \DB::select('SELECT recordTime FROM statsTime where idJuego = :idJuego and idUsuario = :idUsuario', ['idJuego' => $Juego->id, 'idUsuario' => $user]);
            $recordTime = count($recordTimeResult) > 0 ? $recordTimeResult[0]->recordTime : null;
            if ($recordTime === null || $request->record < $recordTime) {
                StatsTime::updateOrCreate(['idJuego' => $Juego->id, 'idUsuario' => $user], ['recordTime' => $request->record]);
                return response()->json(true);
            }
        } else if ($Juego->tipo == 'Puntos') {
            $recordPointsResult = \DB::select('SELECT recordPoints FROM statsPoints where idJuego = :idJuego and idUsuario = :idUsuario', ['idJuego' => $Juego->id, 'idUsuario' => $user]);
            $recordPoints = count($recordPointsResult) > 0 ? $recordPointsResult[0]->recordPoints : null;
            if ($recordPoints === null || $request->record > $recordPoints) {
                StatsPoints::updateOrCreate(['idJuego' => $Juego->id, 'idUsuario' => $user], ['recordPoints' => $request->record]);
                return response()->json(true);
            }
        }
        return response()->json(false);
    }
}