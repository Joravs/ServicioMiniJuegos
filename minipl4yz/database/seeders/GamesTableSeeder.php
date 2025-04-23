<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Juegos;
use Illuminate\Support\Facades\DB;

class GamesTableSeeder extends Seeder
{
    private $games = [
        ['nombreJuego'=>'Buscaminas',
        'info'=>'Busca y evita las minas',
        'El videojuego presenta una cuadrícula de casillas en las que se puede hacer clic, donde hay «minas» ocultas esparcidas por todo el tablero. El objetivo es limpiar el tablero sin detonar ninguna mina, con la ayuda de pistas sobre el número de minas vecinas en las casillas circundantes',
        'tipo'=>'Tiempo'],
        ['nombreJuego'=>'Snake',
        'info'=>'El jugador debe evitar que la serpeinte choque contra obstáculos o se coma a sí misma, algo que se vuelve más difícil a medida que la serpiente se alarga.',
        'tipo'=>'Puntos'],
    ];
    public function run(): void
    {
        self::insertarJuegos();
    }
    private function insertarJuegos()
    {
        DB::table('juegos')->delete();
        foreach ($this->games as $game) {
            $insGame=new Juegos;
            $insGame->nombre=$game['nombreJuego'];
            $insGame->info=$game['info'];
            $insGame->tipo=$game['tipo'];
            $insGame->save();
        }
    }
}
