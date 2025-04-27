/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Libre Franklin"', 'Franklin Gothic', 'Arial', 'sans-serif'],
      },
      colors: {
        verde: '#117a65',
      }
    },
  },
  plugins: [],
}