<template>
  <div>
    <div class="px-4 lg:px-0 max-w-mini xl:max-w-screen-lg mx-auto">
      <div class="mb-8">Filter section</div>

      <div class="list">
        <!-- <template v-if="$fetchState.pending">
          <content-placeholders
            v-for="(n, i) in events"
            :key="i"
            rounded
            class="mb-6"
          >
            <content-placeholders-heading img />
          </content-placeholders>
        </template> -->

        <template>
          <event-card-featured
            v-for="event in events"
            :key="event.id"
            :event="event"
            class="mb-4"
          />
        </template>
      </div>

      <button
        v-if="paginationData.hasMorePages"
        class="button alt mb-8 mt-12 mx-auto px-8"
        @click="fetchMore"
      >
        Show more events
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'

@Component({
  layout: 'default',
})
export default class FindPage extends Vue {
  paginationData = {}
  events = []

  page = 1

  @Watch('page')
  onPageChanged() {
    this.$fetch()
  }

  async fetch() {
    const query = this.$route.query

    try {
      const { data } = await this.$axios.get(`/events`, {
        params: { limit: 2, page: this.page, ...query },
      })

      const { data: events, ...rest } = data

      this.events = this.events.concat(events)
      this.paginationData = rest
    } catch (e) {
      console.log(e)
      // this.events = []
    }
  }

  fetchMore() {
    if (this.paginationData.hasMorePages) {
      this.page++
    }
  }

  replaceRoute() {
    this.$router.replace({
      query: Object.assign({}, this.$route.query, { hello: 'world' }),
    })
  }
}
</script>

<style scoped>
.box {
  background: rgba(0, 0, 0, 0.01);
  border: 1px solid rgba(0, 0, 0, 0.03);
}

.left {
  min-width: 170px;
  /* flex: 1 1 170px; */
}
</style>
