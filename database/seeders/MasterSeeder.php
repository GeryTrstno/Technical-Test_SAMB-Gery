<?php

namespace Database\Seeders;

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
        // 1. Data Dummy Supplier (Supplier A - E)
        $suppliers = [
            ['name' => 'Supplier A'],
            ['name' => 'Supplier B'],
            ['name' => 'Supplier C'],
            ['name' => 'Supplier D'],
            ['name' => 'Supplier E'],
        ];

        foreach ($suppliers as $supplier) {
            Supplier::firstOrCreate($supplier);
        }

        // 2. Data Dummy Customer (Customer A - E)
        $customers = [
            ['name' => 'Customer A'],
            ['name' => 'Customer B'],
            ['name' => 'Customer C'],
            ['name' => 'Customer D'],
            ['name' => 'Customer E'],
        ];

        foreach ($customers as $customer) {
            Customer::firstOrCreate($customer);
        }

        // 3. Data Dummy Warehouse (Gudang A - D)
        $warehouses = [
            ['name' => 'Gudang A'],
            ['name' => 'Gudang B'],
            ['name' => 'Gudang C'],
            ['name' => 'Gudang D'],
        ];

        foreach ($warehouses as $warehouse) {
            Warehouse::firstOrCreate($warehouse);
        }

        // 4. Data Dummy Product (Barang A - J)
        $products = [
            ['name' => 'Barang A'],
            ['name' => 'Barang B'],
            ['name' => 'Barang C'],
            ['name' => 'Barang D'],
            ['name' => 'Barang E'],
            ['name' => 'Barang F'],
            ['name' => 'Barang G'],
            ['name' => 'Barang H'],
            ['name' => 'Barang I'],
            ['name' => 'Barang J'],
        ];

        foreach ($products as $product) {
            Product::firstOrCreate($product);
        }
    }
}