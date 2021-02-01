<template>
  <div
    class="py-4 px-3 md:px-6 bg-black-transparent border border-black-30 border-l-0 border-r-0 md:border-l md:border-r md:rounded-xl"
  >
    <NuxtLink to="/">
      <div class="flex items-center">
        <div class="left pr-4 rounded-lg hidden md:block">
          <div class="relative">
            <div
              v-if="isOnlineEvent"
              class="absolute left-1 top-1 border border-gray-500 flex items-center bg-white text-xs p-1 py-px rounded-md"
            >
              <dot />
              <span class="pr-1 pl-1">online</span>
            </div>
            <img
              src="https://picsum.photos/150/100"
              class="rounded-lg"
              alt=""
            />
          </div>
        </div>
        <div class="right">
          <h3 class="text-sm uppercase text-yellow-700 font-medium pb-1">
            {{ formattedStartDate }}
          </h3>

          <p class="text-base font-display font-medium pb-3">
            {{ event.title }}
          </p>

          <p class="text-sm text-gray-600 font-light">
            {{ reservations }} {{ 'attendee' | pluralize(reservations) }}
          </p>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { IEvent } from '~/@types'
import { formatDate } from '~/utils'

@Component({
  filters: {
    pluralize: (word, amount) =>
      amount > 1 || amount === 0 ? `${word}s` : word,
  },
})
export default class EventCardFeatured extends Vue {
  @Prop({ required: true }) readonly event!: IEvent

  get hasReservations() {
    return this.event.reservations?.length > 0
  }

  get reservations() {
    return this.event.reservations.length
  }

  get formattedStartDate() {
    return formatDate(this.event?.startDate)
  }

  get isOnlineEvent() {
    return this.data?.type === 'online'
  }

  get isFree() {
    return this.data?.price === 0
  }
}
</script>
