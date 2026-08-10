"use client";

import React, { useRef, useState, useEffect } from "react";
import { useBuilder } from "@/context/BuilderContext";
import { computeScale, computePosition } from "@/lib/scale";
import { X } from "lucide-react";

export function CanvasStage() {
  const { selectedDesk, placedItems, placedProducts, removeItem } = useBuilder();
  const deskContainerRef = useRef<HTMLDivElement>(null);

  const [deskBounds, setDeskBounds] = useState({ widthPx: 640, heightPx: 320 });
  const [deskImgError, setDeskImgError] = useState(false);
  const [itemImgErrors, setItemImgErrors] = useState<Record<string, boolean>>({});

  // Reset desk image error when selectedDesk changes
  useEffect(() => {
    setDeskImgError(false);
  }, [selectedDesk.desk_id]);

  // Measure desk container width dynamically on resize
  useEffect(() => {
    const updateBounds = () => {
      if (deskContainerRef.current) {
        const rect = deskContainerRef.current.getBoundingClientRect();
        setDeskBounds({ widthPx: rect.width, heightPx: rect.height });
      }
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, []);

  const handleItemImgError = (id: string) => {
    setItemImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="relative w-full h-[calc(100vh-65px)] min-h-[560px] overflow-hidden bg-gradient-to-br from-slate-100 via-emerald-50/25 to-slate-200/90 flex items-center justify-center p-4 sm:p-8">
      {/* Studio Ambient Background Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.85),transparent_75%)] pointer-events-none" />

      {/* Grid Floor Overlay Accent */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Studio Stage Board */}
      <div className="relative w-full max-w-4xl h-full flex flex-col items-center justify-center p-6 sm:p-12 overflow-visible">
        
        {/* Active Desk Container */}
        <div
          ref={deskContainerRef}
          className="relative w-4/5 sm:w-3/4 h-56 sm:h-64 transition-all duration-500 flex flex-col items-center justify-center"
        >
          {/* Real PNG Asset Render / Stylized Studio Fallback */}
          {!deskImgError && selectedDesk.asset?.url ? (
            <img
              src={selectedDesk.asset.url}
              alt={selectedDesk.name}
              onError={() => setDeskImgError(true)}
              className="w-full h-full object-contain pointer-events-none select-none drop-shadow-2xl transition-all translate-y-[40%]"
            />
          ) : (
            <div className="relative w-full h-full bg-gradient-to-b from-amber-100/95 via-amber-200/90 to-amber-300/80 rounded-2xl border-4 border-amber-900/20 shadow-2xl flex flex-col items-center justify-center">
              <div className="absolute top-0 left-0 right-0 h-4 bg-amber-200/80 rounded-t-xl border-b border-amber-300/60 shadow-inner" />
              <div className="absolute -bottom-20 left-10 w-7 h-24 bg-slate-800 rounded-b-lg shadow-xl" />
              <div className="absolute -bottom-20 right-10 w-7 h-24 bg-slate-800 rounded-b-lg shadow-xl" />
            </div>
          )}

          {/* Render Placed Items using Anchor & Scale formulas */}
          {placedItems.map((item) => {
            const product = placedProducts.find((p) => p.product_id === item.product_id);
            if (!product) return null;

            const slotConfig = selectedDesk.slots[item.slot_type] || {
              anchor_x: 0.5,
              anchor_y: 0.5,
              max_width_pct: 0.4,
              z_index: 2,
            };

            const { widthPx, heightPx } = computeScale(
              product,
              selectedDesk,
              deskBounds.widthPx
            );

            const { leftPx, topPx } = computePosition(
              slotConfig,
              deskBounds.widthPx,
              deskBounds.heightPx,
              widthPx,
              heightPx,
              item.slot_index ?? 0,
              product,
              selectedDesk
            );

            const isImgError = itemImgErrors[product.product_id];
            const itemZIndex = product.z_index_override ?? (product.anchor_target === "monitor_top" ? 5 : slotConfig.z_index);

            return (
              <div
                key={`${item.product_id}-${item.slot_index ?? 0}`}
                style={{
                  position: "absolute",
                  left: `${leftPx}px`,
                  top: `${topPx}px`,
                  width: `${widthPx}px`,
                  height: `${heightPx}px`,
                  zIndex: itemZIndex,
                }}
                className="group cursor-pointer transition-all duration-300 animate-in fade-in zoom-in-95 hover:scale-[1.03]"
              >
                {/* Remove Button on Hover */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem(product.product_id);
                  }}
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-accent-red text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:scale-110 z-30"
                  title={`Remove ${product.name}`}
                >
                  <X className="w-3 h-3 stroke-[3]" />
                </button>

                {/* Render Product Image or Box Fallback */}
                {!isImgError && product.asset?.url ? (
                  <img
                    src={product.asset.url}
                    alt={product.name}
                    onError={() => handleItemImgError(product.product_id)}
                    className="w-full h-full object-contain pointer-events-none select-none drop-shadow-md"
                  />
                ) : (
                  <div
                    className={`w-full h-full rounded-xl flex flex-col items-center justify-center p-2 shadow-lg border backdrop-blur-sm transition-shadow ${
                      item.slot_type === "chair"
                        ? "bg-slate-800/90 text-white border-slate-700 shadow-slate-900/30"
                        : item.slot_type === "monitor"
                        ? "bg-slate-900/95 text-white border-slate-800 shadow-black/40"
                        : "bg-white/95 text-text-primary border-slate-200 shadow-slate-300/50"
                    }`}
                  >
                    <div className="text-center font-bold text-xs line-clamp-1 px-1">
                      {product.name}
                    </div>
                    <div className="text-[10px] opacity-75 font-medium">
                      ${product.price_per_week}/wk
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Floor Shadow Under Desk Setup */}
        <div className="absolute -bottom-6 w-4/5 h-10 bg-black/20 blur-2xl rounded-full pointer-events-none" />
      </div>
    </div>
  );
}
