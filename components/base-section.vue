<template>
  <div class="max-w-container mx-auto my-4">
    <div class="flex justify-between items-center">
      <h2 class="font-semibold text-2xl">{{ heading }}</h2>
      <a href="" class="text-royal hover:underline hidden md:inline-flex"
        >See all</a
      >
    </div>

    <a href="" class="md:hidden text-royal hover:underline">See all events</a>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class BaseSection extends Vue {
  @Prop({ required: true }) readonly heading!: string
}
</script>
