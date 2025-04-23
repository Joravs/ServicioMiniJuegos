<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\JuegosController;
use App\Http\Controllers\JuegosFavController;
use App\Http\Controllers\AuthController;

// Home Page
Route::get('/api/index',[JuegosController::class, 'index']);

//Search Games
Route::get('/api/catalog/search',[JuegosController::class, 'search']);
//Stats
Route::get('/api/stats',[JuegosController::class, 'stats']);

//Games Fav
Route::post('/api/catalog/fav',[JuegosFavController::class, 'showFavs']);
//Games Fav add
Route::post('/api/catalog/fav/control/{idJuego}',[JuegosFavController::class, 'controlFav']);


// Create User
Route::post('/api/registerForm',[UsuarioController::class, 'create']);
// Register Form Username
Route::post('/api/user/check/{username}',[UsuarioController::class, 'comprobarUsername']);

//Comprobar Login
Route::get('/api/checklogin',[AuthController::class, 'checkLogin']);
// User Login
Route::post('/api/loginForm',[UsuarioController::class, 'validate']);
// Logout
Route::get('/api/logout',[AuthController::class, 'logout']);
//My Profile
Route::get('/api/my-profile',[UsuarioController::class, 'myprofile']);

###################################################################
########################### Juegos ################################
###################################################################

//Create Game Form
Route::get('/api/control/create',[JuegosController::class, 'createForm']);
//Create Game on database
Route::post('/api/control/create',[JuegosController::class, 'updateOrCreate']);
//Buscaminas Game
Route::get('/api/catalog/Buscaminas',[JuegosController::class, 'accesoJuego']);
//Snake Game
Route::get('/api/catalog/Snake',[JuegosController::class, 'accesoJuego']);


Route::get('/{any}',function (){return view('index');})->where('any', '.*');