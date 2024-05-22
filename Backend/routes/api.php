
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\RentController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('signup', [UserController::class, 'signup']);

Route::post('login', [UserController::class, 'login']);

Route::get('users', [UserController::class, 'index']);

Route::get('users/{id}', [UserController::class, 'getUser']);

Route::get('homes', [HomeController::class, 'index']);

Route::get('homes/{id}', [HomeController::class, 'show']);

Route::get('logout', [UserController::class, 'logout']);

Route::get('rents', [RentController::class, 'index']);

Route::post('rents', [RentController::class, 'store']);

Route::post('homes', [HomeController::class, 'store']);

Route::get('/users/{user_id}/rents', [RentController::class, 'getUserRents']);

Route::post('/user/{user_id}', [UserController::class, 'updateProfile']);

Route::delete('/homes/{id}', [HomeController::class, 'destroy']);
Route::delete('/rents/{id}', [RentController::class, 'destroy']);
Route::delete('/users/{id}', [UserController::class, 'destroy']);

Route::put('homes/{id}', [HomeController::class, 'update']);
Route::put('rents/{id}', [RentController::class, 'update']);
Route::post('users/{id}', [UserController::class, 'update']);

Route::post('/rents/{id}/accept', [RentController::class, 'accept']);
Route::post('/rents/{id}/reject', [RentController::class, 'reject']);
