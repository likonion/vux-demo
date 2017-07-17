import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
// import plugins from './plugins'
Vue.use(Vuex)
const myPlugin = store => {
  // 当 store 初始化后调用
  store.subscribe((mutation, {menu}) => {
    // 每次 mutation 之后调用
    // mutation 的格式为 { type, payload }
    // window.localStorage.setItem('menu', JSON.stringify(menu))
  })
}
const state = {
  inLogin: false,
  orders: '',
  trHover: '',
  isLoading: false,
  orderMenu: false,
  pageScrollTop: 0
}

const getters = {
  waitOrders: state => {
    if (state.orders) {
      return state.orders.filter(order => order.state === '未处理')
    }
  },
  dealOrders: state => {
    if (state.orders) {
      return state.orders.filter(order => order.state === '已处理')
    }
  },
  waitOrdersNum: (state, getters) => {
    if (getters.waitOrders) {
      return getters.waitOrders.length
    }
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
  // state,
  // mutations,
  // plugins: [myPlugin],
  // actions
})
