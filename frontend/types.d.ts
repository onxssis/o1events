declare module 'vue-fragment'
declare module 'vue-ctk-date-time-picker'
declare module 'vue-content-placeholders'

declare module '~/assets/images/icons/*' {
  import Vue, { VueConstructor } from 'vue'
  const content: VueConstructor<Vue>
  export default content
}
