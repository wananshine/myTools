<template>
  <div class="brandpage">
    <div class="brand-container w-inner">
      <ul class="list">
        <li class="cell" v-for = "item in items">
          <img :data-src="item.imgurl" src="../../assets/images/load.gif"/>
          {{ item.proname }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="less">
  .list{
    .cell{
      background-color: #b0b0b0;
      img{
        width: 100px;
        height: 100px;
      }
    }
  }
</style>
<script>

//  import $ from 'jquery'
  export default{
    name: "",
    data(){
      return{
        items : [
          {
              "imgurl" : "http://192.168.1.54/images/201611/thumb_img/11854_thumb_G_1477992327092.jpg",
              "proname" : "讯道 综合布线 RVVP屏蔽护套线 RVVP 6X0.5"
          },
          {
              "imgurl" : "http://192.168.1.54/images/201611/thumb_img/11854_thumb_G_1477992327092.jpg",
              "proname" : "讯道 综合布线 RVVP屏蔽护套线 RVVP 6X0.5"
          },
          {
            "imgurl" : "http://192.168.1.54/images/201611/thumb_img/11854_thumb_G_1477992327092.jpg",
            "proname" : "讯道 综合布线 RVVP屏蔽护套线 RVVP 6X0.5"
          },
          {
            "imgurl" : "http://192.168.1.54/images/201611/thumb_img/11854_thumb_G_1477992327092.jpg",
            "proname" : "讯道 综合布线 RVVP屏蔽护套线 RVVP 6X0.5"
          },
          {
            "imgurl" : "http://192.168.1.54/images/201611/thumb_img/11854_thumb_G_1477992327092.jpg",
            "proname" : "讯道 综合布线 RVVP屏蔽护套线 RVVP 6X0.5"
          },
          {
            "imgurl" : "http://192.168.1.54/images/201611/thumb_img/11854_thumb_G_1477992327092.jpg",
            "proname" : "讯道 综合布线 RVVP屏蔽护套线 RVVP 6X0.5"
          },
          {
            "imgurl" : "http://192.168.1.54/images/201611/thumb_img/11854_thumb_G_1477992327092.jpg",
            "proname" : "讯道 综合布线 RVVP屏蔽护套线 RVVP 6X0.5"
          },
          {
            "imgurl" : "http://192.168.1.54/images/201611/thumb_img/11854_thumb_G_1477992327092.jpg",
            "proname" : "讯道 综合布线 RVVP屏蔽护套线 RVVP 6X0.5"
          },
          {
            "imgurl" : "http://192.168.1.54/images/201611/thumb_img/11854_thumb_G_1477992327092.jpg",
            "proname" : "讯道 综合布线 RVVP屏蔽护套线 RVVP 6X0.5"
          },
          {
            "imgurl" : "http://192.168.1.54/images/201611/thumb_img/11854_thumb_G_1477992327092.jpg",
            "proname" : "讯道 综合布线 RVVP屏蔽护套线 RVVP 6X0.5"
          },
          {
            "imgurl" : "http://192.168.1.54/images/201611/thumb_img/11854_thumb_G_1477992327092.jpg",
            "proname" : "讯道 综合布线 RVVP屏蔽护套线 RVVP 6X0.5"
          },
          {
            "imgurl" : "http://192.168.1.54/images/201611/thumb_img/11854_thumb_G_1477992327092.jpg",
            "proname" : "讯道 综合布线 RVVP屏蔽护套线 RVVP 6X0.5"
          },
          {
            "imgurl" : "http://192.168.1.54/images/201611/thumb_img/11854_thumb_G_1477992327092.jpg",
            "proname" : "讯道 综合布线 RVVP屏蔽护套线 RVVP 6X0.5"
          },
          {
            "imgurl" : "http://192.168.1.54/images/201611/thumb_img/11854_thumb_G_1477992327092.jpg",
            "proname" : "讯道 综合布线 RVVP屏蔽护套线 RVVP 6X0.5"
          },
          {
            "imgurl" : "http://192.168.1.54/images/201611/thumb_img/11854_thumb_G_1477992327092.jpg",
            "proname" : "讯道 综合布线 RVVP屏蔽护套线 RVVP 6X0.5"
          },
          {
            "imgurl" : "http://192.168.1.54/images/201611/thumb_img/11854_thumb_G_1477992327092.jpg",
            "proname" : "讯道 综合布线 RVVP屏蔽护套线 RVVP 6X0.5"
          },
          {
            "imgurl" : "http://192.168.1.54/images/201611/thumb_img/11854_thumb_G_1477992327092.jpg",
            "proname" : "讯道 综合布线 RVVP屏蔽护套线 RVVP 6X0.5"
          },
          {
            "imgurl" : "http://192.168.1.54/images/201611/thumb_img/11854_thumb_G_1477992327092.jpg",
            "proname" : "讯道 综合布线 RVVP屏蔽护套线 RVVP 6X0.5"
          },
          {
            "imgurl" : "http://192.168.1.54/images/201611/thumb_img/11854_thumb_G_1477992327092.jpg",
            "proname" : "讯道 综合布线 RVVP屏蔽护套线 RVVP 6X0.5"
          },
          {
            "imgurl" : "http://192.168.1.54/images/201611/thumb_img/11854_thumb_G_1477992327092.jpg",
            "proname" : "讯道 综合布线 RVVP屏蔽护套线 RVVP 6X0.5"
          },
          {
            "imgurl" : "http://192.168.1.54/images/201611/thumb_img/11854_thumb_G_1477992327092.jpg",
            "proname" : "讯道 综合布线 RVVP屏蔽护套线 RVVP 6X0.5"
          },
          {
            "imgurl" : "http://192.168.1.54/images/201611/thumb_img/11854_thumb_G_1477992327092.jpg",
            "proname" : "讯道 综合布线 RVVP屏蔽护套线 RVVP 6X0.5"
          },
          {
            "imgurl" : "http://192.168.1.54/images/201611/thumb_img/11854_thumb_G_1477992327092.jpg",
            "proname" : "讯道 综合布线 RVVP屏蔽护套线 RVVP 6X0.5"
          },
          {
            "imgurl" : "http://192.168.1.54/images/201611/thumb_img/11854_thumb_G_1477992327092.jpg",
            "proname" : "讯道 综合布线 RVVP屏蔽护套线 RVVP 6X0.5"
          },
        ]
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        $(window).scroll(function(){
          var $bodyTop =  $("body").scrollTop();
          // var $cellscrollTop = $(".cell").scrollTop();
          var $cliH = $(window).height();
          //console.log($bodyTop);
          $(".cell").each(function(){
            var $cellscrollTop = $(this).offset().top;
            if ($bodyTop + $cliH >$cellscrollTop && $bodyTop < $cellscrollTop){
              var $img = $(this).find("img");
              var $datasrc = $img.attr("data-src");
              // console.log($datasrc);
              $img.attr("src", $datasrc);
            }
          })
        })
      })
    }
  }
</script>
