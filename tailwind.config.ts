
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        beige: "#F5F5DC",
        chocolate: "#2B1700",
        "chocolate-light": "#8B4513",
        whatsapp: "#25D366",
        favorite: "#FF0000",
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        display: ['var(--font-geist)', 'Geist', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        'extra-bold': '800',
      },
    },
  },
  plugins: [],
};
export default config;
