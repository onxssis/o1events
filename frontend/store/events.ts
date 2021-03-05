import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { IEvent } from '~/@types'

export const EVENT_MUTATIONS = {
  SET_EVENT: 'SET_EVENT',
}

export const state = () => ({
  events: [],
  event: {},
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  [EVENT_MUTATIONS.SET_EVENT](localState, event: { event: any }) {
    localState.event = event
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async get({ commit }, slug: string) {
    const { data } = await this.$axios.get(`/events/${slug}`)

    commit(EVENT_MUTATIONS.SET_EVENT, data)
  },

  async attend(_, event: IEvent) {
    const { data } = await this.$axios.post(`/reservations`, {
      event: event.id,
    })

    if (data.ok) {
      this.dispatch('events/get', event.slug)
    }
  },

  async unattend(_, event: IEvent) {
    const { data } = await this.$axios.delete(`/reservations`, {
      data: {
        event: event.id,
      },
    })

    if (data.ok) {
      this.dispatch('events/get', event.slug)
    }
  },
}

export const getters: GetterTree<RootState, RootState> = {}
