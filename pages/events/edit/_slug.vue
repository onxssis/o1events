<template>
  <div class="bg-gray-50 wrapper py-8">
    <div class="max-w-fit md:max-w-screen-sm lg:max-w-screen-md mx-auto">
      <base-page-header> Edit {{ event.title }} </base-page-header>

      <event-form :event="event" />
    </div>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Vue, namespace } from 'nuxt-property-decorator'
import { Fragment } from 'vue-fragment'
import { IEvent } from '~/@types'

const eventsStore = namespace('events')

@Component({
  layout: 'default',
  components: {
    Fragment,
  },
})
export default class EventPage extends Vue {
  @eventsStore.State('event')
  event!: IEvent

  async fetch({ params, store }: Context) {
    this.event = store.state.events.event

    if (this.event && this.event.title === undefined) {
      await store.dispatch('events/get', params.slug)
    }
  }
}
</script>
