import { Head } from "@inertiajs/react";

interface Stock {
    warehouse_name: string;
    product_name: string;
    qty_dus: number;
    qty_pcs: number;
}

export default function Index({ stocks = [] }: { stocks?: Stock[] }) {
    return (
        <>
            <Head title="Laporan Stok" />

            <div className="w-full p-6 space-y-6">
                {/* Header Section */}
                <div className="bg-card p-6 rounded-xl border shadow-sm">
                    <h1 className="text-2xl font-bold tracking-tight">Laporan Persediaan Barang (Stok)</h1>
                    <p className="text-sm text-muted-foreground">
                        Ringkasan sisa stok produk aktual di setiap gudang (Barang Masuk - Barang Keluar).
                    </p>
                </div>

                {/* Table Section */}
                <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted/50 border-b text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                                <tr>
                                    <th className="p-4 w-16 text-center">No</th>
                                    <th className="p-4">Gudang</th>
                                    <th className="p-4">Produk</th>
                                    <th className="p-4 text-center">Qty Dus</th>
                                    <th className="p-4 text-center">Qty Pcs</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                                {stocks && stocks.length > 0 ? (
                                    stocks.map((item, i) => (
                                        <tr key={i} className="hover:bg-muted/30 transition-colors">
                                            <td className="p-4 text-center font-medium text-muted-foreground">
                                                {i + 1}
                                            </td>
                                            <td className="p-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border">
                                                    {item.warehouse_name || "-"}
                                                </span>
                                            </td>
                                            <td className="p-4 font-semibold text-foreground">
                                                {item.product_name || "-"}
                                            </td>
                                            <td className="p-4 text-center font-mono font-medium">
                                                <span className={item.qty_dus < 0 ? "text-destructive" : ""}>
                                                    {item.qty_dus}
                                                </span>
                                            </td>
                                            <td className="p-4 text-center font-mono font-medium">
                                                <span className={item.qty_pcs < 0 ? "text-destructive" : ""}>
                                                    {item.qty_pcs}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-muted-foreground">
                                            Belum ada data stok persediaan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}