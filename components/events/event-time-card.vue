<template>
  <div
    class="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
  >
    <div class="flex-shrink-0">
      <clock-icon class="w-6 fill-current text-gray-600" />
    </div>
    <div class="flex-1 min-w-0">
      <a href="#" class="focus:outline-none">
        <span class="absolute inset-0" aria-hidden="true"></span>
        <p class="text-sm font-medium text-gray-900">
          {{ startDate }}
        </p>
        <p class="text-sm text-gray-400 truncate mt-px">
          to
          <span class="text-gray-900 font-medium">{{ endDate }}</span>
        </p>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class EventTimeCard extends Vue {
  @Prop({ required: true, type: String }) startDate!: string
  @Prop({ required: true, type: String }) endDate!: string
}
</script>
