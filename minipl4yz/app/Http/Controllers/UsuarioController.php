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
            'nombre' => ['required','max:100'],
            'username' => ['required','max:255','unique:usuarios'],
            'passwd' => ['required','min:8'],
        ]);
        $user = Usuario::create($validateData);
        $cg = new StatsController;
        $cg->createFirst($user->id);
        return response()->json(['message'=>'Usuario creado correctamente']);
    }

    public function validate(Request $request)
    {
        $un=Usuario::where('username', $request->username)->first();

        if($un && Hash::check($request->passwd,$un->passwd)){
            Auth::login($un);
            return ['Auth'=>true];
        }else{
            return response()->json(['message'=> 'Usuario o Contraseña Incorrectos']);
        }
    }
    public function myprofile()
    {
        $user = Usuario::find(Auth::id());
        return Auth::check()?['Auth'=>true]:response()->json(['message'=>'Debes iniciar sesión para ver tu información']);
    }
    public function comprobarUsername($username)
    {
        $un=Usuario::where('username', $username)->first();
        if($un){
            return ['Valido'=>true];
        }else{
            return ['Valido'=>false];
        }
    }
}
