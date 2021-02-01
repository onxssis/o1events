<template>
  <div class="max-w-screen-xl mx-auto my-4 px-4" v-bind="$attrs">
    <div class="flex justify-center md:justify-between items-center mb-6">
      <h2 class="font-semibold text-2xl xl:text-3xl pl-3">{{ heading }}</h2>
      <NuxtLink
        v-if="seeAll"
        :to="seeAllLink"
        class="text-primary-dark hover:underline hidden md:inline-flex"
        >See all</NuxtLink
      >
    </div>

    <div v-if="fetchState" class="h-scroll">
      <content-placeholders v-for="n in 4" :key="n" :rounded="true">
        <content-placeholders-img />
        <content-placeholders-text :lines="1" />
      </content-placeholders>
    </div>

    <div v-else class="h-scroll">
      <div v-for="(val, idx) in results" :key="idx" class="w-full">
        <slot :data="val" />
      </div>
    </div>

    <div v-if="seeAll" class="text-center mt-8">
      <NuxtLink
        :to="seeAllLink"
        class="md:hidden text-primary-dark hover:underline"
        >See all events</NuxtLink
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class BaseSection extends Vue {
  @Prop({ default: 'Section Heading' }) readonly heading!: string
  @Prop({ default: true }) readonly seeAll!: boolean
  @Prop({ default: '/events/find' }) readonly seeAllLink!: string
  @Prop({ default: '' }) readonly dataUrl!: string

  results = []

  fetchState = false

  async mounted() {
    console.log('called')
    if (this.dataUrl !== '') {
      this.fetchState = true

      try {
        const { data } = await this.$axios.get(this.dataUrl)

        if (Array.isArray(data.data)) {
          this.results = data.data
        } else {
          this.results = data
        }

        this.fetchState = false
      } catch (e) {
        this.results = []
        this.fetchState = false
      }
    }
  }
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
