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
        navy: {
          DEFAULT: '#0a1628',
          dark: '#050b14',
          light: '#1a2638',
        },
        pakistan: {
          green: '#01411C',
          'green-light': '#02552a',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E5C158',
          dark: '#B8941F',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #0a1628 0%, #01411C 100%)',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.15)',
        'gold': '0 4px 20px rgba(212, 175, 55, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
