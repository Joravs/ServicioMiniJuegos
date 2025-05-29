<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Juegos;
use Illuminate\Support\Facades\DB;

class GamesTableSeeder extends Seeder
{
    private $games = [
        ['id'=>1,'nombreJuego'=>'Buscaminas',
        'info'=>'Busca y evita las minas. El objetivo es limpiar el tablero sin detonar ninguna mina',
        'tipo'=>'Tiempo'],
        ['id'=>2,'nombreJuego'=>'Snake',
        'info'=>'El jugador debe evitar que la serpeinte choque contra obstáculos o se coma a sí misma',
        'tipo'=>'Puntos'],
        ['id'=>2048,'nombreJuego'=>'T2048',
        'info'=>'El objetivo es combinar cuadrados hasta llegar a 2048',
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
            $insGame->id=$game['id'];
            $insGame->nombre=$game['nombreJuego'];
            $insGame->info=$game['info'];
            $insGame->tipo=$game['tipo'];
            $insGame->save();
        }
    }
}
