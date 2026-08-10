import React from "react";
import { TopNav } from "@/components/layout/TopNav";
import { CanvasStage } from "@/components/layout/CanvasStage";
import { CatalogRail } from "@/components/rail/CatalogRail";

export default function BuilderPage() {
  return (
    <div className="min-h-screen flex flex-col bg-bg-base overflow-x-hidden">
      {/* Top Navigation */}
      <TopNav />

      {/* Main Layout Area: Full-bleed Canvas + Floating Catalog Rail */}
      <main className="relative flex-1 w-full">
        <CanvasStage />
        <CatalogRail />
      </main>
    </div>
  );
}
