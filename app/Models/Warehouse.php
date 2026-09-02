<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Warehouse extends Model
{
    protected $fillable=[
        'name'
    ];


    public function transactionIns()
    {
        return $this->hasMany(TransactionInHeader::class);
    }


    public function transactionOuts()
    {
        return $this->hasMany(TransactionOutHeader::class);
    }
}
