<template>
  <VueCtkDateTimePicker
    v-model="date"
    color="#9818d6"
    :no-label="true"
    output-format="YYYY-MM-DDTHH:mm:ss.sssZ"
    format="YYYY-MM-DDTHH:mm:ss.sssZ"
    no-value-to-custom-elem
    :custom-shortcuts="customShortCuts"
    range
    @validate="selectOption"
  >
    <button
      class="flex relative items-center justify-center focus:outline-none bg-gray-200 filter py-2 px-3 cursor-pointer"
    >
      <template v-if="selected">
        {{ selected }}
        <button class="bg-transparent ml-2" @click.stop="reset">
          <svg
            class="text-gray-900 w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </template>

      <svg
        v-else
        class="h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </button>
  </VueCtkDateTimePicker>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import moment from 'moment'

@Component({
  components: {
    VueCtkDateTimePicker,
  },
})
export default class DateFilter extends Vue {
  selected = ''

  date = {
    start: '',
    end: '',
  }

  get minStartDate() {
    return new Date(Date.now()).toISOString()
  }

  get customShortCuts() {
    return [
      { key: 'today', label: 'Today', value: 'day' },
      {
        key: 'tomorrow',
        label: 'Tomorrow',
        value: () => {
          return {
            start: moment().add(1, 'day'),
            end: moment().add(1, 'day'),
          }
        },
      },
      {
        key: 'thisWeekend',
        label: 'This Weekend',
        value: () => {
          return {
            start: moment().day(6),
            end: moment().day(7),
          }
        },
      },
      { key: 'thisWeek', label: 'This week', value: 'isoWeek' },
      { key: 'thisMonth', label: 'This month', value: 'month' },
      { key: 'thisYear', label: 'This year', value: 'year' },
    ]
  }

  selectOption() {
    if (this.date.start) {
      const fullDate =
        moment(this.date.start).format('MMM DD, yyyy') +
        ' - ' +
        moment(this.date.end).format('MMM DD, yyyy')

      this.selected = fullDate

      this.$emit('date-selected', {
        startDate: this.date.start,
        endDate: this.date.end,
      })
    }
  }

  reset() {
    this.date = {
      start: '',
      end: '',
    }
    this.selected = ''

    this.$emit('reset')
  }
}
</script>

<style scoped>
.filter {
  min-width: 97px;
  margin-right: 1rem;
  border-radius: 0.375rem;
  max-width: max-content;
}

.date-time-picker {
  margin: 0;
  width: auto;
}
</style>
