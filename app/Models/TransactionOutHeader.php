<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TransactionOutHeader extends Model
{
    protected $fillable=[

        'transaction_number',
        'warehouse_id',
        'transaction_date',
        'customer_id',
        'notes'

    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function warehouse()
    {
        return $this->belongsTo(Warehouse::class);
    }

    public function details()
    {
        return $this->hasMany(TransactionOutDetail::class);
    }
}
