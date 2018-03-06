<template>
	<div class="cart-container">
		<div class="cart-inner w-inner">
			<div class="cart-title">购物车</div>
		    <div class="cart-bd">
				<div class="cart-handle">
					<span class="handle-selected">已选商品</span>
					<span class="handle-editor" v-if="layout == 'achieve'" @click="handleeditor($event)">编辑</span>
					<span class="handle-editor" v-if="layout == 'editor'" @click="handleachieve($event)">完成</span>
				</div>
				<ul class="cart-list">
					<li class="cart-goods">
						<div class="goods-check">
							<label class="goods-selected"><input class="goods-checkbox" type="checkbox"></label>
							<div class="goods-img"><img src="https://gw.alicdn.com/bao/uploaded/i1/1768983454/TB2AkJ3iVcJL1JjSZFOXXcWlXXa_!!1768983454.jpg_200x200q50s150.jpg_.webp" /></div>
							<div class="goods-info" v-if="layout == 'achieve'" >
								<div class="goods-row">
									<span class="goods-name">漫步者（EDIFIER）W280BT 无线蓝牙入耳式运动耳机磁吸耳塞</span>
									<span class="goods-price">¥119</span>
								</div>
								<div class="goods-row">
									<span class="goods-attr">红色</span>
									<p class="goods-number">
										<i class="number-icon number-minus">-</i>
										<i class="number-icon number-total" ><input class="total-input" type="tel" value='1' min="1" max="10"></i>
										<i class="number-icon number-plus">+</i>
									</p>
								</div>
							</div>
							<div class="goods-info goods-editor" v-if="layout == 'editor'">
								<div class="goods-row goods-change" @click="changeCustomer($event)">
									已选择：红色
								</div>
								<div class="goods-row">
									<span class="goods-price">¥119</span>
									<p class="goods-number">
										<i class="number-icon number-minus">-</i>
										<i class="number-icon number-total" ><input class="total-input" type="tel" value='1' min="1" max="10"></i>
										<i class="number-icon number-plus">+</i>
									</p>
								</div>
							</div>
						</div>
						<div class="goods-mask">
							<div class="goods-light">

							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div></div>
	</div>
</template>
<style lang="less" scoped="scoped">
	@import (reference) url(../../assets/css/cost.less);
	.padd30{
		.px2rem(padding-left, 30);
		.px2rem(padding-right, 30);
		box-sizing: border-box;
	};
	.cart-container{
		.all;
		.cart-inner{
			.px2rem(font-size, 28);
			.cart-title{
				&:extend(.padd30);
				.px2rem(font-size, 36);
				.px2rem(line-height, 90);
				.px2rem(margin-bottom, 20);
				text-align: center;
				background-color: @fff;
			}
			.cart-bd{
				background-color: @fff;
				.cart-handle{
					.flexbox;
					&:extend(.padd30);
					.px2rem(line-height, 75);
					background-color: aqua;
					span{
						.flex1;
					}
					.handle-selected{
						
					}
					.handle-editor{
						text-align: right;
					}
				}
				.cart-list{
					.all;
					&:extend(.padd30);
					.cart-goods{
						.por;
						.hid;
						.goods-check{
							.flexbox;
							.px2rem(height, 260);
							.px2rem(padding-top, 20);
							.px2rem(padding-bottom, 20);
							box-sizing: border-box;
						}	
						.goods-selected{
							.por;
							.flexitem;
							flex-basis: auto;
							flex-shrink: 0;
							.px2rem(width, 62);
							height: @full;
							box-sizing: border-box;
							.goods-checkbox{
								.poa; top: 50%; left: 50%; 
								.translate();
								.px2rem(width, 45);
								.px2rem(height, 45);
							}
						}
						.goods-img{
							.por;
							.hid;
							.flexitem;
							flex-shrink: 0;
							flex-basis: auto;
							.px2rem(width, 200);
							height: @full;
							img{
								width: @full;
								.poa; left: 50%; top: 50%;
								.translate();
								display: block;
								margin: auto;
							}
						}
						.goods-info{
							.flex1;
							.px2rem(padding-left, 20);
							box-sizing: border-box;
							height: @full;
							.goods-row{
								.por;
								.hid;
								.flexbox;
								.px2rem(margin-top, 10);
								.px2rem(margin-bottom, 60);
								.goods-name{
									.por;
									.hid;
									.clamp2;
									.flex1;
									.px2rem(height, 80);
									.px2rem(line-height, 40);
								}
								.goods-price{
									//.ellipsis;
									// .flexitem;
									//  flex-basis: auto;
									.px2rem(min-width, 80);
									.px2rem(padding-left, 20);
								}
								.goods-attr{
									.px2rem(width, 200);
								}
								.goods-number{
									.por;
									.hid;
									.flexbox;
									.flexitem;
									.px2rem(min-width, 200);
									.px2rem(max-width, 200);
									.px2rem(margin-left, 0);
									border: 1px solid @999;
									box-sizing: border-box;
									.number-icon{
										.flex1;
										.px2rem(height, 60);
										.px2rem(line-height, 60);
										.px2rem(font-size, 42);
										text-align: center;
										.total-input{
											width: @full;
											border: none;
											outline: none;
											text-align: center;
											.px2rem(line-height, 60);
											.px2rem(font-size, 36);
										}
									}
									.number-minus,
									.number-plus{
										
									}
									.number-total{
										border: 1px solid @999;
										border-top: none;
										border-bottom: none;
									}
								}
							}
						}
						.goods-editor{
							.goods-row{
								.goods-price{
									.ellipsis;
									.flexitem;
									 flex-basis: auto;
									.px2rem(width, 160);
								}
							}
						}
						.goods-mask{
							width: @full;
							height: @full;
							.pof; left: 0; top: 0; bottom: 0; right: 0;
							background-color: rgba(0, 0, 0, 0.5);
							.goods-light{
								.por;
								top: 50%;
								left: 0; right: 0;
								height: 50%;
								background-color: @fff;
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
				layout: 'achieve',
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
		methods: {
			toCustomer(){
				//e.preventDefault=true; //阻止默认事件（原生方法）
	            //e.preventDefault(); //阻止默认事件（原生方法）
	            //e.stop; //阻止冒泡（原生方法）
	            //e.cancelBubble = true; //阻止冒泡（原生方法）
	            e.stopPropagation();//阻止冒泡（原生方法）
			},

			handleeditor(e){
				this.layout = 'editor';
			},

			handleachieve(e){
				this.layout = 'achieve';
			},

			changeCustomer(e){

			},
		}
	}
</script>