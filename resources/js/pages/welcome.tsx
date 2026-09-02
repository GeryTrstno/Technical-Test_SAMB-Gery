import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { dashboard, login, register } from '@/routes';
import { ArrowRight, Boxes, PackageCheck, ShieldCheck, Warehouse } from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Sistem Manajemen Inventaris" />

            <div className="min-h-screen bg-background text-foreground flex flex-col justify-between p-6 lg:p-12">
                {/* Navbar Header */}
                <header className="w-full max-w-7xl mx-auto flex items-center justify-between py-4">
                    <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
                        <div className="p-2 bg-primary text-primary-foreground rounded-lg">
                            <Boxes className="h-6 w-6" />
                        </div>
                        <span>Inventory System</span>
                    </div>

                    <nav className="flex items-center gap-3">
                        {auth.user ? (
                            <Link href={dashboard()}>
                                <Button>Buka Dashboard</Button>
                            </Link>
                        ) : (
                            <>
                                <Link href={login()}>
                                    <Button variant="ghost">Masuk</Button>
                                </Link>
                                <Link href={register()}>
                                    <Button>Daftar Akun</Button>
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                {/* Hero Section */}
                <main className="w-full max-w-7xl mx-auto my-auto py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-xs font-medium border">
                            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                            <span>Sistem Pencatatan Stok Realtime</span>
                        </div>

                        <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                            Kelola Stok Gudang dengan Mudah & Terkontrol.
                        </h1>

                        <p className="text-muted-foreground text-lg max-w-xl">
                            Solusi praktis pencatatan transaksi barang masuk, barang keluar, dan laporan persediaan stok secara terpusat untuk akurasi data maksimal.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            {auth.user ? (
                                <Link href={dashboard()}>
                                    <Button size="lg" className="w-full sm:w-auto gap-2">
                                        Ke Dashboard <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                            ) : (
                                <Link href={login()}>
                                    <Button size="lg" className="w-full sm:w-auto gap-2">
                                        Masuk ke Aplikasi <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Features Card Preview */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-6 rounded-xl border bg-card shadow-sm space-y-3">
                            <div className="p-2.5 w-fit rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                <PackageCheck className="h-6 w-6" />
                            </div>
                            <h3 className="font-semibold text-lg">Barang Masuk & Keluar</h3>
                            <p className="text-sm text-muted-foreground">
                                Lakukan pencatatan penerimaan dari supplier dan pengeluaran ke customer dengan detail Dus/Pcs.
                            </p>
                        </div>

                        <div className="p-6 rounded-xl border bg-card shadow-sm space-y-3">
                            <div className="p-2.5 w-fit rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                <Boxes className="h-6 w-6" />
                            </div>
                            <h3 className="font-semibold text-lg">Laporan Stok Otomatis</h3>
                            <p className="text-sm text-muted-foreground">
                                Hitung akumulasi ketersediaan fisik barang secara akurat berdasarkan riwayat transaksi.
                            </p>
                        </div>

                        <div className="p-6 rounded-xl border bg-card shadow-sm space-y-3 sm:col-span-2">
                            <div className="p-2.5 w-fit rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400">
                                <Warehouse className="h-6 w-6" />
                            </div>
                            <h3 className="font-semibold text-lg">Multi-Gudang & Hak Akses</h3>
                            <p className="text-sm text-muted-foreground">
                                Dukungan pengelolaan di berbagai area gudang serta pembagian peran pengguna (Admin dan Staff) demi keamanan data.
                            </p>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="w-full max-w-7xl mx-auto border-t pt-6 text-center text-xs text-muted-foreground">
                    &copy; {new Date().getFullYear()} Inventory System. All rights reserved.
                </footer>
            </div>
        </>
    );
}