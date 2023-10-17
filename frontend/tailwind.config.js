/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        lightgray: "#edf2f4",
        mint: "#7ae582",
        grass: "#009f65",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};