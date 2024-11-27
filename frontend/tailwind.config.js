/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        core: {
          main: "#0085e8",
          dark: "#006ac3",
          white: "#f8fafc",
        },
      },
    },
  },
  plugins: [],
};
