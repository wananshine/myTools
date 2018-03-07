<template>
	<div class="info-bd">

		<!-- 商品名称 && 价格 -->
		<div class="pt-basic">
			<div class="pt-name">
				<span class="tag" v-for="(tag, index) in productInfo.products.tags" :key="index">{{tag}}</span>
				<!-- <span class="tag">{{productInfo.products.coverIdStr}}</span> -->
				{{ productInfo.name }}
			</div>
			<div class="pt-description" v-if="productInfo.products.suggestWord">
				<p class="sellpoint">{{productInfo.products.suggestWord}}</p>
			</div>
			<div class="pt-price">
				<span class="max-price"><i class="money-icon">¥</i>{{productInfo.products.maxPrice}}</span>
				<del class="old-price">¥{{productInfo.products.originalCost}}</del>
			</div>
		</div>
		<!-- 商品优惠券 -->
		<div class="pt-coupon">
			<div class="coupon-bd">
				<span class="coupon-side">
					¥
					<strong class="value">20</strong>
					<small class="des">满99使用</small>
				</span>
				<div class="coupon-cont">
					<p class="name">
						<i class="tag">影音通用</i>新学期满减券
					</p>
					<small class="time">2018.02.24 - 2018.03.10</small>
				</div>
				<a class="get-coupon" href="">领券</a>
			</div>
		</div>
		<!-- 服务&&条件 -->
		<div class="m-condition">
			<dl class="cnt-dl" @click="serverCustomer()">
				<dd class="cnt-dt">服务:</dd>
				<dt class="cnt-dd">
					<span>7天无理由退货</span>
					<span>15天无忧换货</span>
					<span>商家发货</span>
					<span>商家认证</span>
					<span>云音乐自营</span>
				</dt>
			</dl>
			<div class="cnt-show" v-if="serverShow" v-cloak>
				<div class="server-bg" @click="serverCustomer()"></div>
				<div class="server-list">
					<div class="serv-title">服务<span class="btn-close" @click="serverCustomer()" >&#10005;</span></div>
					<dl class="serv-dl" v-for="(serv, index) in moreServer" :key="index">
						<dt class="serv-dt">{{ serv.s_title }}</dt>
						<dd class="serv-dd">{{ serv.s_txt   }}</dd>
					</dl>
				</div>
			</div>
		</div>
		<!-- 商品介绍 -->
		<div class="pt-introduce">
			<h5 class="pt-intr-title">商品介绍</h5>
			<div class="pt-intr-danger">正品低价 品质保证。</div>
			<div class="pt-intr-img">
				<p><img src="../../../assets/2018030514433059413.png" alt="商品介绍图片" title="商品介绍图片"></p>
				<p><img src="../../../assets/2018030514433059413.png" alt="商品介绍图片" title="商品介绍图片"></p>
				<p><img src="../../../assets/2018030514433059413.png" alt="商品介绍图片" title="商品介绍图片"></p>
				<p><img src="../../../assets/2018030514433059413.png" alt="商品介绍图片" title="商品介绍图片"></p>
				<p><img src="../../../assets/2018030514433059413.png" alt="商品介绍图片" title="商品介绍图片"></p>
				<p><img src="../../../assets/2018030514433059413.png" alt="商品介绍图片" title="商品介绍图片"></p>
				<p><img src="../../../assets/2018030514433059413.png" alt="商品介绍图片" title="商品介绍图片"></p>
				<p><img src="../../../assets/2018030514433059413.png" alt="商品介绍图片" title="商品介绍图片"></p>
			</div>
		</div>
	</div>
</template>
<style lang="less" scoped="scoped">
	@import (reference) url(../../../assets/css/cost.less);
	@borderline: top;
	.padbox{
		.px2rem(padding-left, 16);
		.px2rem(padding-right, 16);
	}
	.info-bd{
		.pt-basic{
			&:extend(.padbox);
			.px2rem(padding-top, 20);
			.px2rem(padding-bottom, 20);
			background-color: @fff;
			.pt-name{
				.por;
				.hid;
				.px2rem(height, 90);
				.px2rem(line-height, 45);
				.px2rem(font-size, 34);
				.clamp2;
				color: @333;
				.tag{
					.por;
					.px2rem(padding-left, 6);
					.px2rem(padding-right, 6);
					.px2rem(font-size, 25);
					vertical-align: top;
					border-radius: 3px;
					//display: inline-block;
					color: @d33a;
					border: 1px solid @d33a;
					box-sizing: border-box;
				}
			}
			.pt-description{
				.px2rem(margin-top, 20);
				.px2rem(margin-bottom, 20);
				.sellpoint{
					color: @d33a;
					.px2rem(font-size, 28);
					.px2rem(line-height, 40);
				}
			}
			.pt-price{
				color: @d33a;
				.money-icon{
					.px2rem(font-size, 36);
					.px2rem(margin-right, 8);
				}
				.max-price{
					.px2rem(font-size, 60);
				}
				.old-price{
					color: @999;
					.px2rem(font-size, 28);
				}
			}
		}
		.pt-coupon{
			.por;
			&:extend(.padbox);
			.px2rem(padding-bottom, 20);
			overflow: hidden;
			box-sizing: border-box;
			background-color: @fff;
			.coupon-bd{
				.por;
				.clearfix;
				.borderArea;
				.px2rem(height, 186);
				box-sizing: border-box;
				border: 1px solid @f3d0;
				background-color: @fdf5;
				.coupon-side{
					.por;
					.px2rem(padding, 40);
					.px2rem(font-size, 36);
					.px2rem(width, 200);
					height: @full;
					float: left;
					box-sizing: border-box;
					.iconCircle{
						content: '';
						display: block;
						width: 20px;
						height: 20px;
						border-radius: 50px;
						background-color: #fff;
						.poa; right: -10px;
					}
					&:before{
						.iconCircle;
						bottom: -10px;					
					}
					&:after{
						.iconCircle;
						top: -10px;	
					}
					.value{
						.px2rem(font-size, 58);
					}
					.des{
						.block;
						.px2rem(font-size, 28);
						color: @999;
					}
				}
				.coupon-cont{
					.por;
					.hid;
					height: @full;
					.px2rem(padding-top, 40);
					.px2rem(padding-left, 20);
					.px2rem(margin-left, 200);
					color: @333;
					box-sizing: border-box;
					&:before{
						content: '';
						.poa; left: 0%; top: 50%;
						.translate(@x: 0%);
						display: block;
						height: calc(@full - 35px);
						width: 1px;
						background-color: @d33a;
					}
					.name{
						.px2rem(font-size, 26);
						.px2rem(margin-bottom, 28);
						.tag{
							.px2rem(padding-top, 5);
							.px2rem(padding-bottom, 5);
							.px2rem(padding-left, 5);
							.px2rem(padding-right, 5);
							.px2rem(margin-right, 8);
							.px2rem(font-size, 22);
							border: 1px solid @ff00;
							color: @ff00;
						}
					}
					.time{
						.block;
						.px2rem(font-size, 28);
						color: @999;
					}
				}
				.get-coupon{
					.poa;
					bottom: 30px;
					right: 30px;
					.px2rem(font-size, 28);
				}
			}
		}
		.m-condition{
			.por;
			.hid;
			&:extend(.padbox);
			background-color: @fff;
			.top-line;
			.cnt-dl{
				.flexbox;
				align-items: flex-start;
				.px2rem(padding-top, 32);
				.px2rem(padding-bottom, 32);
				.cnt-dt{
					.px2rem(width, 100);
					.px2rem(font-size, 28);
				}
				.cnt-dd{
					.por;
					.hid;
					.flexitem;
					flex-grow: 1;
					span{
						.por;
						.hid;
						&:extend(.padbox);
						.px2rem(font-size, 24);
						.px2rem(height, 40);
						display: block;
						float: left;
						color: @888;
						&:after{
							content: '';
							display: block;
							.px2rem(width, 7);
							.px2rem(height, 7);
							border-radius: 10px;
							background-color: red;
							.poa;
							left: 2%;
							top: 15%;
						}
					}
					&:after{
						content: '';
						display: block;
						.poa;
						right: 0;
						//background-color: yellow;
						.px2rem(width, 20);
						.px2rem(height, 30);
						background-image: url("http://s2.music.126.net/store/mobile/img/sprite/icon2_2x.png?95a4e6496ebd0cd7484566f47581eeab");
						background-position: -706px -319px;
					    background-repeat: no-repeat;
					    background-size: 780px auto;
					}
				}
			}
			.cnt-show{
				.pof;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				height: @full;
				background-color: rgba(0, 0, 0, 0.5);
				z-index: 4;
				.server-bg{
					.poa;
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
					height: @full;
				}
				.server-list{
					.poa;
					bottom: 0;
					left: 0;
					right: 0;
					background-color: rgba(255, 255, 255, 1);
					.px2rem(padding-bottom, 28);
				}
				.serv-title{
					.por;
					.hid;
					.px2rem(font-size, 33);
					.px2rem(padding-top, 28);
					.px2rem(padding-bottom, 28);
					text-align: center;
					.btn-close{
						.poa; top: 50%; right: 18px;
						.translate(@x: 0%);
						// float: right;
						// .px2rem(margin-right, 28);
					}
				}
				.serv-dl{
					.px2rem(padding-left, 21);
					.px2rem(padding-right, 21);
					.px2rem(margin-top, 21);
					.px2rem(margin-bottom, 26);
					box-sizing: border-box;
					.serv-dt{
						.por;
						.hid;
						.px2rem(font-size, 30);
						.px2rem(line-height, 48);
						color: @333;
						.padbox;
						&:before{
							content: "";
							display: block;
							.poa;
							left: 0%;
							top: 38%;
							.px2rem(width, 7);
							.px2rem(height, 7);
							background-color: red;
						}
					}
					.serv-dd{
						.padbox;
						.px2rem(font-size, 26);
						.px2rem(line-height, 42);
						color: @888;
					}
				}
			}
		}
		.pt-introduce{
			.por;
			.hid;
			&:extend(.padbox);
			.px2rem(margin-top, 21);
			background-color: @fff;
			.pt-intr-title{
				.px2rem(padding-left, 10);
				.px2rem(margin-top, 32);
				.px2rem(margin-bottom, 32);
				.px2rem(font-size, 32);
				border-left: 3px solid red;
			}
			.pt-intr-danger{
				color: @ff00;
				.px2rem(font-size, 28);
				.px2rem(margin-bottom, 32);
			}
			.pt-intr-img{}
		}
	}
</style>
<script type="text/javascript">
	export default{
		components: {},
		name: "",
		data(){
			return{
				serverShow: false,  //更多服务弹出框
				moreServer: [
					{ "s_title": "7天无理由退货", "s_txt": "该商品支持7天无理由退货，买家在商品签收日起7天内可在线发起退货申请" 	},
					{ "s_title": "15天无忧换货" , "s_txt": "该商品支持15天无忧换货，买家在商品签收之日起15天内可在线发起换货申请" 	},
					{ "s_title": "满119包邮"    , "s_txt": "单笔订单金额（不含运费）满119元享受包邮服务" 							},
					{ "s_title": "顺丰发货"     , "s_txt": "该商品物流由顺丰提供服务，24小时内发货，法定节假日顺延" 				},
					{ "s_title": "Ping音乐自营" , "s_txt": "该商品为Ping音乐自营，从源头严格把关商品生产，保障品质" 				}
				],//更多服务Data
			}
		},

		props: {
			productInfo: {
				type: Object
			},
		},
		computed: {},
    	watch: {
	        //监听路由
	        '$route' (to, from) {
	          // 获取最新的id 调用获取数据方法
	          //this.$route.params.goodsId;
	          //this.fetchGoodsId()
	        }
		},
		beforeCreate(){},
		created(){
			this.$nextTick(function(){
			});
		},
		beforeMount(){},
		mounted(){
			this.$nextTick(function(){
			})
		},
		beforeUpdate(){},
		updated(){},
		methods: {
			serverCustomer(){
				console.log(123)
				this.serverShow = !this.serverShow;

				//e.preventDefault=true; //阻止默认事件（原生方法）
				//e.preventDefault(); //阻止默认事件（原生方法）
				//e.stop; //阻止冒泡（原生方法）
				//e.cancelBubble = true; //阻止冒泡（原生方法）
				//e.stopPropagation();//阻止冒泡（原生方法）
			},
		}
	}
</script>