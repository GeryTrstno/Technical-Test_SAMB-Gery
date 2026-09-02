import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Customer { id: number; name: string; }
interface Warehouse { id: number; name: string; }
interface Product { id: number; name: string; }

interface Detail {
    product_id: number;
    qty_dus: number;
    qty_pcs: number;
}

interface Transaction {
    id: number;
    customer_id: number;
    warehouse_id: number;
    transaction_date: string;
    details: Detail[];
}

interface Props {
    transaction: Transaction;
    customers: Customer[];
    warehouses: Warehouse[];
    products: Product[];
}

export default function Edit({ transaction, customers, warehouses, products }: Props) {
    const [data, setData] = useState({
        customer_id: transaction.customer_id,
        warehouse_id: transaction.warehouse_id,
        transaction_date: transaction.transaction_date,
        details: products.map((prod) => {
            const existing = transaction.details?.find((d) => d.product_id === prod.id);
            return {
                product_id: prod.id,
                qty_dus: existing ? existing.qty_dus : 0,
                qty_pcs: existing ? existing.qty_pcs : 0,
            };
        }),
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        router.put(`/transaction-out/${transaction.id}`, data);
    }

    function updateDetail(index: number, field: "qty_dus" | "qty_pcs", value: number) {
        const details = [...data.details];
        details[index][field] = value;
        setData({ ...data, details });
    }

    return (
        <>
            <Head title="Edit Pengeluaran Barang" />

            <div className="w-full p-6">
                <form onSubmit={submit} className="bg-card p-6 md:p-8 rounded-xl border shadow-sm space-y-8 w-full">
                    <div className="flex items-center justify-between border-b pb-4">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Edit Pengeluaran Barang</h1>
                            <p className="text-sm text-muted-foreground">
                                Ubah data transaksi pengeluaran barang.
                            </p>
                        </div>

                        <Link href="/transaction-out">
                            <Button variant="outline" type="button" size="sm">
                                ← Kembali
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Customer</label>
                            <select
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                                value={data.customer_id}
                                onChange={(e) => setData({ ...data, customer_id: Number(e.target.value) })}
                                required
                            >
                                <option value="">Pilih Customer</option>
                                {customers.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Gudang</label>
                            <select
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                                value={data.warehouse_id}
                                onChange={(e) => setData({ ...data, warehouse_id: Number(e.target.value) })}
                                required
                            >
                                <option value="">Pilih Gudang</option>
                                {warehouses.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Tanggal</label>
                            <Input
                                type="date"
                                value={data.transaction_date}
                                onChange={(e) => setData({ ...data, transaction_date: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="border-t pt-6 space-y-4">
                        <h2 className="font-semibold text-lg">Detail Barang</h2>

                        <div className="space-y-3">
                            {products.map((product, index) => (
                                <div
                                    key={product.id}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border bg-muted/20 hover:bg-muted/40 transition-colors"
                                >
                                    <div className="font-medium text-sm sm:w-1/3">
                                        {product.name}
                                    </div>

                                    <div className="flex items-center gap-4 sm:w-2/3">
                                        <div className="flex-1 space-y-1">
                                            <span className="text-xs text-muted-foreground">Qty Dus</span>
                                            <Input
                                                type="number"
                                                min="0"
                                                value={data.details[index].qty_dus}
                                                onChange={(e) =>
                                                    updateDetail(index, "qty_dus", Number(e.target.value))
                                                }
                                            />
                                        </div>

                                        <div className="flex-1 space-y-1">
                                            <span className="text-xs text-muted-foreground">Qty Pcs</span>
                                            <Input
                                                type="number"
                                                min="0"
                                                value={data.details[index].qty_pcs}
                                                onChange={(e) =>
                                                    updateDetail(index, "qty_pcs", Number(e.target.value))
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t">
                        <Link href="/transaction-out">
                            <Button variant="outline" type="button">
                                Batal
                            </Button>
                        </Link>
                        <Button type="submit">
                            Simpan Perubahan
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}