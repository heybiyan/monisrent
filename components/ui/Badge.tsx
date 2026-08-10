import React from "react";
import { clsx } from "clsx";

type BadgeProps = {
  variant?: "discount" | "status-available" | "status-limited" | "status-unavailable" | "default";
  children: React.ReactNode;
  className?: string;
};

export function Badge({ variant = "default", children, className }: BadgeProps) {
  const baseStyles = "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium transition-colors";
  
  const variants = {
    discount: "bg-accent-red text-white font-bold",
    "status-available": "bg-emerald-50 text-emerald-700 border border-emerald-200/60",
    "status-limited": "bg-amber-50 text-amber-700 border border-amber-200/60",
    "status-unavailable": "bg-slate-100 text-slate-400 border border-slate-200",
    default: "bg-bg-subtle text-text-secondary border border-border",
  };

  return (
    <span className={clsx(baseStyles, variants[variant], className)}>
      {variant === "status-available" && (
        <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
      )}
      {variant === "status-limited" && (
        <span className="w-1.5 h-1.5 rounded-full bg-accent-amber" />
      )}
      {variant === "status-unavailable" && (
        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
      )}
      {children}
    </span>
  );
}
