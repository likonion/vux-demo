<template>
  <div>
    <div class="page-content">
      <div class="navbarwarpper">
        <group v-if="currentOrder">
          <cell title="工单号" :value="currentOrder.number"></cell>
          <cell title="处理人" :value="currentOrder.receiver"></cell>
          <x-textarea title="处理结果" placeholder="请输入" :max="200" v-model="content" autosize></x-textarea>
          <x-textarea title="备注" :max="200" placeholder="请输入" v-model="note" autosize></x-textarea>
          <selector title="操作" :options="manage" v-model="selManage"></selector>
          <selector title="处理状态" :options="orderState" v-model="selOrderState"></selector>
        </group>
        <box gap="10px 10px">
          <x-button type="primary" @click.native="submitData(currentOrder)">确定</x-button>
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
  import { Group, Cell, XTextarea, Selector, XButton, Box, dateFormat } from 'vux'
  import { mapState, mapGetters } from 'vuex'
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
      this.selOrderState = this.currentOrder.state
    },
    computed: {
      ...mapState({}),
      ...mapGetters({
        currentOrder: 'currentOrder'
      })
    },
    mounted () {
    },
    destroyed () {
    },
    methods: {
      submitData (orders) {
        let manage = {
          type: this.selManage,
          date: dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss'),
          operator: this.currentOrder.receiver,
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
          this.$store.commit('updateData', {manage: manage, orderState: orderState})
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
