<template>
  <div>
    <button
      v-if="isFreeEvent || !$auth.loggedIn || isAttending"
      class="button px-12 py-4 rounded-xl mt-4 lg:mt-6"
      :class="{ 'bg-red-500 hover:bg-red-600': isAttending }"
      :disabled="reserving"
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
      <span v-if="!reserving && isAttending">Unsubscribe</span>
      <span v-if="!reserving && !isAttending && isFreeEvent">Attend</span>
      <span v-if="!reserving && !isFreeEvent && !isAttending"
        >Pay &#8358; {{ event.price }}</span
      >
    </button>
    <client-only>
      <paystack
        v-if="!isFreeEvent && $auth.loggedIn && !isAttending"
        class="button px-12 py-4 rounded-xl mt-4 lg:mt-6"
        :amount="amount"
        :email="email"
        :paystackkey="paystackkey"
        :reference="ref"
        :callback="callback"
        :close="close"
        :embed="false"
        :metadata="{ event: event.id }"
        :disabled="reserving"
      >
        <span v-if="reserving" class="loading">{{ reservingText }}</span>
        <span v-else>Pay &#8358; {{ event.price }}</span>
      </paystack>
    </client-only>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import AuthModal from '../auth/auth-modal.vue'
import { IEvent } from '~/@types'

@Component({})
export default class BookEvent extends Vue {
  @Prop({ required: true }) readonly event!: IEvent

  reserving = false

  reservingText = ''

  interval = null

  ref = ''

  paystackkey = process.env.paystackPubKey
  email = this.$auth.user?.email // Customer email
  amount = this.event.price * 100 // in kobo

  get isAttending() {
    const user = this.$auth.user

    return (
      this.$auth.loggedIn &&
      this.event.reservations.some((r) => r.user.email === user?.email)
    )
  }

  get isFreeEvent() {
    return this.event.price === 0
  }

  get reference() {
    let text = ''
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (let i = 0; i < 10; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
  }

  async callback(response: any) {
    this.getReservingText()
    this.reserving = true

    try {
      const { data } = await this.$axios.post('/payments/verify', {
        transactionRef: response.trxref,
        event: this.event.id,
      })

      if (data.ok) {
        await this.makeReservation()
        this.$toast.success('Reservation booked successfully')
      }
    } catch (e) {
      this.$toast.error(e.response.message)
    } finally {
      this.reserving = false
    }
  }

  close() {
    this.ref = this.reference
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

      await this.$store.dispatch(action, this.event)

      this.reserving = false
    }
  }

  canMakeReservation() {
    if (this.$auth.loggedIn) {
      return true
    } else {
      this.$modal.show(
        AuthModal,
        { redirectPath: this.$route.path },
        { draggable: true }
      )
      return false
    }
  }

  mounted() {
    this.ref = this.reference
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
