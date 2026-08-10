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
  product?: Product,
  desk?: Desk
): RenderPosition {
  const isFloor = product?.anchor_target === "floor" || product?.preferred_side === "floor_left";
  const isMonitorTop = product?.anchor_target === "monitor_top" || product?.preferred_side === "monitor_top";

  // Determine horizontal anchor_x ratio:
  let anchorXRatio = slotConfig.anchor_x;
  if (isFloor) {
    anchorXRatio = 0.06; // Placed on floor to the left of the desk
  } else if (isMonitorTop) {
    anchorXRatio = 0.5; // Centered on top of monitor
  } else if (product?.preferred_side === "left") {
    anchorXRatio = 0.22;
  } else if (product?.preferred_side === "right") {
    anchorXRatio = 0.78;
  } else if (slotConfig.max_items && slotConfig.max_items > 1) {
    anchorXRatio = slotIndex === 0 ? 0.22 : 0.78;
  }

  let anchorXPx = deskRenderedWidthPx * anchorXRatio;
  let anchorYPx = deskRenderedHeightPx * slotConfig.anchor_y;

  let leftPx = anchorXPx - itemWidthPx / 2;
  if (product?.asset?.x_offset_pct) {
    leftPx += itemWidthPx * product.asset.x_offset_pct;
  }

  let topPx = anchorYPx - itemHeightPx;

  if (isFloor) {
    // Floor level alignment (same floor line as chair base at anchor_y 0.85)
    const floorYPx = deskRenderedHeightPx * 0.85;
    topPx = floorYPx - itemHeightPx;
  } else if (isMonitorTop && desk) {
    // Compute monitor top bezel Y position
    const monitorRealHeightCm = 45;
    const monitorRenderedHeightPx = (monitorRealHeightCm / desk.real_width_cm) * deskRenderedWidthPx;
    const monitorTopYPx = anchorYPx - monitorRenderedHeightPx;

    // ScreenBar sits right on top of the monitor bezel
    topPx = monitorTopYPx - itemHeightPx * 0.45;
  } else if (slotConfig.anchor_align_v === "center") {
    topPx = anchorYPx - itemHeightPx / 2;
  }

  // Apply fine-tuned asset base offset if specified
  if (product?.asset?.base_offset_pct) {
    topPx += itemHeightPx * product.asset.base_offset_pct;
  }

  return { leftPx, topPx };
}
