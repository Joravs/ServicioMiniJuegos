<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function create(Request $request)
    {
        $validateData = $request->validate([
            'nombre' => ['required','max:255'],
            'username' => ['required','max:255','unique:usuarios'],
            'passwd' => ['required','min:8'],
        ]);
        Usuario::create($validateData);
        return redirect()->route('index');
    }

    public function validate(Request $request)
    {
        $un=Usuario::where('username', $request->username)->first();

        if($un && Hash::check($request->passwd,$un->passwd)){
            Auth::login($un);
            return redirect()->route('index');
        }else{
            return redirect()->route('login')->with('error', 'Usuario o Contraseña Incorrectos');
        }
    }
    public function myprofile()
    {
        return Auth::check()?view('user.myprofile'):redirect()->route('login')->with('message','Debes iniciar sesión para ver tu información');
    }
}
