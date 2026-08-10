import React from "react";
import { clsx } from "clsx";

type PriceTagProps = {
  pricePerWeek: number;
  originalPricePerWeek?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function PriceTag({
  pricePerWeek,
  originalPricePerWeek,
  size = "md",
  className,
}: PriceTagProps) {
  const isDiscounted = originalPricePerWeek && originalPricePerWeek > pricePerWeek;

  const sizeClasses = {
    sm: {
      price: "text-sm font-bold",
      original: "text-[11px]",
      unit: "text-[11px]",
    },
    md: {
      price: "text-base font-bold",
      original: "text-xs",
      unit: "text-xs",
    },
    lg: {
      price: "text-2xl font-bold",
      original: "text-sm",
      unit: "text-sm",
    },
  };

  return (
    <div className={clsx("flex items-baseline gap-1.5 flex-wrap", className)}>
      <span className={clsx(sizeClasses[size].price, isDiscounted ? "text-accent-red" : "text-text-primary")}>
        ${pricePerWeek}
      </span>
      <span className={clsx("text-text-secondary font-medium", sizeClasses[size].unit)}>
        /week
      </span>
      {isDiscounted && (
        <span className={clsx("text-text-muted line-through", sizeClasses[size].original)}>
          ${originalPricePerWeek}
        </span>
      )}
    </div>
  );
}
