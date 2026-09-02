<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Product;
use App\Models\Warehouse;
use App\Models\TransactionOutHeader;
use App\Models\TransactionOutDetail;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class TransactionOutController extends Controller
{
    public function index()
    {
        $transactions = TransactionOutHeader::with(['customer', 'warehouse'])->latest()->get();
        return Inertia::render('TransactionOut/Index', ['transactions' => $transactions]);
    }

    public function create()
    {
        return Inertia::render('TransactionOut/Create', [
            'customers' => Customer::all(),
            'warehouses' => Warehouse::all(),
            'products' => Product::all()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'customer_id' => 'required',
            'warehouse_id' => 'required',
            'transaction_date' => 'required|date',
            'details' => 'required|array',
            'details.*.product_id' => 'required',
            'details.*.qty_dus' => 'integer',
            'details.*.qty_pcs' => 'integer',
        ]);

        DB::transaction(function() use ($validated) {
            $header = TransactionOutHeader::create([
                'transaction_number' => 'OUT-' . date('YmdHis'),
                'customer_id' => $validated['customer_id'],
                'warehouse_id' => $validated['warehouse_id'],
                'transaction_date' => $validated['transaction_date'],
                'notes' => null
            ]);

            foreach ($validated['details'] as $detail) {
                if (($detail['qty_dus'] ?? 0) > 0 || ($detail['qty_pcs'] ?? 0) > 0) {
                    TransactionOutDetail::create([
                        'transaction_out_header_id' => $header->id,
                        'product_id' => $detail['product_id'],
                        'qty_dus' => $detail['qty_dus'] ?? 0,
                        'qty_pcs' => $detail['qty_pcs'] ?? 0,
                    ]);
                }
            }
        });

        return redirect()->route('transaction-out.index');
    }

    public function edit($id)
    {
        $transaction = TransactionOutHeader::with('details')->findOrFail($id);
        return Inertia::render('TransactionOut/Edit', [
            'transaction' => $transaction,
            'customers' => Customer::all(),
            'warehouses' => Warehouse::all(),
            'products' => Product::all(),
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'customer_id' => 'required',
            'warehouse_id' => 'required',
            'transaction_date' => 'required|date',
            'details' => 'required|array',
            'details.*.product_id' => 'required',
            'details.*.qty_dus' => 'nullable|integer',
            'details.*.qty_pcs' => 'nullable|integer',
        ]);

        DB::transaction(function () use ($id, $validated) {
            $header = TransactionOutHeader::findOrFail($id);
            $header->update([
                'customer_id' => $validated['customer_id'],
                'warehouse_id' => $validated['warehouse_id'],
                'transaction_date' => $validated['transaction_date'],
            ]);

            TransactionOutDetail::where('transaction_out_header_id', $id)->delete();
            foreach ($validated['details'] as $detail) {
                if (($detail['qty_dus'] ?? 0) > 0 || ($detail['qty_pcs'] ?? 0) > 0) {
                    TransactionOutDetail::create([
                        'transaction_out_header_id' => $id,
                        'product_id' => $detail['product_id'],
                        'qty_dus' => $detail['qty_dus'] ?? 0,
                        'qty_pcs' => $detail['qty_pcs'] ?? 0,
                    ]);
                }
            }
        });

        return redirect()->route('transaction-out.index');
    }

    public function destroy($id)
    {
        DB::transaction(function () use ($id) {
            TransactionOutDetail::where('transaction_out_header_id', $id)->delete();
            TransactionOutHeader::findOrFail($id)->delete();
        });

        return redirect()->route('transaction-out.index');
    }
}
