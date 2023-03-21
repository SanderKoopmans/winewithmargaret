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
        "masonry": "repeat(auto-fit, minmax(250px,1fr))",
        "footer-main": "repeat(12, 1fr)",
        "footer-links": "repeat(2, 1fr)",
        "footer-links-lg": "repeat(6, 1fr)",
      },
      gridTemplateRows: {
        "small": "50px, 1fr, 3fr, 1fr",
        "main": "1fr 4fr 1fr",
        "footer-main": "repeat(2, min-content)",
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
