import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-base": "#FFFFFF",
        "bg-subtle": "#F8F9FA",
        "text-primary": "#0F172A",
        "text-secondary": "#64748B",
        "text-muted": "#94A3B8",
        border: "#E2E8F0",
        "accent-dark": "#0F172A",
        "accent-green": "#10B981",
        "accent-red": "#EF4444",
        "accent-amber": "#F97316",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
