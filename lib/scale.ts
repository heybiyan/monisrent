import { Desk, Product, SlotConfig } from "@/lib/catalog";

export type RenderDimensions = {
  widthPx: number;
  heightPx: number;
  scale: number;
};

export type RenderPosition = {
  leftPx: number;
  topPx: number;
};

/**
 * Computes the proportional scale and rendered pixel dimensions of a product
 * relative to the real physical dimensions of the active desk and its rendered width on screen.
 */
export function computeScale(
  product: Product,
  desk: Desk,
  deskRenderedWidthPx: number
): RenderDimensions {
  if (desk.real_width_cm <= 0 || product.asset.width_px <= 0) {
    return { widthPx: 0, heightPx: 0, scale: 1 };
  }

  // Real physical width ratio between product and desk
  const realWidthRatio = product.real_width_cm / desk.real_width_cm;
  
  // Rendered pixel width of product on canvas
  const widthPx = realWidthRatio * deskRenderedWidthPx;
  
  // Final scale factor applied to image asset
  const scale = widthPx / product.asset.width_px;
  
  // Rendered pixel height based on original asset aspect ratio
  const heightPx = product.asset.height_px * scale;

  return { widthPx, heightPx, scale };
}

/**
 * Computes top and left offsets (in pixels) for positioning a product on the canvas,
 * centered around the slot anchor point specified in the desk configuration.
 */
export function computePosition(
  slotConfig: SlotConfig,
  deskRenderedWidthPx: number,
  deskRenderedHeightPx: number,
  itemWidthPx: number,
  itemHeightPx: number,
  slotIndex: number = 0
): RenderPosition {
  // Base anchor point in pixels
  let anchorXPx = deskRenderedWidthPx * slotConfig.anchor_x;
  let anchorYPx = deskRenderedHeightPx * slotConfig.anchor_y;

  // If slot supports multiple items (e.g., accessories), offset horizontally per item index
  if (slotIndex > 0) {
    const offsetPx = itemWidthPx * 0.85 * slotIndex;
    anchorXPx += slotIndex % 2 === 1 ? offsetPx : -offsetPx;
  }

  // Center product image around anchor point
  const leftPx = anchorXPx - itemWidthPx / 2;
  const topPx = anchorYPx - itemHeightPx / 2;

  return { leftPx, topPx };
}
