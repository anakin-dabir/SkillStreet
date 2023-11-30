/* eslint-disable-next-line */
const defaultConfig = require("tailwindcss/defaultConfig");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Montserrat", ...defaultConfig.theme.fontFamily.sans]
    },
    extend: {
      colors: {
        "a-bar": "#1F2125",
        "a-bar-border": "#414348",
        "a-bg": "#292B2F",
        "a-gray": "#37393E",
        "a-black": "#2C2C2C",
        "a-yellow": "#FFB500",
        "a-reel-arrow": "#333539"
      },
      borderRadius: {}
    }
  },
  plugins: []
};
