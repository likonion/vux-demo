<template>
  <div>

    <div>
      <x-table class="m-tablebox" width="100%" id="table" full-bordered>
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
        <tr v-for="(order,index) in waitOrders" @click="showActionSheet(index,order)"
            :class="{active:trHover === index}">
          <td>{{order.number}}</td>
          <td>
            <badge :text="order.state"></badge>
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
  import { mapGetters, mapState } from 'vuex'
  export default {
    name: 'content',
    data () {
      return {
        trHover: ''
      }
    },
    components: {
      Badge, XTable, LoadMore, Popup, Group, Cell, XButton, TransferDom, XSwitch
    },
    computed: {
      ...mapState({
//        orders: state => state.orders.filter(list => list.state === '未处理')
      }),
      ...mapGetters({
        waitOrders: 'waitOrders',
        waitOrdersNum: 'waitOrdersNum'
      })
    },
    mounted () {
      this.$nextTick(function () {
      })
    },
    methods: {
      // 操作列表
      showActionSheet (index, order) {
        this.$store.commit('changeOrderMenu')
        this.$store.commit('changeTrHover', {index})
      },
      // 侧边搜索栏
      toggleSidebar () {
        console.log(this.sidebar)
        this.sidebar.toggle()
      }
    }
  }
</script>

