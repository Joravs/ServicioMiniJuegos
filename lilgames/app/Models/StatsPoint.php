<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StatsPoint extends Model
{
    public $timestamps=false;
    protected $table='stats';
    protected $primaryKey =['idJuego', 'idUsuario'];
    protected $fillable =['idJuego','idUsuario', 'recordPoints'];
}
