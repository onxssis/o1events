<template>
  <button
    class="button px-12 py-4 rounded-xl mt-4 lg:mt-6"
    :class="{ 'bg-red-500 hover:bg-red-600': isAttending }"
    @click="makeReservation"
  >
    <svg
      v-if="reserving"
      class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>

    <span v-if="reserving" class="loading">{{ reservingText }}</span>
    <span v-if="!reserving">{{ isAttending ? 'Unsubscribe' : 'Attend' }}</span>
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { IEvent } from '~/@types'

@Component({})
export default class BookEvent extends Vue {
  @Prop({ required: true }) readonly event!: IEvent

  reserving = false

  reservingText = ''

  interval = null

  get isAttending() {
    const user = this.$auth.user

    // return false

    return (
      this.$auth.loggedIn &&
      this.event.reservations.some((r) => r.user.email === user?.email)
    )
  }

  getReservingText() {
    const texts = ['Checking seats', 'Processing']
    const index = Math.floor(Math.random() * texts.length)

    this.reservingText = texts[index]
  }

  async makeReservation() {
    const action = this.isAttending ? 'events/unattend' : 'events/attend'

    if (this.canMakeReservation()) {
      this.getReservingText()
      this.reserving = true

      const result = await this.$store.dispatch(action, this.event)
      console.log(result)

      this.reserving = false
    }
  }

  canMakeReservation() {
    if (this.$auth.loggedIn) {
      return true
    } else {
      this.$modal.show('auth')
      return false
    }
  }
}
</script>

<style scoped>
.loading:after {
  content: ' .';
  animation: dots 1s steps(5, end) infinite;
}

@keyframes dots {
  0%,
  20% {
    color: rgba(0, 0, 0, 0);
    text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  40% {
    color: white;
    text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  60% {
    text-shadow: 0.25em 0 0 white, 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  80%,
  100% {
    text-shadow: 0.25em 0 0 white, 0.5em 0 0 white;
  }
}
</style>
