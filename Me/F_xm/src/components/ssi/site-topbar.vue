<template>
  <div class="site-header">
    <div class="headr-topbar-inner">
      <div class="header-topbar">
        <div class="topbar-more">
          <a class="t-more-a">大家来</a>
          <span class="sep">|</span>
          <a class="t-more-a">大家聊</a>
          <span class="sep">|</span>
          <a class="t-more-a">大家玩</a>
          <span class="sep">|</span>
          <a class="t-more-a">大家说</a>
          <span class="sep">|</span>
          <a class="t-more-a">大家吃</a>
          <span class="sep">|</span>
          <a class="t-more-a">大家买</a>
          <span class="sep">|</span>
          <a class="t-more-a">大家来移动版</a>
          <span class="sep">|</span>
          <a class="t-more-a">问题反馈</a>
          <span class="sep">|</span>
          <a class="t-more-a">Select Region</a>
        </div>
        <div class="topbar-cart">
          <a class="t-cart-a">
            购物车
          </a>
        </div>
        <div class="topbar-info">
          <a class="t-info-a">登录</a>
          <span class="sep">|</span>
          <a class="t-info-a" id="sign_up" @click="hideDialog()">注册</a>
          <span class="sep">|</span>
          <a class="t-info-a">消息通知</a>
        </div>
      </div>
    </div>

    <div class="header-nav-inner">
      <!-- logo && 广告 -->
      <div class="nav-logo">
        <a class="nav-logo-img"></a>
        <div class="nav-logo-doodle">
          <a class="link-block"></a>
        </div>
      </div>
      <!-- nav导航 -->
      <ul class="nav-list">
        <li class="nav-cell" v-for="nav in navbars">
          <router-link :to = "nav.navto" class="nav-cell-a">{{ nav.navtitle }}</router-link>
        </li>
      </ul>
      <!-- 搜索框 -->
      <div class="nav-search">
        <form class="nav-search-form" method="get">
          <input type="search" id="nav-search-input" class="nav-search-input" name="keyword" autocomplete="off" data-search-config="{'defaultWords':[{'Key':'小米5s Plus','Rst':5},{'Key':'小米MIX','Rst':1},{'Key':'手环','Rst':6},{'Key':'红米Note 4x','Rst':4},{'Key':'小米路由器','Rst':10},{'Key':'移动电源','Rst':16},{'Key':'米家摄像机','Rst':5},{'Key':'小米体重秤','Rst':2},{'Key':'LED灯','Rst':6},{'Key':'优惠套装','Rst':64}]}"/>
          <label class="nav-search-btn">搜索</label>
          <div class="keyword-list hide">
            <ul class="result-list">
              <li class="result-cell" data-key="海康威视5s Plus">
                <a class="result-a">
                  1海康威视
                  <span class="result-num">约有5件</span>
                </a>
              </li>
              <li class="result-cell" data-key="海康威视5s Plus">
                <a class="result-a">
                  2海康威视
                  <span class="result-num">约有5件</span>
                </a>
              </li>
              <li class="result-cell" data-key="海康威视5s Plus">
                <a class="result-a">
                  3海康威视
                  <span class="result-num">约有5件</span>
                </a>
              </li>
              <li class="result-cell" data-key="海康威视5s Plus">
                <a class="result-a">
                  4海康威视
                  <span class="result-num">约有5件</span>
                </a>
              </li>
              <li class="result-cell" data-key="海康威视5s Plus">
                <a class="result-a">
                  5海康威视
                  <span class="result-num">约有5件</span>
                </a>
              </li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="less">
  @import "../../assets/css/site-header.less";
</style>


<script>

  import { hideDialog } from '../../vuex/actions'
  export default{
    name: "",
    vuex: {
      actions: {
        hideDialog
      }
    },
    data(){
      return{
        navbars: [
            { navtitle: "首页",       navto: "/index" },
            { navtitle: "品牌",       navto: "/index/aboutpage" },
            { navtitle: "特卖",       navto: "/index" },
            { navtitle: "咨讯平台",   navto: "/index/aboutpage" },
            { navtitle: "盒子·影音",  navto: "/index" },
            { navtitle: "路由器",     navto: "/index/aboutpage" },
            { navtitle: "智能硬件",   navto: "/index" },
            { navtitle: "服务",       navto: "/index/demoServer" }
          ]
      }
    },
    filters:{
      moneytype: function(value, type){
        return "￥" + value + type;
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        $("#sign_up").click(function(){
            $(".sign_up").show();
        })
      })
    },
    methods: {
//      makeActive(){
////        return this.show = true
//      }
    },
    created() {

    }
  }
</script>
