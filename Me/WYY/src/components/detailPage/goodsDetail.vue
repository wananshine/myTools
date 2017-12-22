<template>
	<div class="goods-container">
		<div class="goods-inner w-inner">
			<section>
				<goodsBanner :banners-list="picUrls"></goodsBanner>
				<goodsInfo 	 :product-info="product" v-if="product"></goodsInfo>
				<goodsBigbanner :banners-list="picUrls"></goodsBigbanner>
			</section>
			<div class="btn-default">
				<button class="btn-nowbuy">立即购买</button>
			</div>
		</div>
	</div>
</template>
<style lang="less" scoped="scoped">
	@import (reference) url(../../assets/css/cost.less);
</style>
<script type="text/javascript">
	import goodsBanner from './details/goods-banner'
	import goodsBigbanner from './details/goods-bigbanner'
	import goodsInfo from './details/goods-info'
	export default{
		components: {
			goodsBanner,
			goodsInfo,
			goodsBigbanner
		},
		name: "",
		data(){
			return{
				product:{},
				picUrls: [], //把 banner从product中取出来
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
				var goodsId = this.$route.params.goodsId;
				this.$http.get('/api/getshot/'+goodsId).then(response=>{
					this.product = response.body.data;
					this.picUrls = response.body.data.products.picUrls;
					console.log('api/getshot/goodsId',this.product);
				})
				.catch(err=>{
					console.log('err',err)
				})

			});
		},
		beforeMount(){},
		mounted(){
			this.$nextTick(function(){
				this.fetchGoodsId();
			})
		},
		beforeUpdate(){},
		updated(){},
		methods: {
			fetchGoodsId(){
				console.log(this.$route.params.goodsId);
			},
		}
	}
</script>