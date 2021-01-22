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
          lighter: '#ebe6ff',
          lightest: '#f8f6ff',
        },
        carrot: {
          darkest: '#fef4e9',
          dark: '#e69045',
          DEFAULT: '#fa9628',
          light: '#ffe7d3',
          lightest: '#fef4e9',
          alt: '#4d96ff',
        },
        primary: {
          darkest: '#3d0a56',
          dark: '#6a1196',
          DEFAULT: '#9818d6',
          light: '#cc8ceb',
          lighter: '#ebe6ff',
          lightest: '#f8f6ff',
        },
      },
      fontFamily: {
        display: ['Graphik'],
        body: ['Inter'],
      },
      maxWidth: {
        container: '1200px',
        small: '1024px',
        fit: 'fit-content',
        mini: '960px',
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
  plugins: [require('@tailwindcss/forms')],
}
