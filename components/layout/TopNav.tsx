import React from "react";
import Link from "next/link";
import { ShoppingBag, HelpCircle, User, Sparkles } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";

export function TopNav() {
  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-sm border-b border-border px-4 lg:px-8 py-3 flex items-center justify-between">
      {/* Brand / Logo */}
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-accent-dark text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
            m
          </div>
          <span className="font-bold text-lg text-text-primary tracking-tight">
            monis<span className="text-text-secondary font-normal">.rent</span>
          </span>
        </Link>
        <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-text-secondary border border-border">
          <Sparkles className="w-3 h-3 text-amber-500" /> Workspace Builder
        </span>
      </div>

      {/* Nav Actions */}
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden md:flex items-center gap-1 text-xs font-medium text-text-secondary bg-bg-subtle px-3 py-1.5 rounded-full border border-border">
          <span>Currency:</span>
          <span className="text-text-primary font-semibold">$ USD</span>
        </div>

        <IconButton variant="ghost" size="sm" aria-label="Help & FAQ">
          <HelpCircle className="w-4 h-4" />
        </IconButton>

        <IconButton variant="outline" size="sm" aria-label="Cart" className="relative">
          <ShoppingBag className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent-red text-white text-[10px] font-bold flex items-center justify-center">
            2
          </span>
        </IconButton>

        <div className="h-4 w-px bg-border hidden sm:block" />

        <IconButton variant="default" size="sm" aria-label="User Account">
          <User className="w-4 h-4" />
        </IconButton>
      </div>
    </header>
  );
}
