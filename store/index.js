export const state = () => ({
  error: null
})

export const mutations = {
  setError (state, error) {
    state.error = error
  },
  clearError (state) {
    state.error = null
  }
}

export const actions = {
  async nuxtServerInit ({ dispatch, commit }) {
    let startSymbol = 'BTCUSDT'
    commit('store/setSymbol', startSymbol)
  }
}

export const getters = {
  error: state => state.error
}
