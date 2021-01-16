/// <reference types="@types/googlemaps" />
declare module 'vue2-google-maps' {
  import Vue, { PluginFunction } from 'vue'

  export const install: PluginFunction<{}>

  class gmapApi extends Vue {}

  export { gmapApi }
}
