/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        sintony: ["Sintony", "sans-serif"],
      },
      colors: {
        core: {
          main: "#0075D5",
          dark: "#0065B8",
          white: "#fcfdfe",
        },
      },
    },
  },
  plugins: [],
};
