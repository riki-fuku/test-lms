<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Tenant Routes
|--------------------------------------------------------------------------
|
| Keep tenant scoped routes here if needed. Currently unused because
| tenant-specific screens are rendered through the central route group
| that manually boots tenancy.
|
*/

Route::middleware('web')->group(function () {
    // You can add tenant prefixed routes here if necessary.
});
