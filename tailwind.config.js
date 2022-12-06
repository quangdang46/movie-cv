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
        tagsLinear:
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(180,175,46,0.9048723897911833) 0%, rgba(162,255,0,0.9953596287703016) 70%);",
      },
      backgroundImage: {
        banner: "url('../public/images/banner.jpg')",
        "gradient-to-b":
          "linear-gradient(to bottom,rgba(20,20,20,0) 0,rgba(20,20,20,.15) 15%,rgba(20,20,20,.35) 29%,rgba(20,20,20,.58) 44%,#141414 68%,#141414 100%);",
      },
      fontSize: {
        xxs: ".65rem",
      },
      textShadow: {
        md: "2px 2px 4px rgb(0 0 0 / 45%);",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("tailwindcss-textshadow"),
    require("tailwind-scrollbar"),
  ],
};
