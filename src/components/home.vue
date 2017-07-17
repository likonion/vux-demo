<template>
  <div>

    <swiper :list="demo01_list" v-model="demo01_index"></swiper>
    <card :header="{title:'我的订单'}" v-if="viewHome">
      <div slot="content" class="card-demo-flex card-demo-content01">
        <div class="vux-1px-l vux-1px-r">
          <span style="font-size: 20px">{{waitOrdersNum}}</span>
          <br/>
          待处理
        </div>
        <div class="vux-1px-r">
          <span style="font-size: 20px;color:green;" v-if="dealOrders">{{dealOrders.length}}</span>
          <br/>
          已处理
        </div>
        <div class="vux-1px-r">
          <span style="font-size: 20px;color:#e8bd23" v-if="dealOrders">{{orders.length-waitOrdersNum-dealOrders.length}}</span>
          <br/>
          处理中
        </div>
        <div>
          <span style="font-size: 20px;color:black">{{orders.length}}</span>
          <br/>
          所有订单
        </div>
      </div>
    </card>
  </div>
</template>

<script>
  import { XHeader, Tabbar, TabbarItem, Card, Swiper } from 'vux'
  import { mapState, mapGetters } from 'vuex'
  const baseList = [{
    url: 'javascript:',
    img: 'https://static.vux.li/demo/1.jpg',
    title: '送你一朵fua'
  }, {
    url: 'javascript:',
    img: 'https://static.vux.li/demo/2.jpg',
    title: '送你一辆车'
  }, {
    url: 'javascript:',
    img: 'https://static.vux.li/demo/3.jpg',
    title: '送你一次旅行'
  }]

  const imgList = [
    'http://placeholder.qiniudn.com/800x300/FF3B3B/ffffff',
    'http://placeholder.qiniudn.com/800x300/FFEF7D/ffffff',
    'http://placeholder.qiniudn.com/800x300/8AEEB1/ffffff'
  ]

  const urlList = baseList.map((item, index) => ({
    url: 'http://m.baidu.com',
    img: item.img,
    title: `(可点击)${item.title}`
  }))

  const demoList = imgList.map((one, index) => ({
    url: 'javascript:',
    img: one
  }))

  const only2ClickList = baseList.slice(0, 2).map(item => {
    item.url = 'http://m.baidu.com'
    return item
  })
  export default {
    components: {
      XHeader, Tabbar, TabbarItem, Card, Swiper
    },
    data () {
      return {
        tabIndex: 1,
        viewHome: true,
        demo01_list: baseList,
        demo01_index: 0
      }
    },
    computed: {
      ...mapState({
        orders: 'orders'
      }),
      ...mapGetters({
        waitOrdersNum: 'waitOrdersNum',
        dealOrders: 'dealOrders'
      })
    },
    methods: {
      clickTab () {
        console.log('in')
      }
    }
  }
</script>

<style scoped lang="less">
  @import '~vux/src/styles/1px.less';

  .card-demo-flex {
    display: flex;
  }

  .card-demo-content01 {
    padding: 10px 0;
  }

  .card-padding {
    padding: 15px;
  }

  .card-demo-flex > div {
    flex: 1;
    text-align: center;
    font-size: 12px;
  }

  .card-demo-flex span {
    color: #f74c31;
  }
</style>
