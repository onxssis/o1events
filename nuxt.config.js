export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'frontend',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/tailwindcss'],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ['@nuxtjs/axios', '@nuxtjs/auth-next'],

  axios: {
    baseURL: 'http://localhost:3000', // Used as fallback if no runtime config is provided
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL,
    },
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL,
    },
  },

  loading: { color: '#ffa04d', throttle: 0 },

  auth: {
    redirect: {
      home: '/',
      logout: '/',
      login: '/login',
      callback: '/callback',
    },
    rewriteRedirects: true,
    vuex: {
      namespace: 'auth',
    },
    strategies: {
      local: {
        token: {
          property: 'access_token',
        },
        user: {
          property: false,
        },
        endpoints: {
          logout: false,
          login: {
            url: '/auth/login',
            method: 'post',
          },
          user: { url: '/auth/profile', method: 'get', propertyName: false },
        },
        tokenRequired: true,
        tokenType: 'Bearer',
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
