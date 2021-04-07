<template>
  <div>
    <div class="px-4 py-14 lg:px-0 max-w-mini xl:max-w-screen-lg mx-auto">
      <div class="mb-8">
        <div class="flex items-center">
          <event-filter />
        </div>
      </div>
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
import { IEvent } from '~/@types'

@Component({
  layout: 'default',
})
export default class FindPage extends Vue {
  paginationData = {
    hasMorePages: false,
  }

  events: IEvent[] = []

  page = 1

  @Watch('page')
  onPageChanged() {
    this.$fetch()
  }

  @Watch(`$route.query`)
  onQueryChanged() {
    this.$fetch()
  }

  async fetch() {
    let query = this.$route.query

    if (this.$route.params.category) {
      query = { ...query, category: this.$route.params.category }
    }

    try {
      const { data } = await this.$axios.get('/events', {
        params: { limit: 25, page: this.page, ...query },
      })

      const { data: events, ...rest } = data

      if (this.page === 1) {
        this.events = events
      } else {
        this.events = this.events.concat(events)
      }

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
