<template>
	<div class="goods-container">
		<div class="goods-inner w-inner">
			<section>
				123
			</section>
		</div>
	</div>
</template>
<style lang="less" scoped="scoped">
	@import (reference) url(../../assets/css/cost.less);
</style>
<script type="text/javascript">
	
	export default{
		components: {
		},
		name: "",
		data(){
			return{
				product:{
					products:{
						tags: []
					}
				},
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