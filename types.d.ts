declare module 'vue-fragment'

declare module '~/assets/images/icons/*' {
  import Vue, { VueConstructor } from 'vue'
  const content: VueConstructor<Vue>
  export default content
}
