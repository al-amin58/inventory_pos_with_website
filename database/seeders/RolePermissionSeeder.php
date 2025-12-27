<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;
use App\Models\Permission;
use App\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'view-dashboard',
            'manage-users',
            'manage-orders',
            'manage-products',
        ];

         foreach ($permissions as $p) {
            Permission::firstOrCreate([
                'name' => $p,
                'description' => ucfirst(str_replace('-', ' ', $p))
            ]);
        }

        $superAdmin = Role::firstOrCreate([
            'name' => 'super_admin',
            'description' => 'All access'
        ]);

        $admin = Role::firstOrCreate([
            'name' => 'admin',
            'description' => 'Admin access'
        ]);

        $admin->permissions()->sync(
            Permission::pluck('id')
        );

    }
}
