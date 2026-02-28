<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\InterventionController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\ContactController;



Route::post('/login', [AuthController::class, 'login']);
Route::apiResource('teams', TeamController::class);
Route::get('/teams/{id}', [TeamController::class, 'show']);
Route::post('/contact', [ContactController::class, 'sendContact']);

// Interventions (Réalisations)
Route::get('/interventions', [InterventionController::class, 'index']);
Route::get('/interventions/{id}', [InterventionController::class, 'show']);

Route::get('/events', [EventController::class, 'index']);


Route::prefix('admin')->group(function () {
    Route::get('/events-list', [EventController::class, 'adminIndex'])->name('events.index');
    Route::post('/events', [EventController::class, 'store'])->name('events.store');
    Route::delete('/events/{id}', [EventController::class, 'destroy'])->name('events.destroy');
});



Route::middleware('auth:sanctum')->group(function () {
    
    // User info
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Fitantanana Interventions (CRUD)
    Route::post('/interventions', [InterventionController::class, 'store']);
    Route::put('/interventions/{id}', [InterventionController::class, 'update']);
    Route::delete('/interventions/{id}', [InterventionController::class, 'destroy']);
    Route::patch('/interventions/{id}/publish', [InterventionController::class, 'togglePublish']);
    Route::post('/teams', [TeamController::class, 'store']);
    Route::post('/teams/{id}', [TeamController::class, 'update']); // Ity ilay efa nataonao
    Route::delete('/teams/{id}', [TeamController::class, 'destroy']);
    
    // Logout
    Route::post('/logout', [AuthController::class, 'logout']);
});