"use client";

import React from "react";
import { AlertTriangle, X } from "lucide-react";
import { useBuilder } from "@/context/BuilderContext";

export function SlotFullToast() {
  const { toastMessage, clearToast } = useBuilder();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-slate-900 text-white shadow-2xl border border-slate-700/80 text-xs font-semibold">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
        <span>{toastMessage}</span>
        <button
          onClick={clearToast}
          className="ml-1 p-0.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          aria-label="Dismiss toast"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
