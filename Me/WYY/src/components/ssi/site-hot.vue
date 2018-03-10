<template>
	<article class="hot-view" id="hotView">
		<div class="hot-title">热门商品</div>
		<div class="hot-list">
			<a class="hot-cell" v-for="(hot, index) in hotsData.hotProduct" @click="toCustomer(hot, index, $event)" :key="index">
				<dl class="hot-dl">
					<dt class="hot-dt"><img :src="hot.products.coverUrl"></dt>
					<dd class="hot-dd">
						<div class="hot-name"><i class="specialPrice" v-for="(tag, tagNo) in hot.products.tags" :key="tagNo">{{ tag }}</i>{{ hot.name }}</div>
						<div class="hot-price"><i class="moneysSymbol">¥</i>{{ hot.products.maxPrice }}</div>
					</dd>
				</dl>
			</a>
		</div>
		<div class="btn-loading" id="btnLoading">
			<a class="btn-loadmore" id="btnLoadmore" @click="next()" ></a>
			<a v-show="false" class="btn-loadmore" @click="next()" >已经到底了...</a>
			<div class="loaders">
				<div class="loader">
			        <div class="loader-inner line-scale">
			          <div></div>
			          <div></div>
			          <div></div>
			          <div></div>
			          <div></div>
			        </div>
			    </div>
			</div>
		</div>
	</article>
</template>
<style lang="less" scoped="scoped">
	@import (reference) url(../../assets/css/cost.less);

	.hot-view{
		.px2rem(margin-top, 21);
		background-color: @fff;
		.hot-title{
			.all;
			color: @333;
			text-align: center;
			.bottomline;
			.px2rem(font-size, 35);
			.px2rem(line-height, 100);
		}
		.hot-list{
			.por;
			.hid;
			.flexbox;
			flex-wrap: wrap;
			.hot-cell{
				width: calc(@full/2);
				.flexitem;
				flex-basis: auto;
				.hot-dl{
					.px2rem(padding, 6);
					.hot-dt{
						img{
							.all;
						}
					}
					.hot-dd{
						.px2rem(padding-left, 10);
						.px2rem(padding-right, 10);
						text-align: center;
						.hot-name{
							.por;
							.hid;
							.px2rem(font-size, 28);
							.px2rem(height, 72);
							.px2rem(line-height, 36);
							.clamp2;
							color: @333;
							.specialPrice{
								color: @d33a;
							}
						}
						.hot-price{
							color: @d33a;
							.px2rem(margin-top, 6);
							.px2rem(font-size, 30);
							.moneysSymbol{
								.px2rem(font-size, 26);
								.px2rem(padding-right, 4);
							}
						}
					}
				}
			}
		}
	}
	.btn-loading{
		.all;
	}
	.btn-loadmore{
		width: @full;
		.block;
		color: @888;
		.px2rem(font-size, 26);
		text-align: center;
		background-color: transparent;
	}
	
	/* Lines*/
	@-webkit-keyframes line-scale {
	  	0% {
		  	transform: scaley(1);
		    -webkit-transform: scaley(1);
        }

	  	50% {
		  	transform: scaley(0.4); 
		    -webkit-transform: scaley(0.4);
	    }

  		100% {
		  	transform: scaley(1);
		    -webkit-transform: scaley(1);   
        }
    }

	@keyframes line-scale {
		0% {
			transform: scaley(1); 
			-webkit-transform: scaley(1);
		        
		}

		50% {
			transform: scaley(0.4);
			-webkit-transform: scaley(0.4);
		}

		100% {
			transform: scaley(1);
			-webkit-transform: scaley(1); 
		} 
	}
    .loaders{
		width: 100%;
		box-sizing: border-box;
		display: flex;
		flex: 0 1 auto;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.loader {
		margin: auto;
		box-sizing: border-box;
		display: flex;
		flex: 0 1 auto;
		flex-direction: column;
		flex-grow: 1;
		flex-shrink: 0;
		flex-basis: 25%;
		max-width: 25%;
		.px2rem(height, 30);
		align-items: center;
		justify-content: center;
		.line-scale{
			div{
				background-color: @ff00;
			  	width: 4px;
			  	height: 35px;
			  	border-radius: 2px;
			  	margin: 2px;
			  	animation-fill-mode: both;
			  	-webkit-animation-fill-mode: both;    
			  	display: inline-block;
				&:nth-child(1) {
					animation: line-scale 1s 0.1s infinite cubic-bezier(.2, .68, .18, 1.08); 
				    -webkit-animation: line-scale 1s 0.1s infinite cubic-bezier(.2, .68, .18, 1.08);    
				}
				&:nth-child(2) {
					animation: line-scale 1s 0.2s infinite cubic-bezier(.2, .68, .18, 1.08);
					-webkit-animation: line-scale 1s 0.2s infinite cubic-bezier(.2, .68, .18, 1.08);
				}
				&:nth-child(3) {
					animation: line-scale 1s 0.3s infinite cubic-bezier(.2, .68, .18, 1.08); 
		  			-webkit-animation: line-scale 1s 0.3s infinite cubic-bezier(.2, .68, .18, 1.08);
		      	}
				&:nth-child(4) {
					animation: line-scale 1s 0.4s infinite cubic-bezier(.2, .68, .18, 1.08); 
		  			-webkit-animation: line-scale 1s 0.4s infinite cubic-bezier(.2, .68, .18, 1.08);
		      	}
				&:nth-child(5) {
					animation: line-scale 1s 0.5s infinite cubic-bezier(.2, .68, .18, 1.08);
	  				-webkit-animation: line-scale 1s 0.5s infinite cubic-bezier(.2, .68, .18, 1.08);
		      	}
			}
		}
	}
  
</style>
<script type="text/javascript">
	export default{
		components: {},
		name: "",
		data(){
			return{
				hotsData: []
			}
		},
		computed: {
			albumsFilter(){
				//return (this.floorsAlbumsDate.data[0]).products.slice(0,5); 
                this.$nextTick(function(){
                })
            }
		},
    	watch: {
	        //监听数组
	        goodsList: {
	            handler: function (newVal) {
	                // console.log(newVal.length)
	            },
	            deep: true
	        }
		},
		beforeCreate(){},
		created(){
			this.$nextTick(function(){

				//热门商品
				//http://music.163.com/store/api/product/ipbanner?type=1
				this.$http.get('/api/getshot').then(response=>{
					// success callback
					this.hotsData = response.body.data.data;
					console.log("response3",response)
					console.log(this.hotsData)
			    },  response => {
				    // error callback
				    console.log('error')
				});
				

				//
				// this.$http.get('/api/goods').then(response=>{
				// 	//console.log('api2/goods',response)
				// })
				// .catch(err=>{
				// 	//console.log('err',err)
				// })


			});
		},
		beforeMount(){},
		mounted(){
			this.$nextTick(function(){
			});

			this.$nextTick(function(){
				this.scrollLoad();
				// window.onload=function(){
				// 	this.scrollLoad();
				// 	window.addEventListener("scroll", function(){
						
				// 	})
				// }
			});
		},
		beforeUpdate(){},
		updated(){},
		methods: {
			next(){
				console.log("buchuxian")
			},

			//底部加载数据
			scrollLoad(){
				console.log(123)
				let homeLayout = document.getElementById("homeLayout");
				let hotView = document.getElementById("hotView");

				// 缓存指针  
	            let _this = this;  
	            // 设置一个开关来避免重负请求数据  
	            let sw = true;  
	            // 此处使用node做了代理 
	            let lastScrollTop = null;
	            $(".home-layout").scroll(function(){
	            	var btnLoading_Top = document.getElementById("btnLoading").offsetTop;
	            	//console.log(document.documentElement.clientHeight+'-----------'+window.innerHeight); // 可视区域高度
					//console.log('滚动高度1',document.body.scrollTop, document.documentElement.scrollTop); // 滚动高度  
	                //console.log('文档高度2',document.body.offsetHeight); // 文档高度
	                //console.log('文档滚动高度3',homeLayout.scrollTop); // homeLayout滚动高度 
	                console.log('文档高度4',hotView.offsetTop); // hotView位置
	                console.log('btnLoading_Top',btnLoading_Top); // btnLoading_Top位置
	                console.log("homeLayout.scrollTop + window.innerHeight:",homeLayout.scrollTop + window.innerHeight, "btnLoading_Top", btnLoading_Top);   
	                // 判断是否滚动到底部  document.body.scrollTop + window.innerHeight >= document.body.offsetHeight
	                if(homeLayout.scrollTop + window.innerHeight >= btnLoading_Top){
	                	// console.log(sw);  
	                    // 如果开关打开则加载数据  
	                    if(sw==true){
	                    	// 将开关关闭  
	                        sw = false;
	                       setTimeout(function(){
	                       	_this.$http.get('/api/getshot').then(response=>{
								// success callback
								var newProductData = response.body.data.data.hotProduct;
								newProductData.forEach(function(item, i){
									console.log("newProductData",i, item);
									_this.hotsData.hotProduct.push(item)
								})
								
								//_this.hotsData.hotProduct.push(response.body.data.data.hotProduct);
								console.log("_this.hotsData",_this.hotsData)
								// 数据更新完毕，将开关打开  
	                            sw = true;  
							    },  response => {
								    // error callback
								    console.log('error')
								});
	                       }, 2000)
	                    }
	                }
	            }); 
			},


			//跳到商品详情
			toCustomer(hot, index, e){
				//console.log('hot:',hot,'hotid=',hot.products.id)
				this.$router.push({ 
					path: '/indexDetail/'+hot.products.id, 
					params: { goodsId: hot.products.id }
				});
			},
		}
	}
</script>

