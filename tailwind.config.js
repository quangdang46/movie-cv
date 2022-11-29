/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "350px",
        ...defaultTheme.screens,
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#E21221",
        secondary: "#ED6A74",
      },
      backgroundImage: {
        banner: "url('../public/images/banner.jpg')",
      },
      fontSize: {
        xxs: ".65rem",
      },
    },
  },
  plugins: [],
};
