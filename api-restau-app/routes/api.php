<?php
use App\Http\Controllers\RepasController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommandeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function() {
    Route::apiResource('commande', CommandeController::class);

});
Route::apiResource('repas', RepasController::class);



// Route::get('repas/', [RepasController::class, 'index']); 