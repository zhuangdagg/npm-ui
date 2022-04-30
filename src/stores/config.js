import { defineStore, acceptHMRUpdate } from 'pinia'

export const useConfigStore = defineStore({
  id: 'config',
  state: () => ({
    config: {},
    isLogin: false
  }),
  getters: {
    registry: (state) => {
      return state.config?.registry || 'https://registry.npmjs.org/'
    }
  },

  actions: {
    initConfig(config) {
      this.config = config || {}
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}