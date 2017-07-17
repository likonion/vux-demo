<template>
  <div>
    <sticky scroll-box="vux_view_box_body" :offset="46" :check-sticky-support="false">
      <tab>
        <tab-item selected @on-item-click="tabIndex=0">详细信息</tab-item>
        <tab-item badge-background="#38C972" badge-color="#fff" :badge-label="order.manage.length.toString()" @on-item-click="tabIndex=1">处理信息
        </tab-item>
      </tab>
    </sticky>
    <div class="page-content" style="padding-bottom: 20px; padding-top: 50px;">
      <div v-show="tabIndex === 0" v-if="order">
        <group>
          <cell title="工单号" :value="order.number"></cell>
          <cell title="创建时间" :value="order.date"></cell>
          <cell title="当前状态" :value="order.state"></cell>
          <cell title="受理人" :value="order.receiver"></cell>
          <cell title="信息来源" :value="order.from"></cell>
          <cell title="来电号码" :value="order.fromPhone"></cell>
          <cell title="投诉人" :value="order.complainant"></cell>
          <cell title="投诉人类别" :value="order.complainantType"></cell>
          <cell title="联系电话" :value="order.phone"></cell>
          <cell title="工单类别" :value="order.type"></cell>
          <cell title="工单子类别" :value="order.typeChild"></cell>
          <cell title="查看时间" :value="order.viewDate"></cell>
          <cell title="地址" :value="order.address"></cell>
          <x-textarea title="问题描述" :value="order.describe" readonly autosize></x-textarea>
          <x-textarea title="备注" :value="order.note" readonly autosize></x-textarea>
        </group>
        <group title="图片">
          <cell-box class="multiRow">
            <a @click="showImg(1)">测试图片1.jpg</a>
            <a @click="showImg(2)">测试图片2.jpg</a>
            <a @click="showImg(3)">测试图片3.jpg</a>
          </cell-box>
        </group>
      </div>
      <div v-show="tabIndex === 1" v-if="order">
        <div v-for="(manage,index) in orderManage">
          <group>
            <group-title slot="title">记录{{index + 1}}</group-title>
            <cell title="操作类别" :value="manage.type"></cell>
            <cell title="录入人员" :value="manage.operator"></cell>
            <cell title="处理时间" :value="manage.date"></cell>
            <x-textarea title="处理结果" :value="manage.content" readonly autosize></x-textarea>
            <x-textarea title="备注" :value="manage.note" readonly autosize></x-textarea>
          </group>
        </div>
      </div>

    </div>
  </div>

</template>
<style lang="less">
  .page-content {
    .weui-textarea {
      color: #999;
    }
  }

  .multiRow {
    white-space: normal;
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
  import { Tab, TabItem, Cell, Group, XTextarea, CellBox, GroupTitle, Sticky } from 'vux'
  export default{
    data () {
      return {
        tabs: [
          '详细信息',
          '处理信息'
        ],
        tabIndex: 0,
        categoryIndex: 0
      }
    },
    components: {
      Tab,
      TabItem,
      Cell,
      Group,
      XTextarea,
      CellBox,
      GroupTitle,
      Sticky
    },
    computed: {
      order () {
        if (this.$store.state.orders) {
          return this.$store.state.orders.filter(order => {
            return order.id == this.$route.params.id
          })[0]
        }
      },
      orderManage () {
        return this.order.manage.sort(function (a, b) {
          return a.date < b.date ? 1 : -1
        })
      }
    },
    mounted () {
    },
    destroyed () {
    },
    methods: {
      showImg (index) {
        this.modal.content.imgIndex = index
        this.modal.show()
      },
      onCategoryClick (index) {
        this.categoryIndex = index
        console.log('category changed, current tab index is:', index)
      }
    }
  }
</script>
