<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tenant;

class TenantSeeder extends Seeder
{
    public function run(): void
    {
        $samples = [
            ['id' => 'alpha', 'name' => 'Alpha Inc.'],
            ['id' => 'beta',  'name' => 'Beta LLC'],
            ['id' => 'gamma', 'name' => 'Gamma Co.'],
        ];

        foreach ($samples as $t) {
            // Avoid duplicate creation if seeder re-runs
            if (! Tenant::query()->whereKey($t['id'])->exists()) {
                Tenant::create([
                    'id' => $t['id'],
                    'data' => [
                        'name' => $t['name'],
                    ],
                ]);
            }
        }
    }
}

