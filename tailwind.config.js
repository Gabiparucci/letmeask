module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        purple: '#835AFD',
        'dark-purple': '#6F4BD8',
        'gray-dark': '#737380',
        'gray-medium': '#A8A8B3',
        'gray-light': '#DBDCDD',
        'white-bg': '#F8F8F8',
        'pink-dark': '#E559F9',
        'pink-light': '#D67EE2',
        danger: '#D73754'
      }
    },
  },
  variants: {
    extend: {
      filter: ['hover'],
      opacity: ['disabled'],
    }
  },
  plugins: [],
}
