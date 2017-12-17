<template>
	<div class="goods-container">
		<div class="goods-inner w-inner">
		    <!-- 商品排序 -->
		    <nav class="goods-filter">
		    	<a class="filter-bar filter-active">推荐</a>
		    	<a class="filter-bar">销量</a>
		    	<a class="filter-bar">新品</a>
		    	<a class="filter-bar" @click="filter_price()">价格</a>
		    </nav>
			<!-- 商品类表 -->
			<section class="goods-box clearfix">
				<ul class="goods-list">
					<li class="goods-cell" v-for="(product, index) in goodsData">
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
		<div></div>
	</div>
</template>
<style lang="less" scoped="scoped">
	@import (reference) url(../../assets/css/cost.less);
	.goods-container{
		.goods-inner{
			.goods-filter{
				.flexbox;
				.filter-bar{
					display: block;
				    width: 1px;
				    .px2rem(font-size, 28);
				    .px2rem(line-height, 85);
				    color: @333;
				    text-align: center;
				    .flex1;
				}
			}
			.goods-box{
				.goods-list{
					.flexbox;
					flex-wrap: wrap;
					.goods-cell{
						width: 50%;
						.flexitem;
						flex-shrink: 0;
						flex-basis: auto;
						background-color: #f0f2f5;
						box-sizing: border-box;
						padding: 2px 1px 0px 0px;
						&:nth-child(2n) {
						    padding: 2px 0px 0px 1px;
						}
						.goods-mat{
							.block;
							    padding: 0px 0px 8px 0px;
    							background-color: @fff;
							.goods-img{
								.por;
								.hid;
								width: @full;
								img{
									width: @full;
								}
							}
							.goods-info{}
							.goods-name{
								.por;
								.hid;
								.px2rem(font-size, 28);
								.px2rem(height, 65);
								.px2rem(line-height, 32);
								.clamp2;
								color: #232326;
							}
							.goods-price{
								color: #DD2727;
								.px2rem(font-size, 38);
							}
						}
					}
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
				goodsData:[]
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
				this.$http.get('/api/goods').then(response=>{
					this.goodsData = response.data.result.list;
					console.log('api2/goods',response.body)
					console.log('api2/goods',this.goodsData)
				})
				.catch(err=>{
					console.log('err',err)
				})


			});
		},
		beforeMount(){},
		mounted(){},
		beforeUpdate(){},
		updated(){},
		methods: {}
	}
</script>