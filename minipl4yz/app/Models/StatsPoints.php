<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StatsPoints extends Model
{
    protected $table ='statsPoints';
    protected $fillable=['idJuego','idUsuario','recordPoints'];
}
