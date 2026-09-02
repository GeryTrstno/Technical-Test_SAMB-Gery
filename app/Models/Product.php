<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable=[
        'name'
    ];


    public function transactionInDetails()
    {
        return $this->hasMany(TransactionInDetail::class);
    }


    public function transactionOutDetails()
    {
        return $this->hasMany(TransactionOutDetail::class);
    }
}
