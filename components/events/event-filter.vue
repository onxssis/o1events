<template>
  <div class="flex items-center w-full">
    <date-filter @date-selected="dateChanged" @reset="clearFilter('date')" />
    <filter-select
      v-for="(map, key) in filters"
      :key="key"
      :selected="!!filters[key][selectedFilters[key]]"
      :selection="filters[key][selectedFilters[key]] || `Any ${key}`"
      :filter-name="key"
      :should-clear="!!selectedFilters[key]"
      :options="map"
      @select-option="selectOption"
      @clear-filter="clearFilter"
    />

    <button
      type="button"
      class="bg-transparent flex text-sm"
      @click="clearFilters"
    >
      Reset filters
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker'
import FilterSelect from './filter.vue'

@Component({
  components: {
    VueCtkDateTimePicker,
    FilterSelect,
  },
})
export default class EventFilter extends Vue {
  selectedFilters: Record<string, any> = { ...this.$route.query }

  filters: Record<string, Record<string, string>> = {
    type: {
      online: 'Online',
      person: 'In Person',
    },
    price: {
      free: 'Free',
      paid: 'Paid',
    },
  }

  selectOption(type: string, keyValue: string) {
    this.applyFilter(type, keyValue)
  }

  dateChanged(payload: Record<string, string>) {
    this.applyFilter('date', payload)
  }

  applyFilter(key: string, value: Record<string, string> | string) {
    let filters = {}

    if (typeof value === 'object') {
      filters = { ...filters, ...value }
    } else {
      filters = { ...filters, ...this.selectedFilters, [key]: value }
    }

    this.selectedFilters = filters

    this.updateQuery()
  }

  clearFilter(key: string) {
    const filters = { ...this.selectedFilters }
    delete filters[key]

    this.selectedFilters = filters
    this.updateQuery()
  }

  clearFilters() {
    this.selectedFilters = {}
    this.updateQuery()
  }

  updateQuery() {
    this.$router.replace({
      query: { ...this.selectedFilters },
    })
  }
}
</script>
