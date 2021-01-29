<template>
  <div class="bg-gray-50 wrapper py-8">
    <div class="max-w-fit md:max-w-screen-sm lg:max-w-screen-md mx-auto">
      <base-page-header> Create category </base-page-header>

      <category-form />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({
  layout: 'default',
  middleware: ['auth', 'admin'],
})
export default class CreateCategoryPage extends Vue {}
</script>
