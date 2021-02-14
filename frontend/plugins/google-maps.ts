import { Plugin } from '@nuxt/types'
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

const GMap: Plugin = ({ $config }) => {
  Vue.use(VueGoogleMaps, {
    load: {
      key: $config.gMapsApiKey,
      libraries: 'places',
    },
  })
}

export default GMap

// Vue.use(VueGoogleMaps, {
//   load: {
//     key: process.env.GMAPS_API_KEY,
//     libraries: 'places',
//   },
// })
