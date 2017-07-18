<template>
  <div>
    <swiper auto height="30px" direction="vertical" :interval=2000 class="text-scroll" :show-dots="false">
      <swiper-item><p>义务爱了 完成传奇世界H5-王者归来任务 获得20金币</p></swiper-item>
      <swiper-item><p>基本世神 兑换《传奇世界H5》畅玩级礼包 消耗30金币</p></swiper-item>
      <swiper-item><p>零哥章魚 完成传奇世界H5-王者归来任务 获得30金币</p></swiper-item>
      <swiper-item><p>做迎而為 兑换【饿了么】畅享美食红包 消耗20金币</p></swiper-item>
      <swiper-item><p>只知道不知道 兑换【饿了么】畅享美食红包 消耗20金币</p></swiper-item>
      <swiper-item><p>基本世神 兑换《传奇世界H5》畅玩级礼包 消耗30金币</p></swiper-item>
    </swiper>
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
    <panel header="图文组合列表" :footer="footer" :list="list" :type="type"></panel>
  </div>
</template>

<script>
  import { XHeader, Tabbar, TabbarItem, Card, Swiper, GroupTitle, SwiperItem, Panel } from 'vux'
  import { mapState, mapGetters } from 'vuex'
  import img1 from '../assets/img/1.jpg'
  import img2 from '../assets/img/2.jpg'
  import img3 from '../assets/img/3.jpg'
  import ffffff from '../assets/img/ffffff.jpg'
  const baseList = [{
    url: 'javascript:',
    img: img1,
    title: '送你一朵fua'
  }, {
    url: 'javascript:',
    img: img2,
    title: '送你一辆车'
  }, {
    url: 'javascript:',
    img: img3,
    title: '送你一次旅行'
  }]

  export default {
    components: {
      XHeader, Tabbar, TabbarItem, Card, Swiper, GroupTitle, SwiperItem, Panel
    },
    created () {
    },
    data () {
      return {
        tabIndex: 1,
        viewHome: true,
        demo01_list: baseList,
        demo01_index: 0,
        type: '1',
        list: [{
          src: ffffff,
          title: '标题一',
          desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: '/component/cell'
        }, {
          src: ffffff,
          title: '标题二',
          desc: '由各种物质组成的巨型球状天体，叫做星球。星球有一定的形状，有自己的运行轨道。',
          url: {
            path: '/component/radio',
            replace: false
          },
          meta: {
            source: '来源信息',
            date: '时间',
            other: '其他信息'
          }
        }],
        footer: {
          title: '查看更多',
          url: '/about'
        }
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
  .text-scroll {
    border: 1px solid #ddd;
    border-left: none;
    border-right: none;
  }
  .text-scroll p{
    font-size: 12px;
    text-align: center;
    line-height: 30px;
  }
</style>
