"use client";

import React, { useState } from "react";
import { BuilderProvider, useBuilder } from "@/context/BuilderContext";
import { TopNav } from "@/components/layout/TopNav";
import { CanvasStage } from "@/components/layout/CanvasStage";
import { CatalogRail } from "@/components/rail/CatalogRail";
import { SlotFullToast } from "@/components/rail/SlotFullToast";
import { PriceSummaryCard } from "@/components/summary/PriceSummaryCard";
import { PriceTag } from "@/components/ui/PriceTag";
import { CheckoutModal } from "@/components/summary/CheckoutModal";
import { ShoppingBag, ArrowRight } from "lucide-react";

function BuilderContent() {
  const { totalPerWeek, placedProducts } = useBuilder();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-bg-base overflow-x-hidden relative">
      {/* Toast Notifications */}
      <SlotFullToast />

      {/* Top Navigation */}
      <TopNav />

      {/* Main Layout Area */}
      <main className="relative flex-1 w-full flex flex-col lg:flex-row pb-28 lg:pb-0">
        {/* Canvas Interactive Stage */}
        <div className="relative flex-1">
          <CanvasStage />

          {/* Desktop Sticky Price Summary Overlay Card (Left Side) */}
          <div className="hidden lg:block fixed top-20 left-6 z-20">
            <PriceSummaryCard />
          </div>
        </div>

        {/* Floating Catalog Rail (Right Side / Bottom Sheet on Mobile) */}
        <CatalogRail />

        {/* Mobile Floating Bottom Summary Bar (< 1024px) */}
        <div className="lg:hidden fixed bottom-2.5 left-4 right-4 z-20 bg-white/95 backdrop-blur-md rounded-2xl border border-border shadow-2xl p-3 flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] font-semibold text-text-secondary">
              {placedProducts.length + 1} Items Selected
            </div>
            <PriceTag pricePerWeek={totalPerWeek} size="sm" />
          </div>

          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="rounded-full bg-accent-dark text-white text-xs font-bold py-2.5 px-4 shadow-md flex items-center gap-1.5 hover:bg-slate-800 transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
            <span>Rent Setup</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>

        {/* Mobile Checkout Modal */}
        <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
      </main>
    </div>
  );
}

export default function BuilderPage() {
  return (
    <BuilderProvider>
      <BuilderContent />
    </BuilderProvider>
  );
}
