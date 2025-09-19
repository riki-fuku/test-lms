<?php

namespace App\Http\Controllers;

use App\Models\Tenant;

class TenantController extends Controller
{
    public function index()
    {
        $tenants = Tenant::withCount('users')->orderBy('slug')->get();

        return view('tenants.index', compact('tenants'));
    }

    public function show(Tenant $tenant)
    {
        $tenant->load(['users' => fn ($query) => $query->orderBy('name')]);

        return view('tenants.show', compact('tenant'));
    }
}
