<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Supplier;
use App\Models\Warehouse;
use App\Models\TransactionInHeader;
use App\Models\TransactionInDetail;

use Inertia\Inertia;

use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;

class TransactionInController extends Controller
{
    public function index()
    {
        $transactions = TransactionInHeader::with([
            'supplier',
            'warehouse'
        ])
        ->latest()
        ->get();


        return Inertia::render(
            'TransactionIn/Index',
            [
                'transactions'=>$transactions
            ]
        );
    }

    public function create()
    {
        return Inertia::render(
            'TransactionIn/Create',
            [
            'suppliers'=>Supplier::all(),
            'warehouses'=>Warehouse::all(),
            'products'=>Product::all()
            ]
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'supplier_id'=>'required',
            'warehouse_id'=>'required',
            'transaction_date'=>'required|date',
            'details'=>'required|array',
            'details.*.product_id'=>'required',
            'details.*.qty_dus'=>'integer',
            'details.*.qty_pcs'=>'integer',
        ]);

        DB::transaction(function() use($validated) {
            $header = TransactionInHeader::create([
                'transaction_number'=>'IN-'.date('YmdHis'),
                'supplier_id'=>$validated['supplier_id'],
                'warehouse_id'=>$validated['warehouse_id'],
                'transaction_date'=>$validated['transaction_date'],
                'notes'=>null
            ]);

            foreach($validated['details'] as $detail){
                TransactionInDetail::create([
                    'transaction_in_header_id'=>$header->id,
                    'product_id'=>$detail['product_id'],
                    'qty_dus'=>$detail['qty_dus'] ?? 0,
                    'qty_pcs'=>$detail['qty_pcs'] ?? 0,
                ]);
            }
        });

        return redirect()
            ->route('transaction-in.index')
            ->with('success','Barang masuk berhasil disimpan');

    }
}
