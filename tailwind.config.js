module.exports = {
  purge: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        royal: {
          darkest: '#3d0a56',
          dark: '#6a1196',
          DEFAULT: '#9818d6',
          light: '#cc8ceb',
          lightest: '#ead1f7',
        },
        carrot: {
          darkest: '#fef4e9',
          dark: '#e69045',
          DEFAULT: '#ffa04d',
          light: '#ffe7d3',
          lightest: '#fef4e9',
        },
      },
      fontFamily: {
        display: ['Graphik'],
        body: ['Inter'],
      },
      maxWidth: {
        container: '1200px',
        mini: '1024px',
      },
      spacing: {
        84: '21rem',
        86: '22rem',
      },
      borderWidth: {
        3: '3px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
