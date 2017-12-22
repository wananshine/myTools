<template>
	<div class="info-bd">
		<div class="pt-basic">
			<div class="pt-name">
				<span class="tag" v-for="tag in productInfo.products.tags">{{tag}}</span>
				<!-- <span class="tag">{{productInfo.products.coverIdStr}}</span> -->
				{{ productInfo.name }}
			</div>
			<div></div>
		</div>
	</div>
</template>
<style lang="less" scoped="scoped">
	@import (reference) url(../../../assets/css/cost.less);
	.info-bd{
		.pt-basic{
			.pt-name{
				.px2rem(font-size, 34);
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
			}
		},
		props: ["productInfo"],
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
				//this.
			})
		},
		beforeUpdate(){},
		updated(){},
		methods: {}
	}
</script>