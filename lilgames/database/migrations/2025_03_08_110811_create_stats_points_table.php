<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::dropIfExists('statsPoints');
        Schema::create('statsPoints', function (Blueprint $table) {
            $table->unsignedBigInteger('idJuego');
            $table->unsignedBigInteger('idUsuario');
            $table->integer('recordPoints');
            $table->primary(['idJuego', 'idUsuario']);
            $table->foreign('idJuego')->references('idJuego')->on('stats')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('idUsuario')->references('idUsuario')->on('stats')->onDelete('cascade')->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('statsPoints');
    }
};
