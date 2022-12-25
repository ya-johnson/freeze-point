/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '1rem'
    },
    colors: {
      'black-dark': '#0D0D0D',
      'black': '#1E1E1E',
      'grey-dark': '#8E8E8E',
      'grey': '#D9D9D9',
      'grey-light': '#ECECEC',
      'white': '#FFFFFF',
      'pink': '#FA4E79',
      'pink-light': '#FB6F92',
      'dim-pink': '#FB6F9260',
      'blue': '#00BBF9',
      'blue-light': '#4FD3FF',
      'dim-blue': '#4FD3FF60',
      'green': '#4ED32C',
      'green-light': '#7DDF64',
      'dim-green': '#7DDF6460',
      'red': '#E63946',
      'red-light': '#EA5762',
      'dim-red': '#EA576260'
    },
    fontFamily: {
      'ubuntu': ['Ubuntu', 'sans-serif'],
      'covered': ['Covered By Your Grace', 'cursive']
    },
    extend: {},
  },
  plugins: [],
}
