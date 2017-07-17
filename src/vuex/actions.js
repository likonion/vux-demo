/**
 * Created by liko on 2017/6/29.
 */
import axios from 'axios'
import Mock from 'mockjs'
import data from '../mock/mock'

export default {
  getData ({ commit }) {
    // 使用axios获取json数据
    axios.get('static/data.json').then(function (resolve) {
      commit('getSuccess', {resolve})
    }).catch((err) => {
      console.log(err)
    })
    // mockjs拦截data.json请求，返回mock数据
    Mock.mock('static/data.json', data)
  },
  updatePagePosition ({commit}, top) {
    commit({type: 'updatePagePosition', top: top})
  }
}
