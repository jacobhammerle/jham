/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        app: "rgb(var(--jh-app) / <alpha-value>)",
        surface: "rgb(var(--jh-surface) / <alpha-value>)",
        "surface-muted": "rgb(var(--jh-surface-muted) / <alpha-value>)",
        primary: "rgb(var(--jh-primary) / <alpha-value>)",
        secondary: "rgb(var(--jh-secondary) / <alpha-value>)",
        subtle: "rgb(var(--jh-subtle) / <alpha-value>)",
        border: "rgb(var(--jh-border) / <alpha-value>)",
        accent: "rgb(var(--jh-accent) / <alpha-value>)",
        "accent-soft": "rgb(var(--jh-accent-soft) / <alpha-value>)",
        shadow: "rgb(var(--jh-shadow) / <alpha-value>)",
      },
      fontFamily: {
        sans: [
          "Spline Sans",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
    },
  },
  plugins: [],
};
