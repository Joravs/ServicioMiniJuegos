<?php

use Illuminate\Support\Facades\Route;
use App\Http\Middleware\CorsMiddleware;

use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\JuegosController;
use App\Http\Controllers\JuegosFavController;
use App\Http\Controllers\StatsController;
use App\Http\Controllers\AuthController;


// Home Page
Route::get('/api/index',[JuegosController::class, 'index']);
//Stats
Route::get('/api/stats',[StatsController::class, 'showStats']);

//Games Fav
Route::post('/api/catalog/fav',[JuegosFavController::class, 'showFavs']);
//Games Fav add
Route::post('/api/catalog/fav/control/{idJuego}',[JuegosFavController::class, 'controlFav']);


// Create User
Route::post('/api/register',[UsuarioController::class, 'create']);
// Register Form Username
Route::post('/api/user/check',[UsuarioController::class, 'comprobarUsername']);

//Comprobar Login
Route::get('/api/checklogin',[AuthController::class, 'checkLogin']);
// User Login
Route::post('/api/loginForm',[UsuarioController::class, 'validate']);
// Logout
Route::get('/api/logout',[AuthController::class, 'logout']);
//Experiencia
Route::post('/api/experience',[UsuarioController::class, 'updateExperience']);
//Cambiar Contraseña
Route::post('/api/handlePassword',[UsuarioController::class, 'handlePassword']);
//Actualizar Avatar
Route::post('/api/updateAvatar',[UsuarioController::class, 'updateAvatar']);


###################################################################
########################### Juegos ################################
###################################################################

//Create Game on database
Route::post('/api/control/create',[JuegosController::class, 'updateOrCreate']);

//Buscaminas Game
Route::get('/api/catalog/Buscaminas',[JuegosController::class, 'accesoJuego']);
//Snake Game
Route::get('/api/catalog/Snake',[JuegosController::class, 'accesoJuego']);

//Stats
Route::post('/api/newStat',[StatsController::class, 'newStat']);


//
Route::post('/api/allUsers',[UsuarioController::class,'getUsers']);

Route::get('/', function () {
    return view('index');
});
Route::get('/{any}', function () {
    return view('index');
    })->where('any', '.*');