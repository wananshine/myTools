<template>
  <div class="welfare-view">
      <div class="welfare-box">
          <h5 class="wel-title">
              <span>福利社</span>
              <span class="wel-end" id="welEnd">
                  <i id="txtShow">距开始</i>
                  <i id="timeShow"></i>
                </span>
          </h5>
          <ul class="wel-list">
              <li class="wel-cell" v-for="(welfare, index) in welfareData.welfareInfo" :key="index">
                  <figure class="wel-figure">
                        <p class="wel-img"><img :src="welfare.picUrl" /></p>
                        <figcaption class="wel-info">
                            <div class="wel-name">{{welfare.productName}}</div>
                            <div class="wel-price">
                                福利价
                                <b class="price">¥{{welfare.welfarePrice}}</b> 
                                <b class="point">
                                    +
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-jifen"></use>
                                    </svg>
                                    {{welfare.point}}
                                </b>
                            </div>
                            <div class="wel-remark">
                                <small class="wel-oldprice">原价¥{{welfare.oriPrice}}</small>
                                <small class="wel-limit">限量{{welfare.welfareNum}}件</small>
                            </div>
                        </figcaption>
                  </figure>
              </li>
          </ul>
          <p class="wel-next">下期福利预告</p>
      </div>
  </div>
</template>
<style lang="less" scoped="scoped">
    @import (reference) url(../../assets/css/cost.less);
    .padd30{
		.px2rem(padding-left, 30);
        .px2rem(padding-right, 30);
        box-sizing: border-box;
	};
    .welfare-view{
        .all;
        .px2rem(margin-top, 20);
        background-color: @fff;
        .welfare-box{
            
            .wel-title{
                .por;
                .bottomline;
                &:extend(.padd30);
                width: @full;
                .px2rem(height, 100);
                .px2rem(line-height, 100);
                .px2rem(font-size, 32);
                display: table;
                color: @333;
                span{
                   display: table-cell; 
                   width: calc(@full / 2);
                }
                .wel-end{
                    .px2rem(font-size, 28);
                    color: @888;
                    text-align: right;
                }
            }
            .wel-list{
                &:extend(.padd30);
                .wel-cell{
                    .por;
                    .hid;
                    .bottomline;
                    .wel-figure{
                        .wel-img{
                            .px2rem(width, 200);
                            .poa; left: 0; top: 50%;
                            .translate(@x:0);
                            img{
                                .all;
                                display: block;
                                margin: auto;
                            }
                        }
                        .wel-info{
                            .px2rem(padding-left, 200);
                            .px2rem(padding-top, 20);
                            .px2rem(padding-bottom, 20);
                            .wel-name{
                                .block;
                                .clamp2;
                                .px2rem(font-size, 30);
                                .px2rem(height, 70);
                                .px2rem(line-height, 35);
                                color: @333;
                            }
                            .wel-price{
                                .block;
                                .px2rem(margin-bottom, 14);
                                .px2rem(font-size, 28);
                                color: @666;
                                .price{
                                    .px2rem(font-size, 38);
                                    font-weight: 100;
                                    color: @ff00;
                                }
                                .point{
                                    .px2rem(font-size, 24);
                                    color: @ff00;
                                    .icon{
                                        .icon;
                                        .px2rem(font-size, 20);
                                    }
                                }
                            }
                            .wel-remark{
                                width: @full;
                                display: table;
                                small{
                                    .px2rem(font-size, 24);
                                    color: @999;
                                    display: table-cell;
                                }
                                .wel-limit{
                                    text-align: right
                                }
                            }
                            
                        }
                    }
                    
                }
            }
            .wel-next{
                .por;
                &:extend(.padd30);
                width: @full;
                .px2rem(height, 100);
                .px2rem(line-height, 100);
                .px2rem(font-size,30);
                text-align: center;
                color: @ff36;
            }
        }
    }
</style>

<script type="text/javascript">
    import Iconfont from  '../../assets/font/iconfont.js';
    export default {
        components: {},
        name: '',
        data(){
            return{
                welfareData: {},
                time: null,
            }
        },
        computed: {
               
        },
    	watch: {
	        //监听数组
	        goodsData: {
	            handler: function (newVal) {
	                // console.log(newVal.length)
	            },
	            deep: true
	        },
		},
		beforeCreate(){},
		created(){

            // var time = setInterval('showTime()',500)
            this.$nextTick(function(){
				//http://music.163.com/store/api/product/ipbanner?type=1
				this.$http.get('/api/welfareInfo').then(response=>{
                    this.welfareData = response.data.data.data;
                    console.log('welfareData',response,this.welfareData);
				})
				.catch(err=>{
					console.log('err',err)
				})


			});
		},
		beforeMount(){},
		mounted(){
            var _self = this;
            var setStartTime = setInterval(showTime, 500); 
            function showTime(){
                var startTime = new Date("2018/03/15,17:44:00");                //自定义结束时间  
            　　var now = new Date();                                         //获取当前时间
            　　var distanceTime = parseInt(startTime.getTime() - now.getTime())/1000; //得出的为秒数；
            　  if(distanceTime <= 0){
                    console.log("已开始，距结束");
                    clearInterval(setStartTime);
                    document.getElementById('welEnd').innerHTML="距结束";
                    var now = new Date();                     
            　  }else{
                    var day = parseInt(distanceTime/60/60/24);     
                    var hour = parseInt(distanceTime/60/60%24);
                    var minute = parseInt(distanceTime/60%60);
                    var second = parseInt(distanceTime%60);
                    var leftTime = day+"天"+hour+"时"+minute+"分"+second+"秒";
                    document.getElementById('timeShow').innerHTML = leftTime;
                }
            }

        },
		beforeUpdate(){},
		updated(){
        },
		methods: {
			toCustomer(){
				//e.preventDefault=true; //阻止默认事件（原生方法）
	            //e.preventDefault(); //阻止默认事件（原生方法）
	            //e.stop; //阻止冒泡（原生方法）
	            //e.cancelBubble = true; //阻止冒泡（原生方法）
	            e.stopPropagation();//阻止冒泡（原生方法）
            },
            
            setInterval(){
                
            },

            //
            timeCustomer(){
                var _self= this;
                var timedate= new Date("2018/03/15,16:42:00");                //自定义结束时间  
            　　var now = new Date();                                         //获取当前时间
            　　var date = parseInt(timedate.getTime() - now.getTime())/1000; //得出的为秒数；
            　  if(date <= 0){
            　      document.getElementById("timeShow").innerHTML="倒计时已经结束";
            　      clearInterval(_self.time);
            　  }
            　　var day = parseInt(date/60/60/24);     
                var hour = parseInt(date/60/60%24);
                var minute = parseInt(date/60%60);
                var second = parseInt(date%60);
                var leftTime = day+"天"+hour+"时"+minute+"分"+second+"秒";
                document.getElementById('timeShow').innerHTML = leftTime;
            }
		}
	
    }
</script>

