<?php

namespace Database\Seeders;

use App\Models\Tenant;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class TenantWithUsersSeeder extends Seeder
{
    public function run(): void
    {
        $tenants = [
            [
                'name' => 'coachtech',
                'slug' => 'coachtech',
            ],
            [
                'name' => 'mazidesign',
                'slug' => 'mazidesign',
            ],
        ];

        foreach ($tenants as $tenantData) {
            $tenant = Tenant::updateOrCreate(
                ['slug' => $tenantData['slug']],
                ['name' => $tenantData['name']]
            );

            for ($index = 1; $index <= 10; $index++) {
                $username = sprintf('%s User %02d', Str::headline($tenantData['name']), $index);
                $email = sprintf('%s.user%02d@example.com', $tenantData['slug'], $index);

                User::updateOrCreate(
                    ['email' => $email],
                    [
                        'tenant_id' => $tenant->id,
                        'name' => $username,
                        'password' => Hash::make('password'),
                    ]
                );
            }
        }
    }
}
