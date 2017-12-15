<template>
  <div class="goods-container">
    <div class="goods-inner">
      <div class="goods-header">
        <div class="w-inner">
          <h2 class="goods-title-l">监控摄像机支架</h2>
          <div class="goods-title-r">
            <a class="r-separator">概述</a>
            <span class="sep">|</span>
            <a class="r-separator">安装服务</a>
            <span class="sep">|</span>
            <a class="r-separator">用户评价</a>
          </div>
        </div>
      </div>
      <section class="goods-row w-inner">
        <figure class="goods-preview">
          <div class="preview-booth">
            <a class="imgbooth-a">
              <img class="imgbooth" src="//www.djlcg.com/images/201704/goods_img/11828_P_1491013227613.jpg"/>
            </a>
          </div>
          <ul class="preview-thumb">
            <li class="thumb-con current">
              <a class="thumb-a">
                <img class="thumb-img" src="//www.djlcg.com/images/201704/goods_img/11828_P_1491013227219.jpg"/>
              </a>
            </li>
            <li class="thumb-con">
              <a class="thumb-a">
                <img class="thumb-img" src="//www.djlcg.com/images/201704/goods_img/11828_P_1491013227219.jpg"/>
              </a>
            </li>
            <li class="thumb-con">
              <a class="thumb-a">
                <img class="thumb-img" src="//www.djlcg.com/images/201704/goods_img/11828_P_1491013227219.jpg"/>
              </a>
            </li>
            <li class="thumb-con">
              <a class="thumb-a">
                <img class="thumb-img" src="//www.djlcg.com/images/201704/goods_img/11828_P_1491013227219.jpg"/>
              </a>
            </li>
          </ul>
        </figure>
        <aside class="goods-property">
          <div class="goods-hd">
            <h1>创达视讯 显示设备</h1>
            <p class="goods-mod-info">购32G版赠缤纷保护壳+高透膜 支持百城速达</p>
          </div>
          <div class="goods-sell">
            <dl class="goods-sell-price">
              <dt class="goods-note">价&nbsp;&nbsp;格</dt>
              <dd class="goods-price"> ¥ 799.00 </dd>
            </dl>
          </div>
          <div class="goods-attribute">
            <div class="goods-sibling">
              <dl class="goods-sell-type" v-for="(model ,index) in modelNo">
                <dt class="goods-note">{{ model.attr_name }}</dt>
                <dd class="goods-type clearfix">
                  <a class="prop" :class="{ selected: modelIndex===index }" v-for="(type ,index) in model.attr_type" @click="modelCustomer(type, index, $event)">{{ type }}</a>
                </dd>
              </dl>
            </div>
            <div class="goods-sibling">
              <dl class="goods-sell-type" v-for="(netw ,index) in netWork">
                <dt class="goods-note">{{ netw.attr_name }}</dt>
                <dd class="goods-type clearfix">
                  <a class="prop" :class="{ selected: netIndex===index }" v-for="(type ,index) in netw.attr_type" @click="netCustomer(type, index, $event)">{{ type }}</a>
                </dd>
              </dl>
            </div>
            <div class="goods-sibling">
              <dl class="goods-sell-type" v-for="(color ,index) in colors">
                <dt class="goods-note">{{ color.attr_name }}</dt>
                <dd class="goods-type clearfix">
                  <a class="prop" :class="{ selected: coloIndex===index }" v-for="(type ,index) in color.attr_type" @click="colorCustomer(type, index, $event)">{{ type }}</a>
                </dd>
              </dl>
            </div>
            <div class="goods-sibling">
              <dl class="goods-sell-type" v-for="(cap ,index) in capacity">
                <dt class="goods-note">{{ cap.attr_name }}</dt>
                <dd class="goods-type clearfix">
                  <a class="prop" :class="{ selected: capIndex===index }" v-for="(type ,index) in cap.attr_type" @click="capCustomer(type, index, $event)">{{ type }}</a>
                </dd>
              </dl>
            </div>
      <!--       <div class="goods-sibling">
              <dl class="goods-sell-type">
                <dt class="goods-note">网络类型</dt>
                <dd class="goods-type clearfix">
                  <a class="prop selected">MX6</a>
                  <a class="prop">PRO 6 Plus</a>
                </dd>
              </dl>
            </div>
            <div class="goods-sibling">
              <dl class="goods-sell-type">
                <dt class="goods-note">型号分类</dt>
                <dd class="goods-type clearfix">
                  <a class="prop selected">MX6</a>
                  <a class="prop">PRO 6 Plus</a>
                </dd>
              </dl>
            </div>
            <div class="goods-sibling">
              <dl class="goods-sell-type">
                <dt class="goods-note">内存容量</dt>
                <dd class="goods-type clearfix">
                  <a class="prop selected">MX6</a>
                  <a class="prop">PRO 6 Plus</a>
                </dd>
              </dl>
            </div> -->
          </div>
          <div class="btn-default">
            <button class="now-buy" @click="getParam()">立即购买</button>
            <button class="join-cart" @click="clear_db()">加入购物车{{ getDone }}</button>
            <button class="clear-cart" @click="clear_cart()">清空购物车</button>
          </div>
          <div>{{ cartList }}</div>
        </aside>
      </section>
    </div>
  </div>
</template>

<style lang="less" scoped>
  @import "../../assets/css/goods-detail";
</style>

<script>
  export default{
      component:{},
      name: "",
      data(){
          return{

            modelIndex: 0,   
            modelNo: [
              { attr_name: "型号"    , attr_type: [ "MX6", "PRO 6 Plus", "PRO 6" ]  }
            ],

            netIndex: 0, 
            netWork:[
              { attr_name: "网络类型", attr_type: [ "MX6", "PRO 6 Plus" ]  }
            ],

            coloIndex: 0, 
            colors: [
              { attr_name: "颜色分类", attr_type: [ "月光银", "静谧黑", "倚霞金", "曜影黑" ] }
            ],

            capIndex: 0, 
            capacity: [ 
              { attr_name: "内存容量",  attr_type: [ "MX6", "PRO 6 Plus" ]  }
            ]
        }
      },
      computed: {
        getDone(){ 
          return this.$store.getters.getNum; 
        },
      },
      methods:{

        modelCustomer(type, index, e){
          this.modelIndex = index;
        },
        netCustomer(type, index, e){
          this.netIndex = index;
        },
        colorCustomer(type, index, e){
          this.coloIndex = index;
        },
        capCustomer(type, index, e){
          this.capIndex = index;
        },

        fetchData(id){
          var _this=this;
          _this.$http.get('/api/notes',{
            params: {
              mId: id
            }
          }).then((res)=>{
            console.log(params.mId);
            _this.goodsImages = res.data[0];
            _this.goodsData = res.data[1];
            console.log(res.data[0])
          },(err)=>{
            console.log(err);
          })
        },

        //登录窗口
        signin(){
          //this.$store.dispatch('clear_cart');
          this.$store.dispatch('sign_in');
          console.log(this.$store)
        },

        //接收路由带过来的参数
        getParam() {
          this.signin();
          console.log(this.$route.params.id);
        },
        moveToDone(id){ 
          //移至已完成 
          //this.$store.dispatch('eventdone', id); 
        },
        clear_db() {
          this.$store.dispatch('clear_local');
          console.log(this.$store);
        },
        clear_cart() {
          //this.$store.dispatch('clear_cart');
          console.log(this.$store);
        }
    }
  }
</script>
