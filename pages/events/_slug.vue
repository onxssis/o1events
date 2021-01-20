<template>
  <div class="p-0">
    <div
      class="flex md:items-center justify-between bg-primary-lightest sm-hero"
    >
      <div class="text-onyx mt-8 md:my-auto m-s md:ml-s lg:ml-xxl-2">
        <h1 class="font-extrabold c-page-title mb-s md:mb-xs xl:mb-10px">
          Find great retail jobs.
        </h1>
        <span class="c-page-description mt-4"
          >Learn more about the nations top retail companies</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Vue, namespace } from 'nuxt-property-decorator'
import { IEvent } from '~/@types'

const eventsStore = namespace('events')

@Component({
  layout: 'default',
})
export default class EventPage extends Vue {
  slug = ''

  @eventsStore.State('event')
  event!: IEvent

  async fetch({ params, store }: Context) {
    this.slug = params.slug
    await store.dispatch('events/get', params.slug)
  }
}
</script>
