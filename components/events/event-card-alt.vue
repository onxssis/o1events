<template>
  <div
    class="card flex flex-col relative py-3 border rounded-lg break-words hover:shadow-lg cursor-pointer"
    @click="$router.push(`/events/${data.slug}`)"
  >
    <div class="head px-3 bg-white flex items-center justify-between">
      <div
        class="border border-gray-500 flex items-center bg-white text-xs p-1 py-px rounded-md"
      >
        <dot />
        <span class="pr-1 pl-1">online event</span>
      </div>

      <span class="font-medium">${{ data.price }}</span>
    </div>
    <div class="mid px-3 pt-6">
      <p class="uppercase text-sm mb-2 text-yellow-700">
        {{ formattedStartDate }}
      </p>

      <p class="font-medium">{{ data.title }}</p>

      <p class="text-sm mt-4 flex items-center break-words">
        <span>{{ data.address }}</span>
      </p>
    </div>
    <div class="bottom px-3 mt-auto flex justify-between items-center">
      <div v-if="hasReservations" class="flex items-center w-full">
        <div v-for="(reservation, index) in reservations" :key="reservation.id">
          <div
            v-if="reservation.user.avatar"
            class="shadow border-2 border-white rounded-full w-8 h-8"
            :class="{ '-ml-2': index !== 0 }"
          >
            <img
              class="w-full h-full overflow-hidden object-cover rounded-full"
              src="https://dh-ui.s3.amazonaws.com/assets/photo-1564061170517-d3907caa96ea.jfif"
              alt="avatar"
            />
          </div>
          <default-avatar
            v-if="!reservation.user.avatar"
            class="shadow border-2 border-white"
            :class="{ '-ml-2': index !== 0 }"
          />
        </div>
        <p
          v-if="data.reservations.length > 3"
          class="text-gray-600 text-sm font-normal ml-1"
        >
          +{{ data.reservations.length - 3 }}
        </p>
      </div>
      <div class="fav ml-auto flex items-center">
        <a
          class="bg-primary font-medium tracking-wide text-white border border-primary hover:bg-primary-dark hover:border-primary-dark text-sm px-4 py-2 rounded-lg outline-none focus:outline-none cursor-pointer"
          type="button"
          style="transition: all 0.15s ease"
        >
          Attend
        </a>
        <!-- <button>
          <bookmark-icon />
        </button> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { IEvent } from '~/@types'
import { formatDate } from '~/utils'

@Component
export default class EventCardAlt extends Vue {
  @Prop({ required: true }) readonly data!: IEvent

  get hasReservations() {
    return this.data.reservations.length > 0
  }

  get reservations() {
    return this.data.reservations.slice(0, 3)
  }

  get formattedStartDate() {
    return formatDate(this.data.startDate)
  }
}
</script>

<style scoped>
.card {
  min-width: 256px;
  max-width: 100%;
  min-height: 256px;
}
</style>
