<?php

namespace Database\Seeders;

use App\Models\TenantUser;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Str;
use Stancl\Tenancy\Database\Models\Tenant;

class TenantDemoSeeder extends Seeder
{
    public function run(): void
    {
        $tenants = [
            [
                'id' => 'coachtech',
                'name' => 'Coachtech',
            ],
            [
                'id' => 'mazidesign',
                'name' => 'Mazi Design',
            ],
        ];

        foreach ($tenants as $tenantConfig) {
            $tenant = Tenant::updateOrCreate(
                ['id' => $tenantConfig['id']],
                ['data' => ['name' => $tenantConfig['name']]]
            );

            $tenant->domains()->firstOrCreate([
                'domain' => sprintf('%s.localhost', $tenantConfig['id']),
            ]);

            $tenant->createDatabase();

            $tenant->run(function () use ($tenantConfig): void {
                Artisan::call('migrate', [
                    '--path' => 'database/migrations/tenant',
                    '--database' => config('tenancy.database.tenant_connection'),
                    '--force' => true,
                ]);

                TenantUser::truncate();

                for ($i = 1; $i <= 10; $i++) {
                    TenantUser::create([
                        'name' => sprintf('%s User %02d', $tenantConfig['name'], $i),
                        'email' => sprintf('%s-user-%02d@example.com', $tenantConfig['id'], $i),
                        'password' => bcrypt(Str::random(12)),
                    ]);
                }
            });
        }
    }
}
