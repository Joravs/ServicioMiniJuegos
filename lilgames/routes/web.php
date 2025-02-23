<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GamesController;
use App\Http\Controllers\AuthController;

// Home Page
Route::get('/',[GamesController::class, 'welcome'])->name('index');
// Register Form
Route::get('/registerForm',[AuthController::class, 'registerForm'])->name('register');
// Login Form
Route::get('/loginForm',[AuthController::class, 'loginForm'])->name('login');
//Buscaminas Game
Route::get('/catalog/buscaminas',[GamesController::class, 'buscaminas'])->name('Buscaminas');
//Snake Game
Route::get('/catalog/snake',[GamesController::class, 'snake'])->name('Snake');

// Create User
Route::post('/create',[UserController::class, 'create'])->name('create');
// User Login
Route::post('/validate',[UserController::class, 'validate'])->name('validate');