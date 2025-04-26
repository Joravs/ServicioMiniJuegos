<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function checkLogin()
    {
        return Auth::check()?['Auth'=>true]:['Auth'=>false];
    }
    public function logout()
    {
        Auth::logout();
        return ['Auth'=>true];
    }
}
