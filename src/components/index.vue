<template>
  <div class="mainWarpper">
    <div v-transfer-dom>
      <loading v-model="$store.state.isLoading"></loading>
    </div>
    <!--点击订单弹出菜单-->
    <div v-transfer-dom>
      <popup v-model="$store.state.orderMenu" height="220px" is-transparent>
        <div style="width: 95%;background-color:#fff;margin:0 auto;border-radius:5px;padding-top:10px;">
          <div style="padding:20px 15px;">
            <x-button type="primary" :link="viewOrderUrl" @click.native="$store.commit('changeOrderMenu')">查看订单
            </x-button>
            <x-button :link="ManOrderUrl" @click.native="$store.commit('changeOrderMenu')" type="primary">处理订单
            </x-button>
            <x-button @click.native="$store.commit('changeOrderMenu')">Cancel</x-button>
          </div>
        </div>
      </popup>
    </div>
    <div v-transfer-dom>
      <actionsheet :menus="menus" v-model="showMenus" show-cancel></actionsheet>
    </div>
    <drawer
      width="200px;"
      :show.sync="drawerVisibility"
      :show-mode="showModeValue"
      :placement="showPlacementValue"
      :drawer-style="{'background-color':'#35495e', width: '250px'}">
      <!-- drawer content -->
      <div slot="drawer">
        <group title="订单搜索" style="margin-top:20px;">
          <calendar v-model="starDate" title="开始时间"></calendar>
          <calendar v-model="endDate" title="结束时间" disable-future></calendar>
          <x-address title="选择地址" @on-hide="logHide" v-model="value_0_1" :list="addressData" placeholder="请选择地址"></x-address>
          <popup-picker title="处理状态" :data="orderState" v-model="selectState" placeholder="请选择"></popup-picker>
          <x-input title="关键字" placeholder="请输入" v-model="keyword" is-type="text"></x-input>
        </group>
        <div style="padding:10px; background: none">
          <flexbox>
            <flexbox-item>
              <x-button type="primary" @click.native="search">搜索</x-button>
            </flexbox-item>
            <flexbox-item>
              <x-button type="default" >重置</x-button>
            </flexbox-item>
          </flexbox>
        </div>

      </div>

      <!-- main content -->
      <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="55px">
        <x-header slot="header"
                  style="width:100%;position:absolute;left:0;top:0;z-index:100;"
                  :left-options="leftOptions"
                  :right-options="rightOptions"
                  :title="headTitle"
                  @on-click-more="onClickMore">
          <span
            v-if="$route.path === '/' || $route.path === '/home' || $route.path === '/orderList' || $route.path === '/about' || $route.path === '/waitOrderList'"
            slot="overwrite-left" @click="drawerVisibility = !drawerVisibility">
            <x-icon type="ios-search" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
          </span>
          
        </x-header>
        <keep-alive>
          <router-view class="router-view"></router-view>
        </keep-alive>
        <tabbar class="vux-demo-tabbar" slot="bottom">
          <tabbar-item :selected="$route.path == '/home'" link="/home" on-item-click="clickTab">
            <x-icon slot="icon" type="ios-home-outline" size="30"></x-icon>
            <x-icon slot="icon-active" type="ios-home" size="30"></x-icon>
            <span slot="label">主页</span>
          </tabbar-item>
          <tabbar-item :selected="$route.path == '/waitOrderList'" link="/waitOrderList" v-if="waitOrdersNum"
                       :badge="waitOrdersNum.toString()">
            <x-icon slot="icon" type="ios-alarm-outline" size="30"></x-icon>
            <x-icon slot="icon-active" type="ios-alarm" size="30"></x-icon>
            <span slot="label">待处理</span>
          </tabbar-item>
          <tabbar-item :selected="$route.path == '/orderList'" link="/orderList">
            <x-icon slot="icon" type="ios-list-outline" size="30"></x-icon>
            <x-icon slot="icon-active" type="ios-list" size="30"></x-icon>
            <span slot="label">订单</span>
          </tabbar-item>
          <tabbar-item :selected="$route.path == '/about'" link="/about" show-dot>
            <x-icon slot="icon" type="ios-person-outline" size="30"></x-icon>
            <x-icon slot="icon-active" type="ios-person" size="30"></x-icon>
            <span slot="label">关于我</span>
          </tabbar-item>
        </tabbar>
      </view-box>

    </drawer>


  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import {
  XHeader,
  Tabbar,
  TabbarItem,
  Card,
  TransferDom,
  Group,
  Cell,
  XButton,
  Drawer,
  ViewBox,
  Radio,
  Loading,
  Calendar,
  Selector,
  PopupPicker,
  Picker,
  XInput,
  Flexbox,
  FlexboxItem,
  Popup,
  Actionsheet,
  ChinaAddressV4Data,
  XAddress
} from "vux";

export default {
  components: {
    XHeader,
    Tabbar,
    TabbarItem,
    Card,
    TransferDom,
    Group,
    Cell,
    XButton,
    Drawer,
    ViewBox,
    Radio,
    Loading,
    Calendar,
    Selector,
    PopupPicker,
    Picker,
    XInput,
    Flexbox,
    FlexboxItem,
    Popup,
    Actionsheet,
    XAddress
  },
  directives: {
    TransferDom
  },
  watch: {},
  mounted() {
    // 添加滚动监听事件
    this.$nextTick(function() {
      if (
        this.$route.path == "/orderList" ||
        this.$route.path == "/waitOrderList"
      ) {
        setTimeout(() => {
          this.box = document.querySelector("#vux_view_box_body");
          if (this.box) {
            this.box.removeEventListener("scroll", this.handler, false);
            this.box.addEventListener("scroll", this.handler, false);
          }
        }, 1000);
      }
    });
    // 滚动事件
    this.handler = () => {
      if (
        this.$route.path === "/orderList" ||
        this.$route.path == "/waitOrderList"
      ) {
        this.box = document.querySelector("#vux_view_box_body");
        let scrollTop = this.box.scrollTop;
        this.$store.commit("updatePagePosition", { top: scrollTop });
      }
    };
  },
  data() {
    return {
      show: true,
      drawerVisibility: false,
      showMode: "overlay",
      showModeValue: "overlay",
      showPlacement: "right",
      showPlacementValue: "left",
      starDate: "2017-07-13",
      endDate: "2017-07-13",
      keyword: "",
      selectState: ["请选择"],
      orderState: [["未处理", "处理中", "已处理"]],
      show7: true,
      path: this.$route.path,
      showMenus: false,
      menus: {
        menu1: "分享给朋友",
        menu2: "分享到朋友圈"
      },
      value_0_1: [],
      addressData: ChinaAddressV4Data
    };
  },
  computed: {
    ...mapState({
      orders: "orders",
      clickOrderIndex: "clickOrderIndex"
    }),
    ...mapGetters({
      waitOrders: "waitOrders",
      waitOrdersNum: "waitOrdersNum",
      currentOrder: "currentOrder"
    }),
    headTitle() {
      if (this.$route.params.id) {
        return this.currentOrder.number;
      } else {
        return this.$route.name;
      }
    },
    viewOrderUrl() {
      if (this.clickOrderIndex !== "") {
        return "/orderview/" + this.currentOrder.id;
      }
    },
    ManOrderUrl() {
      if (this.clickOrderIndex !== "") {
        return "/orderManage/" + this.currentOrder.id;
      }
    },
    leftOptions() {
      return {
        showBack: this.$route.path !== "/"
      };
    },
    rightOptions() {
      return {
        showMore: true
      };
    }
  },
  created() {
    this.$store.dispatch("getData");
  },
  methods: {
    logHide(str) {
      console.log("on-hide", str);
    },
    clickTab() {
      console.log("in");
    },
    // 点击XHeader右侧更多时触发
    onClickMore() {
      this.showMenus = true;
    },
    onShowModeChange(val) {
      /** hide drawer before changing showMode **/
      this.drawerVisibility = false;
      setTimeout(one => {
        this.showModeValue = val;
      }, 400);
    },
    onPlacementChange(val) {
      /** hide drawer before changing position **/
      this.drawerVisibility = false;
      setTimeout(one => {
        this.showPlacementValue = val;
      }, 400);
    },
    search() {
      this.$vux.alert.show({
        title: "Vux is Cool",
        content: "仅供测试！",
        onShow() {
        },
        onHide() {
        }
      });
    }
  }
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";
@import "~vux/src/styles/1px.less";
@import "~vux/src/styles/tap.less";

body {
  background-color: #fbf9fe;
}

html,
body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

.weui-cell {
  font-size: 14px;
}

.mainWarpper {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

.m-tablebox {
  font-size: 0.7rem;
  background-color: #fff;
  thead {
    white-space: nowrap;
    th {
      padding: 0.5rem;
      color: white;
      font-weight: 700;
      background-color: #2196f3;
      > div {
        height: 1.2rem;
        line-height: 1.2rem;
      }
    }
  }
  tbody {
    padding-top: 100px;
    background-color: white;
    tr {
      &:nth-child(even) {
        background-color: rgba(239, 239, 244, 0.37);
      }
      &.active {
        background-color: rgba(253, 181, 0, 0.27);
        a {
          color: #fff;
        }
      }
      td {
        padding: 0.1rem;
        line-height: 1.5rem;
        color: #666;
        &:first-child {
          color: blue;
        }
        > div {
          white-space: nowrap;
        }
      }
    }
  }
}

.demo-icon-22 {
  font-family: "vux-demo";
  font-size: 22px;
  color: #888;
}

.vux-demo-tabbar {
  .weui-tabbar__item {
    .vux-x-icon {
      fill: #999;
    }
    &.weui-bar__item_on {
      .vux-x-icon {
        fill: #09bb07;
      }
    }
  }
}

// .weui-tabbar.vux-demo-tabbar {
//   backdrop-filter: blur(10px);
//     background-color: none;
//     background: rgba(247, 247, 250, 0.5);
// }

.vux-demo-tabbar .weui-bar__item_on .demo-icon-22 {
  color: #f70968;
}

.vux-demo-tabbar
  .weui-tabbar_item.weui-bar__item_on
  .vux-demo-tabbar-icon-home {
  color: rgb(53, 73, 94);
}

.demo-icon-22:before {
  content: attr(icon);
}

.vux-demo-tabbar-component {
  background-color: #f70968;
  color: #fff;
  border-radius: 7px;
  padding: 0 4px;
  line-height: 14px;
}

.weui-tabbar__icon + .weui-tabbar__label {
  margin-top: 0 !important;
}

.vux-demo-header-box {
  z-index: 100;
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
}

@font-face {
  font-family: "vux-demo"; /* project id 70323 */
  src: url("https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.eot");
  src: url("https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.eot?#iefix")
      format("embedded-opentype"),
    url("https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.woff") format("woff"),
    url("https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.ttf") format("truetype"),
    url("https://at.alicdn.com/t/font_h1fz4ogaj5cm1jor.svg#iconfont")
      format("svg");
}

.demo-icon {
  font-family: "vux-demo";
  font-size: 20px;
  color: #04be02;
}

.demo-icon-big {
  font-size: 28px;
}

.demo-icon:before {
  content: attr(icon);
}

.router-view {
  width: 100%;
  top: 46px;
}

.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all 500ms;
  height: 100%;
  top: 46px;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}

.vux-pop-out-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.vux-pop-out-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.vux-pop-in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.vux-pop-in-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.menu-title {
  color: #888;
}
</style>
