<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TransactionInController;
use App\Http\Controllers\TransactionOutController;
use App\Http\Controllers\StockReportController;

Route::inertia('/', 'welcome')->name('home');

Route::get('/transaction-in',[TransactionInController::class,'index'])->name('transaction-in.index');
Route::get('/transaction-in/create',[TransactionInController::class,'create'])->name('transaction-in.create');
Route::post('/transaction-in',[TransactionInController::class,'store'])->name('transaction-in.store');

Route::get('/transaction-out', [TransactionOutController::class, 'index'])->name('transaction-out.index');
Route::get('/transaction-out/create', [TransactionOutController::class, 'create'])->name('transaction-out.create');
Route::post('/transaction-out', [TransactionOutController::class, 'store'])->name('transaction-out.store');

Route::get('/stock-report', [StockReportController::class, 'index'])->name('stock-report.index');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

require __DIR__.'/settings.php';
