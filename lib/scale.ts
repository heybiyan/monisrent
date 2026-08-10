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
  slotIndex: number = 0,
  product?: Product
): RenderPosition {
  // Determine anchor_x ratio:
  // If product specifies preferred_side "left", anchor_x = 0.22 (left side of desk)
  // If product specifies preferred_side "right", anchor_x = 0.78 (right side of desk)
  let anchorXRatio = slotConfig.anchor_x;
  if (product?.preferred_side === "left") {
    anchorXRatio = 0.22;
  } else if (product?.preferred_side === "right") {
    anchorXRatio = 0.78;
  } else if (slotConfig.max_items && slotConfig.max_items > 1) {
    anchorXRatio = slotIndex === 0 ? 0.22 : 0.78;
  }

  let anchorXPx = deskRenderedWidthPx * anchorXRatio;
  let anchorYPx = deskRenderedHeightPx * slotConfig.anchor_y;

  const leftPx = anchorXPx - itemWidthPx / 2;

  // Base vertical alignment:
  let topPx = anchorYPx - itemHeightPx;
  if (slotConfig.anchor_align_v === "center") {
    topPx = anchorYPx - itemHeightPx / 2;
  }

  // Apply fine-tuned asset base offset if specified (e.g. for pixel-perfect feet alignment with M2 reference)
  if (product?.asset?.base_offset_pct) {
    topPx += itemHeightPx * product.asset.base_offset_pct;
  }

  return { leftPx, topPx };
}
