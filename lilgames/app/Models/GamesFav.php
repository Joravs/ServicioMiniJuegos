<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GamesFav extends Model
{
    public $timestamps=false;
    protected $table='juegosFavs';
    protected $primaryKey =['idJuego'];
    protected $fillable =['idJuego','idUsuario'];
}
