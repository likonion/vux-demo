export default {
  // 设置是否在登录页面，开关显示tabbar
  setLogin (state, has) {
    state.inLogin = has
  },
  getSuccess (state, {resolve}) {
    state.orders = resolve.data.orders
  },
  updateData (state, payload) {
    state.orders[state.clickOrderIndex].manage.push(payload.manage)
    state.orders[state.clickOrderIndex].state = payload.orderState
  },
  // 改变当前选中行
  changeClickOrderIndex (state, {index}) {
    state.clickOrderIndex = index
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
