<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UsuarioController extends Controller
{
    public function create(Request $request)
    {
        $validateData = $request->validate([
            'nombre' => ['required','max:255'],
            'username' => ['required','max:255','unique:usuarios'],
            'passwd' => ['required','min:8'],
        ]);
        $user = Usuario::create($validateData);
        $cg = new StatsController;
        $cg->createFirst($user->idUsuario);
        return redirect('/');
    }

    public function validate(Request $request)
    {
        $un=Usuario::where('username', $request->username)->first();

        if($un && Hash::check($request->passwd,$un->passwd)){
            Auth::login($un);
            return redirect('/');
        }else{
            return redirect('/')->with('error', 'Usuario o Contraseña Incorrectos');
        }
    }
    public function myprofile()
    {
        $user = Usuario::find(Auth::id());
        return Auth::check()?view('user.myprofile', compact('user')):redirect('/')->with('message','Debes iniciar sesión para ver tu información');
    }
    public function comprobarUsername($username)
    {
        $un=Usuario::where('username', $username)->first();
        if($un){
            return true;
        }else{
            return false;
        }
    }
}
