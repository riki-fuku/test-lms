<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Handle login using cookie-based session (Sanctum SPA).
     */
    public function login(Request $request)
    {
        $validated = $request->validate([
            'type' => ['required', 'in:user'],
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        $credentials = [
            'email' => $validated['email'],
            'password' => $validated['password'],
        ];

        if (! Auth::attempt($credentials, true)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ])->status(401);
        }

        $request->session()->regenerate();

        return response()->json([
            'message' => 'Logged in successfully',
        ]);
    }

    /**
     * Logout and invalidate session.
     */
    public function logout(Request $request)
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Logged out successfully',
        ]);
    }

    /**
     * Current authenticated user (minimal fields).
     */
    public function me(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'data' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ] : null,
        ]);
    }
}

