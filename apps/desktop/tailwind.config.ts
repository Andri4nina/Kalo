import type { Config } from "tailwindcss";
import { kaloColors } from "./src/design/palette";

const sans = ["Segoe UI Variable Text", "Segoe UI", "SF Pro Text", "system-ui", "sans-serif"];
const display = ["Segoe UI Variable Display", "Segoe UI", "SF Pro Display", "system-ui", "sans-serif"];

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { kalo: kaloColors },
      borderRadius: { "4xl": "2rem" },
      fontFamily: { sans, display },
      boxShadow: {
        soft: "0 18px 50px -30px rgb(0 0 0 / 0.55)",
        cover: "0 8px 24px rgb(0 0 0 / 0.5)",
        pop: "0 8px 8px rgb(0 0 0 / 0.3)",
      },
    },
  },
  plugins: [],
} satisfies Config;
