"use client";

import React, { useState } from "react";
import { CategoryTab, CategoryId } from "@/components/rail/CategoryTab";
import { ProductThumbnailGrid } from "@/components/rail/ProductThumbnailGrid";
import { SlidersHorizontal, ChevronUp, ChevronDown } from "lucide-react";

export function CatalogRail() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>("desk");
  const [isMobileExpanded, setIsMobileExpanded] = useState(true);

  return (
    <aside
      className={`
        fixed z-30 transition-all duration-300 ease-in-out
        /* Desktop Floating Glassmorphic Rail */
        md:top-20 md:right-6 md:w-96 md:max-h-[calc(100vh-6rem)] md:bottom-auto md:left-auto md:rounded-3xl
        /* Mobile Bottom Sheet */
        bottom-0 left-0 right-0 rounded-t-3xl md:border md:border-white/60
        bg-white/90 md:bg-white/80 backdrop-blur-md shadow-2xl md:shadow-xl p-4 sm:p-5 flex flex-col gap-3.5
        ${isMobileExpanded ? "max-h-[80vh]" : "max-h-24"}
      `}
    >
      {/* Mobile Handle / Pull Header */}
      <div className="md:hidden flex items-center justify-between pb-1 cursor-pointer select-none" onClick={() => setIsMobileExpanded(!isMobileExpanded)}>
        <div className="w-12 h-1.5 rounded-full bg-slate-300 mx-auto absolute left-1/2 -translate-x-1/2 top-2" />
        <div className="flex items-center gap-2 pt-2 text-xs font-bold text-text-primary">
          <SlidersHorizontal className="w-4 h-4 text-accent-dark" />
          <span>Catalog & Add-ons</span>
        </div>
        <button className="text-text-secondary hover:text-text-primary p-1">
          {isMobileExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      </div>

      {/* Header title (Desktop) */}
      <div className="hidden md:flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent-dark" />
          <h3 className="text-sm font-bold text-text-primary">Add Setup Items</h3>
        </div>
        <span className="text-[11px] font-medium text-text-secondary">
          5 Categories
        </span>
      </div>

      {/* Category Tabs */}
      <CategoryTab activeCategory={activeCategory} onSelectCategory={setActiveCategory} />

      {/* Grid List */}
      {isMobileExpanded && (
        <div className="flex-1 overflow-hidden pt-1">
          <ProductThumbnailGrid activeCategory={activeCategory} />
        </div>
      )}
    </aside>
  );
}
