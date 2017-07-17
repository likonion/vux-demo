export default {
  // 设置是否在登录页面，开关显示tabbar
  setLogin (state, has) {
    state.inLogin = has
  },
  getSuccess (state, {resolve}) {
    state.orders = resolve.data.orders
  },
  updateData (state, {orders, manage, orderState}) {
    orders.manage.push(manage)
    orders.state = orderState
  },
  // 改变当前选中行
  changeTrHover (state, {index}) {
    state.trHover = index
  },
  updateLoadingStatus (state, payload) {
    state.isLoading = payload.isLoading
  },
  changeOrderMenu (state) {
    state.orderMenu = !state.orderMenu
  },
  updatePagePosition (state, payload) {
    state.pageScrollTop = payload.top
  }
}
