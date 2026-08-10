import React from "react";
import { clsx } from "clsx";
import { ShoppingBag, ArrowRight } from "lucide-react";

type CTAButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  icon?: React.ReactNode;
};

export function CTAButton({ children = "Rent Your Setup", icon, className, ...props }: CTAButtonProps) {
  return (
    <button
      className={clsx(
        "w-full rounded-full bg-accent-dark text-white font-bold py-3.5 px-6 shadow-lg hover:bg-slate-800 active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-sm tracking-wide group",
        className
      )}
      {...props}
    >
      {icon || <ShoppingBag className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />}
      <span>{children}</span>
      <ArrowRight className="w-4 h-4 ml-auto text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
    </button>
  );
}
