/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      padding: {
        "1/6": "16.666667%",
      },
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
        "gray-lighten": "#989898",
        "gray-darken": "#3a3939",
        "dark-darken": "#19191b",
        "dark-lighten": "#333335",
        "dark-lighten-2": "#49494b",
      },
      fontSize: {
        xxs: ".65rem",
      },
      gridTemplateColumns: {
        sm: "repeat(auto-fill, minmax(130px, 1fr))",
        lg: "repeat(auto-fill, minmax(160px, 1fr))",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide"), require("tailwind-scrollbar")],
};
