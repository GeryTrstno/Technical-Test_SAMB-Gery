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
        Supplier::create([
            'name'=>'Supplier ABC'
        ]);


        Customer::create([
            'name'=>'Customer XYZ'
        ]);



        Warehouse::create([
            'name'=>'Gudang A'
        ]);

        Product::insert([

        [
            'name'=>'Barang A'
        ],
        [
            'name'=>'Barang B'
        ],
        [
            'name'=>'Barang C'
        ]

        ]);
    }
}
