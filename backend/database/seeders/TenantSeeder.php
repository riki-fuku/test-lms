<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Tenant;
use Stancl\Tenancy\Database\Models\Domain;

class TenantSeeder extends Seeder
{
    public function run(): void
    {
        // coachtechテナントの作成
        $coachtechTenant = Tenant::firstOrCreate(
            ['id' => 'coachtech'],
            [
                'data' => json_encode([
                    'name' => 'CoachTech',
                    'description' => 'CoachTech株式会社のテナント',
                ])
            ]
        );

        // 既存のテナントのdataを更新
        if (!$coachtechTenant->data) {
            $coachtechTenant->update([
                'data' => json_encode([
                    'name' => 'CoachTech',
                    'description' => 'CoachTech株式会社のテナント',
                ])
            ]);
        }

        // coachtechのドメイン設定
        if (!Domain::where('domain', 'coachtech.localhost')->exists()) {
            Domain::create([
                'domain' => 'coachtech.localhost',
                'tenant_id' => $coachtechTenant->id,
            ]);
        }

        // mazidesignテナントの作成
        $mazidesignTenant = Tenant::firstOrCreate(
            ['id' => 'mazidesign'],
            [
                'data' => json_encode([
                    'name' => 'MaziDesign',
                    'description' => 'MaziDesign株式会社のテナント',
                ])
            ]
        );

        // 既存のテナントのdataを更新
        if (!$mazidesignTenant->data) {
            $mazidesignTenant->update([
                'data' => json_encode([
                    'name' => 'MaziDesign',
                    'description' => 'MaziDesign株式会社のテナント',
                ])
            ]);
        }

        // mazidesignのドメイン設定
        if (!Domain::where('domain', 'mazidesign.localhost')->exists()) {
            Domain::create([
                'domain' => 'mazidesign.localhost',
                'tenant_id' => $mazidesignTenant->id,
            ]);
        }

        // テナントのデータベースを作成（存在しない場合のみ）
        if (!$coachtechTenant->database()->manager()->databaseExists($coachtechTenant->database()->getName())) {
            $coachtechTenant->database()->manager()->createDatabase($coachtechTenant);
        }
        if (!$mazidesignTenant->database()->manager()->databaseExists($mazidesignTenant->database()->getName())) {
            $mazidesignTenant->database()->manager()->createDatabase($mazidesignTenant);
        }

        // 各テナントにマイグレーションを実行してユーザーを作成
        $this->migrateAndCreateUsers($coachtechTenant, 'coachtech');
        $this->migrateAndCreateUsers($mazidesignTenant, 'mazidesign');
    }

    private function migrateAndCreateUsers(Tenant $tenant, string $tenantName): void
    {
        tenancy()->initialize($tenant);

        // テナントデータベースでマイグレーションを実行
        \Artisan::call('migrate', ['--database' => 'tenant']);

        // マイグレーション完了後にユーザーを作成
        try {
            if (!User::where('email', "admin@{$tenantName}.com")->exists()) {
                User::create([
                    'name' => "{$tenantName} Admin",
                    'email' => "admin@{$tenantName}.com",
                    'password' => Hash::make('password'),
                ]);
            }

            if (!User::where('email', "user@{$tenantName}.com")->exists()) {
                User::create([
                    'name' => "{$tenantName} User",
                    'email' => "user@{$tenantName}.com",
                    'password' => Hash::make('password'),
                ]);
            }
        } catch (\Exception $e) {
            // テーブルが存在しない場合はスキップ
            echo "Skipping user creation for {$tenantName}: " . $e->getMessage() . "\n";
        }

        tenancy()->end();
    }
}
