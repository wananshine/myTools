<template>
  <div class="homepage">
    <div class="page-container w-inner">

      <!-- 左侧导航栏 -->
      <article class="page-topbar">
        
        <section class="page-topbar-up">
          <siteleftbar></siteleftbar>
          <sitebanner></sitebanner>
        </section>
        <section class="page-topbar-btm">
          <div class="topbar-btm-l">
            <a class="sub-con" v-for="subcon in list.subcons">
              <p class="sub-img"><img :src="subcon.subimg"/></p>
              <span class="sub-txt">{{ subcon.subtxt }}</span>
            </a>
          </div>
          <div class="topbar-btm-r">
            <a class="sub-cell" v-for="subcell in list.subcells">
              {{ subcell.subcelltxt }}
              <img :src="subcell.subcellimg"/>
            </a>
          </div>
        </section>
        
      </article>

      <!-- 单品楼层 -->
      <article class="page-sku">
        <div class="sku-title">
          <h3 class="title-txt">大家来单品</h3>
          <p class="title-ctrlbtn">
            <a><</a>
            <a>></a>
          </p>
        </div>
        <div class="sku-content">
          <ul class="sku-box">
            <li class="sku-cell" v-for="sku in list.skus">
              <!-- :to="'index/GoodsDetail/' + sku.sku_id"  @click="sendParams(sku)" :to="{  path:'index/demoDetail/'+sku.sku_id, params: { id: sku.sku_id } }"   :to="{  name:'demoDetail', params: { id: sku.sku_id } }"-->
              <a class="sku-a"   @click="sendParams(sku)">
                <p class="sku-img"><img :src="sku.sku_img"/></p>
                <div class="sku-info">
                  <strong class="sku-bigtxt">{{ sku.sku_bigtxt }}</strong>
                  <small class="sku-smalltxt">{{ sku.sku_smalltxt }}</small>
                  <span class="sku-price">{{ sku.sku_price | moneytype("元") }}</span>
                </div>
                <div class="sku-"></div>
                <div class="sku-"></div>
              </a>
            </li>
          </ul>
        </div>
      </article>


      <!-- 优惠券楼层 -->
      <article class="page-content page-recommend" v-for="disc in list.discount ">
        <div class="floor-title">
          <h3 class="title-txt">{{ disc.disc_title }}</h3>
        </div>
        <section class="floor-box">
          <div class="box-row">
            <ul class="row-list">
              <li class="row-list-cell" v-for="vou in disc.vouchers">
                <!--   :to="'GoodsDetail?infoId='+row.row_id" :to="{ path: '/index/phone', query: { phoneId: com.recom_id }}"  :to=" 'GoodsDetail/'+ com.recom_id"-->
                <a class="row-list-a sku-a" @click="pickCustomer(vou, $event)">
                  <p class="row-img sku-img"><img :src="vou.vouch_img"/></p>
                  <!-- <div class="row-info sku-info">
                    <strong class="sku-bigtxt">{{ vou.vouch_bigtxt }}</strong>
                    <small  class="sku-smalltxt">{{ vou.vouch_smalltxt }}</small>
                    <span   class="sku-price">{{ vou.vouch_price }}</span>
                    <i></i>
                  </div> -->
                </a>
              </li>
            </ul>
          </div>
        </section>
      </article>


      <!-- 商品楼层 -->
      <article class="page-content" v-for="floor in list.floors">
        <div class="floor-title">
          <h3 class="title-txt">{{ floor.title }}</h3>
        </div>
        <section class="floor-box">
          <div class="box-theme">
            <ul class="theme-list">
              <li class="theme-list-cell" v-for="theme in floor.themes">
                <a class="theme-list-a">
                  <img class="themeimg" :src="theme.themeimg" :title="theme.title" :alt="theme.alt"/>
                </a>
              </li>
            </ul>
          </div>
          <div class="box-row">
            <ul class="row-list">
              <li class="row-list-cell" v-for="row in floor.rows">
                <!--   :to="'GoodsDetail?infoId='+row.row_id"   -->
                <router-link class="row-list-a sku-a" :to="{ path: '../index/demoDetail/'+ row.row_id }">
                  <p class="row-img sku-img"><img :src="row.row_img"/></p>
                  <div class="row-info sku-info">
                    <strong class="sku-bigtxt">{{ row.row_bigtxt }}</strong>
                    <small class="sku-smalltxt">{{ row.row_smalltxt }}</small>
                    <span class="sku-price">{{ row.row_price }}</span>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
        </section>
      </article>


      <!-- 推荐楼层 -->
      <article class="page-content page-recommend" v-for="layer in list.recommend">
        <div class="floor-title">
          <h3 class="title-txt">{{ layer.recom_title }}</h3>
        </div>
        <section class="floor-box">
          <div class="box-row">
            <ul class="row-list">
              <li class="row-list-cell" v-for="com in layer.recomrow">
                <!--   :to="'GoodsDetail?infoId='+row.row_id"   :to=" 'GoodsDetail/'+ com.recom_id"-->
                <router-link class="row-list-a sku-a" :to="{ path: '/index/phone', query: { phoneId: com.recom_id }}">
                  <p class="row-img sku-img"><img :src="com.recom_img"/></p>
                  <div class="row-info sku-info">
                    <strong class="sku-bigtxt">{{ com.recom_bigtxt }}</strong>
                    <small  class="sku-smalltxt">{{ com.recom_smalltxt }}</small>
                    <span   class="sku-price">{{ com.recom_price }}</span>
                    <i></i>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>
        </section>
      </article>

    </div>
  </div>
</template>

<style lang="less" scoped>
   @import "../assets/css/homepage.less";
</style>

<script>
  import siteleftbar from './ssi/site-leftbar'
  import sitebanner from './ssi/site-banner'
  export default{
    components: {
      siteleftbar,
      sitebanner
    },
    name: "",
    data(){
        return{
            list: {},
            num: null,
            discV: [],   //存放领取的优惠券
        }
    },
    filters:{
      moneytype: function(value, type){
        return "￥" + value + type;
      }
    },
    created() {
      this.$http.get("/api/notes").then(res =>{
        this.list = res.data.data;
      })
    },
    watch: {
　　　'example1':'a', //值可以为methods的方法名
　　　'example2':{
  　　　//注意：当观察的数据为对象或数组时，curVal和oldVal是相等的，因为这两个形参指向的是同一个数据对象
  　　　handler(curVal,oldVal){
  　　　　conosle.log(curVal,oldVal)
  　　　},
  　　　deep:true
  　　},
      '$route' (to, from) {
            console.log(this.$route.query)
            this.sendParams()
        }
    },
    mounted: function () {
      this.$nextTick(function () {
          
          
          $(window).scroll(function(){
              if($(document).scrollTop()!=0){
                var x=0;
        　　　　sessionStorage.setItem("offsetTop", $(window).scrollTop());//保存滚动位置
                var value = sessionStorage.getItem("offsetTop");
                localStorage.setItem("offsetTop", value);
                var site = localStorage.getItem("offsetTop");
                //console.log("value",value);
                //console.log("situe",site)
        　　　} 
          });
          window.onload = function(){
          　　var _offset = localStorage.getItem("offsetTop");
          　　$(document).scrollTop(_offset);
              //console.log(123);
              //console.log('_offset',_offset);
          };
      })
    },
    methods:{

      //路由带参数跳转
       sendParams (sku) {
        console.log("sku",sku.sku_id);
        console.log("params",this.$router.push);
        console.log(this.$route.query);
        //this.$router.replace({ path: '/home' })
        this.$router.push({
            //path: 'index/demoDetail', 
            name: 'demoDetail', //要跳转的路径的 name,在 router 文件夹下的 index.js 文件内找
            params: { 
                id: sku.sku_id
            }
            // query: {
            //   id: sku.sku_id, 
            // }
        })
      },
      //获取优惠券
      pickCustomer(vou, e){
        var _this = this;
        var vouch_id = vou.vouch_id;
        console.log(_this.discV)
        if(_this.discV.indexOf(vouch_id) === -1){
          _this.$data.discV.push(vouch_id);
          console.log("领取成功")
        }else{
          console.log("已经领取过")
        }
      },
    },
    beforeRouteEnter(to, from, next){
      console.log('component beforeRouteEnter');
      next(vm=>{
            vm.num=19;
            console.log(vm.num);
        })
    },
    beforeRouteUpdate (to, from, next) {
        console.log('component beforeRouteUpdate');
        next();
    },
    beforeRouteLeave(to,from,next){
        console.log('component beforeRouteLeave');
        next();
    },
  }
</script>
