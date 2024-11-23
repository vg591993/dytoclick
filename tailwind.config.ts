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
        sage: {
          50: '#f0f4f1',
          100: '#e1e9e3',
          200: '#c3d4c7',
          300: '#a5bfab',
          400: '#87aa8f',
          500: '#699573',
          600: '#4b7055',
          700: '#2d4b37',
          800: '#26534c',  // Main brand color from image
          900: '#1c3b2b',
        },
        mint: {
          50: '#f5f7ed',
          100: '#ebefe1',
          200: '#d7dfc3',
          300: '#c3cfa5',
          400: '#afbf87',
          500: '#9baf69',
          600: '#87a04b',
          700: '#73912d',
          800: '#5f820f',
          900: '#4b7300',
        },
      },
    },
  },
  plugins: [],
};
export default config;