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
    public function juegos()
    {
        return Juegos::all();
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

    public function updateGame(Request $request)
    {
        $game = Juegos::where('id',$request->id)->first();

        $request->validate([
            'nombre' => 'nullable|string|max:255',
            'tipo' => 'nullable|in:Tiempo,Puntos',
            'info' => 'nullable|string',
        ]);

        $game->update($request->only(['nombre', 'tipo', 'info']));

        return response()->json([
            'success' => true,
            'game' => $game,
        ]);
    }

    public function deleteGame($id)
    {
        $game = Juegos::where('id',$id)->first();

        if (!$game) {
            return response()->json([
                'success' => false,
                'message' => 'Juego no encontrado.'
            ], 404);
        }

        $game->delete();

        return response()->json([
            'success' => true,
            'message' => 'Juego eliminado correctamente.'
        ]);
    }
}
