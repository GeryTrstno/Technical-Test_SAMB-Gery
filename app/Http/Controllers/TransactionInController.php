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
            'supplier_name' => 'required|string',
            'warehouse_name' => 'required|string',
            'transaction_date' => 'required|date',
            'details' => 'required|array',
            'details.*.product_name' => 'required|string',
            'details.*.qty_dus' => 'nullable|integer',
            'details.*.qty_pcs' => 'nullable|integer',
        ]);

        DB::transaction(function () use ($validated) {
            // Otomatis cari atau buat master baru
            $supplier = Supplier::firstOrCreate(['name' => trim($validated['supplier_name'])]);
            $warehouse = Warehouse::firstOrCreate(['name' => trim($validated['warehouse_name'])]);

            $header = TransactionInHeader::create([
                'transaction_number' => 'IN-' . date('YmdHis'),
                'supplier_id' => $supplier->id,
                'warehouse_id' => $warehouse->id,
                'transaction_date' => $validated['transaction_date'],
                'notes' => null,
            ]);

            foreach ($validated['details'] as $detail) {
                $qtyDus = $detail['qty_dus'] ?? 0;
                $qtyPcs = $detail['qty_pcs'] ?? 0;

                if ($qtyDus > 0 || $qtyPcs > 0) {
                    $product = Product::firstOrCreate(['name' => trim($detail['product_name'])]);

                    TransactionInDetail::create([
                        'transaction_in_header_id' => $header->id,
                        'product_id' => $product->id,
                        'qty_dus' => $qtyDus,
                        'qty_pcs' => $qtyPcs,
                    ]);
                }
            }
        });

        return redirect()->route('transaction-in.index');
    }

    public function edit($id)
    {
        $transaction = TransactionInHeader::with('details')->findOrFail($id);
        return Inertia::render('TransactionIn/Edit', [
            'transaction' => $transaction,
            'suppliers' => Supplier::all(),
            'warehouses' => Warehouse::all(),
            'products' => Product::all(),
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'supplier_name' => 'required|string',
            'warehouse_name' => 'required|string',
            'transaction_date' => 'required|date',
            'details' => 'required|array',
            'details.*.product_name' => 'required|string',
            'details.*.qty_dus' => 'nullable|integer',
            'details.*.qty_pcs' => 'nullable|integer',
        ]);

        DB::transaction(function () use ($id, $validated) {
            $supplier = Supplier::firstOrCreate(['name' => trim($validated['supplier_name'])]);
            $warehouse = Warehouse::firstOrCreate(['name' => trim($validated['warehouse_name'])]);

            $header = TransactionInHeader::findOrFail($id);
            $header->update([
                'supplier_id' => $supplier->id,
                'warehouse_id' => $warehouse->id,
                'transaction_date' => $validated['transaction_date'],
            ]);

            TransactionInDetail::where('transaction_in_header_id', $id)->delete();

            foreach ($validated['details'] as $detail) {
                $qtyDus = $detail['qty_dus'] ?? 0;
                $qtyPcs = $detail['qty_pcs'] ?? 0;

                if ($qtyDus > 0 || $qtyPcs > 0) {
                    $product = Product::firstOrCreate(['name' => trim($detail['product_name'])]);

                    TransactionInDetail::create([
                        'transaction_in_header_id' => $id,
                        'product_id' => $product->id,
                        'qty_dus' => $qtyDus,
                        'qty_pcs' => $qtyPcs,
                    ]);
                }
            }
        });

        return redirect()->route('transaction-in.index');
    }

    public function destroy($id)
    {
        DB::transaction(function () use ($id) {
            TransactionInDetail::where('transaction_in_header_id', $id)->delete();
            TransactionInHeader::findOrFail($id)->delete();
        });

        return redirect()->route('transaction-in.index');
    }
}
