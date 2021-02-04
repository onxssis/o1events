<template>
  <div class="max-w-screen-xl mx-auto my-6 px-4">
    <div class="flex justify-center md:justify-between items-center mb-6">
      <h2 class="font-semibold text-2xl xl:text-3xl pl-3">
        Browse by Category
      </h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4">
      <div
        v-for="category in categories"
        :key="category.id"
        class="px-0 md:pr-4 pb-4"
      >
        <NuxtLink
          :to="`/events/find/${category.slug}`"
          class="shadow-md rounded border border-gray-100 hover:shadow-lg bg-white w-full h-12 inline-flex items-center cursor-pointer px-4"
        >
          <span class="flex items-center font-body"> {{ category.name }} </span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, namespace } from 'nuxt-property-decorator'
import { ICategory } from '~/@types'

const categoryStore = namespace('categories')

@Component({})
export default class BrowseCategory extends Vue {
  @categoryStore.State('categories')
  categories!: ICategory[]
}
</script>
