<template>
	<div class="type-container">

		<!-- 布局一（小米布局） -->
		<div v-if="false" class="type-inner w-inner">
		    <!-- 分类类别 -->
		    <nav class="type-nav">
		    	<a class="filter-bar filter-active">推荐</a>
		    	<a class="filter-bar">销量</a>
		    	<a class="filter-bar">新品</a>
		    	<a class="filter-bar" @click="filter_price()">价格</a>
		    </nav>
			<!-- 分类楼层 -->
			<section class="goods-box clearfix">
				<ul class="goods-list">
					<li class="goods-cell" v-for="(product, index) in goodsData" :key="index">
						<a class="goods-mat" href="javascript:;">
							<div class="goods-img"><img :src="product.productImage"></div>
							<div class="goods-info">
								<div class="goods-name">{{ product.productName }}</div>
								<div class="goods-price">
									<em class="goods-price-title" >
										<b class="goods-price-icon">¥</b>
										{{ product.salePrice }}
									</em>
								</div>
							</div>
							<div v-if="false" class="goods-status">
								<span class="goods-disc"></span>
								<span class="goods-attent">关注</span>
								<span class="goods-addcart">加入购物车</span>
								<span class="goods-remove" @click="goods_remove()">删除</span>
							</div>
						</a>
					</li>
				</ul>
			</section>
		</div>

		<!-- 布局二 （网易云商城布局）-->
		<div class="type-inner w-inner">
			<div class="type-box">
				<dl class="type-floor" v-for="(category, index) in typesData" :key="index">
					<dt class="type-title">{{category.category1Name}}</dt>
					<dd class="type-content">
						<figure class="type-item" v-for="(product, ptNum) in category.sub" :key="ptNum" @click="typeCustomer(product, ptNum, $event)">
							<figcaption class="type-img"><img :src="product.picUrl" /></figcaption>
							<p class="type-txt">{{product.name}}</p>
						</figure>
					</dd>
				</dl>
			</div>
		</div>
	</div>
</template>
<style lang="less" scoped="scoped">
	@import (reference) url(../../assets/css/cost.less);
	.type-container{
		.all;
		.type-inner{
			.type-box{
				.type-floor{
					.por;
					background-color: @fff;
					.px2rem(margin-bottom, 20);
					.type-title{
						.por;
						.hid;
						.px2rem(line-height, 90);
						.px2rem(font-size, 34);
						color: @333;
						text-align: center;
						.bottomline;
					}
					.type-content{
						.flexbox;
						flex-wrap: wrap;
						justify-content: flex-start;
						.px2rem(padding-top, 10);
						.px2rem(padding-bottom, 60);
						.type-item{
							.por;
							.hid;
							.flexauto;
							width: 25%;
							.type-img{
								.px2rem(padding, 15);
								box-sizing: border-box;
								img{
									.all;
									display: block;
									margin: auto;
								}
							}
							.type-txt{
								.px2rem(margin-top, 16);
								.px2rem(font-size, 26);
								color: @333;
								text-align: center;
							}
						}
					}
				}
			}
		}
	}
</style>
<script type="text/javascript">
	import {typesList} from '@/api/api';
	export default{
		components: {},
		name: "",
		data(){
			return{
				typesData:[]
			}
		},
		computed: {},
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
			this.$nextTick(function(){
				//http://music.163.com/store/api/product/ipbanner?type=1
				// this.$http.get('/api/typesList').then(response=>{
				// 	this.typesData = response.body.data.data;
				// 	console.log('api2/goods',this.typesData)
				// })
				// .catch(err=>{
				// 	console.log('err',err)
				// })

				typesList().then( res=>{
					this.typesData = res.data.data;
				}, error=>{

				}).catch(error=>{

				});


			});
		},
		beforeMount(){},
		mounted(){},
		beforeUpdate(){},
		updated(){},
		methods: {
			toCustomer(){
				//e.preventDefault=true; //阻止默认事件（原生方法）
	            //e.preventDefault(); //阻止默认事件（原生方法）
	            //e.stop; //阻止冒泡（原生方法）
	            //e.cancelBubble = true; //阻止冒泡（原生方法）
	            e.stopPropagation();//阻止冒泡（原生方法）
			},

			//分类
			typeCustomer(product, ptNum, e){
				this.$router.push({
					path: 'indexList'
				})
			},
		}
	}
</script>