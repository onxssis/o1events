<template>
  <div>
    <div class="w-full lg:max-w-mini xl:max-w-screen-xl mx-auto">
      <div class="p-0 lg:pt-4">
        <div
          class="flex items-center justify-between bg-primary-lightest lg:h-80 rounded-b-2xl lg:rounded-2xl p-4 md:px-4 lg:px-14"
        >
          <div class="mt-8">
            <h1
              class="font-extrabold font-display text-4xl lg:text-5xl mb-4 md:mb-2"
            >
              {{ event.title }}
            </h1>
            <span>
              Starts @ <span class="text-yellow-700">{{ formattedDate }}</span>
            </span>

            <book-event :event="event"></book-event>
          </div>

          <button
            type="button"
            class="hidden md:inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Share
          </button>
        </div>
      </div>
    </div>

    <div class="flex px-4 lg:max-w-mini xl:max-w-container mx-auto mt-2">
      <NuxtLink
        v-if="canView"
        :to="`/events/edit/${event.slug}`"
        class="p-3 ml-auto text-royal-dark bg-transparent hover:bg-royal hover:text-white border-solid rounded-full border border-royal"
        title="Edit"
      >
        <svg
          class="fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
        >
          <path
            d="M18.363 8.464l1.433 1.431-12.67 12.669-7.125 1.436 1.439-7.127 12.665-12.668 1.431 1.431-12.255 12.224-.726 3.584 3.584-.723 12.224-12.257zm-.056-8.464l-2.815 2.817 5.691 5.692 2.817-2.821-5.693-5.688zm-12.318 18.718l11.313-11.316-.705-.707-11.313 11.314.705.709z"
          />
        </svg>
      </NuxtLink>
    </div>

    <div
      class="grid grid-cols-1 lg:grid-cols-12 lg:max-w-mini xl:max-w-container mx-auto px-4 lg:px-0 mt-6 lg:mt-8 xl:mt-18 pb-14"
    >
      <div class="col-span-7 mr-8 mb-8">
        <h3 class="text-2xl font-display font-semibold mb-4">Details</h3>

        <div class="text-base text-gray-700">
          {{ event.description }}
        </div>
      </div>
      <div class="col-span-5 lg:ml-16">
        <event-time-card
          :start-date="formattedDate"
          :end-date="formattedEndDate"
        />

        <online-event-card v-if="event.type === 'online'" />

        <div v-if="event.type !== 'online'">
          <div
            class="mt-4 relative rounded-lg border border-gray-300 bg-white p-2 shadow-sm flex items-center space-x-3 hover:border-gray-400"
          >
            <event-map
              :lng="event.lng"
              :lat="event.lat"
              :zoom-control="false"
              :events="[{ lng: event.lng, lat: event.lat }]"
              class="min-w-full h-52"
            />
          </div>

          <p class="mt-4 text-lg text-gray-500">{{ event.address }}</p>
        </div>

        <div v-if="event.categories.length">
          <h3 class="text-2xl font-display font-semibold mb-6 mt-12">Tags</h3>

          <NuxtLink
            v-for="category in event.categories"
            :key="category.id"
            :to="`/events/find?category=${category.name}`"
          >
            <span
              class="inline-flex items-center px-5 py-2 rounded-md text-sm font-medium bg-gray-100 text-gray-800"
            >
              {{ category.name }}
            </span>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="in-view h-px"></div>
    <div class="bg-royal text-white fixed bottom-0 left-0 right-0">
      MAKE ME STICKY
    </div>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Component, Vue, namespace } from 'nuxt-property-decorator'
import { Fragment } from 'vue-fragment'
import BookEvent from '~/components/events/book-event.vue'
import { IEvent } from '~/@types'
import { formatDate } from '~/utils'

const eventsStore = namespace('events')

@Component({
  layout: 'default',
  components: {
    Fragment,
    BookEvent,
  },
})
export default class EventPage extends Vue {
  @eventsStore.State('event')
  event!: IEvent

  get formattedDate() {
    return formatDate(this.event.startDate, 'eee, MMM dd yyyy, ppp')
  }

  get formattedEndDate() {
    return formatDate(this.event.endDate)
  }

  get canView() {
    return this.$auth.loggedIn && this.$auth.user?.isAdmin
  }

  async fetch({ params, store }: Context) {
    await store.dispatch('events/get', params.slug)
  }
}
</script>
