import newConnection from '../core/sdk_binance'

export const state = () => ({
  symbol: '',
  diff: [],
  stakan: {},
  connection: null
})

export const mutations = {
  setSymbol (state, symbol) {
    state.symbol = symbol
  },
  setDiff (state, symbol) {
    if (state.symbol !== symbol) {
      state.diff.push(`было ${state.symbol}, стало ${symbol}`)
    }
  },
  setStakan (state, stakan) {
    state.stakan = stakan
  },
  setConnection (state, ws) {
    state.connection = ws
  },
  closeConnection (state) {
    if (state.connection) {
      state.connection.close()
    }
  }
}

export const actions = {
  symbolChanged ({ commit}, symbol) {
    commit('setDiff', symbol)
    commit('setSymbol', symbol)
  },
  async download ({ commit }, symbol) {
    let stakan
    try {
      stakan =  await this.$axios.$get(`https://www.binance.com/api/v1/depth?symbol=${symbol}&limit=500`)
    } catch (e) {
      commit('setError', e, { root: true })
    }
    commit('setStakan', stakan)
  },
  subscribe ({ commit }, data) {
    let ws = newConnection(data.sym)
    ws.onmessage = ticks => {data.fn(ticks)}
    commit('setConnection', ws)
  },
  unsubscribe ({ commit }) {
    commit('closeConnection')
  }
}

export const getters = {
  diff: state => {
    return state.diff
  },
  symbol: state => {
    return state.symbol
  },
  stakan: state => {
    return state.stakan
  }
}
