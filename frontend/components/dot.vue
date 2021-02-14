<template>
  <span class="flex h-2 w-2 relative">
    <span
      v-if="pulse"
      class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
    ></span>
    <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
  </span>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class BaseSection extends Vue {
  @Prop({ default: false }) readonly pulse?: boolean
}
</script>
