import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'abyssal-blue': '#0D1117', // Fondo principal
        'sunset-gold': '#FFCB47',  // Acentos y CTAs
        'ivory-white': '#F0F6FC',  // Texto principal
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Para UI y títulos
        serif: ['Satoshi', 'serif'],   // Para cuerpo de texto (usaremos sans-serif como fallback)
      },
    },
  },
  plugins: [],
};
export default config;