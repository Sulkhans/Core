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
          main: "#0068b5",
          light: "#0085e8",
          dark: "#004b82",
          white: "#f8fafc",
        },
      },
    },
  },
  plugins: [],
};
