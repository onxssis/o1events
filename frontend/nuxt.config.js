export default {
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
  plugins: [
    '~/plugins/vue-ctk-datepicker',
    '~/plugins/vue-placeholders',
    '~/plugins/toastr',
    { src: '~/plugins/vue-js-modal', mode: 'client' },
    { src: '~/plugins/google-maps', ssr: true },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/svg',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ['@nuxtjs/axios', '@nuxtjs/auth-next', 'portal-vue/nuxt'],

  axios: {
    baseURL: process.env.API_BASE_URL || 'http://localhost:3000', // Used as fallback if no runtime config is provided
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL,
    },
    gMapsApiKey: process.env.GMAPS_API_KEY,
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.API_BASE_URL,
    },
  },

  loading: { color: '#9818d6', throttle: 0 },

  router: {
    extendRoutes(routes) {
      routes.push({
        name: 'events-find-category',
        path: '/events/find/:category',
        component: '~/pages/events/find.vue',
      })
    },
  },

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
  build: {
    transpile: [/^vue2-google-maps($|\/)/],
  },
}
