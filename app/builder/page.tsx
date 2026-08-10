import React from "react";
import { BuilderProvider } from "@/context/BuilderContext";
import { TopNav } from "@/components/layout/TopNav";
import { CanvasStage } from "@/components/layout/CanvasStage";
import { CatalogRail } from "@/components/rail/CatalogRail";
import { SlotFullToast } from "@/components/rail/SlotFullToast";

export default function BuilderPage() {
  return (
    <BuilderProvider>
      <div className="min-h-screen flex flex-col bg-bg-base overflow-x-hidden relative">
        {/* Toast Notifications */}
        <SlotFullToast />

        {/* Top Navigation */}
        <TopNav />

        {/* Main Layout Area: Full-bleed Canvas + Floating Catalog Rail */}
        <main className="relative flex-1 w-full">
          <CanvasStage />
          <CatalogRail />
        </main>
      </div>
    </BuilderProvider>
  );
}
