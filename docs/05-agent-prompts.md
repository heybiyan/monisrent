# Agent Execution Prompts — Workspace Builder

Jalankan berurutan, satu milestone per sesi/commit. Setiap prompt mengasumsikan agent sudah membaca `00-README.md` s.d. `04-dev-guide.md` di root project sebelum mulai.

---

## Milestone 0 — Project setup

```
Baca semua file di /docs (00-README.md sampai 04-dev-guide.md) sebelum mulai.

Setup project Next.js 14 (App Router) + TypeScript + Tailwind CSS sesuai struktur folder
di 04-dev-guide.md Section 4. Install dan konfigurasi font Inter via next/font/google
sesuai 01-design.md Section 1. Buat file data/desks.json dan data/products.json dengan
1 desk default, 1 chair default, dan 2-3 produk dummy per kategori (Monitor, Computer)
mengikuti schema di 02-data-model.md — gunakan placeholder image path (boleh solid color
box sementara, tidak perlu asset asli).

Setup Tailwind theme extend dengan color tokens dari 01-design.md Section 2.

Output: project bisa dijalankan npm run dev tanpa error, menampilkan halaman kosong
di /builder dengan font Inter aktif.
```

## Milestone 1 — Layout shell

```
Bangun layout shell halaman /builder mengikuti Opsi B di dokumen wireframe
(full-bleed canvas + right floating rail) dan style referensi di 01-design.md.

Komponen yang dibuat (lihat 03-components.md Section 1-2 untuk detail tanggung jawab):
- TopNav: logo kiri, nav minimal, solid white border-bottom
- CanvasStage: full-bleed container, background gradien tropis/studio lembut sesuai
  design.md, belum perlu render item asli — cukup placeholder desk di tengah
- CatalogRail: floating glassmorphic (backdrop-blur-md bg-white/80), posisi kanan,
  berisi CategoryTab (icon + label, pill, style sesuai category nav referensi) untuk
  4 kategori: Desk, Chair, Monitor, Computer
- ProductThumbnailGrid + ProductThumbnail: grid 2 kolom di bawah tab aktif, render dari
  products.json, belum perlu interaktif (klik belum ngefek ke canvas)

Pastikan responsive: di viewport < 768px, CatalogRail collapse jadi bottom sheet
full-width (swipe-up), CanvasStage tetap full-width di atasnya.

Output: layout lengkap terlihat sesuai wireframe, belum ada logic penambahan item.
```

## Milestone 2 — State, scale system, dan canvas compositing

```
Implementasikan BuilderContext (context/BuilderContext.tsx) sesuai schema di
02-data-model.md Section 3, dan lib/scale.ts berisi computeScale() dan computePosition()
sesuai rumus di 02-data-model.md Section 4.

Hubungkan CanvasStage untuk render setiap item di placed_items menggunakan
computeScale/computePosition, dengan z-index sesuai slot config desk.

Hubungkan klik ProductThumbnail -> addItem() di context -> item langsung muncul di
canvas dengan posisi dan skala proporsional terhadap desk yang sedang aktif.

Implementasikan validasi slot.max_items -> jika penuh, trigger SlotFullToast
(notifikasi halus, auto-dismiss, style sesuai 01-design.md badge amber).

Tambahkan CSS transition fade-in/scale-up saat item baru muncul di canvas
(micro-animation, required state di PRD).

Default state saat page load: desk dan chair default sudah terpasang di canvas
(ambil dari desks.json/products.json yang ditandai default).

Output: builder inti berfungsi — user bisa klik produk di rail, item muncul realistis
proporsional di canvas, tanpa reload halaman.
```

## Milestone 3 — Price summary & checkout

```
Bangun PriceSummaryCard (solid white card, sticky, style sesuai 01-design.md Section 3
line-item card pattern) yang menampilkan desk + setiap item terpilih dengan harga
masing-masing, dan totalPerWeek dihitung sesuai rumus di 02-data-model.md Section 4,
update otomatis setiap placed_items berubah.

Bangun CTAButton "Rent Your Setup" (pill primary, --accent-dark, sesuai 01-design.md
Section 3 Buttons) yang membuka CheckoutModal saat diklik.

CheckoutModal: overlay ringkasan pesanan berisi list item + total, tombol close.
Tidak perlu payment flow real — statis/dummy untuk MVP.

Output: total harga akurat dan real-time, CTA membuka modal ringkasan tanpa reload.
```

## Milestone 4 — Loading states, polish, dan responsive pass

```
Tambahkan SkeletonBlock di CanvasStage dan ProductThumbnail saat asset gambar sedang
dimuat (loading/image preloading state di PRD).

Review seluruh halaman terhadap 01-design.md — pastikan warna, badge, button, dan
card style konsisten dengan token yang didefinisikan (bukan warna Tailwind default).

Test dan perbaiki tampilan di breakpoint mobile (375px), tablet (768px), dan
desktop (1440px) — canvas tidak boleh terdistorsi/pecah di ukuran manapun (constraint
wajib dari PRD).

Output: seluruh Definition of Done di 04-dev-guide.md Section 7 terpenuhi.
```

## Milestone 5 — Deploy

```
Siapkan project untuk deploy ke Vercel sesuai langkah di 04-dev-guide.md Section 6.
Pastikan next build berjalan tanpa error sebelum push. Setelah deploy, lakukan smoke
test manual pada preview URL: load default state, tambah 1 monitor, tambah 1 computer,
cek total harga update, klik CTA buka modal, cek tampilan mobile.

Laporkan preview URL dan hasil smoke test.
```
