# Design Guideline v2 — monis.rent Workspace Builder

Update dari `design.md` awal, diselaraskan dengan referensi visual UI produksi monis.rent (product detail page) agar komponen builder terasa satu keluarga dengan produk eksisting.

---

## 1. Typography

- **Font:** Inter — load via `next/font/google`, jangan pakai `@import` CSS (lebih lambat, FOUT lebih terlihat).
  ```ts
  import { Inter } from "next/font/google";
  const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
  ```
- **Hierarchy (dikonfirmasi dari referensi):**
  - Page/product title: 20–24px, semibold, `#0F172A`
  - Section label ("Add-ons", "Recommended based on your cart"): 16–18px, semibold
  - Body/description: 13–14px, regular, `#64748B`
  - Price utama: 22–26px, **bold**, warna aksen (merah/hitam tergantung konteks diskon)
  - Price coret (strikethrough original): 13px, `#94A3B8`, `text-decoration: line-through`
  - Micro label (stock status, "9+ available"): 12px, medium

---

## 2. Color Palette (refined)

| Token | Hex | Pemakaian |
|---|---|---|
| `--bg-base` | `#FFFFFF` | Background utama |
| `--bg-subtle` | `#F8F9FA` | Section alternate, card muted |
| `--text-primary` | `#0F172A` | Judul, teks utama |
| `--text-secondary` | `#64748B` | Deskripsi, label sekunder |
| `--text-muted` | `#94A3B8` | Harga coret, placeholder |
| `--border` | `#E2E8F0` | Border card, divider |
| `--accent-dark` | `#0F172A` | Tombol primer (CTA), badge aktif |
| `--accent-green` | `#10B981` | Indikator stok tersedia, "Save %" |
| `--accent-red` | `#EF4444` | Badge diskon ("-20%"), harga promo |
| `--accent-amber` | `#F97316` | Indikator stok terbatas ("Only 3 left") |

---

## 3. Component Patterns (dari referensi PDP)

### Buttons
- **Primary CTA** ("Add to Cart", "Select variant"): pill penuh (`rounded-full`), background `--accent-dark`, teks putih, ikon di kiri opsional, full-width di dalam card.
- **Segmented toggle** (Weekly/Monthly): pill container abu-abu terang, pill aktif solid hitam dengan teks putih, badge kecil hijau ("Save 31%") menempel di sisi opsi yang lebih hemat.

### Cards
- **Bundle/product image card:** `rounded-2xl`, badge diskon merah solid di pojok kiri-atas (`-20%`), badge sekunder hitam solid di sebelahnya ("Bundle").
- **Line item card** (Electrical Adjustable Desk, dst di dalam summary): border tipis `--border`, header berisi ikon + nama + harga (dengan strikethrough jika diskon), expandable chevron di kanan.
- **Variant selector row:** radio button custom, tiap opsi berbentuk pill/rounded-lg dengan border, dot indikator warna di kanan (hijau = stok banyak, amber = stok terbatas) — bukan teks stok, cukup dot warna + border highlight saat selected.
- **Add-on checkbox row:** thumbnail kecil kiri, nama + link ikon eksternal, harga "from $X/week" rata kanan, checkbox kotak di paling kiri. Baris unavailable: opacity turun, checkbox disabled, label merah kecil "Unavailable".

### Badges
- Diskon: `bg-accent-red`, teks putih, pill kecil, posisi absolute pojok gambar.
- Kategori/status default: `bg-bg-subtle`, teks `--text-secondary`, pill.

### Layout pattern — Product/Builder Detail
- Dua kolom di desktop: kolom kiri **media/canvas** (gambar/preview besar + thumbnail strip di bawah), kolom kanan **panel ringkasan** yang sticky berisi judul, harga, variant selector, line items, add-ons, tombol CTA di paling bawah panel.
- Kolom kanan TIDAK floating/glassmorphic di referensi asli (beda dari draft awal `design.md`) — ini solid white card dengan border tipis, bukan blur transparan. **Untuk Workspace Builder, tetap pakai floating glassmorphic rail di atas canvas** (sesuai kebutuhan interaktif real-time builder) — pattern solid-panel dari referensi ini dipakai khusus untuk price summary card, bukan untuk rail katalog.

### Navigation
- Top bar: logo kiri, search bar tengah dengan ikon location/date terpisah, ikon utility kanan (help, currency, cart, akun, menu).
- Category nav: baris pill horizontal di bawah top bar, ikon kecil + label per kategori — pola ini **cocok direplikasi** untuk tab kategori di floating rail builder (icon + label, bukan teks polos).

### Footer
- Solid `#0F172A` (dark), bukan prioritas untuk MVP builder screen — skip di scope 8 jam kecuali diminta.

---

## 4. Penerapan ke Workspace Builder

| Elemen builder | Style yang dipakai |
|---|---|
| CTA "Rent Your Setup" | Primary pill button, `--accent-dark`, sama seperti "Add to Cart" |
| Price summary card | Solid white card + border (bukan glass), sticky — konsisten dgn kolom kanan referensi |
| Category tab (rail) | Pill horizontal/vertikal dengan icon, active state solid dark — sama seperti category nav referensi |
| Badge limit slot penuh | Pill amber kecil, style sama seperti "Only 3 left" |
| Thumbnail katalog di rail | `rounded-xl`, border tipis, hover elevate ringan (`hover:shadow-md`) |
| Toggle Weekly/Monthly (jika ada mode sewa) | Segmented pill, sama seperti referensi |

---

## 5. Visual Direction — Canvas (tetap dari draft awal, dikonfirmasi masih relevan)

- Background canvas: gradien tropis/studio lembut, produk terisolasi (transparent PNG).
- Floating glassmorphic rail (`backdrop-blur-md bg-white/80`) tetap dipakai khusus untuk katalog/dock — ini elemen pembeda builder dari PDP standar, bukan diseragamkan dengan pattern solid card di atas.
