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
        'info'=>'Busca y evita las minas. El objetivo es limpiar el tablero sin detonar ninguna mina, con la ayuda de pistas sobre el número de minas vecinas en las casillas circundantes',
        'tipo'=>'Tiempo'],
        ['nombreJuego'=>'Snake',
        'info'=>'El jugador debe evitar que la serpeinte choque contra obstáculos o se coma a sí misma, algo que se vuelve más difícil a medida que la serpiente se alarga.',
        'tipo'=>'Puntos'],
        ['id'=>2048,'nombreJuego'=>'T2048',
        'info'=>'El objetivo es deslizar baldosas en una cuadrícula para combinarlas y crear una baldosa con el número 2048',
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
