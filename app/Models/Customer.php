<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable=[
        'name'
    ];


    public function transactionOuts()
    {
        return $this->hasMany(TransactionOutHeader::class);
    }

}
