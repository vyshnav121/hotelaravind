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
        'kerala': {
          green: '#004d3d', // Deeper, richer emerald
          'green-light': '#006A4E',
          gold: '#C5A02F', // More muted, elegant gold
          'gold-light': '#E5C158',
          cream: '#FDFBF7', // Warm off-white
          sand: '#F5F2EA',
        },
        dark: {
          900: '#121212',
          800: '#1E1E1E',
          700: '#2D2D2D',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'card': '0 2px 10px rgba(0, 0, 0, 0.03)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "url('/patterns/kerala-pattern.svg')", // Placeholder if we had one
      }
    },
  },
  plugins: [],
};
export default config;
