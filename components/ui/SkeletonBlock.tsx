import React from "react";
import { clsx } from "clsx";

type SkeletonBlockProps = {
  className?: string;
  variant?: "rectangular" | "circular" | "rounded";
};

export function SkeletonBlock({ className, variant = "rounded" }: SkeletonBlockProps) {
  const baseClasses = "animate-pulse bg-slate-200/80";

  const variants = {
    rectangular: "rounded-none",
    circular: "rounded-full",
    rounded: "rounded-xl",
  };

  return <div className={clsx(baseClasses, variants[variant], className)} />;
}
