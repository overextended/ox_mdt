/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        main: ['Roboto'],
      },
      colors: {
        durple: {
          50: '#33343F',
          100: '#2E2F3A',
          200: '#2A2B35',
          300: '#262730',
          400: '#22232C',
          500: '#1F2027',
          600: '#1C1D23',
          700: '#191A20',
          800: '#17171C',
          900: '#151519',
          950: '#131317',
        },
        // Mantine dark colours
        dark: {
          50: '#C1C2C5',
          100: '#A6A7AB',
          200: '#909296',
          300: '#5C5F66',
          400: '#373A40',
          500: '#2C2E33',
          600: '#25262B',
          700: '#1A1B1E',
          800: '#141517',
          900: '#101113',
        },
      },
    },
  },
  plugins: [],
};
