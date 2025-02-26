<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GamesController;
use App\Http\Controllers\GamesFavController;
use App\Http\Controllers\AuthController;

// Home Page
Route::get('/',[GamesController::class, 'welcome']);

//Search Games
Route::get('/catalog/search',[GamesController::class, 'search']);
//Stats
Route::get('/stats',[GamesController::class, 'stats']);

//Games Fav
Route::get('/catalog/fav',[GamesFavController::class, 'favs']);
//Games Fav
Route::get('/catalog/favs',[GamesFavController::class, 'showFavs']);
//Games Fav add
Route::get('/catalog/fav/control/{idJuego}',[GamesFavController::class, 'controlFav']);

// Register Form
Route::get('/registerForm',[AuthController::class, 'registerForm']);
// Register Form Username
Route::get('/user/check/{username}',[UserController::class, 'comprobarUsername']);
// Create User
Route::post('/create',[UserController::class, 'create']);
// Login Form
Route::get('/loginForm',[AuthController::class, 'loginForm']);
// User Login
Route::post('/validate',[UserController::class, 'validate']);
// Logout
Route::get('/logout',[AuthController::class, 'logout']);
//My Profile
Route::get('/my-profile',[UserController::class, 'myprofile']);

#################################
######### Juegos ################
#################################

//Create Game Form
Route::get('/catalog/create',[GamesController::class, 'createForm']);
//Create Game on database
Route::post('/catalog/create/form',[GamesController::class, 'updateOrCreate']);
//Buscaminas Game
Route::get('/catalog/Buscaminas',[GamesController::class, 'buscaminas']);
//Snake Game
Route::get('/catalog/Snake',[GamesController::class, 'snake']);
//Chess Game
Route::get('/catalog/Chess',[GamesController::class, 'chess']);
//Chess Game
Route::get('/catalog/Uno',[GamesController::class, 'uno']);