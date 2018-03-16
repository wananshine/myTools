<template>
  <div class="order-container">
	  	<div class="order-inner">
			  <!-- 支付状态 -->
			<h5 class="order-status">
				<p class="status-txt">待支付</p>
				<!-- <small class="status-time">剩余付款时间：</small> -->
			</h5>
			<!-- address && 联系方式 -->
			<div class="order-connection">
				<div class="connection-info">
					<i class="icon-address">
						<svg class="icon" aria-hidden="true">
							<use xlink:href="#icon-dizhi2"></use>
						</svg>
					</i>
					<p class="connection-tel">{{orderDetail.address.username}}{{orderDetail.address.cellphone}}</p>
					<address class="connection-address">{{orderDetail.address.address}}</address>
					<span class="update-address">更换收货地址</span>
				</div>
			</div>
			<!-- goodsData -->
			<section class="product-list">
				<dl class="pt-cell" v-for="(goods, goodsNO) in orderDetail.orderGoodInfos" :key="goodsNO">
					<dt class="pt-img"><img :src="goods.goodSimpleInfo.skuPicUrl"/></dt>
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
			</section>

			<div class="product-total">
				<p>商品合计<span class="price-number">¥{{orderDetail.extJsonInfo.refundRMB}}</span></p>
			</div>
			<div class="price-total">
				<p>总计<span class="price-number">¥{{orderDetail.extJsonInfo.totalAmount}}</span></p>
			</div>
			<section class="order-number">
				<div class="order-no-l">
					<p class="orderNO">订单编号：<em>{{orderDetail.id}}</em></p>
					<p class="orderTime">下单时间：<em>{{orderDetail.orderTime}}</em></p>
				</div>
				<div class="order-no-r">
					<button class="order-cancel">取消订单</button>
				</div>
			</section>
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
	/* ------------------*/
	.order-container{
		.all;
		overflow-y: auto;
		.flex1;
		-webkit-font-smoothing：antialiased
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
			.all;
			.order-status{
				.all;
				.bottomline;
				&:extend(.padd30);
				.px2rem(height, 180);
				text-align: center;
				background-color: @fff;
				.status-txt{
					.por;
					.hid;
					.px2rem(margin-top, 70);
					.px2rem(font-size, 40);
				}
				.status-time{
					.px2rem(font-size, 30);
				}
			}
			.order-connection{
				.flexbox;
				&:extend(.padd30);
				.px2rem(padding-top, 30);
				.px2rem(padding-bottom, 30);
				background-color: @fff;
				.connection-info{
					.por;
					.px2rem(padding-left, 60);
					.px2rem(padding-right, 160);
					box-sizing: border-box;
					.icon-address{
						.por;
						.poa; left: 0%; top: 50%;
						.translate(@x:0);
						.px2rem(width, 50);
						color: @666;
						.icon{
							.icon;
							width: @full;
						}
					}
					.connection-tel{
						.px2rem(font-size, 34);
						color: @333;
					}
					.connection-address{
						.px2rem(line-height, 36);
						.px2rem(margin-top, 20);
						.px2rem(font-size, 26);
						color: @888;
					}
					.update-address{
						.poa; bottom: 0; right: 0;
						.px2rem(font-size, 24);
						color: @00c3;
					}
				}
			}
			.product-list{
				.px2rem(margin-top, 20);
				background-color: @fff;
				.pt-cell{
					.por;
					.flexbox;
					.bottomline;
					&:extend(.padd30);
					.px2rem(padding-top, 20);
					.px2rem(padding-bottom, 20);
					&:nth-last-of-type(1){
						&:after{
							border-bottom: none;
						}
					}
					.pt-img{
						.px2rem(width, 138);
						.px2rem(height, 138);
						.px2rem(margin-right, 10);
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
			.product-total{
				.por;
				&:extend(.padd30);
				.px2rem(margin-top, 20);
				background-color: @fff;
				.bottomline;
				p{
					.px2rem(line-height, 120);
					.px2rem(font-size, 26);
					.price-number{
						float: right;
					}
				}
			}
			.price-total{
				&:extend(.padd30);
				background-color: @fff;
				.px2rem(font-size, 26);
				p{
					.px2rem(line-height, 120);
					.px2rem(font-size, 26);
					.price-number{
						float: right;
					}
				}
			}
			.order-number{
				.por;
				.flexbox;
				&:extend(.padd30);
				.px2rem(margin-top, 20);
				.px2rem(padding-top, 35);
				.px2rem(padding-bottom, 35);
				.px2rem(font-size, 26);
				background-color: @fff;
				.order-no-l{
					.orderNO{
						color: @888;
					}
					.orderTime{
						.px2rem(margin-top, 15);
						color: @888;
					}
					em{
						color: @333;
					}
				}
				.order-no-r{
					.por;
					.order-cancel{
						.por;
						.hid;
						.border1px;
						.px2rem(width, 150);
						.px2rem(line-height, 50);
						.px2rem(font-size, 22);
						color: @666;
						background-color: transparent;
						outline: none;
						border: none;
					}
				}
			}
			
		}
	}
  	
</style>

<script type="text/javascript">
 	import Iconfont from  '../../assets/font/iconfont.js';
    export default {
        components: {},
		name: "",
		props: {
			// 用于接收父组件的数据goodsData
			ordersData: {
				type: Array,
				required: true
			},
			orderDetail: {
				type: Object,
				required: true
			}
		},
		// props: ["ordersData", "orderDetail"],
		data(){
			return{
				//payOrders: {},
			}
		},
		computed: {
		},
		watch:{},
		beforeCreate(){},
		created(){
			console.log(this.$route.params.orderID, this.ordersData, this.orderDetail);
			//console.log(this.$route.query.orderID);
		},
		beforeMount(){},
		mounted(){
		},
		beforeUpdate(){},
		updated(){
			//console.log('this.allChecked',this.allChecked)
		},
		methods: {},
    }
</script>

