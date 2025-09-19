<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class DemoUserSeeder extends Seeder
{
    public function run(): void
    {
        if (! User::where('email', 'user@estra.jp')->exists()) {
            User::create([
                'name' => 'Demo User',
                'email' => 'user@estra.jp',
                'password' => Hash::make('password'),
            ]);
        }

        $targetUserCount = 100;
        $existingCount = User::count();

        if ($existingCount < $targetUserCount) {
            $usersToCreate = $targetUserCount - $existingCount;

            User::factory($usersToCreate)->create();
        }
    }
}
