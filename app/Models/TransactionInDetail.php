<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TransactionInDetail extends Model
{
    protected $fillable=[
        'transaction_in_header_id',
        'product_id',
        'qty_dus',
        'qty_pcs'
    ];

    public function header()
    {
        return $this->belongsTo(TransactionInHeader::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }


}
