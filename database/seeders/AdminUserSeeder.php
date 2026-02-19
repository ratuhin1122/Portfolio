<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $email = env('ADMIN_EMAIL');
        $password = env('ADMIN_PASS');

        if ($email && $password) {
            User::firstOrCreate(
                ['email' => $email],
                [
                    'name' => 'Admin',
                    'password' => Hash::make($password),
                    'email_verified_at' => now(),
                ]
            );
            $this->command->info('Admin user created/verified successfully.');
        } else {
            $this->command->error('ADMIN_EMAIL or ADMIN_PASS not set in .env');
        }
    }
}
