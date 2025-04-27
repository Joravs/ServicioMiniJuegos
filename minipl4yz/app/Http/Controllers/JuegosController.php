<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Juegos;
use Illuminate\Http\Request;

class JuegosController extends Controller
{
    public function index()
    {
        $games = $this->juegos();
        $gamesFav = new JuegosFavController();
        $gamesFav = $gamesFav->showFavs();
        return response()->json([
            'games' => $games, 'gamesFav' => $gamesFav
        ]);
    }

    public function updateOrCreate(Request $request)
    {   
        $actualizar = ['tipo'=>$request->tipo];
        if($request->info!=null){
            $actualizar['info'] = $request->info;
        }
        $game = Juegos::updateOrCreate(['nombreJuego'=>$request->nombreJuego],$actualizar);
        $cg = new StatsController;
        $cg->updateOrCreate($game->idJuego,$game->tipo);
        return response()->json(['message'=>'Juego añadido correctamente']);
    }

    public function createForm()
    {
        if (Auth::check()) {
            $user = Auth::user();
            return $user->idUsuario == 1 ? ['Auth' => true] : ['Auth' => false];
        }
        return ['Auth' => false];
    }

    public function juegos()
    {
        return ['juegos'=>Juegos::all()];
    }
    
    public function search(Request $request)
    {
        $search = $request->search;
        $games = Juegos::where('nombre','like','%'.$search.'%')->paginate(5);
        $gamesFavController = new JuegosFavController();
        $gamesFav = $gamesFavController->showFavs();
        $favorites = $gamesFav['gamesfav'] ?? [];
        return response()->json([
            'games' => $games, 'favorites' => $favorites
        ]);
    }

    public function accesoJuego()
    {
        if (Auth::check()) {
            $user = Auth::user();
            return ['Auth' => true];
        }
        return response()->json(['message'=>'Debes iniciar sesión para jugar a este videojuego']);
    }

    public function stats()
    {
        $statsControl=new StatsController();
        $statsControlPuntos = $statsControl->showStatsPoints();
        $statsControlTime = $statsControl->showStatsTime();
        return Auth::check()?response()->json(
            ['points' => $statsControlPuntos, 'time' => $statsControlTime]
        ):response()->json(['message'=>'Debes iniciar sesión para ver tus estadisticas']);
    }
}
