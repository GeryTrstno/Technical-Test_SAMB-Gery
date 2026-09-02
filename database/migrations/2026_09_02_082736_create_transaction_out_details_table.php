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
        Schema::create('transaction_out_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('transaction_out_header_id')
                ->constrained('transaction_out_headers')
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
        Schema::dropIfExists('transaction_out_details');
    }
};
