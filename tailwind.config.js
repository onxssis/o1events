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
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
