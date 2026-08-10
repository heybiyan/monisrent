import desksData from "@/data/desks.json";
import productsData from "@/data/products.json";

export type SlotType = "chair" | "monitor" | "accessory";

export type SlotConfig = {
  anchor_x: number;
  anchor_y: number;
  max_width_pct: number;
  z_index: number;
  max_items?: number;
  anchor_align_v?: "bottom" | "center";
};

export type Desk = {
  desk_id: string;
  name: string;
  price_per_week: number;
  real_width_cm: number;
  real_height_cm: number;
  asset: { url: string; width_px: number; height_px: number };
  slots: Record<SlotType, SlotConfig>;
};

export type ProductCategory =
  | "furniture"
  | "monitors"
  | "computer"
  | "audio-video"
  | "office-accessories"
  | "health-fitness"
  | "smart-home"
  | "gaming";

export type ProductAsset = {
  url: string;
  width_px: number;
  height_px: number;
  base_offset_pct?: number;
};

export type Product = {
  product_id: string;
  name: string;
  category: ProductCategory;
  slot_type: SlotType;
  preferred_side?: "left" | "right" | "center";
  price_per_week: number;
  original_price_per_week?: number;
  real_width_cm: number;
  real_height_cm: number;
  asset: ProductAsset;
  stock_status: "available" | "limited" | "unavailable";
};

export function getDesks(): Desk[] {
  return desksData as Desk[];
}

export function getProducts(): Product[] {
  return productsData as Product[];
}

export function getProductsByCategory(category: string): Product[] {
  return (productsData as Product[]).filter((p) => p.category === category);
}
