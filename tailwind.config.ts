import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./design-system/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          50: "rgb(var(--background-50))",
          100: "rgb(var(--background-100))",
          200: "rgb(var(--background-200))",
          300: "rgb(var(--background-300))",
        },
        text: {
          primary: "rgb(var(--text-primary))",
          secondary: "rgb(var(--text-secondary))",
          tertiary: "rgb(var(--text-tertiary))",
        },
        primary: {
          100: "rgb(var(--primary-100))", // Lightest - for backgrounds
          200: "rgb(var(--primary-200))", // Light - for hover states
          300: "rgb(var(--primary-300))", // Medium - for active states
          400: "rgb(var(--primary-400))", // Darkest - for text/main color
          500: "rgb(var(--primary-500))", // Main - for buttons
          600: "rgb(var(--primary-600))", // Dark - for hover states
          700: "rgb(var(--primary-700))", // Darker - for active states
          800: "rgb(var(--primary-800))", // Darkest - for text/main color
          900: "rgb(var(--primary-900))", // Darkest - for text/main color
        },
        error: {
          100: "rgb(var(--error-100))", // Lightest
          200: "rgb(var(--error-200))", // Light
          300: "rgb(var(--error-300))", // Medium
          400: "rgb(var(--error-400))", // Darkest
        },
      },
    },
  },
  plugins: [],
};
export default config;
