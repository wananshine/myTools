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

      <article>
        
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
                <router-link class="row-list-a sku-a" :to="'GoodsDetail/'+ row.row_id">
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
                <!--   :to="'GoodsDetail?infoId='+row.row_id"   -->
                <router-link class="row-list-a sku-a" :to=" 'GoodsDetail/'+ com.recom_id">
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

      <!-- 单品楼层 -->
      <article class="page-topbar-sku">
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
              <router-link class="sku-a" @click="getData(sku)" :to="'index/GoodsDetail' + sku.sku_id">
                <p class="sku-img"><img :src="sku.sku_img"/></p>
                <div class="sku-info">
                  <strong class="sku-bigtxt">{{ sku.sku_bigtxt }}</strong>
                  <small class="sku-smalltxt">{{ sku.sku_smalltxt }}</small>
                  <span class="sku-price">{{ sku.sku_price | moneytype("元") }}</span>
                </div>
                <div class="sku-"></div>
                <div class="sku-"></div>
              </router-link>
            </li>
          </ul>
        </div>
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
                list: { }
            }
      },
    filters:{
      moneytype: function(value, type){
        return "￥" + value + type;
      }
    },
    mounted: function () {
      this.$nextTick(function () {
          $(function(){
          })
      })
    },
    created() {
      this.$http.get("/api/notes").then(res =>{
        this.list = res.data.data;
        console.log(this.list)
      })
    }
  }
</script>
