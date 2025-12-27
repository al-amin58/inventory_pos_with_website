<?php

namespace Database\Seeders;

use App\Models\User;

use Illuminate\Database\Seeder;
use App\Models\Role;
// use Database\Seeders\RolePermissionSeeder;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::firstOrCreate(
        //     ['email' => 'test@example.com'],
        //     [
        //         'name' => 'Test User',
        //         'password' => 'password',
        //         'email_verified_at' => now(),
        //     ]
        // );


        $this->call([
            RolePermissionSeeder::class,
        ]);

        User::create([
            'name' => 'Super Admin',
            'email' => 'superadmin@gmail.com',
            'password' => bcrypt('password'),
            'type' => 'staff',
            'is_active' => true,
        ])->roles()->attach(Role::where('name', 'super_admin')->first());
    }
}
