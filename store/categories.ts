import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { ICategory } from '~/@types'

// reusable aliases for mutations
export const CATEGORY_MUTATIONS = {
  CREATE_CATEGORY: 'CREATE_CATEGORY',
  SET_CATEGORIES: 'SET_CATEGORIES',
}

interface CategoryStoreState {
  categories: ICategory[]
}

export const state = (): CategoryStoreState => ({
  categories: [],
})

export type RootState = ReturnType<typeof state>

export const mutations: MutationTree<RootState> = {
  [CATEGORY_MUTATIONS.SET_CATEGORIES](localState, payload: ICategory[]) {
    localState.categories = payload
  },
}

export const actions: ActionTree<RootState, RootState> = {
  index({ commit }, data: ICategory[]) {
    commit(CATEGORY_MUTATIONS.SET_CATEGORIES, data)
  },
}

export const getters: GetterTree<RootState, RootState> = {}
