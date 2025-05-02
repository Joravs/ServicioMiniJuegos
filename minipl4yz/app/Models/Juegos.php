<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Juegos extends Model
{
    protected $table = 'juegos';
    protected $fillable = [
        'nombre',
        'info',
        'tipo'
    ];
    protected $primaryKey = 'id';
}