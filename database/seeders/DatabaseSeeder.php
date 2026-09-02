<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Product;
use App\Models\Warehouse;
use App\Models\Supplier;
use App\Models\Customer;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            MasterSeeder::class
        ]);
    }
}
