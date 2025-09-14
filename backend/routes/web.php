<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Tenant routes (identified by path: /{tenant}/...)
if (class_exists(\Stancl\Tenancy\Middleware\InitializeTenancyByPath::class)) {
    Route::middleware([\Stancl\Tenancy\Middleware\InitializeTenancyByPath::class])
        ->group(function () {
            Route::get('/tenant/ping', function () {
                return 'Tenant OK. Current tenant id: ' . tenant('id');
            });
        });
}

// Central app routes
Route::get('/', fn () => view('welcome'));
