<?php

namespace App\Http\Controllers;

use App\Models\Warehouse;
use App\Models\Product;
use App\Models\TransactionInDetail;
use App\Models\TransactionOutDetail;
use Inertia\Inertia;

use Illuminate\Http\Request;

class StockReportController extends Controller
{
    public function index()
    {
        $warehouses = Warehouse::all();
        $products = Product::all();
        $stocks = [];

        foreach ($warehouses as $wh) {
            foreach ($products as $prod) {
                
                // Total Masuk
                $inDus = TransactionInDetail::whereHas('header', fn($q) => $q->where('warehouse_id', $wh->id))
                    ->where('product_id', $prod->id)->sum('qty_dus');
                $inPcs = TransactionInDetail::whereHas('header', fn($q) => $q->where('warehouse_id', $wh->id))
                    ->where('product_id', $prod->id)->sum('qty_pcs');

                // Total Keluar
                $outDus = TransactionOutDetail::whereHas('header', fn($q) => $q->where('warehouse_id', $wh->id))
                    ->where('product_id', $prod->id)->sum('qty_dus');
                $outPcs = TransactionOutDetail::whereHas('header', fn($q) => $q->where('warehouse_id', $wh->id))
                    ->where('product_id', $prod->id)->sum('qty_pcs');

                $stocks[] = [
                    'warehouse_name' => $wh->name,
                    'product_name' => $prod->name,
                    'qty_dus' => $inDus - $outDus,
                    'qty_pcs' => $inPcs - $outPcs,
                ];
            }
        }

        return Inertia::render('StockReport/Index', ['stocks' => $stocks]);
    }
}
