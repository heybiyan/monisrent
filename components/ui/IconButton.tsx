import React from "react";
import { clsx } from "clsx";

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
};

export function IconButton({
  children,
  variant = "default",
  size = "md",
  className,
  ...props
}: IconButtonProps) {
  const baseStyles = "inline-flex items-center justify-center rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-slate-400 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    default: "bg-bg-subtle text-text-primary hover:bg-slate-200/80 border border-border",
    outline: "bg-white text-text-primary hover:bg-bg-subtle border border-border shadow-sm",
    ghost: "text-text-secondary hover:text-text-primary hover:bg-slate-100",
  };

  const sizes = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
  };

  return (
    <button className={clsx(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}
