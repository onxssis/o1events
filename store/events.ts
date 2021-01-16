import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { IEventDto } from '~/@types'

// reusable aliases for mutations
export const EVENT_MUTATIONS = {
  CREATE_EVENT: 'CREATE_EVENT',
}

export const state = () => ({
  events: [],
  event: {},
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  // store the logged in user in the state
  [EVENT_MUTATIONS.CREATE_EVENT](localState, { event }: { event: any }) {
    localState.event = event
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async create({ commit }, eventDto: IEventDto) {
    // make an API call to login the user with an email address and password
    const { data } = await this.$axios.post('/events', eventDto)

    // commit the user and tokens to the state
    commit(EVENT_MUTATIONS.CREATE_EVENT, data)
  },
}

export const getters: GetterTree<RootState, RootState> = {}
