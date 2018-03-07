<template>
	<div class="slider-banner">
		<div class="banner-list">
			<a class="banner-cell" @click="bigimgCustomer()" v-for="(banner, index) in bannersList" :key="index"><img :src="banner"></a>
		</div>
	</div>
</template>
<style lang="less" scoped="scoped">
	@import (reference) url(../../../assets/css/cost.less);
	.slider-banner{
		.por;
		.hid;
		.clearfix;
		.banner-list{
			.flexbox;
			overflow-x: scroll;
			&::-webkit-scrollbar{
				display: none;
			}
			.banner-cell{
				.flexitem;
				flex-basis: 100%;
				flex-shrink: 0;
				img{
					.block;
					width: @full;
				}
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
		props: [ "bannersList" ],
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
			bigimgCustomer(){
				
			},
		}
	}
</script>