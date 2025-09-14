<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use App\Http\Requests\Auth\LoginRequest;
use App\UseCases\Auth\LoginAction;
use App\Http\Resources\Auth\LoginResource;

class AuthController extends Controller
{
    /**
     * Handle login using cookie-based session (Sanctum SPA).
     */
    public function login(LoginRequest $request, LoginAction $action)
    {
        $user = $action($request);

        if (! $user) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ])->status(401);
        }

        return new LoginResource($user);
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
