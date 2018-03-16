<template>
	<div class="slider-bigbanner" v-show="isShow">
		<div class="banner-top">
			<i class="banner-no">1/5</i>
			<i class="close-icon" @click="closeCustomer()">&#10005;</i>
		</div>
		<div class="slider-wraper">
			<div class="banner-list">
				<a class="banner-cell" v-for="(banner, index) in bannersList" :key="index"><img :src="banner"></a>
			</div>
		</div>
	</div>
</template>
<style lang="less" scoped="scoped">
	@import (reference) url(../../../assets/css/cost.less);
	.slider-bigbanner{
		.pof;
		width: @full;
		height: @full;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		.clearfix;
		z-index: 5;
		background-color: rgba(0, 0, 0, 1);
		.banner-top{
			.por;
			.hid;
			.px2rem(height, 75);
			i{
				.poa;
				top: 0;
				.px2rem(width, 75);
				.px2rem(line-height, 75);
				.px2rem(font-size, 40);
				color: @e0;
				text-align: center;
			}
			.banner-no{
				left: 0;
			}
			.close-icon{
				right: 0;
			}
		}
		
		.slider-wraper{
			width: @full;
			//.px2rem(width, 800);
			.px2rem(height, 800);
			background-color: rgba(255, 255, 255, 1);
			.poa;
			top: 50%;
			left: 50%;
			.translate;
		}
		.banner-list{
			.flexbox;
			overflow-x: scroll;
			&::-webkit-scrollbar{
				display: none;
			}
			.banner-cell{
				.flexitem;
				flex-basis: auto;
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
				isShow: false,
			}
		},
		props: [ "bannersList"],
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
			closeCustomer(){

			},
		}
	}
</script>