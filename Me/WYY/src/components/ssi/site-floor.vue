<template>
	<article class="floor-view">
		<div class="floor-list">
			<section class="floor-cell" v-for="floor in floorsData.items">
				<figure class="cell-img">
					<img :src="floor.backGroudPic">
				</figure>
				<div class="cell-title">
					<h4 class="title-big" v-text="floor.columnTitle"></h4>
					<p class="title-small" v-text="floor.subColumnTitle"></p>
				</div>
				<div class="cell-product-bd">
					<ul class="product-list">
						<li class="product-cell" v-for="product in floor.products">
							<!-- <a href="javascript:;" class="product-a" >
								<p class="pt-img"><img :src="product.coverUrl"></p>
								<div class="pt-name">{{ product.name }}</div>
								<div class="pt-price">¥{{ product.maxPrice }}</div>
							</a> -->
							<!-- :to="{ path: '/indexDetail', query: { goodsId: product.id } }" -->
							<router-link :to="{ path: '/indexDetail/'+product.id }" href="javascript:;" class="product-a" >
								<p class="pt-img"><img :src="product.coverUrl"></p>
								<div class="pt-name">{{ product.name }}</div>
								<div class="pt-price">¥{{ product.maxPrice }}</div>
							</router-link>
						</li>
					</ul>
				</div>		
			</section>
			<section class="floor-cell" v-for="album in floorsAlbumsDate.data">
				<figure class="cell-img">
					<img :src="album.backGroudPic">
				</figure>
				<div class="cell-title">
					<h4 class="title-big" v-text="album.title"></h4>
					<p class="title-small" v-text="album.subTitle"></p>
				</div>
				<div class="cell-product-bd">
					<ul class="product-list">
						<li class="product-cell" v-for="product in album.products">
							<a href="javascript:;" class="product-a">
								<p class="pt-img pt-bgimg"><img :src="product.coverUrl"></p>
								<div class="pt-name"><span class="pt-bigName">{{ product.albumName }}</span><small class="pt-smallName">{{ product.artistName }}</small></div>
								<div class="pt-price">¥{{ product.price }}</div>
							</a>
						</li>
					</ul>
				</div>		
			</section>
		</div>
	</article>
</template>
<style lang="less" scoped="scoped">
	@import (reference) url(../../assets/css/cost.less);
	.floor-view{
		background-color: @fff;
		.px2rem(margin-top, 21);
		.floor-list{
			.floor-cell{
				.all;
				.cell-img{
					.poa;
					top: 0;
					left: 0;
					right: 0;
					z-index: 0;
					img{
						width: @full;
					}
				}
				.cell-title{
					text-align: center;
					.px2rem(margin-top, 150);
					.por;
					.title-big{
						.px2rem(font-size, 45);
						color: @333;
					}
					.title-small{
						.px2rem(line-height, 60);
						.px2rem(font-size, 30);
						color: @999;
					}
				}
				.cell-product-bd{
					.por;
					.hid;
					.clearfix;
					.product-list{
						.px2rem(padding-top, 30);						
						.px2rem(padding-bottom, 60);
						.px2rem(padding-left, 6);						
						.px2rem(padding-right, 6);
						.flexbox;
						.clearfix;
						overflow-x: scroll;
						&::-webkit-scrollbar {
						    display: none;
						}
						.product-cell{
							.por;
							.hid;
							.flexitem;
							flex-shrink: 0;
							flex-basis: auto;
							.px2rem(width, 220);
							//.px2rem(height, 256);
							.px2rem(padding-left, 6);
							.px2rem(padding-right, 6);

							box-sizing: border-box;
							.product-a{
								.block;
								.pt-bgimg{
									img{
										width: 80% !important;
									}
									&:after{
										content: '';
										display: block;
										width: 20%;
										height: 100%;
										.poa;
										top: 0;
										right: 0;
									  	background-image: url("http://s2.music.126.net/store/mobile/img/widget/cover_alb_75.png?d74c22b17905f7234235574808cdcfe3");
									  	background-repeat: no-repeat;
									  	background-size: @full auto;
									  	background-position: right center;
									  	//background-origin: border-box;
									  	//background-clip: border-box;
									}
								}
								.pt-img{
									.por;
									.hid;
									img{
										width: @full;
										.block;
									}
								}
								.pt-name{
									.por;
									.hid;
									.px2rem(font-size, 25);
									.px2rem(line-height, 32);
									.px2rem(margin-top, 5);
									.px2rem(margin-bottom, 5);
									.clamp2;
									color: @666;
									text-align: center;
									.pt-bigName{
										.block;
										.ellipsis;
									}
									.pt-smallName{}
								}
								.pt-price{
									.px2rem(margin-top, 10);
									.px2rem(font-size, 32);
									text-align: center;
									color: @d33a;
								}
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
				floorsData:[],
				floorsAlbumsDate: []
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
	        },
		},
		beforeCreate(){},
		created(){
			this.$nextTick(function(){

				//楼层
				//http://music.163.com/store/api/product/ipbanner?type=1
				this.$http.get('/api/floors').then(response=>{
					// success callback
					this.floorsData = response.body.data;
					//console.log(this.floorsData.items)
			    },  response => {
				    // error callback
				    console.log('error')
				});

				//最后一个楼层-----音乐专辑
				this.$http.get('/api/albums').then(response=>{
					// success callback
					this.floorsAlbumsDate = response.body.data;
					//console.log('response',this.floorsAlbumsDate.data)
			    },  response => {
				    // error callback
				    console.log('error')
				});

				

				//
				this.$http.get('/api/goods').then(response=>{
					//console.log('api2/goods',response)
				})
				.catch(err=>{
					//console.log('err',err)
				})
			});
			this.$nextTick(function(){
				//最后一个楼层-----音乐专辑的其它product
				this.$http.get('/api/albumProduct').then(response=>{
					// success callback
					this.floorsAlbumsDate.data[0].products = response.body.data.products.slice(0,8);
					//console.log('response1',response.body.data.products.slice(0,5))
			    },  response => {
				    // error callback
				    console.log('error')
				});
			});
		},
		beforeMount(){},
		mounted(){},
		beforeUpdate(){},
		updated(){},
		methods: {
			toCustomer(products){
				console.log(products)
			},
		}
	}
</script>

