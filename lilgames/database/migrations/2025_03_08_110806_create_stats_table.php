<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::dropIfExists('stats');
        Schema::create('stats', function (Blueprint $table) {
            $table->unsignedBigInteger('idJuego');
            $table->unsignedBigInteger('idUsuario');
            $table->integer('partidasJugadas');
            $table->primary(['idJuego', 'idUsuario']);
            $table->foreign('idJuego')->references('id')->on('juegos')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('idUsuario')->references('id')->on('usuarios')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('stats');
    }
};
