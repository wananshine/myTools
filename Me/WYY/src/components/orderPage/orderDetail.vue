<template>
  <div class="order-container">
	  	<div class="order-inner">
			<h5 class="order-status">
				<p class="status-txt">待支付</p>
				<!-- <small class="status-time">剩余付款时间：</small> -->
			</h5>
			<div class="order-connection">
				<div class="connection-left">
					<p class="connection-tel">{{orderDetail.address.username}}{{orderDetail.address.cellphone}}</p>
					<address class="connection-address">{{orderDetail.address.address}}{{orderDetail.goodId}}</address>
				</div>
				<div class="connection-right"></div>
			</div>
			<div class="product-list">
				<dl class="pt-cell" v-for="(goods, goodsNO) in orderDetail.orderGoodInfos" :key="goodsNO">
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
			<div>
				<p>商品合计<span></p>
			</div>
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
				.connection-left{
					.px2rem(padding-left, 80);
					box-sizing: border-box;
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
				}
				.connection-right{
					height: @full;
					.px2rem(font-size, 26);
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
			
		}
	}
  	
</style>

<script>
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

