<template>
  <div>
    <!--建议外围加一个div高度为内容高度，这样可以避免当定位为sticky时下面的元素会突然向上走。-->
    <div style="height: 46px;">
      <sticky scroll-box="vux_view_box_body" :offset="46" :check-sticky-support="false">
        <tab>
          <tab-item selected @on-item-click="tabIndex=0">详细信息</tab-item>
          <tab-item badge-background="#38C972" badge-color="#fff" v-if="order" :badge-label="order.manage.length.toString()" @on-item-click="tabIndex=1">处理信息
          </tab-item>
        </tab>
      </sticky>
    </div>
    <div class="page-content" style="padding-bottom: 20px; ">
      <div v-show="tabIndex === 0" v-if="order"  >
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
            <a @click="showImg(0)" class="previewer-demo-img">测试图片1.jpg</a>
            <a @click="showImg(1)" class="previewer-demo-img">测试图片2.jpg</a>
            <a @click="showImg(2)" class="previewer-demo-img">测试图片3.jpg</a>

            <div v-transfer-dom>
              <previewer :list="list" ref="previewer" :options="options"></previewer>
            </div>
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
  import { Tab, TabItem, Cell, Group, XTextarea, CellBox, GroupTitle, Sticky, TransferDom, Previewer } from 'vux'
  import img1 from '../../assets/img/01.jpg'
  import img2 from '../../assets/img/02.jpg'
  import img3 from '../../assets/img/03.jpg'
  export default{
    data () {
      return {
        tabs: [
          '详细信息',
          '处理信息'
        ],
        tabIndex: 0,
        categoryIndex: 0,
        list: [{
          src: img1,
          w: 800,
          h: 400
        },
          {
            src: img2
          }, {
            src: img3
          }],
        options: {
          getThumbBoundsFn (index) {
            // find thumbnail element
            let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
            // get window scroll Y
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            // optionally get horizontal scroll
            // get position of element relative to viewport
            let rect = thumbnail.getBoundingClientRect()
            // w = width
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
            // Good guide on how to get element coordinates:
            // http://javascript.info/tutorial/coordinates
          }
        }
      }
    },
    directives: {
      TransferDom
    },
    activated () {
      document.querySelector('#vux_view_box_body').scrollTop = 0
    },
    components: {
      Tab,
      TabItem,
      Cell,
      Group,
      XTextarea,
      CellBox,
      GroupTitle,
      Sticky,
      TransferDom,
      Previewer
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
      onCategoryClick (index) {
        this.categoryIndex = index
        console.log('category changed, current tab index is:', index)
      },
      showImg (index) {
        this.$refs.previewer.show(index)
      }
    }
  }
</script>
