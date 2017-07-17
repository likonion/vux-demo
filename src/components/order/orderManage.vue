<template>
  <div>
    <div class="page-content">
      <div class="navbarwarpper">
        <group v-if="orders">
          <cell title="工单号" :value="orders.number"></cell>
          <cell title="处理人" :value="orders.receiver"></cell>
          <x-textarea title="处理结果" placeholder="请输入" :max="200" v-model="content" autosize></x-textarea>
          <x-textarea title="备注" :max="200" placeholder="请输入"  v-model="note" autosize></x-textarea>
          <selector title="操作" :options="manage" v-model="selManage"></selector>
          <selector title="处理状态" :options="orderState" v-model="selOrderState"></selector>
        </group>
        <box  gap="10px 10px">
          <x-button type="primary"  @click.native="submitData(orders)">确定</x-button>
          <x-button @click.native="$router.go(-1)">返回</x-button>
        </box>
      </div>
    </div>

  </div>
</template>
<style lang="less" scoped>
  .tabcon {
    padding: 110px 0 20px 0;
  }

  .multiRow {
    white-space: normal;
    background-color: #fafafa;
    padding: 10px;
    color: #666;
    width: 100%;
    margin-top: 10px;
    a {
      margin: 5px;
      display: inline-block;
      padding: 2px;
      font-size: 10px;
      border-radius: 6px;
      background-color: #1bb019;
      color: white;
    }
  }

  .von-badge {
    margin: 5px;
  }
</style>
<script>
  import { Group, Cell, XTextarea, Selector, XButton, Box } from 'vux'
  export default{
    data () {
      return {
        note: '',
        content: '',
        selOrderState: '请选择',
        selManage: '请选择',
        orderState: ['未处理', '处理中', '已处理'],
        manage: ['误报单', '重复单', '信息单', '工单结束', '工单处理']
      }
    },
    components: {
      Group, Cell, XTextarea, Selector, XButton, Box
    },
    created () {

    },
    computed: {
      orders () {
        if (this.$store.state.orders) {
          let orders = this.$store.state.orders.filter(order => {
            return order.id == this.$route.params.id
          })[0]
          this.selOrderState = orders.state
          return orders
        }
      }
    },
    mounted () {
    },
    destroyed () {
    },
    methods: {
      submitData (orders) {
        // 获取当前时间，格式YYYY-MM-DD
        function getNowFormatDate () {
          var date = new Date()
          var seperator1 = '-'
          var seperator2 = ':'
          var year = date.getFullYear()
          var month = date.getMonth() + 1
          var strDate = date.getDate()
          if (month >= 1 && month <= 9) {
            month = '0' + month
          }
          if (strDate >= 0 && strDate <= 9) {
            strDate = '0' + strDate
          }
          var currentdate = year + seperator1 + month + seperator1 + strDate
            + ' ' + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds()
          return currentdate
        }

        let manage = {
          type: this.selManage,
          date: getNowFormatDate(),
          operator: this.orders.receiver,
          note: this.note,
          content: this.content
        }
        let orderState = this.selOrderState
        if (this.content !== '' && this.selManage !== '请选择') {
          this.$vux.toast.show({
            time: 1000,
            type: 'success',
            text: '提交成功！'
          })
          this.$store.commit('updateData', {orders, manage, orderState})
          this.$router.go(-1)
        } else {
          this.$vux.toast.show({
            type: 'warn',
            text: '请输入必填项!'
          })
        }
      }
    }
  }
</script>
