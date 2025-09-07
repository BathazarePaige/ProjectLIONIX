/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'noto': ['Noto Serif', 'serif'],
      },
      colors: {
        'lionix': {
          'dark': '#171A1C',
          'gray': '#B8BFC9',
          'darker': '#333638',
          'darkest': '#242629',
          'light-gray': '#A8ABB2',
        }
      }
    }
  },
  plugins: [],
};
