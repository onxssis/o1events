<template>
  <div
    v-bind="$attrs"
    class="inline-block align-middle relative bg-gray-300 text-gray-500 rounded-full h-8 w-8"
  >
    <div class="top-1/2 left-1/2 absolute initials text-sm font-medium">
      <!-- <svg
        class="text-gray-500 fill-current"
        preserveAspectRatio="xMinYMin meet"
        width="16"
        height="16"
        viewBox="0 0 36 36"
        role="img"
      >
        <use xlink:href="#icon-profile">
          <svg id="icon-profile" viewBox="0 0 24 24">
            <title>profile</title>
            <path
              d="M12 1.714c1.875 0 3.4 1.538 3.4 3.429 0 1.89-1.525 3.428-3.4 3.428S8.6 7.034 8.6 5.143s1.525-3.429 3.4-3.429zm0 8.572c2.816 0 5.1-2.303 5.1-5.143S14.816 0 12 0 6.9 2.303 6.9 5.143s2.284 5.143 5.1 5.143zm6.8 10.285c0 .946-.762 1.715-1.7 1.715H6.9c-.938 0-1.7-.77-1.7-1.715v-1.714c0-2.836 2.287-5.143 5.1-5.143h3.4c2.813 0 5.1 2.307 5.1 5.143v1.714zM13.7 12h-3.4c-3.755 0-6.8 3.07-6.8 6.857v1.714C3.5 22.465 5.022 24 6.9 24h10.2c1.878 0 3.4-1.535 3.4-3.429v-1.714C20.5 15.07 17.455 12 13.7 12z"
              fill-rule="evenodd"
            ></path>
          </svg>
        </use>
      </svg> -->
      {{ initials }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class DefaultAvatar extends Vue {
  @Prop({ default: 'OO' }) readonly initials?: string
}
</script>

<style scoped>
.initials {
  transform: translate(-50%, -50%);
}
</style>
