<template>
	<div class="user-container">
		<div class="user-inner w-inner">
			<div class="user-header">
				<!-- :to="{ path: '/indexDetail', query: { goodsId: product.id } }" -->
				<!-- :to="{ path: '/indexDetail/'+product.id }" -->
				<span class="header-cell">我的订单</span>
				<span class="header-cell header-cell-r" @click="orderCustomer($event)">全部订单></span>
			</div>
			<div class="user-order">
				<figure class="order-cell">
					<figcaption class="cell-icn"><img /></figcaption>
					<p class="cell-txt">待支付</p>
				</figure>
				<figure class="order-cell">
					<figcaption class="cell-icn"><img /></figcaption>
					<p class="cell-txt">待支付</p>
				</figure>
				<figure class="order-cell">
					<figcaption class="cell-icn"><img /></figcaption>
					<p class="cell-txt">待支付</p>
				</figure>
			</div>
			<router-link class="user-handle" to="{ name: '/coupon' }">我的优惠券</router-link>
			<router-link class="user-handle" to="{ path: 'address' }">我的收货地址</router-link>
			<p class="user-handle" >在线客服</p>
		</div>
	</div>
</template>
<style lang="less" scoped="scoped">
	@import (reference) url(../../assets/css/cost.less);
	@borderline: top;
	.padd30{
		.px2rem(padding-left, 30);
		.px2rem(padding-right, 30);
		box-sizing: border-box;
	};
	/* ------------------*/
	.user-container{
		.all;
		overflow-y: auto;
		.flex1;
		&::-webkit-scrollbar {
		width: 0px;  //设置滚动条宽度
		}
		&::-webkit-scrollbar-track {
		box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
		border-radius: 10px;
		}
		&::-webkit-scrollbar-thumb {
		border-radius: 10px;
		box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
		}
		.user-inner{
			.user-header{
				.flexbox;
				&:extend(.padd30);
				background-color: @fff;
				.px2rem(font-size, 32);
				.header-cell{
					.flexauto;
					.px2rem(line-height, 100);
				}
				.header-cell-r{
					.px2rem(font-size, 28);
					color: @666;
				}
			}
			.user-order{
				.por;
				.hid;
				.flexbox;
				.top-line;
				&:extend(.padd30);
				.px2rem(padding-top, 20);
				.px2rem(padding-bottom, 20);
				box-sizing: border-box;
				background-color: @fff;				
				.order-cell{
					.por;
					.hid;
					.flex1;
					.cell-icn{
						.px2rem(width, 50);
						.px2rem(height, 50);
						margin: auto;
						background-color: beige;
					}
					.cell-txt{
						.px2rem(line-height, 30);
						.px2rem(margin-top, 8);
						.px2rem(font-size, 24);
						color: @333;
						text-align: center;
					}
				}
			}
			.user-handle{
				&:extend(.block);
				&:extend(.padd30);
				.px2rem(margin-top, 20); 
				.px2rem(line-height, 100);
				.px2rem(font-size, 32);
				color: @333;
				background-color: @fff;
			}
		}
	}
</style>
<script type="text/javascript">
	export default{
		components: {},
		name: "",
		props: ["allChecked"],
		data(){
			return{
				layout: 'achieve',
				masklayer: '',
				numberTotal: 10,   //商品数量
				cartData:[],
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

			//全选
			allChecked: {
				handler: function (allChecked) {
					const $goodsCheckbox = document.getElementsByClassName("cart-list")[0].querySelectorAll("input.goods-checkbox");
					for(var i=0; i<$goodsCheckbox.length; i++){
							$goodsCheckbox[i].checked = allChecked;
					}
	            },
	            deep: true
			},

		},
		beforeCreate(){},
		created(){
			this.$nextTick(function(){
				//http://music.163.com/store/api/product/ipbanner?type=1
				this.$http.get('/api/shopingCart').then(response=>{
					this.cartData = response.body.data.result.itemDatas;
					console.log('api2/goods',response.body.data.result)
				})
				.catch(err=>{
					console.log('err',err)
				})


			});
		},
		beforeMount(){},
		mounted(){
		},
		beforeUpdate(){},
		updated(){
			//console.log('this.allChecked',this.allChecked)
		},
		methods: {
			toCustomer(){
				//e.preventDefault=true; //阻止默认事件（原生方法）
	            //e.preventDefault(); //阻止默认事件（原生方法）
	            //e.stop; //阻止冒泡（原生方法）
	            //e.cancelBubble = true; //阻止冒泡（原生方法）
	            e.stopPropagation();//阻止冒泡（原生方法）
			},

			//跳转到订单页面
			orderCustomer(e){
				// this.$
				//console.log('hot:',hot,'hotid=',hot.products.id)
				this.$router.push({ 
					path: '../indexUser/indexOrder', 
					// params: { goodsId: hot.products.id }
				});
			},

		

		}
	}
</script>