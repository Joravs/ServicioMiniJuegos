<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::dropIfExists('statsTime');
        Schema::create('statsTime', function (Blueprint $table) {
            $table->unsignedBigInteger('idJuego');
            $table->unsignedBigInteger('idUsuario');
            $table->integer('recordTime')->default(1000);
            $table->primary(['idJuego', 'idUsuario']);
            $table->foreign('idJuego')->references('idJuego')->on('stats')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('idUsuario')->references('idUsuario')->on('stats')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('statsTime');
    }
};
