import React from "react";
import { ProductThumbnail } from "@/components/rail/ProductThumbnail";
import { CategoryId } from "@/components/rail/CategoryTab";
import { getDesks, getProductsByCategory, Desk, Product } from "@/lib/catalog";

type ProductThumbnailGridProps = {
  activeCategory: CategoryId;
};

export function ProductThumbnailGrid({ activeCategory }: ProductThumbnailGridProps) {
  let items: (Desk | Product)[] = [];

  if (activeCategory === "desk") {
    items = getDesks();
  } else if (activeCategory === "chair") {
    // Chair is furniture category with slot_type "chair"
    items = getProductsByCategory("furniture");
  } else {
    items = getProductsByCategory(activeCategory);
  }

  if (items.length === 0) {
    return (
      <div className="p-8 text-center text-xs text-text-secondary bg-slate-50 rounded-2xl border border-dashed border-border my-4">
        No items available in this category yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 overflow-y-auto max-h-[calc(100vh-280px)] md:max-h-[480px] p-1 pr-1.5 custom-scrollbar">
      {items.map((item) => {
        const id = "desk_id" in item ? item.desk_id : item.product_id;
        return <ProductThumbnail key={id} item={item} />;
      })}
    </div>
  );
}
