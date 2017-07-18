<template>
  <div>
    <div>
      <x-table full-bordered class="m-tablebox" width="100%" id="table" >
        <thead>
        <tr>
          <th>
            <div>工单号</div>
          </th>
          <th>
            <div>处理状态</div>
          </th>
          <th>
            <div>工单类别</div>
          </th>
          <th>
            <div>受理时间</div>
          </th>
          <th>
            <div>责任单位</div>
          </th>
          <th>
            <div>责任人</div>
          </th>
          <th>
            <div>详细地址</div>
          </th>
          <th>
            <div>详细描述</div>
          </th>
          <th>
            <div>录入时限</div>
          </th>
          <th>
            <div>完工时限</div>
          </th>
          <th>
            <div>受理人</div>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(order,index) in orders" @click="showActionSheet(index,order)" :class="{active:clickOrderIndex === index}">
          <td>{{order.number}} </td>
          <td>
            <badge v-if="order.state == '未处理'" :text="order.state"></badge>
            <badge v-else-if="order.state == '处理中'" :text="order.state" style="background-color:#e8bd23"></badge>
            <badge v-else="order.state == '已处理'" :text="order.state" style="background-color:#00ab00"></badge>
          </td>
          <td>{{order.type}}</td>
          <td>{{order.date}}</td>
          <td>{{order.unit}}</td>
          <td>{{order.respeople}}</td>
          <td>{{order.address}}</td>
          <td>{{order.describe}}</td>
          <td>{{order.entTimeLimt}}</td>
          <td>{{order.finishTimeLimt}}</td>
          <td>{{order.receiver}}</td>
        </tr>
        </tbody>
      </x-table>

    </div>

  </div>
</template>
<script>
  import { Badge, XTable, LoadMore, Popup, Group, Cell, XButton, TransferDom, XSwitch } from 'vux'
  import { mapState } from 'vuex'
  export default {
    data () {
      return {
        show7: false

      }
    },
    components: {
      Badge, XTable, LoadMore, Popup, Group, Cell, XButton, TransferDom, XSwitch
    },
    created () {
    },
    computed: {
      ...mapState({
        orders: 'orders',
        clickOrderIndex: 'clickOrderIndex',
        pageScrollTop: 'pageScrollTop'
      })
    },
    activated () {
      document.querySelector('#vux_view_box_body').scrollTop = this.pageScrollTop
    },
    methods: {
      // 操作列表
      showActionSheet (index, order) {
        this.$store.commit('changeOrderMenu')
        this.$store.commit('changeClickOrderIndex', {index})
      },
      // 侧边搜索栏
      toggleSidebar () {
        console.log(this.sidebar)
        this.sidebar.toggle()
      }
    }
  }
</script>

<style lang="less">




</style>
