/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#ecfeff",   // cyan-50
          100: "#cffafe",  // cyan-100
          200: "#a5f3fc",  // cyan-200
          300: "#67e8f9",  // cyan-300
          400: "#22d3ee",  // cyan-400
          500: "#06b6d4",  // cyan-500
          600: "#0891b2",  // cyan-600
          700: "#0e7490",  // cyan-700 / teal-700
          800: "#1e293b",  // slate-800
          900: "#134e4a",  // teal-900
        }
      }
    },
  },
  plugins: [],
};
