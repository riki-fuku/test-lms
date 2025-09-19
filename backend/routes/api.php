<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Stancl\Tenancy\Middleware\InitializeTenancyByPath;
use Stancl\Tenancy\Middleware\PreventAccessFromCentralDomains;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;

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

// Expose Sanctum's CSRF cookie under /api prefix to match frontend expectations
Route::get('/sanctum/csrf-cookie', [CsrfCookieController::class, 'show']);

/*
|--------------------------------------------------------------------------
| Tenant-aware API Routes (by path)
|--------------------------------------------------------------------------
| Expose tenant-initialized endpoints under /api/t/{tenant}/...
| This allows the frontend to specify the tenant id in the path and have
| tenancy bootstrapped via InitializeTenancyByPath middleware.
*/
// Route::prefix('t/{tenant}')
//     ->middleware([
//         InitializeTenancyByPath::class,
//         PreventAccessFromCentralDomains::class,
//     ])->group(function () {
//         // Authenticated user (tenant context)
//         Route::middleware('auth:sanctum')->group(function () {
//             Route::get('/user', function (Request $request) {
//                 return $request->user();
//             });
//         });
//     });
