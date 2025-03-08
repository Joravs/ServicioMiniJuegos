<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::dropIfExists('juegos');
        Schema::create('juegos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 50);
            $table->text('info');
            $table->enum('tipo',['Tiempo','Puntos']);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('juegos');
    }
};
