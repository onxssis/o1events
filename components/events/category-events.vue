<template>
  <div>
    <base-section
      v-for="category in filteredCategories"
      :key="category.id"
      v-slot="slotProps"
      :heading="`${category.name}`"
      :data-url="`/events?category=${category.name}&limit=5`"
    >
      <event-card-alt :data="slotProps.data" />
    </base-section>
  </div>
</template>

<script lang="ts">
import { Vue, Component, namespace } from 'nuxt-property-decorator'
import { Fragment } from 'vue-fragment'
import { ICategory } from '~/@types'

const categoryStore = namespace('categories')

@Component({
  components: {
    Fragment,
  },
})
export default class CategoryEvents extends Vue {
  @categoryStore.State('categories')
  categories!: ICategory[]

  get filteredCategories() {
    return this.categories
      .filter((cat) => cat.slug !== 'uncategorized')
      .slice(0, 3)
  }
}
</script>

<style>
.h-scroll {
  display: grid;
  max-width: 1200px;
  grid-gap: 20px;
  grid-template-columns: repeat(7, 280px);
  padding: 20px 10px;

  overflow-x: auto;
}
</style>
