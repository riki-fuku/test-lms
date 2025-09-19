<?php

declare(strict_types=1);

use App\Models\User;
use Illuminate\Support\Facades\Route;
use Stancl\Tenancy\Middleware\InitializeTenancyByPath;
use Stancl\Tenancy\Middleware\PreventAccessFromCentralDomains;

/*
|--------------------------------------------------------------------------
| Tenant Routes
|--------------------------------------------------------------------------
|
| Here you can register the tenant routes for your application.
| These routes are loaded by the TenantRouteServiceProvider.
|
| Feel free to customize them however you want. Good luck!
|
*/

Route::prefix('t/{tenant}')
    ->middleware([
        'web',
        InitializeTenancyByPath::class,
        PreventAccessFromCentralDomains::class,
    ])->group(function () {
        Route::get('/', function () {
            return 'This is your multi-tenant application. The id of the current tenant is ' . tenant('id');
        });
    });

Route::prefix('api/t/{tenant}')
    ->middleware([
        'api',
        InitializeTenancyByPath::class,
        PreventAccessFromCentralDomains::class,
    ])->group(function () {
        Route::middleware('auth:sanctum')->group(function () {
            Route::get('/users', static function () {
                $users = User::query()
                    ->select(['id', 'name', 'email'])
                    ->orderBy('name')
                    ->get();

                return response()->json([
                    'data' => $users,
                ]);
            });
        });
    });
