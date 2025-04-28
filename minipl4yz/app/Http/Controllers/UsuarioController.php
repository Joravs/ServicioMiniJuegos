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
        $id=$cg->createFirst($user->id);
        return ['Register'=>true];
    }

    public function validate(Request $request)
    {
        $un=Usuario::where('username', $request->username)->first();

        if($un && Hash::check($request->password,$un->passwd)){
            Auth::login($un);
            return ['Auth'=>true];
        }else{
            return ['Auth'=>false];
        }
    }
    public function myprofile()
    {
        $user = Usuario::find(Auth::id());
        return Auth::check()?['Auth'=>true]:response()->json(['message'=>'Debes iniciar sesión para ver tu información']);
    }
    public function comprobarUsername()
    {
        $un=Usuario::all();
        if($un){
            return ['usernames'=>$un];
        }else{
            return ['usernames'=>false];
        }
    }
}
