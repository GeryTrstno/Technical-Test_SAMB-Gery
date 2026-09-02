import { Head, Link } from "@inertiajs/react";
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

export default function Index({ transactions }: Props) {
    return (
        <>
            <Head title="Barang Keluar" />

            <div className="p-6 space-y-5">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold">Barang Keluar</h1>

                    <Link href="/transaction-out/create">
                        <Button>Tambah</Button>
                    </Link>
                </div>

                <table className="w-full border">
                    <thead>
                        <tr className="border">
                            <th>No</th>
                            <th>Supplier</th>
                            <th>Gudang</th>
                            <th>Tanggal</th>
                        </tr>
                    </thead>

                    <tbody>
                        {transactions.map((item, index) => (
                            <tr key={item.id} className="border">
                                <td>{index + 1}</td>

                                <td>{item.supplier.name}</td>

                                <td>{item.warehouse.name}</td>

                                <td>{item.transaction_date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
