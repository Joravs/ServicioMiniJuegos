<?php

namespace Database\Seeders;

use App\Models\Usuario;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{

    public function run(): void
    {
        DB::table('usuarios')->delete();
        $admin=new Usuario;
        $admin->id=1;
        $admin->nombre='Administrador';
        $admin->username='admin';
        $admin->passwd=bcrypt('adminGames');
        $admin->nivel=1000;
        $admin->save();
        $this->call(GamesTableSeeder::class);
    }
}