<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use Stancl\Tenancy\Middleware\InitializeTenancyByPath;
use Stancl\Tenancy\Middleware\PreventAccessFromCentralDomains;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;

// /*
// |--------------------------------------------------------------------------
// | API Routes
// |--------------------------------------------------------------------------
// |
// | Here is where you can register API routes for your application. These
// | routes are loaded by the RouteServiceProvider and all of them will
// | be assigned to the "api" middleware group. Make something great!
// |
// */

// // Central domain CSRF cookie (for central app authentication)
// Route::middleware('web')->group(function () {
//     Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);
// });

// /*
// |--------------------------------------------------------------------------
// | Tenant-aware API Routes (by path) - MUST BE FIRST
// |--------------------------------------------------------------------------
// | Expose tenant-initialized endpoints under /api/t/{tenant}/...
// | This allows the frontend to specify the tenant id in the path and have
// | tenancy bootstrapped via InitializeTenancyByPath middleware.
// | These routes must be defined BEFORE central domain routes to avoid conflicts.
// */
// Route::prefix('t/{tenant}')
//     ->middleware([
//         InitializeTenancyByPath::class,
//         PreventAccessFromCentralDomains::class,
//     ])->group(function () {
//         // CSRF cookie for tenant context
//         Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);

//         // Auth routes (tenant context)
//         Route::post('/login', [AuthController::class, 'login']);
//         Route::post('/logout', [AuthController::class, 'logout']);

//         // Authenticated user (tenant context)
//         Route::middleware('auth:sanctum')->group(function () {
//             Route::get('/user', function (Request $request) {
//                 return $request->user();
//             });

//             Route::get('/user/me', [AuthController::class, 'me']);
//         });
//     });

// // Auth routes (central) - AFTER tenant routes
// Route::post('/login', [AuthController::class, 'login']);
// Route::post('/logout', [AuthController::class, 'logout']);

// // Authenticated user (central)
// Route::middleware('auth:sanctum')->group(function () {
//     Route::get('/user', function (Request $request) {
//         return $request->user();
//     });

//     Route::get('/user/me', [AuthController::class, 'me']);
// });
