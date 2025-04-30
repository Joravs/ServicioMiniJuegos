<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StatsTime extends Model
{
    protected $table ='statsTime';
    protected $fillable=['idJuego','idUsuario','recordTime'];
    protected $attributes = [
        'recordTime' => 1000,
    ];

    public $incrementing = false;
    protected $primaryKey = null;
    public $timestamps = true;
}