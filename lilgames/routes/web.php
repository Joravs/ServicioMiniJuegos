<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GamesController;
use App\Http\Controllers\GamesFavController;
use App\Http\Controllers\AuthController;

// Home Page
Route::get('/',[GamesController::class, 'welcome'])->name('index');

//Search Games
Route::get('/catalog/search',[GamesController::class, 'search'])->name('search');
//Stats
Route::get('/stats',[GamesController::class, 'stats'])->name('stats');

//Games Fav
Route::get('/catalog/fav',[GamesFavController::class, 'favs'])->name('favs');
//Games Fav
Route::get('/catalog/favs',[GamesFavController::class, 'showFavs']);
//Games Fav add
Route::get('/catalog/fav/control/{idJuego}',[GamesFavController::class, 'controlFav']);

// Register Form
Route::get('/registerForm',[AuthController::class, 'registerForm'])->name('register');
// Register Form Username
Route::get('/user/check/{username}',[UserController::class, 'comprobarUsername']);
// Create User
Route::post('/create',[UserController::class, 'create'])->name('create');
// Login Form
Route::get('/loginForm',[AuthController::class, 'loginForm'])->name('login');
// User Login
Route::post('/validate',[UserController::class, 'validate'])->name('validate');
// Logout
Route::get('/logout',[AuthController::class, 'logout'])->name('logout');
//My Profile
Route::get('/my-profile',[UserController::class, 'myprofile'])->name('myprofile');

#################################
######### Juegos ################
#################################

//Create Game Form
Route::get('/catalog/create',[GamesController::class, 'createForm'])->name('createForm');
//Create Game on database
Route::post('/catalog/create/form',[GamesController::class, 'updateOrCreate'])->name('updateOrCreate');
//Buscaminas Game
Route::get('/catalog/Buscaminas',[GamesController::class, 'buscaminas'])->name('Buscaminas');
//Snake Game
Route::get('/catalog/Snake',[GamesController::class, 'snake'])->name('Snake');
//Chess Game
Route::get('/catalog/Chess',[GamesController::class, 'chess'])->name('Chess');