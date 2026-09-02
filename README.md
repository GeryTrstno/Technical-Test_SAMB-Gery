# Inventory Management System

Sistem inventaris berbasis web untuk mencatat transaksi barang masuk, barang keluar, dan memantau stok barang secara realtime. Dibangun dengan Laravel, React (Inertia.js), Tailwind CSS, dan diakses publik melalui Cloudflare Tunnel.

---

## Tech Stack

* Backend: Laravel 12 (PHP 8.5)
* Frontend: React, Inertia.js, TypeScript
* UI Styling: Tailwind CSS, Shadcn UI, Lucide Icons
* Database: PostgreSQL
* Deployment: Debian Server Local + Cloudflare Tunnel (cloudflared)

---

## Fitur Utama

* Dashboard: Ringkasan navigasi cepat untuk akses ke semua halaman utama.
* Barang Masuk: Pencatatan penerimaan barang dari supplier dengan rincian jumlah Dus dan Pcs.
* Barang Keluar: Pencatatan pengeluaran barang ke customer dengan rincian jumlah Dus dan Pcs.
* Laporan Stok: Perhitungan stok fisik aktual otomatis (Total Masuk - Total Keluar) per gudang.
* Hak Akses (Role):
  * Admin: Akses penuh untuk melihat, menambah, mengedit, dan menghapus data.
  * Staff: Hanya bisa melihat data dan menambah transaksi harian.

---

## Akun Default Testing

* Admin: `admin@admin.com` | Password: `password123`
* Staff: `staff@admin.com` | Password: `password123`

---

Dapat Diakses di https://private-build-slightly-oxide.trycloudflare.com/ (Untuk Sementara)
