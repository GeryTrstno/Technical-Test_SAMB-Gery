<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TransactionInHeader extends Model
{
    protected $fillable=[

        'transaction_number',
        'warehouse_id',
        'transaction_date',
        'supplier_id',
        'notes'

    ];

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class);
    }

    public function details()
    {
        return $this->hasMany(TransactionInDetail::class);
    }
}
