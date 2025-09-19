<?php

namespace App\Http\Controllers;

use App\Models\TenantUser;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Response;
use Stancl\Tenancy\Database\Models\Tenant;
use Stancl\Tenancy\Tenancy;

class TenantTopController extends Controller
{
    public function __construct(private readonly Tenancy $tenancy)
    {
    }

    public function __invoke(string $tenant): View|Response
    {
        $tenantModel = Tenant::find($tenant);

        if (! $tenantModel) {
            return response()->view('tenants.not-found', ['tenant' => $tenant], 404);
        }

        $this->tenancy->initialize($tenantModel);

        try {
            $users = TenantUser::orderBy('name')->get();
        } finally {
            $this->tenancy->end();
        }

        return view('tenants.top', [
            'tenant' => $tenantModel,
            'users' => $users,
        ]);
    }
}
