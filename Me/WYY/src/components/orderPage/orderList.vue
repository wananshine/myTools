<template>
	<div class="order-container">
		<div class="order-inner w-inner">
			<nav class="order-nav">
				<a class="nav-item">待支付</a>
				<a class="nav-item">待发货</a>
				<a class="nav-item">待收货</a>
				<a class="nav-item">全&nbsp;部</a>
			</nav>
			<section class="order-content">
				<ul class="order-list">
					<li class="order-item">
						<div class="order-top">
							<span class="order-time">2018-03-10</span>
							<span class="order-status">待支付</span>
						</div>
						<div class="order-pt">
							<dl>
								<dt><img src="http://p3.music.126.net/JJLyyhFTiIBmBJNJEky0bw==/109951162995532089.webp?imageView&thumbnail=132x0&quality=75&tostatic=0&type=webp"/></dt>
								<dd>
									<div>
										<p>漫步者（EDIFIER）W280BT 无线蓝牙入耳式运动耳机磁吸耳塞</p>
										<small>红色</small>
									</div>
									<div>
										<p>44564</p>
										<small>x1</small>
									</div>
								</dd>
							</dl>
						</div>
						<div class="order-btm">
							<p>共2件 总计：298</p>
						</div>
						<div class="order-btn">
							<button>查看详情</button>
							<button>立即支付</button>
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
			.order-nav{
				.flexbox;
				.nav-item{
					.flex1;
					.px2rem(font-size, 30);
					.px2rem(line-height, 80);
					background-color: beige;
					text-align: center;
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