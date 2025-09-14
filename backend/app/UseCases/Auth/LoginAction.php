<?php

namespace App\UseCases\Auth;

use Illuminate\Support\Facades\Auth;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Http\Request;

class LoginAction
{
    /**
     * Attempt login using cookie-based session (Sanctum SPA style).
     * Returns the authenticated user on success, or null on failure.
     */
    public function __invoke(Request $request): ?Authenticatable
    {
        $credentials = [
            'email' => $request->input('email'),
            'password' => $request->input('password'),
        ];

        // For now, both 'user' and 'employee' use the default 'web' guard.
        if (! Auth::guard('web')->attempt($credentials, true)) {
            return null;
        }

        $request->session()->regenerate();

        return Auth::guard('web')->user();
    }
}

