import type { Config } from "tailwindcss";
import { kaloColors } from "./src/design/palette";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { kalo: kaloColors },
      borderRadius: { "4xl": "2rem" },
      fontFamily: {
        sans: ["Segoe UI", "SF Pro Text", "system-ui", "sans-serif"],
        display: ["Iowan Old Style", "Palatino Linotype", "Georgia", "serif"],
      },
      boxShadow: { soft: "0 18px 50px -30px rgb(0 0 0 / 0.55)" },
    },
  },
  plugins: [],
} satisfies Config;
