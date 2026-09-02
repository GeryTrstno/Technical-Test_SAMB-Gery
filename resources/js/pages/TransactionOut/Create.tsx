import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { store } from "@/routes/transaction-in";

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
            <Head title="Penerimaan Barang" />

            <form onSubmit={submit} className="p-6 space-y-6">
                <h1 className="text-2xl font-bold">Pengeluaran Barang</h1>

                {/* Supplier */}

                <div className="space-y-2">
                    <label>Supplier</label>

                    <select
                        className="border rounded-md p-2 w-full"
                        value={data.customer_id}
                        onChange={(e) =>
                            setData({
                                ...data,

                                customer_id: e.target.value,
                            })
                        }
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
                    <label>Gudang</label>

                    <select
                        className="border rounded-md p-2 w-full"
                        value={data.warehouse_id}
                        onChange={(e) =>
                            setData({
                                ...data,

                                warehouse_id: e.target.value,
                            })
                        }
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
                    <label>Tanggal</label>

                    <Input
                        type="date"
                        value={data.transaction_date}
                        onChange={(e) =>
                            setData({
                                ...data,

                                transaction_date: e.target.value,
                            })
                        }
                    />
                </div>

                {/* Detail Produk */}

                <div className="space-y-3">
                    <h2 className="font-bold text-lg">Detail Barang</h2>

                    {products.map((product, index) => (
                        <div
                            key={product.id}
                            className="flex items-center gap-3 border p-3 rounded-md"
                        >
                            <div className="w-40">{product.name}</div>

                            <Input
                                type="number"
                                min="0"
                                placeholder="Qty Dus"
                                value={data.details[index].qty_dus}
                                onChange={(e) =>
                                    updateDetail(
                                        index,

                                        "qty_dus",

                                        Number(e.target.value),
                                    )
                                }
                            />

                            <Input
                                type="number"
                                min="0"
                                placeholder="Qty Pcs"
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
                    ))}
                </div>

                <Button type="submit">Simpan Barang Keluar</Button>
            </form>
        </>
    );
}
