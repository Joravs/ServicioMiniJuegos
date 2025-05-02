<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stats extends Model
{
    protected $table = 'stats';
    protected $fillable=['idJuego','idUsuario','partidasJugadas'];
    
    public $incrementing = false;
    protected $primaryKey = null;
    public $timestamps = true;
}
