import type { Config } from "tailwindcss";

/**
 * Дизайн-токены МАБЛ.
 * Цвета строго из бренд-гайда:
 *   Нефть    #212128
 *   Океан    #3552AF
 *   Мудрость #FFFFFF
 * Дополнительные оттенки — только производные от нефти/океана.
 */
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        oil: {
          DEFAULT: "#212128",
          900: "#212128",
          800: "#2b2b33",
          700: "#3a3a44",
          600: "#52525e",
          500: "#6f6f7c",
          400: "#9a9aa4",
          300: "#c4c4cb",
          200: "#e2e2e6",
          100: "#f1f1f3",
          50: "#f8f8f9",
        },
        ocean: {
          DEFAULT: "#3552AF",
          900: "#1f3170",
          800: "#283f8c",
          700: "#2f49a0",
          600: "#3552AF",
          500: "#4a66bf",
          400: "#6c84cf",
          300: "#9aabdf",
          200: "#c7d1ee",
          100: "#e7ecf8",
          50: "#f3f6fc",
        },
        wisdom: "#FFFFFF",
      },
      fontFamily: {
        // Фирменный шрифт TT Rationalist подключается через @font-face в globals.css.
        sans: ["var(--font-rationalist)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        heading: "0.14em",
        wide2: "0.22em",
      },
      borderRadius: {
        // Умеренные радиусы — без «пластиковости».
        token: "4px",
        card: "8px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(33,33,40,0.04), 0 8px 24px rgba(33,33,40,0.06)",
        soft: "0 1px 2px rgba(33,33,40,0.05)",
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
