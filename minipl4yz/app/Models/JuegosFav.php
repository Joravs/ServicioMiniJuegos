<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JuegosFav extends Model
{
    protected $table = 'juegosFav';
    protected $fillable=['idJuego','idUsuario'];
    
    public $incrementing = false;
    protected $primaryKey = null;
    public $timestamps = true;
}
