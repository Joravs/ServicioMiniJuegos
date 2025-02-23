<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Hash;

class Usuario extends Authenticatable
{
    public $timestamps=false;
    protected $table='usuarios';
    protected $primaryKey ='idUsuario';
    protected $password='passwd';
    protected $hidden=['passwd'];
    protected $fillable=['nombre','username','passwd','nivel'];
    protected $attributes = [
        'nivel' => 0,
    ];

    public function setUsernameAttribute($un)
    {
        $this->attributes['username'] = strtolower($un);
    }
    public function setPasswdAttribute($pass)
    {
        $this->attributes['passwd'] = Hash::make($pass);
    }
}