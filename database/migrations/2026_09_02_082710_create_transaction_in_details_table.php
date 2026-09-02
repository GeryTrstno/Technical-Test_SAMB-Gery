<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transaction_in_details', function (Blueprint $table) {
            $table->id();


            $table->foreignId('transaction_in_header_id')
                ->constrained('transaction_in_headers')
                ->cascadeOnDelete();



            $table->foreignId('product_id')
                ->constrained();



            $table->integer('qty_dus')
                ->default(0);



            $table->integer('qty_pcs')
                ->default(0);



            $table->timestamps();
                });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaction_in_details');
    }
};
