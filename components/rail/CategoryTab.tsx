import React from "react";
import { clsx } from "clsx";
import { Table, Armchair, Monitor, Laptop, LucideIcon } from "lucide-react";

export type CategoryId = "desk" | "chair" | "monitors" | "computer";

export type CategoryOption = {
  id: CategoryId;
  label: string;
  icon: LucideIcon;
};

export const CATEGORIES: CategoryOption[] = [
  { id: "desk", label: "Desk", icon: Table },
  { id: "chair", label: "Chair", icon: Armchair },
  { id: "monitors", label: "Monitor", icon: Monitor },
  { id: "computer", label: "Computer", icon: Laptop },
];

type CategoryTabProps = {
  activeCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
};

export function CategoryTab({ activeCategory, onSelectCategory }: CategoryTabProps) {
  return (
    <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-2xl border border-slate-200/80 overflow-x-auto no-scrollbar">
      {CATEGORIES.map((cat) => {
        const Icon = cat.icon;
        const isActive = activeCategory === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={clsx(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200",
              isActive
                ? "bg-accent-dark text-white shadow-sm scale-[1.02]"
                : "text-text-secondary hover:text-text-primary hover:bg-white/60"
            )}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
}
