import { MutationTree, ActionTree, GetterTree } from 'vuex'

// reusable aliases for mutations
export const AUTH_MUTATIONS = {
  SET_USER: 'SET_USER',
  SET_PAYLOAD: 'SET_PAYLOAD',
  LOGOUT: 'LOGOUT',
}

export const state = () => ({
  accessToken: null, // JWT access token
  refreshToken: null, // JWT refresh token
  user: null,
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  // store the logged in user in the state
  [AUTH_MUTATIONS.SET_USER](localState, { user }) {
    localState.user = user
  },

  // store new or updated token fields in the state
  [AUTH_MUTATIONS.SET_PAYLOAD](
    localState,
    { access_token: accessToken, refresh_token: refreshToken = null }
  ) {
    localState.accessToken = accessToken

    // refresh token is optional, only set it if present
    if (refreshToken) {
      localState.refreshToken = refreshToken
    }
  },

  // clear our the state, essentially logging out the user
  [AUTH_MUTATIONS.LOGOUT](localState) {
    localState.user = null
    localState.accessToken = null
    localState.refreshToken = null
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async login({ commit }, { email, password }) {
    // make an API call to login the user with an email address and password
    const {
      data: {
        data: { user, access_token: accessToken },
      },
    } = await this.$axios.post('/auth/login', { email, password })

    const payload = { accessToken, refreshToken: null }

    // commit the user and tokens to the state
    commit(AUTH_MUTATIONS.SET_USER, user)
    commit(AUTH_MUTATIONS.SET_PAYLOAD, payload)
    this.$axios.setToken(payload.accessToken, 'Bearer')
  },

  async register({ commit }, { name, email, password }) {
    const {
      data: {
        data: { ...user },
      },
    } = await this.$axios.post('/auth/register', {
      name,
      email,
      password,
      is_admin: false,
    })

    const payload = { accessToken: null, refreshToken: null }

    // commit the user and tokens to the state
    commit(AUTH_MUTATIONS.SET_USER, user)
    commit(AUTH_MUTATIONS.SET_PAYLOAD, payload)
  },

  // given the current refresh token, refresh the user's access token to prevent expiry
  async refresh({ commit, state }) {
    const { refreshToken } = state

    // make an API call using the refresh token to generate a new access token
    const {
      data: {
        data: { payload },
      },
    } = await this.$axios.post('/auth/refresh', {
      refresh_token: refreshToken,
    })

    commit(AUTH_MUTATIONS.SET_PAYLOAD, payload)
  },

  // logout the user
  logout({ commit }) {
    commit(AUTH_MUTATIONS.LOGOUT)
  },
}

export const getters: GetterTree<RootState, RootState> = {
  // determine if the user is authenticated based on the presence of the access token
  isAuthenticated: (localState) => {
    return localState.accessToken && localState.accessToken !== ''
  },
}
