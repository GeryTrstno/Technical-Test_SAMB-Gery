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

export default function Create({ customers = [], warehouses = [], products = [] }: Props) {
    const [data, setData] = useState({
        customer_name: "",
        warehouse_name: "",
        transaction_date: new Date().toISOString().split("T")[0],
        details: [
            { product_name: "", qty_dus: 0, qty_pcs: 0 }
        ],
    });

    // Tambah Baris Produk Dinamis
    function addRow() {
        setData({
            ...data,
            details: [...data.details, { product_name: "", qty_dus: 0, qty_pcs: 0 }]
        });
    }

    // Hapus Baris Produk
    function removeRow(index: number) {
        if (data.details.length === 1) return;
        const details = data.details.filter((_, i) => i !== index);
        setData({ ...data, details });
    }

    // Update Input Detail Produk
    function updateDetail(
        index: number,
        field: "product_name" | "qty_dus" | "qty_pcs",
        value: any
    ) {
        const details = [...data.details];
        details[index] = { ...details[index], [field]: value };
        setData({
            ...data,
            details,
        });
    }

    function submit(e: React.FormEvent) {
        e.preventDefault();
        router.post(store.url(), data);
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
                            <Input
                                type="text"
                                list="customer-list"
                                placeholder="Ketik customer baru atau pilih..."
                                value={data.customer_name}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        customer_name: e.target.value,
                                    })
                                }
                                required
                            />
                            <datalist id="customer-list">
                                {customers.map((item) => (
                                    <option key={item.id} value={item.name} />
                                ))}
                            </datalist>
                        </div>

                        {/* Warehouse */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Gudang</label>
                            <Input
                                type="text"
                                list="warehouse-list"
                                placeholder="Ketik gudang baru atau pilih..."
                                value={data.warehouse_name}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        warehouse_name: e.target.value,
                                    })
                                }
                                required
                            />
                            <datalist id="warehouse-list">
                                {warehouses.map((item) => (
                                    <option key={item.id} value={item.name} />
                                ))}
                            </datalist>
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

                    {/* Datalist Master Produk */}
                    <datalist id="product-list">
                        {products.map((item) => (
                            <option key={item.id} value={item.name} />
                        ))}
                    </datalist>

                    {/* Detail Barang Dinamis */}
                    <div className="border-t pt-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="font-semibold text-lg">Detail Barang</h2>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addRow}
                            >
                                + Tambah Produk
                            </Button>
                        </div>

                        <div className="space-y-3">
                            {data.details.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg border bg-muted/20 hover:bg-muted/40 transition-colors"
                                >
                                    {/* Input Fleksibel Produk */}
                                    <div className="space-y-1 sm:w-1/2">
                                        <span className="text-xs text-muted-foreground">Nama Produk</span>
                                        <Input
                                            type="text"
                                            list="product-list"
                                            placeholder="Ketik produk baru atau pilih..."
                                            value={item.product_name}
                                            onChange={(e) =>
                                                updateDetail(index, "product_name", e.target.value)
                                            }
                                            required
                                        />
                                    </div>

                                    {/* Qty & Action */}
                                    <div className="flex items-center gap-3 sm:w-1/2">
                                        <div className="flex-1 space-y-1">
                                            <span className="text-xs text-muted-foreground">Qty Dus</span>
                                            <Input
                                                type="number"
                                                min="0"
                                                placeholder="0"
                                                value={item.qty_dus}
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
                                                value={item.qty_pcs}
                                                onChange={(e) =>
                                                    updateDetail(
                                                        index,
                                                        "qty_pcs",
                                                        Number(e.target.value),
                                                    )
                                                }
                                            />
                                        </div>

                                        {/* Hapus Baris */}
                                        {data.details.length > 1 && (
                                            <div className="space-y-1">
                                                <span className="text-xs opacity-0 block">Aksi</span>
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => removeRow(index)}
                                                >
                                                    Hapus
                                                </Button>
                                            </div>
                                        )}
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