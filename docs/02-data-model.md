# Data Model — Workspace Builder

Semua data statis (JSON), tidak ada backend di scope MVP 8 jam. Ditempatkan di `/data`.

## 1. `desks.json`

```ts
type Desk = {
  desk_id: string;
  name: string;
  price_per_week: number;
  real_width_cm: number;
  real_height_cm: number;
  asset: { url: string; width_px: number; height_px: number };
  slots: Record<SlotType, SlotConfig>;
};

type SlotConfig = {
  anchor_x: number;      // 0-1, relatif terhadap desk render width
  anchor_y: number;      // 0-1, relatif terhadap desk render height
  max_width_pct: number; // 0-1, batas lebar produk relatif desk
  z_index: number;
  max_items?: number;    // default 1, untuk accessory slot bisa >1
};

type SlotType = "chair" | "monitor" | "accessory";
```

## 2. `products.json`

```ts
type Product = {
  product_id: string;
  name: string;
  category: "monitors" | "computer" | "audio-video" | "office-accessories"
          | "health-fitness" | "furniture" | "smart-home" | "gaming";
  slot_type: SlotType;
  price_per_week: number;
  original_price_per_week?: number; // untuk strikethrough, opsional
  real_width_cm: number;
  real_height_cm: number;
  asset: { url: string; width_px: number; height_px: number };
  stock_status: "available" | "limited" | "unavailable";
};
```

## 3. Builder state (client-side, React state/Context — bukan localStorage)

```ts
type BuilderState = {
  selected_desk_id: string;
  placed_items: PlacedItem[]; // hasil pilihan user
};

type PlacedItem = {
  product_id: string;
  slot_type: SlotType;
  slot_index?: number; // untuk slot dengan max_items > 1
};
```

## 4. Perhitungan turunan (computed, tidak disimpan)

```ts
// Render scale per item
finalScale = (product.real_width_cm / desk.real_width_cm)
             * deskRenderedWidthPx
             / product.asset.width_px;

// Posisi render
renderX = deskRenderedWidth * slot.anchor_x - (productRenderedWidth / 2);
renderY = deskRenderedHeight * slot.anchor_y - (productRenderedHeight / 2);

// Total harga
totalPerWeek = desk.price_per_week
             + sum(placed_items.map(item => product[item.product_id].price_per_week));
```

## 5. Validasi

- Saat `addItem(product)`: cek `slot.max_items` (default 1) terhadap jumlah `placed_items` dengan `slot_type` yang sama → jika penuh, trigger state `slotFullWarning` (bukan block silent).
- Saat `swapDesk(newDeskId)`: `placed_items` tidak berubah, hanya `finalScale`/posisi dihitung ulang terhadap desk baru (computed, otomatis re-render).
- Item dengan `stock_status: "unavailable"` tidak bisa masuk `placed_items` — disabled di UI level (lihat `03-components.md`).

## 6. Scope data MVP 8 jam

Untuk mempercepat, isi `products.json` HANYA untuk 4 kategori prioritas tinggi (lihat `04-dev-guide.md`): **Furniture (desk/chair split manual), Monitors, Computer**. Kategori lain boleh disiapkan sebagai array kosong dengan struktur sama, untuk memudahkan penambahan data nanti.
