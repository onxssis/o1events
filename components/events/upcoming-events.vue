<template>
  <base-section
    v-slot="slotProps"
    heading="Upcoming Events"
    :loading="$fetchState.pending"
    :data="events"
  >
    <event-card-alt :data="slotProps.data" />
  </base-section>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component
export default class UpcomingEvents extends Vue {
  events = []

  async fetch() {
    try {
      const { data } = await this.$axios.get('/events/upcoming')
      this.events = data
    } catch (e) {
      this.events = []
    }
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
