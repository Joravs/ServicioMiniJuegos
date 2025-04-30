<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StatsPoints extends Model
{
    protected $table = 'statsPoints';
    protected $fillable = ['idJuego', 'idUsuario', 'recordPoints'];

    public $incrementing = false;
    protected $primaryKey = null;
    public $timestamps = true;
}
