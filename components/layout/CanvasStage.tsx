import React from "react";
import { Monitor, Armchair, Box } from "lucide-react";

export function CanvasStage() {
  return (
    <div className="relative w-full h-[calc(100vh-65px)] min-h-[500px] overflow-hidden bg-gradient-to-br from-slate-100 via-emerald-50/20 to-slate-200/80 flex items-center justify-center p-6">
      {/* Studio Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.8),transparent_70%)] pointer-events-none" />
      
      {/* Floor Grid Accent */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Interactive Studio Stage Container */}
      <div className="relative w-full max-w-4xl aspect-[16/9] bg-white/40 backdrop-blur-sm rounded-3xl border border-white/60 shadow-xl flex items-center justify-center p-8 transition-all">
        
        {/* Desk Placeholder Stage */}
        <div className="relative w-full h-full flex flex-col items-center justify-end pb-8">
          
          {/* Main Desk Illustration Container */}
          <div className="relative w-3/4 h-48 bg-gradient-to-b from-amber-100/90 to-amber-200/90 rounded-2xl border-4 border-amber-800/20 shadow-2xl flex flex-col items-center justify-center gap-2 group transition-transform hover:scale-[1.01]">
            {/* Desk Surface Texture */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-amber-200/60 rounded-t-xl border-b border-amber-300/40" />

            {/* Placeholder Items Overlay Indicators */}
            <div className="flex items-center justify-center gap-6 text-amber-900/60 z-10">
              <div className="flex flex-col items-center gap-1">
                <Monitor className="w-8 h-8 stroke-[1.5]" />
                <span className="text-[11px] font-medium">Monitor Slot</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Box className="w-6 h-6 stroke-[1.5]" />
                <span className="text-[11px] font-medium">Accessory Slot</span>
              </div>
            </div>

            <div className="text-xs font-semibold text-amber-950 bg-amber-50/80 px-3 py-1 rounded-full border border-amber-300/50 shadow-sm z-10">
              Electric Adjustable Desk Pro (160x80cm)
            </div>

            {/* Desk Legs Placeholder */}
            <div className="absolute -bottom-16 left-12 w-6 h-20 bg-slate-800 rounded-b-md shadow-md" />
            <div className="absolute -bottom-16 right-12 w-6 h-20 bg-slate-800 rounded-b-md shadow-md" />
          </div>

          {/* Chair Placeholder behind/below */}
          <div className="absolute bottom-2 flex flex-col items-center text-slate-400 gap-1 opacity-75">
            <Armchair className="w-10 h-10 stroke-[1.5] text-slate-600" />
            <span className="text-[10px] font-medium bg-white/70 px-2 py-0.5 rounded-full border border-slate-200">
              Chair Slot
            </span>
          </div>

          {/* Realistic Soft Shadow beneath setup */}
          <div className="absolute -bottom-4 w-4/5 h-8 bg-black/15 blur-xl rounded-full pointer-events-none" />
        </div>
      </div>

      {/* Canvas Hint Badge */}
      <div className="absolute bottom-6 left-6 hidden sm:flex items-center gap-2 bg-white/80 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/60 shadow-md text-xs text-text-secondary">
        <span className="w-2 h-2 rounded-full bg-accent-green" />
        <span>Canvas Stage — Interactive 2D Studio</span>
      </div>
    </div>
  );
}
