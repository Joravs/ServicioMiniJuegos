<?php

namespace Database\Seeders;

use App\Models\Usuario;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{

    public function run(): void
    {
        DB::table('usuarios')->delete();
        $admin=new Usuario;
        $admin->id=1;
        $admin->nombre='Administrador';
        $admin->username='admin';
        $admin->passwd='Minipl4yz2025';
        $admin->nivel=1000;
        $admin->save();
        $this->call(GamesTableSeeder::class);
    }
}