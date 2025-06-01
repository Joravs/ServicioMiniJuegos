<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UsuarioController extends Controller
{
    public function getUsers(){
        if (Auth::id()===1){
            return Usuario::all();
        }
        else{
            return false;
        }
    }
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
        if(Auth::attempt(['username'=>$request->username, 'password'=>$request->password])){
            $user = Auth::user();
            return ['auth'=>true,'id'=>$user->id,'nombre'=>$user->nombre,'username'=>$user->username,'nivel'=>$user->nivel,'xp'=>$user->xp,'avatar'=>$user->avatar];
        }else{
            return ['Auth'=>false];
        }
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

    public function updateExperience(Request $request)
    {
        $user = Auth::user();;
        $user->xp = $request->xp;
        $user->nivel = $request->nivel;
        $user->save();
    
        return [$request->xp,$user->xp];
    }
    public function handlePassword(Request $request)
    {
        $cPassword = $request->currentPassword;
        $nPassword = $request->newPassword;
        $user = Usuario::where('id', Auth::id())->first();
        if(Hash::check($request->currentPassword,$user->passwd)){
            $user->passwd = $request->newPassword;
            $user->save();
            return true;
        }
        return false;
    }

    public function updateAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:2048'
        ]);
        $user = Auth::user();

        $path = $request->file('avatar')->store('avatars','public');
        $filename = basename($path);
    
        $user->avatar = 'storage/avatars/' . $filename;
        $user->save();
    
        return response()->json([
            'success' => true,
            'avatarUrl' => asset($user->avatar)
        ]);
    }
    public function updateUser(Request $request)
    {
        $user = Usuario::where('id', $request->id)->first();

        $request->validate([
            'nombre' => 'nullable|string|max:255',
            'nivel' => 'nullable|string',
            'xp' => 'nullable|string',
            'avatar' => 'nullable|string',
        ]);

        $user->update($request->only(['nombre', 'nivel', 'xp', 'avatar']));

        return response()->json([
            'success' => true,
            'user' => $user,
        ]);
    }

    public function deleteUser($id)
    {
        $user = Usuario::where('id', $id)->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Usuario no encontrado.'
            ], 404);
        }

        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'Usuario eliminado correctamente.'
        ]);
    }
}