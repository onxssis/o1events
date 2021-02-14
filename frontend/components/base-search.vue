<template>
  <div
    class="bs-search flex flex-col md:flex-row md:p-4 md:bg-white md:shadow-lg md:border md:border-gray-200 space-between rounded-lg lg:max-w-screen-md xl:max-w-screen-lg mx-auto"
  >
    <form
      class="flex flex-col md:flex-row flex-grow space-between"
      @submit.prevent="handleSubmit"
    >
      <div class="flex-grow input-container">
        <div class="flex flex-col md:flex-row">
          <div class="flex-grow input-one">
            <div class="flex flex-col">
              <div class="relative">
                <div
                  class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-primary"
                >
                  <search-icon />
                </div>

                <input
                  v-model="keyword"
                  type="text"
                  name="q"
                  class="base-search-input pl-9 h-12 text-base pr-4 rounded-lg rounded-b-none md:rounded-b-lg md:rounded-tr-none md:rounded-br-none border border-gray-300 w-full py-2 focus:outline-none focus:ring-transparent focus:border-gray-300"
                  placeholder="Find your next experience..."
                />
              </div>
            </div>
          </div>
          <div>
            <div class="flex flex-col mb-4 md:mb-0">
              <div class="relative">
                <div
                  class="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-primary"
                >
                  <location-icon width="18" />
                </div>

                <input
                  v-model="location"
                  type="text"
                  name="location"
                  placeholder="City or state"
                  class="base-search-input pl-9 h-12 text-base pr-4 rounded-lg border-t-0 rounded-t-none md:rounded-tl-none md:rounded-bl-none md:border-t md:rounded-t-lg md:border-l-0 border border-gray-300 w-full py-3 focus:outline-none focus:ring-transparent focus:border-gray-300"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex-grow md:pl-2 button-container">
        <button
          type="submit"
          class="button w-full py-3 rounded-lg font-semibold"
        >
          Search
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class BaseSearch extends Vue {
  keyword = ''
  location = ''
  query = {}

  handleSubmit() {
    this.fillQuery()

    this.$router.push({
      path: '/events/find',
      query: this.query,
    })
  }

  fillQuery() {
    if (this.keyword) {
      this.query = { ...this.query, q: this.keyword }
    }

    if (this.location) {
      this.query = { ...this.query, location: this.location }
    }
  }
}
</script>
