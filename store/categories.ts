import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { ICategory, ICategoryDto } from '~/@types'

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
    localState.categories = [...localState.categories, ...payload]
  },
  [CATEGORY_MUTATIONS.CREATE_CATEGORY](localState, payload: ICategory) {
    localState.categories.push(payload)
  },
}

export const actions: ActionTree<RootState, RootState> = {
  index({ commit }, data: ICategory[]) {
    commit(CATEGORY_MUTATIONS.SET_CATEGORIES, data)
  },

  async create({ commit }, { categoryDto }) {
    const { data } = await this.$axios.post('/categories', categoryDto)

    commit(CATEGORY_MUTATIONS.CREATE_CATEGORY, data)
  },

  async update(
    { commit },
    {
      categoryId,
      categoryDto,
    }: { categoryId: number; categoryDto: ICategoryDto }
  ) {
    const { data } = await this.$axios.put(
      `/categories/${categoryId}`,
      categoryDto
    )

    commit(CATEGORY_MUTATIONS.CREATE_CATEGORY, data)
  },
}

export const getters: GetterTree<RootState, RootState> = {}
