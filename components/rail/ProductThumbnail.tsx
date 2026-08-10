"use client";

import React from "react";
import { clsx } from "clsx";
import { Badge } from "@/components/ui/Badge";
import { PriceTag } from "@/components/ui/PriceTag";
import { Product, Desk } from "@/lib/catalog";
import { Plus, Check } from "lucide-react";
import { useBuilder } from "@/context/BuilderContext";

type ProductItem = Product | Desk;

type ProductThumbnailProps = {
  item: ProductItem;
};

export function ProductThumbnail({ item }: ProductThumbnailProps) {
  const { selectedDesk, placedItems, addItem, swapDesk } = useBuilder();

  const isDesk = "desk_id" in item;
  const isSelected = isDesk
    ? selectedDesk.desk_id === item.desk_id
    : placedItems.some((pi) => pi.product_id === item.product_id);

  const stockStatus = "stock_status" in item ? item.stock_status : "available";
  const isUnavailable = stockStatus === "unavailable";
  const originalPrice = "original_price_per_week" in item ? item.original_price_per_week : undefined;

  let discountPct: number | null = null;
  if (originalPrice && originalPrice > item.price_per_week) {
    discountPct = Math.round(((originalPrice - item.price_per_week) / originalPrice) * 100);
  }

  const handleClick = () => {
    if (isUnavailable) return;
    if (isDesk) {
      swapDesk((item as Desk).desk_id);
    } else {
      addItem(item as Product);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={clsx(
        "group relative flex flex-col justify-between p-3 rounded-2xl border bg-white transition-all cursor-pointer select-none",
        isSelected
          ? "border-accent-dark ring-2 ring-accent-dark/15 shadow-md bg-slate-50/50"
          : "border-border hover:border-slate-300 hover:shadow-md",
        isUnavailable && "opacity-50 cursor-not-allowed hover:shadow-none hover:border-border"
      )}
    >
      {/* Discount Badge */}
      {discountPct && (
        <div className="absolute top-2 left-2 z-10">
          <Badge variant="discount">-{discountPct}%</Badge>
        </div>
      )}

      {/* Stock Status Indicator Badge */}
      <div className="absolute top-2 right-2 z-10">
        <Badge
          variant={
            stockStatus === "available"
              ? "status-available"
              : stockStatus === "limited"
              ? "status-limited"
              : "status-unavailable"
          }
        >
          {stockStatus === "available"
            ? "Available"
            : stockStatus === "limited"
            ? "Limited"
            : "Out of Stock"}
        </Badge>
      </div>

      {/* Thumbnail Asset Placeholder Image Box */}
      <div className="relative w-full h-28 my-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2 overflow-hidden group-hover:scale-[1.02] transition-transform">
        <div className="w-16 h-16 rounded-lg bg-gradient-to-tr from-slate-200 to-slate-100 border border-slate-300/60 flex flex-col items-center justify-center text-slate-500 font-bold text-xs shadow-inner gap-0.5">
          <span>{item.name.slice(0, 3).toUpperCase()}</span>
          <span className="text-[9px] font-normal text-text-muted">{isDesk ? "DESK" : item.slot_type.toUpperCase()}</span>
        </div>
      </div>

      {/* Product Details & Pricing */}
      <div className="space-y-1.5 pt-1">
        <h4 className="text-xs font-semibold text-text-primary line-clamp-1 group-hover:text-black">
          {item.name}
        </h4>

        <div className="flex items-center justify-between pt-1">
          <PriceTag pricePerWeek={item.price_per_week} originalPricePerWeek={originalPrice} size="sm" />

          {/* Action button icon */}
          <button
            disabled={isUnavailable}
            className={clsx(
              "w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all",
              isSelected
                ? "bg-accent-dark text-white scale-105"
                : "bg-slate-100 text-text-primary hover:bg-accent-dark hover:text-white"
            )}
          >
            {isSelected ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : <Plus className="w-3.5 h-3.5 stroke-[2.5]" />}
          </button>
        </div>
      </div>
    </div>
  );
}
