# Development Guide — 8-Hour MVP

## 1. Tech stack (wajib, sesuai PRD)

- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS
- **Deploy target:** Vercel
- **Font:** Inter via `next/font/google`
- **State:** React Context + `useState`/`useMemo` — tanpa state management library eksternal
- **Data:** JSON statis lokal (`/data/desks.json`, `/data/products.json`) — tanpa database/API
- Tidak ada auth, tidak ada payment gateway real, tidak ada CMS

## 2. Scope MVP (yang DIKERJAKAN dalam 8 jam)

1. Layout shell Opsi B: navbar minimal, canvas full-bleed, floating rail kanan
2. Kategori aktif: **Desk, Chair, Monitor, Computer** saja (4 dari 8, sesuai prioritas di dokumen mapping produk sebelumnya)
3. Anchor + scale compositing system (fungsi murni, testable)
4. Default state: desk + chair sudah terpasang saat load
5. Tambah/ganti item dari rail → update canvas real-time (tanpa reload)
6. Slot-full feedback untuk accessory (kalau ada accessory di 4 kategori scope)
7. Price summary card sticky + total per minggu
8. CTA "Rent Your Setup" → buka `<CheckoutModal>` statis (ringkasan saja, tanpa proses bayar)
9. Skeleton loading saat asset gambar dimuat
10. Responsive dasar: canvas tetap proporsional di mobile (rail collapse ke bottom sheet)

## 3. Yang DIPOTONG dari scope (eksplisit, agar agent tidak overbuild)

- Kategori Audio & Video, Office Accessories, Health & Fitness, Smart Home, Gaming — skip data & UI, cukup siapkan struktur kosong
- Real payment/checkout flow — cukup modal ringkasan
- Auth/login/akun
- Multi-desk-size variant switching (cukup 1 varian ukuran desk untuk MVP)
- Animasi kompleks — cukup CSS transition sederhana (fade/scale), tidak perlu library animasi

## 4. Struktur folder

```
/app
  /builder
    page.tsx
/components
  /layout        (TopNav, CanvasStage, HotspotIndicator)
  /rail          (CatalogRail, CategoryTab, ProductThumbnailGrid, ProductThumbnail, SlotFullToast)
  /summary       (PriceSummaryCard, CTAButton, CheckoutModal)
  /ui            (Badge, PriceTag, SkeletonBlock, IconButton)
/context
  BuilderContext.tsx
/lib
  scale.ts
  catalog.ts
/data
  desks.json
  products.json
/public
  /assets
    /desk /chair /monitor /computer
```

## 5. Alokasi waktu praktis (8 jam)

| Jam | Fokus |
|---|---|
| 0–1 | Setup Next.js + Tailwind + Inter font, struktur folder, dummy JSON data (boleh placeholder asset dulu) |
| 1–2.5 | Layout shell: TopNav, CanvasStage kosong, CatalogRail dengan tab statis |
| 2.5–4.5 | BuilderContext + `lib/scale.ts` + render item di canvas dari `placed_items` (inti fitur) |
| 4.5–5.5 | PriceSummaryCard + CTA + CheckoutModal |
| 5.5–6.5 | Loading skeleton, slot-full toast, micro-animation, responsive mobile |
| 6.5–7.5 | Polish visual sesuai `01-design.md` (warna, badge, button style) |
| 7.5–8 | Deploy ke Vercel, smoke test |

## 6. Deploy ke Vercel (praktis)

1. Push project ke GitHub repo.
2. Import repo di [vercel.com/new](https://vercel.com/new) — Vercel auto-detect Next.js, tidak perlu config tambahan untuk MVP static-data ini.
3. Environment variables: tidak ada yang wajib untuk MVP (semua data statis) — skip step ini kecuali agent menambah kebutuhan lain.
4. Build command default (`next build`), output default — jangan override kecuali ada alasan spesifik.
5. Setelah deploy pertama sukses, cek preview URL langsung dari PR/branch untuk iterasi cepat tanpa perlu re-setup.

## 7. Definition of done (MVP)

- [ ] `npm run dev` jalan tanpa error/warning kritikal
- [ ] Default state menampilkan desk+chair saat pertama load
- [ ] Menambah monitor/computer dari rail langsung terlihat di canvas dengan posisi & skala proporsional
- [ ] Total harga di summary card update otomatis saat item berubah
- [ ] CTA membuka modal ringkasan tanpa reload halaman
- [ ] Tampilan tidak pecah di viewport mobile (375px) dan desktop (1440px)
- [ ] Deploy ke Vercel berhasil, preview URL bisa diakses
