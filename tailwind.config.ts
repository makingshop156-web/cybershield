import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-fira-code)", "JetBrains Mono", "monospace"],
      },
      colors: {
        glass: {
          white: "rgba(255, 255, 255, 0.05)",
          border: "rgba(255, 255, 255, 0.08)",
          hover: "rgba(255, 255, 255, 0.1)",
          active: "rgba(255, 255, 255, 0.15)",
        },
        cyber: {
          bg: "#0a0e17",
          card: "#111827",
          border: "#1f2937",
          accent: "#22d3ee",
          accent2: "#06b6d4",
          green: "#10b981",
          gold: "#f59e0b",
          red: "#ef4444",
          text: "#f1f5f9",
          muted: "#94a3b8",
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
        "glass-sm": "0 4px 16px 0 rgba(0, 0, 0, 0.2)",
        glow: "0 0 20px rgba(34, 211, 238, 0.15)",
        "glow-lg": "0 0 40px rgba(34, 211, 238, 0.2)",
      },
      animation: {
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 5px rgba(34, 211, 238, 0.3)" },
          "50%": { boxShadow: "0 0 25px rgba(34, 211, 238, 0.6)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
