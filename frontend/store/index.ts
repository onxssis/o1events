import { ActionTree } from 'vuex'

export const state = () => ({
  hello: 'world',
})

export type RootState = ReturnType<typeof state>

export const actions: ActionTree<RootState, RootState> = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('fetchCategories')
  },

  async fetchCategories({ dispatch }) {
    try {
      const { data } = await this.$axios.get('/categories')
      await dispatch('categories/index', data)
    } catch (e) {
      await dispatch('categories/index', [])
    }
  },
}
