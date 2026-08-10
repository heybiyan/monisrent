"use client";

import React, { useState } from "react";
import { useBuilder } from "@/context/BuilderContext";
import { PriceTag } from "@/components/ui/PriceTag";
import { CTAButton } from "@/components/summary/CTAButton";
import { CheckoutModal } from "@/components/summary/CheckoutModal";
import { Trash2, ChevronUp, ChevronDown, Sparkles, Check, Table } from "lucide-react";

export function PriceSummaryCard() {
  const { selectedDesk, placedProducts, totalPerWeek, removeItem } = useBuilder();
  const [rentalPeriod, setRentalPeriod] = useState<"weekly" | "monthly">("weekly");
  const [isExpanded, setIsExpanded] = useState(true);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Compute monthly rate (31% discount for monthly billing)
  const monthlyRate = Math.round(totalPerWeek * 4 * 0.69);

  return (
    <>
      <div className="w-full max-w-sm bg-white rounded-3xl border border-border shadow-xl p-4 sm:p-5 space-y-4 transition-all">
        {/* Header & Item Count Toggle */}
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-accent-green animate-pulse" />
            <h3 className="text-sm font-bold text-text-primary">Summary Setup</h3>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-xs font-semibold text-text-secondary hover:text-text-primary transition-colors"
          >
            <span>{placedProducts.length + 1} Items</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Weekly / Monthly Segmented Toggle */}
        <div className="p-1 bg-slate-100 rounded-2xl flex items-center border border-slate-200 text-xs font-semibold relative">
          <button
            onClick={() => setRentalPeriod("weekly")}
            className={`flex-1 py-2 rounded-xl transition-all ${
              rentalPeriod === "weekly"
                ? "bg-accent-dark text-white shadow-sm"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setRentalPeriod("monthly")}
            className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1 ${
              rentalPeriod === "monthly"
                ? "bg-accent-dark text-white shadow-sm"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            <span>Monthly</span>
            <span className="text-[10px] bg-accent-green text-white px-1.5 py-0.2 rounded-full font-bold">
              Save 31%
            </span>
          </button>
        </div>

        {/* Selected Items Line-Item List */}
        {isExpanded && (
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
            {/* Active Desk Line Item */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
              <div className="flex items-center gap-2 truncate pr-2">
                <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-bold text-[10px]">
                  DK
                </div>
                <span className="font-semibold text-text-primary truncate">{selectedDesk.name}</span>
              </div>
              <PriceTag pricePerWeek={selectedDesk.price_per_week} size="sm" />
            </div>

            {/* Placed Products Line Items */}
            {placedProducts.map((product) => (
              <div
                key={product.product_id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-border text-xs group hover:border-slate-300 transition-colors"
              >
                <div className="flex items-center gap-2 truncate pr-2">
                  <div className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 font-bold text-[10px] uppercase">
                    {product.slot_type.slice(0, 2)}
                  </div>
                  <span className="font-semibold text-text-primary truncate">{product.name}</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <PriceTag
                    pricePerWeek={product.price_per_week}
                    originalPricePerWeek={product.original_price_per_week}
                    size="sm"
                  />
                  <button
                    onClick={() => removeItem(product.product_id)}
                    className="p-1 text-slate-400 hover:text-accent-red transition-colors"
                    title={`Remove ${product.name}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Total Price Display */}
        <div className="pt-2 border-t border-border space-y-1">
          <div className="flex justify-between items-baseline">
            <span className="text-xs font-semibold text-text-secondary">
              {rentalPeriod === "weekly" ? "Total Weekly:" : "Total Monthly:"}
            </span>
            {rentalPeriod === "weekly" ? (
              <PriceTag pricePerWeek={totalPerWeek} size="lg" />
            ) : (
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-accent-red">${monthlyRate}</span>
                <span className="text-xs text-text-secondary font-medium">/month</span>
              </div>
            )}
          </div>
          <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Free white-glove assembly & delivery included
          </p>
        </div>

        {/* CTA Button */}
        <CTAButton onClick={() => setIsCheckoutOpen(true)}>
          Rent Your Setup
        </CTAButton>
      </div>

      {/* Checkout Modal Overlay */}
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </>
  );
}
