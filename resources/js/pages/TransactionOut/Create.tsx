import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { store } from "@/routes/transaction-out";

interface Customer {
    id: number;
    name: string;
}

interface Warehouse {
    id: number;
    name: string;
}

interface Product {
    id: number;
    name: string;
}

interface Props {
    customers: Customer[];
    warehouses: Warehouse[];
    products: Product[];
}

export default function Create({ customers, warehouses, products }: Props) {
    const [data, setData] = useState({
        customer_id: "",
        warehouse_id: "",
        transaction_date: "",
        details: products.map((product) => ({
            product_id: product.id,
            qty_dus: 0,
            qty_pcs: 0,
        })),
    });

    function submit(e: React.FormEvent) {
        e.preventDefault();
        router.post(store.url(), data);
    }

    function updateDetail(
        index: number,
        field: "qty_dus" | "qty_pcs",
        value: number,
    ) {
        const details = [...data.details];
        details[index][field] = value;
        setData({
            ...data,
            details,
        });
    }

    return (
        <>
            <Head title="Pengeluaran Barang" />

            <div className="w-full p-6">
                <form onSubmit={submit} className="bg-card p-6 md:p-8 rounded-xl border shadow-sm space-y-8 w-full">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b pb-4">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Pengeluaran Barang</h1>
                            <p className="text-sm text-muted-foreground">
                                Input detail transaksi keluar barang untuk customer.
                            </p>
                        </div>

                        <Link href="/transaction-out">
                            <Button variant="outline" type="button" size="sm">
                                ← Kembali
                            </Button>
                        </Link>
                    </div>

                    {/* Input Header Form */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Customer */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Customer</label>
                            <select
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                                value={data.customer_id}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        customer_id: e.target.value,
                                    })
                                }
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

                        {/* Warehouse */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Gudang</label>
                            <select
                                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                                value={data.warehouse_id}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        warehouse_id: e.target.value,
                                    })
                                }
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

                        {/* Date */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Tanggal</label>
                            <Input
                                type="date"
                                value={data.transaction_date}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        transaction_date: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                    </div>

                    {/* Detail Barang */}
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
                                                placeholder="0"
                                                value={data.details[index].qty_dus}
                                                onChange={(e) =>
                                                    updateDetail(
                                                        index,
                                                        "qty_dus",
                                                        Number(e.target.value),
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className="flex-1 space-y-1">
                                            <span className="text-xs text-muted-foreground">Qty Pcs</span>
                                            <Input
                                                type="number"
                                                min="0"
                                                placeholder="0"
                                                value={data.details[index].qty_pcs}
                                                onChange={(e) =>
                                                    updateDetail(
                                                        index,
                                                        "qty_pcs",
                                                        Number(e.target.value),
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t">
                        <Link href="/transaction-out">
                            <Button variant="outline" type="button">
                                Batal
                            </Button>
                        </Link>
                        <Button type="submit">
                            Simpan Barang Keluar
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}