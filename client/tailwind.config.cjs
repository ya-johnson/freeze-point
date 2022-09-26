/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
    },
    colors: {
      'black-dark': '#0D0D0D',
      'black': '#1E1E1E',
      'grey-dark': '#8E8E8E',
      'grey': '#D9D9D9',
      'grey-light': '#ECECEC',
      'white': '#FFFFFF',
      'pink': '#FB6F92',
      'blue': '#00BBF9',
      'green': '#7DDF64',
      'red': '#E63946'
    },
    fontFamily: {
      'ubuntu': ['Ubuntu', 'sans-serif']
    },
    extend: {
      backgroundImage: {
        'hero-dark': 'url(./src/assets/hero-dark.svg)',
        'hero-light': 'url(./src/assets/hero-light.svg)',
        'login': 'url(./src/assets/login.jpg)',
        'register': 'url(./src/assets/register.jpg)',
      }
    },
  },
  plugins: [],
}
