<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Games extends Model
{
    public $timestamps=false;
    protected $table='juegos';
    protected $primaryKey ='idJuego';
    protected $fillable=['nombreJuego','info','tipo'];
}
