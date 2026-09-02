import { Head, Link } from '@inertiajs/react';
import { ArrowDownLeft, ArrowUpRight, Boxes, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { dashboard } from '@/routes';

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                {/* Header Welcome */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-card p-6 rounded-xl border shadow-sm">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Selamat Datang Kembali! 👋</h1>
                        <p className="text-sm text-muted-foreground">
                            Ringkasan akses cepat operasional dan pencatatan inventaris.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link href="/transaction-in/create">
                            <Button size="sm" className="gap-1.5">
                                <Plus className="h-4 w-4" /> Barang Masuk
                            </Button>
                        </Link>
                        <Link href="/transaction-out/create">
                            <Button size="sm" variant="outline" className="gap-1.5">
                                <Plus className="h-4 w-4" /> Barang Keluar
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Grid Navigation Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Card 1: Barang Masuk */}
                    <div className="p-6 rounded-xl border bg-card shadow-sm flex flex-col justify-between space-y-4 hover:border-primary/50 transition-colors">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-muted-foreground">Penerimaan</span>
                            <div className="p-2 bg-blue-500/10 text-blue-600 rounded-lg dark:text-blue-400">
                                <ArrowDownLeft className="h-5 w-5" />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold">Barang Masuk</h3>
                            <p className="text-xs text-muted-foreground mt-1">
                                Catat dan kelola penerimaan stok dari supplier.
                            </p>
                        </div>

                        <Link href="/transaction-in" className="pt-2">
                            <Button variant="secondary" className="w-full">
                                Buka Barang Masuk
                            </Button>
                        </Link>
                    </div>

                    {/* Card 2: Barang Keluar */}
                    <div className="p-6 rounded-xl border bg-card shadow-sm flex flex-col justify-between space-y-4 hover:border-primary/50 transition-colors">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-muted-foreground">Pengeluaran</span>
                            <div className="p-2 bg-amber-500/10 text-amber-600 rounded-lg dark:text-amber-400">
                                <ArrowUpRight className="h-5 w-5" />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold">Barang Keluar</h3>
                            <p className="text-xs text-muted-foreground mt-1">
                                Catat barang yang didistribusikan ke customer.
                            </p>
                        </div>

                        <Link href="/transaction-out" className="pt-2">
                            <Button variant="secondary" className="w-full">
                                Buka Barang Keluar
                            </Button>
                        </Link>
                    </div>

                    {/* Card 3: Laporan Stok */}
                    <div className="p-6 rounded-xl border bg-card shadow-sm flex flex-col justify-between space-y-4 hover:border-primary/50 transition-colors">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-muted-foreground">Persediaan</span>
                            <div className="p-2 bg-emerald-500/10 text-emerald-600 rounded-lg dark:text-emerald-400">
                                <Boxes className="h-5 w-5" />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold">Laporan Stok</h3>
                            <p className="text-xs text-muted-foreground mt-1">
                                Pantau sisa stok barang aktual secara realtime.
                            </p>
                        </div>

                        <Link href="/stock-report" className="pt-2">
                            <Button variant="secondary" className="w-full">
                                Lihat Stok Aktual
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Banner Informasi Bawah */}
                <div className="p-6 rounded-xl border bg-muted/30 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="space-y-1 text-center md:text-left">
                        <h4 className="font-semibold text-sm">Butuh Akses Cepat Lainnya?</h4>
                        <p className="text-xs text-muted-foreground">
                            Gunakan sidebar di sebelah kiri untuk berpindah menu dengan mudah.
                        </p>
                    </div>
                    <Link href="/stock-report">
                        <Button variant="outline" size="sm">
                            Cek Ringkasan Stok
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};