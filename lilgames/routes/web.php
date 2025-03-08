<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\JuegosController;
use App\Http\Controllers\JuegosFavController;
use App\Http\Controllers\AuthController;

// Home Page
Route::get('/',[JuegosController::class, 'welcome']);

//Search Games
Route::get('/catalog/search',[JuegosController::class, 'search']);
//Stats
Route::get('/stats',[JuegosController::class, 'stats']);

//Games Fav
Route::get('/catalog/fav',[JuegosFavController::class, 'favs']);
//Games Fav
Route::post('/catalog/favs',[JuegosFavController::class, 'showFavs']);
//Games Fav add
Route::post('/catalog/fav/control/{idJuego}',[JuegosFavController::class, 'controlFav']);

// Register Form
Route::get('/registerForm',[AuthController::class, 'registerForm']);
// Register Form Username
Route::post('/user/check/{username}',[UsuarioController::class, 'comprobarUsername']);
// Create User
Route::post('/create',[UsuarioController::class, 'create']);
// Login Form
Route::get('/loginForm',[AuthController::class, 'loginForm']);
// User Login
Route::post('/validate',[UsuarioController::class, 'validate']);
// Logout
Route::get('/logout',[AuthController::class, 'logout']);
//My Profile
Route::get('/my-profile',[UsuarioController::class, 'myprofile']);

###################################################################
########################### Juegos ################################
###################################################################

//Create Game Form
Route::get('/control/create',[JuegosController::class, 'createForm']);
//Create Game on database
Route::post('/control/create/form',[JuegosController::class, 'updateOrCreate']);
//Buscaminas Game
Route::get('/catalog/Buscaminas',[JuegosController::class, 'buscaminas']);
//Snake Game
Route::get('/catalog/Snake',[JuegosController::class, 'snake']);