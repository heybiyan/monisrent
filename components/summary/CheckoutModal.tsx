"use client";

import React, { useState } from "react";
import { useBuilder } from "@/context/BuilderContext";
import { X, CheckCircle2, Truck, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { PriceTag } from "@/components/ui/PriceTag";

type CheckoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { selectedDesk, placedProducts, totalPerWeek } = useBuilder();
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-border shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-slate-50/80">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-accent-dark text-white flex items-center justify-center font-bold text-xs">
              m
            </div>
            <h3 className="text-base font-bold text-text-primary">
              {isSubmitted ? "Setup Reserved!" : "Workspace Summary"}
            </h3>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-full text-text-secondary hover:text-text-primary hover:bg-slate-200/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-accent-green flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xl font-bold text-text-primary">Your Workspace is Booked!</h4>
              <p className="text-xs text-text-secondary max-w-sm mx-auto">
                Thank you for choosing monis.rent! Our team will assemble and deliver your custom workspace setup within 48 hours.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-border text-left space-y-2">
              <div className="flex justify-between text-xs font-semibold text-text-primary">
                <span>Total Weekly Rental:</span>
                <span className="text-accent-green">${totalPerWeek}/week</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-text-secondary">
                <Truck className="w-3.5 h-3.5 text-accent-dark" />
                <span>Free delivery & white-glove setup included</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full rounded-full bg-accent-dark text-white font-bold py-3 text-xs tracking-wide shadow-md hover:bg-slate-800 transition-colors"
            >
              Back to Workspace Builder
            </button>
          </div>
        ) : (
          <div className="p-6 overflow-y-auto space-y-5">
            {/* Delivery Info Banner */}
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/70 text-emerald-900 text-xs font-medium">
              <Truck className="w-5 h-5 text-accent-green shrink-0" />
              <div>
                <span className="font-bold">Free 48h Delivery & Setup:</span> Included with all monis.rent workspace rentals.
              </div>
            </div>

            {/* Itemized List */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                Selected Setup Items ({placedProducts.length + 1})
              </span>

              {/* Desk Line Item */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-border">
                <div>
                  <div className="text-xs font-bold text-text-primary">{selectedDesk.name}</div>
                  <div className="text-[11px] text-text-secondary">Primary Workspace Surface</div>
                </div>
                <PriceTag pricePerWeek={selectedDesk.price_per_week} size="sm" />
              </div>

              {/* Placed Products Line Items */}
              {placedProducts.map((product) => (
                <div key={product.product_id} className="flex items-center justify-between p-3 rounded-xl bg-white border border-border">
                  <div>
                    <div className="text-xs font-bold text-text-primary">{product.name}</div>
                    <div className="text-[11px] text-text-secondary capitalize">{product.category}</div>
                  </div>
                  <PriceTag pricePerWeek={product.price_per_week} originalPricePerWeek={product.original_price_per_week} size="sm" />
                </div>
              ))}
            </div>

            {/* Total Price Breakdown */}
            <div className="pt-3 border-t border-border space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-bold text-text-primary">Total Rental Rate:</span>
                <PriceTag pricePerWeek={totalPerWeek} size="lg" />
              </div>
              <div className="flex items-center justify-between text-xs text-text-secondary">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent-green" /> 100% Flexible cancellation
                </span>
                <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Save 31% on monthly plans
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2">
              <button
                onClick={handleConfirm}
                className="w-full rounded-full bg-accent-dark text-white font-bold py-3.5 text-sm shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Confirm & Reserve Workspace</span>
                <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
