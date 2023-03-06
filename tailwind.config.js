/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
    },
    extend: {
      gridTemplateColumns: {
        'main': '1fr, 50px',
        'masonry': 'repeat(auto-fill, minmax(250px,1fr))',
      },
      gridTemplateRows: {
        'main': 'min-content, 1fr',
      },
      colors: {
        'main': '#E9CFC1',
      },
    },
  },
  plugins: [],
};
