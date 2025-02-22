<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ContentController;
use App\Http\Controllers\GamesController;

Route::get('/',[ContentController::class, 'index']);