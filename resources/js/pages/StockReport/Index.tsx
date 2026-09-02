import { Head } from "@inertiajs/react";

interface Stock {
    warehouse_name: string;
    product_name: string;
    qty_dus: number;
    qty_pcs: number;
}

export default function Index({ stocks }: { stocks: Stock[] }) {
    return (
        <div className="p-6 space-y-5">
            <Head title="Laporan Stok" />
            <h1 className="text-2xl font-bold">Laporan Persediaan Barang (Stok)</h1>

            <table className="w-full border text-left border-collapse">
                <thead>
                    <tr className="border bg-gray-100">
                        <th className="p-2 border">Gudang</th>
                        <th className="p-2 border">Produk</th>
                        <th className="p-2 border">Qty Dus</th>
                        <th className="p-2 border">Qty Pcs</th>
                    </tr>
                </thead>
                <tbody>
                    {stocks.map((item, i) => (
                        <tr key={i} className="border">
                            <td className="p-2 border">{item.warehouse_name}</td>
                            <td className="p-2 border">{item.product_name}</td>
                            <td className="p-2 border">{item.qty_dus}</td>
                            <td className="p-2 border">{item.qty_pcs}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}