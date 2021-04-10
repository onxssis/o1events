import { Plugin } from '@nuxt/types'
import Constants from '~/config/constants'

declare module 'vue/types/vue' {
  // this.$constants inside Vue components
  interface Vue {
    $constants: typeof Constants
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$constants inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $constants: typeof Constants
  }
  // nuxtContext.$constants
  interface Context {
    $constants: typeof Constants
  }
}

declare module 'vuex/types/index' {
  // this.$constants inside Vuex stores
  interface Store<S> {
    $constants: typeof Constants
  }
}

const configPlugin: Plugin = (_, inject) => {
  inject('constants', Constants)
}

export default configPlugin
