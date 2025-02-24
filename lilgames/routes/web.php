<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GamesController;
use App\Http\Controllers\GamesFavController;
use App\Http\Controllers\AuthController;

// Home Page
Route::get('/',[GamesController::class, 'welcome'])->name('index');
// Register Form
Route::get('/registerForm',[AuthController::class, 'registerForm'])->name('register');
// Register Form
Route::get('/user/check/{username}',[UserController::class, 'comprobarUsername']);
// Login Form
Route::get('/loginForm',[AuthController::class, 'loginForm'])->name('login');
// Logout Form
Route::get('/logout',[AuthController::class, 'logout'])->name('logout');
//Buscaminas Game
Route::get('/catalog/Buscaminas',[GamesController::class, 'buscaminas'])->name('Buscaminas');
//Snake Game
Route::get('/catalog/Snake',[GamesController::class, 'snake'])->name('Snake');


//Search Games
Route::get('/catalog/search',[GamesController::class, 'search'])->name('search');
//Stats
Route::get('/stats',[GamesController::class, 'stats'])->name('stats');
//My Profile
Route::get('/my-profile',[UserController::class, 'myprofile'])->name('myprofile');

//Games Fav
Route::get('/catalog/fav',[GamesFavController::class, 'favs'])->name('favs');
//Games Fav
Route::get('/catalog/favs',[GamesFavController::class, 'showFavs']);
//Games Fav add
Route::get('/catalog/fav/control/{idJuego}',[GamesFavController::class, 'controlFav']);

// Create User
Route::post('/create',[UserController::class, 'create'])->name('create');
// User Login
Route::post('/validate',[UserController::class, 'validate'])->name('validate');