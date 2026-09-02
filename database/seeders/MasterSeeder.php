<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Supplier;
use App\Models\Customer;
use App\Models\Warehouse;

class MasterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Supplier::create([
            'name'=>'PT Supplier ABC'
        ]);

        Customer::create([
            'name'=>'PT Customer XYZ'
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
