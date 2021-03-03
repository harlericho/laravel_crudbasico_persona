<?php

use App\Http\Controllers\PersonaController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('persona.home');
});


//Route::get('/persona','PersonaController@listado');

//Route::resource('persona', PersonaController::class);
Route::get('/persona', [PersonaController::class, 'index']);
Route::get('/persona/listado', [PersonaController::class, 'listado']);
Route::post('/persona/store', [PersonaController::class, 'store']);
Route::get('/persona/edit/{id}', [PersonaController::class, 'edit']);
Route::post('/persona/update', [PersonaController::class, 'update']);
Route::get('/persona/delete/{id}', [PersonaController::class, 'destroy']);