/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    extend: {
      gridTemplateColumns: {
        "small": "auto",
        "main": "1fr, 50px",
        "masonry": "repeat(auto-fill, minmax(250px,1fr))",
      },
      gridTemplateRows: {
        "small": "min-content",
        "main": "min-content, 1fr",
      },
      colors: {
        "main": "#E9CFC1",
        "primary": "#342E37",
        "secondary": "#5d585f",
      },
    },
  },
  plugins: [],
};
