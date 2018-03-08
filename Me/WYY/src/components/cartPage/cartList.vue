<template>
	<div class="cart-container">
		<div class="cart-inner w-inner">
			<!-- <div class="cart-title">购物车</div> -->
		    <div class="cart-bd">
				<div class="cart-handle">
					<span class="handle-selected">{{allChecked}}已选商品</span>
					<span class="handle-editor" v-if="layout == 'achieve'" @click="handleeditor($event)">编辑</span>
					<span class="handle-editor" v-if="layout == 'editor'" @click="handleachieve($event)">完成</span>
				</div>
				<ul class="cart-list">
					<li class="cart-goods" v-for="(product, index) in cartData" :key="index">
						<div class="goods-check">
							<label class="goods-selected"><input class="goods-checkbox" type="checkbox" :data-money="(product.signleMoney)*(product.num)"  @change="singnleCustomer($event)"></label>
							<div class="goods-img"><img :src="product.goodSkuData.skuPicUrl" /></div>
							<div class="goods-info" v-if="layout == 'achieve'" >
								<div class="goods-row">
									<span class="goods-name">{{product.productName}}</span>
									<span class="goods-price">¥{{product.signleMoney}}</span>
								</div>
								<div class="goods-row">
									<span class="goods-attr">
										<i v-for="(attr, attrNo) in product.goodSkuData.attrs" :key="attrNo">{{attr.attrValue}}</i>
									</span>
									<p class="goods-number">
										<i class="number-icon number-minus" @click="minusCustomer(product,$event)">-</i>
										<i class="number-icon number-total" >
											<input class="total-input" type="tel" v-model="product.num" min="1" max="10">
										</i>
										<i class="number-icon number-plus" @click="plusCustomer(product,$event)">+</i>
									</p>
								</div>
							</div>

							<div class="goods-info goods-editor" v-if="layout == 'editor'">
								<div class="goods-row goods-change" @click="changeCustomer(product,$event)">
									已选择：
									<i v-if="product.goodSkuData.attrs != ''" v-for="(attr, attrNo) in product.goodSkuData.attrs" :key="attrNo">{{attr.attrValue}}</i>
									<i else>默认</i>
								</div>
								<div class="goods-row">
									<span class="goods-price">¥{{product.signleMoney}}</span>
									<p class="goods-number">
										<i class="number-icon number-minus" @click="minusCustomer(product,$event)">-</i>
										<i class="number-icon number-total" >
											<input class="total-input" type="tel" v-model="product.num" min="1" max="10">
										</i>
										<i class="number-icon number-plus" @click="plusCustomer(product,$event)">+</i>
									</p>
								</div>
							</div>
						</div>

						<div class="goods-mask" v-if="masklayer === product.goodSkuData.skuId" @click="maskCustomer($event)">
							<div class="goods-light" @click="lightCustomer($event)">
								<div class="light-top">
									<span class="top-img"><img :src="product.goodSkuData.picUrl" /></span>
									<span class="top-show">
										<em class="top-price">¥149</em>
										<small class="top-attr">请选择规格属性</small>
										<i class="close" @click="maskCustomer($event)">x</i>
									</span>
								</div>
								<div class="light-middle">
									<div class="middle-bd">
										<dl v-if="true" class="middle-type">
											<dt class="type-title">颜色</dt>
											<dd class="type-options">
												<span class="options" @click="colorCustomer($event)" color-value='black'>黑色</span>
												<span class="options" @click="colorCustomer($event)" color-value='white'>白色</span>
												<span class="options" @click="colorCustomer($event)" color-value='red'>红色</span>
												<span class="options" @click="colorCustomer($event)" color-value='blue'>蓝色</span>
												<span class="options" @click="colorCustomer($event)" color-value='green'>绿色</span>
												<span class="options" @click="colorCustomer($event)" color-value='yellow'>黄色</span>
											</dd>
										</dl>
										<dl class="middle-type">
											<dt class="type-title">型号</dt>
											<dd class="type-options">
												<span class="options">男款</span>
												<span class="options">女款</span>
												<span class="options">儿童款</span>
											</dd>
										</dl>
									</div>
									<dl class="middle-type">
										<dt class="type-title">数量</dt>
										<dd class="goods-number">
											<i class="number-icon number-minus" @click="minusCustomer(product,$event)">-</i>
											<i class="number-icon number-total" >
												<input class="total-input" type="tel" v-model="product.num" min="1" max="10">
											</i>
											<i class="number-icon number-plus" @click="plusCustomer(product,$event)">+</i>
										</dd>
									</dl>
								</div>
								<div class="light-btn">
									<button class="btn-default">确认</button>
								</div>
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
	@borderline: top;
	.padd30{
		.px2rem(padding-left, 30);
		.px2rem(padding-right, 30);
		box-sizing: border-box;
	};
	.cart-container{
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
					background-color: @fff;
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
							.por;
							.flexbox;
							.px2rem(height, 220);
							
							box-sizing: border-box;
							z-index: 2;
						}	
						.goods-selected{
							.por;
							.flexitem;
							flex-basis: auto;
							flex-shrink: 0;
							box-sizing: border-box;
							.px2rem(width, 40);
							.px2rem(margin-right, 15);
							height: @full;
							.goods-checkbox{
								.poa; top: 50%; left: 50%; 
								.translate();
								.px2rem(width, 36);
								.px2rem(height, 36);
							}
						}
						.goods-img{
							.por;
							.hid;
							.flexitem;
							flex-shrink: 0;
							flex-basis: auto;
							.px2rem(width, 160);
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
							.por;
							.flex1;
							.px2rem(padding-left, 20);
							.px2rem(padding-top, 20);
							.px2rem(padding-bottom, 20);
							box-sizing: border-box;
							height: @full;
							.bottomline;
							&:after{
								border-bottom: 1px solid rgba(0, 0, 0, 0.25);
							}
							.goods-row{
								.por;
								.hid;
								.flexbox;
								.px2rem(margin-top, 18);
								.px2rem(margin-bottom, 10);
								.goods-name{
									.por;
									.hid;
									.clamp2;
									.flex1;
									.px2rem(height, 80);
									.px2rem(line-height, 40);
									.px2rem(font-size, 30);
								}
								.goods-price{
									.px2rem(min-width, 80);
									.px2rem(padding-left, 20);
									text-align: right;
								}
								.goods-attr{
									.px2rem(width, 200);
									.px2rem(font-size, 23);
									color: @999;
								}
								.goods-number{
									.por;
									.hid;
									.flexbox;
									.flexitem;
									.border1px;
									.px2rem(min-width, 170);
									.px2rem(max-width, 170);
									.px2rem(height, 52);
									.px2rem(line-height, 52);
									.px2rem(margin-left, 0);
									.px2rem(font-size, 38);
									border-radius: 3px;
									box-sizing: border-box;
									text-align: center;
									color: @999;
									.number-minus,
									.number-plus{
										.por;
										.px2rem(width, 50);
										font-weight: 100;
									}
									.number-total{
										.por;
										.flex1;
										.border1px;
										&:after{
											border-top: none;
											border-bottom: none;
										}
										.total-input{
											width: @full;
											color: @666;
											border: none;
											outline: none;
											text-align: center;
											.px2rem(line-height, 52);
											.px2rem(font-size, 26);
										}
									}
								}
							}
						}
						.goods-editor{
							.goods-row{
								.goods-price{
									.ellipsis;
									.px2rem(width, 160);
									.flexitem;
									flex-basis: auto;
									padding-left: 0;
									text-align: left;
								}
							}
							.goods-change{
								color: @888;
								.px2rem(padding-left, 10);
								.px2rem(line-height, 50);
								background-color: @f5;
								justify-content: flex-start;
							}
						}
						.goods-mask{
							width: @full;
							height: @full;
							.pof; left: 0; top: 0; bottom: 0; right: 0;
							z-index: 3;
							background-color: rgba(0, 0, 0, 0.5);
							.goods-light{
								.poa; bottom: 0; left: 0; right: 0;
								// height: 50%;
								.px2rem(padding-top,  15);
								.px2rem(padding-left, 15);
								.px2rem(padding-right,15);
								background-color: @fff;
								box-sizing: border-box;
								.light-top{
									.por;
									.hid;
									.flexbox;
									justify-content: flex-start;
									.px2rem(height, 200);
									.top-img{
										.por;
										.px2rem(width, 200);
										.px2rem(height, 200);
										img{
											.all;
											.poa; left: 50%; top: 50%;
											.translate();
										}
									}
									.top-show{
										.por;
										.flex1auto;
										.px2rem(margin-left, 20);
										height: @full;
										.top-price{
											.block;
											.px2rem(line-height, 50);
											.px2rem(font-size, 52);
											.px2rem(margin-top, 50);
											color: @ff00;
										}
										.top-attr{
											.block;
											.px2rem(margin-top, 20);
										}
										.close{
											.poa; top: 0; right: 0;
											.px2rem(font-size, 52);
										}
									}
								}
								.light-middle{
									.px2rem(margin-top, 42);
									.middle-type{
										.px2rem(margin-bottom, 30);
										.type-title{
											.px2rem(margin-bottom, 20);
											.px2rem(font-size, 30);
											color: @333;
										}
										.type-options{
											.por;
											.flexbox;
											flex-wrap: wrap;
											justify-content: flex-start;
											.options{
												.por;
												.flexauto;
												.border1px;
												.px2rem(line-height,  60);
												.px2rem(padding-left,  30);
												.px2rem(padding-right, 30);
												.px2rem(margin-right,  12);
												.px2rem(margin-bottom,  12);
												.px2rem(font-size, 26);
												// .px2rem(border-width, 1);
												// border-style: solid;
												// border-color: @333;
												color: @333;
												box-sizing: border-box;
											}	
										}
										.goods-number{
											.por;
											.hid;
											.flexbox;
											.flexitem;
											.border1px;
											.px2rem(min-width, 200);
											.px2rem(max-width, 200);
											.px2rem(margin-left, 0);
											box-sizing: border-box;
											color: @999;
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
												.por;
											}
											.number-total{
												.por;
												.border1px;
												&:after{
													border-top: none;
													border-bottom: none;
												}
											}
										}
									}
								}
								.light-btn{
									.all;
									.btn-default{
										.all;
										.px2rem(line-height,96);
										.px2rem(font-size,38);
										background-color: @fff;
										color: @ff00;
										outline: none;
										border: none;
										.top-line;
									}
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

			//编辑商品
			handleeditor(e){
				this.layout = 'editor';
			},

			//编辑完成
			handleachieve(e){
				this.layout = 'achieve';
			},

			//打开商品弹出框
			changeCustomer(product,e){
				//e.preventDefault=true; //阻止默认事件（原生方法）
	            //e.preventDefault(); //阻止默认事件（原生方法）
	            //e.stop; //阻止冒泡（原生方法）
	            //e.cancelBubble = true; //阻止冒泡（原生方法）
	            e.stopPropagation();//阻止冒泡（原生方法）
				this.masklayer = product.goodSkuData.skuId;
			},

			//关闭商品弹出框
			maskCustomer(e){
				//e.preventDefault=true; //阻止默认事件（原生方法）
	            //e.preventDefault(); //阻止默认事件（原生方法）
	            //e.stop; //阻止冒泡（原生方法）
	            //e.cancelBubble = true; //阻止冒泡（原生方法）
	            e.stopPropagation();//阻止冒泡（原生方法）
				this.masklayer = '';
			},

			//阻止关闭弹出框
			lightCustomer(e){
				//e.preventDefault=true; //阻止默认事件（原生方法）
	            //e.preventDefault(); //阻止默认事件（原生方法）
	            //e.stop; //阻止冒泡（原生方法）
	            //e.cancelBubble = true; //阻止冒泡（原生方法）
	            e.stopPropagation();//阻止冒泡（原生方法）
			},

			//商品颜色选择
			colorCustomer(e){
				console.log(123);
				console.log(e.currentTarget.getAttribute('color-value'))
			},

			//减少数量
			minusCustomer(product,e){
				const _self = this;
				if(product.num>1){
					product.num--;
					console.log(product)
				}else{
					e.stop;
				}
			},

			//增加数量
			plusCustomer(product,e){
				const _self = this;
				if(product.num>9){
					e.stop;
				}else{
					product.num++
					console.log(product)
				}
			},

			//单选
			singnleCustomer(e){
				
				let totalPrice = 0;
				const $goodsCheckbox = document.getElementsByClassName("cart-list")[0].querySelectorAll("input.goods-checkbox");
				console.log($goodsCheckbox);
				for(var i=0; i<$goodsCheckbox.length; i++){
					if($goodsCheckbox[i].checked===true){
						totalPrice = totalPrice + parseInt($goodsCheckbox[i].getAttribute("data-money"));
					}
				}
				// this.totalMoney=totalPrice;
				this.$emit('oneCustomer', totalPrice, e);
				//const $isTrue = e.currentTarget.checked;
			},
		}
	}
</script>