<template>
	<div class="order-box">
		<div class="order-inner w-inner">
			<nav class="order-nav">
				<a class="nav-item" :class="{'nav-active': navIndex===index}" v-for="(nav, index) in navBar" :key="index" v-text="nav" @click="navCustomer(nav, index, $event)"></a>
			</nav>
			<section class="order-content">
				<ul class="order-list">
					<li class="order-item" v-for="(order, index) in ordersData" :key="index" @click="seeCustomer(order, $event)">
						<div class="order-top">
							<span class="order-time">{{order.currentTime}}</span>
							<!-- <span class="order-time">{{order.currentTime | startTime}}</span> -->
							<span class="order-status">待支付</span>
						</div>
						<div class="order-middle">
							<dl class="pt-cell" v-for="(goods, goodsNO) in order.orderGoodInfos" :key="goodsNO">
								<dt class="pt-img"><img :src="goods.goodSimpleInfo.coverImgUrl"/></dt>
								<dd class="pt-info">
									<div class="pt-left">
										<p class="pt-name">{{goods.goodSimpleInfo.name}}</p>
										<small class="pt-attr">
											<i v-for="(attr ,attrNO) in goods.goodSimpleInfo.attrs" :key="attrNO">{{attr.attrValue}}</i>
										</small>
									</div>
									<div class="pt-right">
										<p class="pt-price">¥{{goods.singleAmount}}</p>
										<small class="pt-num">x{{goods.num}}</small>
									</div>
								</dd>
							</dl>
						</div>
						<div class="order-btm">
							<p class="pt-total">共{{order.extJsonInfo.quantity}}件 总计:¥{{order.extJsonInfo.refundRMB}}</p>
						</div>
						<div class="order-btn">
							<button class="btn-default" @click="seeCustomer(order, $event)">查看详情</button>
							<button class="btn-default" @click="gopayCustomer(order, $event)">立即支付</button>
						</div>
					</li>
				</ul>
			</section>
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
	.order-box{
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
		.order-inner{
			.order-nav{
				.flexbox;
				.nav-item{
					.flex1;
					.px2rem(font-size, 30);
					.px2rem(line-height, 80);
					background-color: @fff;
					text-align: center;
				}
				.nav-active{
					.por;
					.hid;
					.borderArea;
					color: @ff00;
					&:after{
						width: 65%;
						.translate(@x: 25%);
						border-bottom: 4px solid @ff00;
					}
				}
			}
			.order-content{
				.all;
				.order-list{
					.all;
					.order-item{
						&:extend(.padd30);
						.px2rem(margin-top, 20);
						background-color: @fff;
						.order-top{
							.por;
							.flexbox;
							.bottomline;
							.px2rem(font-size, 32);
							.px2rem(line-height, 75);
							&:after{
								border-bottom: 1px solid rgba(0, 0, 0, 0.5);
							}
							span{
								.flex1;
							}
							.order-time{
								
							}
							.order-status{
								text-align: right;
								color: @ff00;
							}
						}
						.order-middle{
							.por;
							.bottomline;
							&:after{
								border-bottom: 1px solid rgba(0, 0, 0, 0.5);
							}
							.pt-cell{
								.flexbox;
								.px2rem(padding-top, 20);
								.px2rem(padding-bottom, 20);
								.pt-img{
									.px2rem(width, 142);
									.px2rem(height, 142);
									img{
										.all;
										display: block;
										margin: auto;
									}
								}
								.pt-info{
									.flex1;
									.flexbox;
									.pt-left{
										.pt-name{
											.por;
											.hid;
											.clamp2;
											.px2rem(font-size, 30);
											.px2rem(line-height, 36);
										}
										.pt-attr{
											.block;
											.px2rem(font-size, 24);
											.px2rem(margin-top, 10);
											color: @888;
										}
									}
									.pt-right{
										.px2rem(margin-left, 20);
										.px2rem(margin-right, 20);
										.pt-price{
											.px2rem(font-size, 28);
										}
										.pt-num{
											.block;
											.px2rem(font-size, 24);
											.px2rem(margin-top, 10);
											color: @888;
											text-align: right;
										}
									}
								}
							}
						}
						.order-btm{
							.px2rem(font-size, 32);
							.pt-total{
								.px2rem(line-height, 85);
								text-align: right;
							}
						}
						.order-btn{
							.por;
							.hid;
							.px2rem(padding-bottom, 35);
							text-align: right;
							.btn-default{
								.px2rem(width, 150);
								.px2rem(height, 50);
								.px2rem(font-size, 26);
								color: @333;
								border: 1px solid @999;
								background-color: transparent;
								outline: none;
								border-radius: 5px;
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
		//props: ["ordersData"],
		data(){
			return{
				navIndex: null,
				navBar: [ '待支付', '待发货', '待收货', '全 部' ],
				ordersData: [],  //The data property "ordersData" is already declared as a prop. Use prop default value instead.
			}
		},
		computed: {
			
		},
		filters: {
			startTime: function (value) {
				var date =  new Date(parseInt(value) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
				date = date.toString();
				// var newDate = new Date();
				// newDate.setTime(timestamp3 * 1000);	
				console.log(value)
				// var pos = date.indexOf(' ');
				// var date2 = date.substring(0 , pos);
				return  date;
			}
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
			this.navIndex = this.$route.query.navid;
			this.$nextTick(function(){
				//http://music.163.com/store/api/product/ipbanner?type=1
				this.getlistData();
			});
		},
		beforeMount(){},
		mounted(){
			this.$nextTick(() => {
					
			});
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

			//获取listData
			getlistData(){
				const _navid = this.$route.query.navid;
				console.log(_navid);
				this.$http.get('/api/topay').then(response=>{
					this.ordersData = response.body.data.orders;
					console.log('api2/toPay',response.body.data.orders)
				})
				.catch(err=>{
					console.log('err',err)
				});
			},

			//nav
			navCustomer(nav, index, e){
				this.navIndex = index;
				this.$router.push({
					path: '../indexUser/order', 
					query: { navid: index }
				});
				this.$nextTick(() => {
					this.getlistData();
				});
			},

			//查看详情
			seeCustomer(order, e){
				this.orderDetail = order;
				this.$emit('see-customer', order, e);
				e.stopPropagation();//阻止冒泡（原生方法）
				this.$router.push({
					name: 'orderDetail',
					params: { orderID: order.id }
				});
				// this.$router.push({
				// 	path: 'order/orderDetail',
				// 	query: { orderID: order.id }
				// });
				//this.$router.push({name:'B',params:{name:'xy',age:22}});
            	//this.$router.push({name:'B',query:{name:'xy',age:22}});
			},
		}
	}
</script>