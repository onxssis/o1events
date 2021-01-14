<template>
  <div class="max-w-screen-xl mx-auto my-4 px-4">
    <div class="flex justify-center md:justify-between items-center mb-6">
      <h2 class="font-semibold text-2xl xl:text-4xl">{{ heading }}</h2>
      <a
        v-if="seeAll"
        href=""
        class="text-carrot-dark hover:underline hidden md:inline-flex"
        >See all</a
      >
    </div>

    <div v-if="loading">Loading...</div>

    <div v-if="!loading" class="h-scroll">
      <div v-for="(val, idx) in data" :key="idx" class="w-full">
        <slot :data="val" />
      </div>
    </div>

    <div v-if="seeAll" class="text-center mt-8">
      <a href="" class="md:hidden text-carrot-dark hover:underline"
        >See all events</a
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component({
  props: {
    key: {
      type: String,
    },
  },
})
export default class BaseSection extends Vue {
  @Prop({ default: 'Section Heading' }) readonly heading!: string
  @Prop({ default: true }) readonly seeAll!: boolean
  @Prop({ default: false }) readonly loading!: boolean
  @Prop({ default: () => [] }) readonly data!: Array<any>
}
</script>

<style>
.h-scroll {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(7, 270px);
  padding: 20px 10px;

  overflow-x: auto;
}
</style>
