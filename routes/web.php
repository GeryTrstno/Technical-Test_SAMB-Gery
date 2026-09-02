<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TransactionInController;
use App\Http\Controllers\TransactionOutController;
use App\Http\Controllers\StockReportController;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::get('/transaction-in',[TransactionInController::class,'index'])->name('transaction-in.index');
    Route::get('/transaction-in/create',[TransactionInController::class,'create'])->name('transaction-in.create');
    Route::post('/transaction-in',[TransactionInController::class,'store'])->name('transaction-in.store');

    Route::get('/transaction-out', [TransactionOutController::class, 'index'])->name('transaction-out.index');
    Route::get('/transaction-out/create', [TransactionOutController::class, 'create'])->name('transaction-out.create');
    Route::post('/transaction-out', [TransactionOutController::class, 'store'])->name('transaction-out.store');

    Route::get('/stock-report', [StockReportController::class, 'index'])->name('stock-report.index');

    Route::middleware(['role:admin'])->group(function () {
        Route::get('/transaction-in/{id}/edit', [TransactionInController::class, 'edit'])->name('transaction-in.edit');
        Route::put('/transaction-in/{id}', [TransactionInController::class, 'update'])->name('transaction-in.update');
        Route::delete('/transaction-in/{id}', [TransactionInController::class, 'destroy'])->name('transaction-in.destroy');

        Route::get('/transaction-out/{id}/edit', [TransactionOutController::class, 'edit'])->name('transaction-out.edit');
        Route::put('/transaction-out/{id}', [TransactionOutController::class, 'update'])->name('transaction-out.update');
        Route::delete('/transaction-out/{id}', [TransactionOutController::class, 'destroy'])->name('transaction-out.destroy');
    });
});

// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::inertia('dashboard', 'dashboard')->name('dashboard');

//     // Bebas diakses Staff & Admin (Index, Create, Store)
//     Route::resource('transaction-in', TransactionInController::class)->only(['index', 'create', 'store']);
//     Route::resource('transaction-out', TransactionOutController::class)->only(['index', 'create', 'store']);

//     Route::get('/stock-report', [StockReportController::class, 'index'])->name('stock-report.index');

//     // Khusus Admin (Edit, Update, Destroy)
//     Route::middleware(['role:admin'])->group(function () {
//         Route::resource('transaction-in', TransactionInController::class)->only(['edit', 'update', 'destroy']);
//         Route::resource('transaction-out', TransactionOutController::class)->only(['edit', 'update', 'destroy']);
//     });
// });

require __DIR__.'/settings.php';
