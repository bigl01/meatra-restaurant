import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'geist-sans': ['var(--font-geist-sans)', 'sans-serif'],
        'geist-mono': ['var(--font-geist-mono)', 'monospace'],
        'stolzl': ['Stolzl', 'sans-serif'],
      },
      colors: {
        'meatra': {
          dark: '#15181D',
          gray: '#1E2126',
          gold: '#DFAD23',
          red: '#C52735',
          'text-gray': '#4A5260',
          'light-gray': '#A0A0A0',
          'border-gray': '#2A2E35',
        },
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
};

export default config;
