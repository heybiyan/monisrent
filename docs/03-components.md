# Component Inventory — Workspace Builder

Struktur komponen React (Next.js App Router), mapping ke layout Opsi B (full-bleed canvas + right floating rail) dan style dari `01-design.md`.

## 1. Layout shell

| Component | Tanggung jawab |
|---|---|
| `<BuilderPage>` | Page root, provider `BuilderContext`, layout grid |
| `<TopNav>` | Logo + minimal nav, solid white, border-bottom tipis |
| `<CanvasStage>` | Full-bleed background canvas, render desk + placed items via anchor/scale |
| `<HotspotIndicator>` | Pill mengambang di atas canvas saat slot kosong/hover, menunjuk lokasi slot |

## 2. Floating rail (katalog)

| Component | Tanggung jawab |
|---|---|
| `<CatalogRail>` | Container glassmorphic kanan, wraps tab + grid |
| `<CategoryTab>` | Icon + label pill, active state solid dark (sesuai style category nav referensi) |
| `<ProductThumbnailGrid>` | Grid 2 kolom scrollable, per kategori aktif |
| `<ProductThumbnail>` | Card kecil `rounded-xl`, badge stok (dot warna), klik → `addItem()` |
| `<SlotFullToast>` | Notifikasi halus saat `max_items` tercapai |

## 3. Price & checkout

| Component | Tanggung jawab |
|---|---|
| `<PriceSummaryCard>` | Solid white card sticky, total per minggu, list item terpilih ringkas |
| `<CTAButton>` | Pill primary, dipakai untuk "Rent Your Setup" |
| `<CheckoutModal>` | Overlay ringkasan pesanan saat CTA diklik — MVP: tampilan statis, tanpa payment flow real |

## 4. Shared/UI primitives

| Component | Tanggung jawab |
|---|---|
| `<Badge>` | Variant: discount (red), status (amber/green dot), default (gray) |
| `<PriceTag>` | Render harga + strikethrough opsional + label "/week" |
| `<SkeletonBlock>` | Loading state untuk canvas/thumbnail saat asset dimuat |
| `<IconButton>` | Wrapper tombol icon-only (share, prev/next carousel jika ada) |

## 5. State/context

| File | Isi |
|---|---|
| `context/BuilderContext.tsx` | `BuilderState`, `addItem`, `removeItem`, `swapDesk`, computed `totalPerWeek` |
| `lib/scale.ts` | Fungsi murni `computeScale()`, `computePosition()` (lihat rumus di `02-data-model.md`) |
| `lib/catalog.ts` | Loader `desks.json` / `products.json`, helper filter by category/slot_type |

## 6. Required states (dari PRD, map ke komponen)

| Required state (PRD) | Komponen terkait |
|---|---|
| Default/Initial | `BuilderContext` init dengan desk + chair default |
| Item Selecting (hover/active) | `<ProductThumbnail>` hover, `<HotspotIndicator>` |
| Adding/Updating (micro-animation) | CSS transition di `<CanvasStage>` item render (fade-in/scale-up) |
| Limit/Max accessories reached | `<SlotFullToast>` |
| Checkout/Summary modal | `<CheckoutModal>` |
| Loading/Image preloading | `<SkeletonBlock>` di canvas & thumbnail |
