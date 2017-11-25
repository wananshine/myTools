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
        <div class="goods-preview">
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
        </div>
        <div class="goods-property">
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
          <div class="goods-sibling">
            <dl class="goods-sell-type">
              <dt class="goods-note">价&nbsp;&nbsp;格:</dt>
              <dd class="goods-type clearfix">
                <a class="prop selected">MX6</a>
                <a class="prop">PRO 6 Plus</a>
              </dd>
            </dl>
          </div>
          <div class="goods-sibling">
            <dl class="goods-sell-type">
              <dt class="goods-note">网络类型:</dt>
              <dd class="goods-type clearfix">
                <a class="prop selected">MX6</a>
                <a class="prop">PRO 6 Plus</a>
              </dd>
            </dl>
          </div>
          <div class="goods-sibling">
            <dl class="goods-sell-type">
              <dt class="goods-note">型号分类:</dt>
              <dd class="goods-type clearfix">
                <a class="prop selected">MX6</a>
                <a class="prop">PRO 6 Plus</a>
              </dd>
            </dl>
          </div>
          <div class="goods-sibling">
            <dl class="goods-sell-type">
              <dt class="goods-note">内存容量:</dt>
              <dd class="goods-type clearfix">
                <a class="prop selected">MX6</a>
                <a class="prop">PRO 6 Plus</a>
              </dd>
            </dl>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="less" scoped>
  @import "../../../assets/css/goods-detail";
</style>

<script>
  export default{
      component:{},
      name: "",
      data(){
          return{}
      },
      methods:{
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
        }
    }
  }
</script>
