<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TransactionOutDetail extends Model
{
    
    protected $fillable=[

        'transaction_out_header_id',
        'product_id',
        'qty_dus',
        'qty_pcs'

    ];

    public function header()
    {
        return $this->belongsTo(TransactionOutHeader::class, 'transaction_out_header_id');
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

}
