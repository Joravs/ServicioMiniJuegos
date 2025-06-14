<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Hash;

class Usuario extends Authenticatable
{
    protected $primaryKey = 'id';
    protected $fillable = [
        'nombre',
        'username',
        'passwd',
        'nivel',
        'xp',
        'avatar'
    ];

    protected $hidden = [
        'passwd',
    ];
    public function getAuthPassword()
    {
        return $this->passwd;
    }
    
    public function setPasswdAttribute($value)
    {
        $this->attributes['passwd'] = Hash::make($value);
    }
}
