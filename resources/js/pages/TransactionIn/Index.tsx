import { Head, Link, router, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";

interface Transaction {
    id: number;
    transaction_number: string;
    transaction_date: string;
    supplier: {
        name: string;
    };
    warehouse: {
        name: string;
    };
}

interface Props {
    transactions: Transaction[];
}

export default function Index({ transactions = [] }: Props) {
    const { auth } = usePage().props as any;
    const isAdmin = auth?.user?.role === "admin";

    function handleDelete(id: number) {
        if (confirm("Apakah Anda yakin ingin menghapus transaksi ini?")) {
            router.delete(`/transaction-in/${id}`);
        }
    }

    return (
        <>
            <Head title="Barang Masuk" />

            <div className="w-full p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-card p-6 rounded-xl border shadow-sm">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Barang Masuk
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Daftar riwayat penerimaan barang ke dalam gudang.
                        </p>
                    </div>

                    <Link href="/transaction-in/create">
                        <Button className="w-full sm:w-auto">
                            + Tambah Transaksi
                        </Button>
                    </Link>
                </div>

                <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted/50 border-b text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                                <tr>
                                    <th className="p-4 w-16 text-center">No</th>
                                    <th className="p-4">Supplier</th>
                                    <th className="p-4">Gudang</th>
                                    <th className="p-4">Tanggal</th>
                                    {isAdmin && (
                                        <th className="p-4 text-center">
                                            Aksi
                                        </th>
                                    )}
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                                {transactions && transactions.length > 0 ? (
                                    transactions.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            className="hover:bg-muted/30 transition-colors"
                                        >
                                            <td className="p-4 text-center font-medium text-muted-foreground">
                                                {index + 1}
                                            </td>
                                            <td className="p-4 font-semibold text-foreground">
                                                {item.supplier?.name || "-"}
                                            </td>
                                            <td className="p-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border">
                                                    {item.warehouse?.name ||
                                                        "-"}
                                                </span>
                                            </td>
                                            <td className="p-4 text-muted-foreground">
                                                {item.transaction_date}
                                            </td>
                                            {isAdmin && (
                                                <>
                                                    <td className="p-4 text-center flex justify-center gap-2">
                                                        <Link
                                                            href={`/transaction-in/${item.id}/edit`}
                                                        >
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                            >
                                                                Edit
                                                            </Button>
                                                        </Link>

                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    item.id,
                                                                )
                                                            }
                                                        >
                                                            Hapus
                                                        </Button>
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="p-8 text-center text-muted-foreground"
                                        >
                                            Belum ada data barang masuk.
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
