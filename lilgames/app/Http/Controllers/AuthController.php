<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function loginForm()
    {
        return view('auth.login');
    }
    public function registerForm()
    {
        return view('auth.register');
    }
    public function logout()
    {
        Auth::logout();
        return redirect('/');
    }
}
