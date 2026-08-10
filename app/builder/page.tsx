import React from "react";
import { BuilderProvider } from "@/context/BuilderContext";
import { TopNav } from "@/components/layout/TopNav";
import { CanvasStage } from "@/components/layout/CanvasStage";
import { CatalogRail } from "@/components/rail/CatalogRail";
import { SlotFullToast } from "@/components/rail/SlotFullToast";
import { PriceSummaryCard } from "@/components/summary/PriceSummaryCard";

export default function BuilderPage() {
  return (
    <BuilderProvider>
      <div className="min-h-screen flex flex-col bg-bg-base overflow-x-hidden relative">
        {/* Toast Notifications */}
        <SlotFullToast />

        {/* Top Navigation */}
        <TopNav />

        {/* Main Layout Area */}
        <main className="relative flex-1 w-full flex flex-col lg:flex-row">
          {/* Canvas Interactive Stage */}
          <div className="relative flex-1">
            <CanvasStage />

            {/* Desktop Sticky Price Summary Overlay Card (Left Side) */}
            <div className="hidden lg:block fixed top-20 left-6 z-20">
              <PriceSummaryCard />
            </div>
          </div>

          {/* Floating Catalog Rail (Right Side) */}
          <CatalogRail />
        </main>
      </div>
    </BuilderProvider>
  );
}
