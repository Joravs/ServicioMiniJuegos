<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\StatController;
use App\Http\Controllers\GamesController;

Route::get('/',[UserController::class, 'login']);