<template>
  <div class="bg-gray-50 wrapper py-8">
    <div class="max-w-fit md:max-w-screen-sm lg:max-w-screen-md mx-auto">
      <base-page-header>
        Create event
        <template v-slot:right>
          <NuxtLink to="/categories/create" class="text-royal underline">
            Create category</NuxtLink
          >
        </template>
      </base-page-header>

      <event-form />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({
  layout: 'default',
  middleware: ['auth'],
})
export default class CreateEventPage extends Vue {}
</script>
