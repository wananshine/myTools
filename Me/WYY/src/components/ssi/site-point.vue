<template>
	<div class="my-point">
		<div class="g-point">
			<h6 class="point-title">签到领积分</h6>
			<div class="point-bd">
				<p class="point-me">我的积分：</p>
				<small class="point-fare">兑换福利 ></small>
				<a href="javascript:;" class="point-sign">签到</a>
			</div>
		</div>
	</div>
</template>
<style lang="less" scoped="scoped">
	@import (reference) url(../../assets/css/cost.less);
	.padd30{
		.px2rem(padding-left, 30);
		.px2rem(padding-right, 30);
	};
	.my-point{
		.g-point{
			.point-title{
				&:extend(.padd30);
				.px2rem(height, 60);
				.px2rem(line-height, 60);
				.px2rem(font-size, 30);
				.px2rem(border-bottom-width, 1);
				border-bottom-style: solid;
				border-bottom-color: rgba(0, 0, 0, 0.1);
				color: @333;
			}
			.point-bd{
				&:extend(.padd30);
				.px2rem(height, 150);
				.block;
				.point-me{
					.block;
					.px2rem(font-size, 36);
					margin-top: 26px;
					color: @333;
				}
				.point-fare{
					.block;
					.px2rem(font-size, 26);
					.px2rem(line-height, 36);
					color: @666;
				}
				.point-sign{
					display: block;
					.poa;
					top: 50%;
					right: 40px;
					.translate(0, -50%);
					.px2rem(width, 120);
					.px2rem(height, 56);
					.px2rem(line-height, 56);
					.px2rem(font-size, 32);
					.px2rem(border-width, 1);
					border-style: solid;
					border-color: #d33a31;
    				border-radius: 100px;
    				text-align: center;
    				color: #d33a31;
				}
			}
		}
	}
</style>
<script>
	export default{
		name: '',
		data(){
			return{
				banners:[],
				limitNum: 6,
			}
		},
		computed: {
        	goodsNum: function(){
            	//return this.banners.slice(0,this.limitNum);
        	}
    	},
    	watch: {
	        //监听数组
	        goodsList: {
	            handler: function (newVal) {
	                // console.log(newVal.length)
	            },
	            deep: true
	        },
		},
		beforeCreate(){},
		created(){
			this.$nextTick(function(){
				//http://music.163.com/store/api/product/ipbanner?type=1
				// this.$http.get('/api/banners').then(response=>{
				// 	// success callback
				// 	//http://music.163.com/store/api/product/ipbanner?type=1
				// 	//console.log(response.body.data.goodsList);
			 //    },  response => {
				//     // error callback
				//     console.log('error')
				// });
			});
		},
		beforeMount(){},
		mounted(){},
		beforeUpdate(){},
		updated(){},
		methods: {}
	}
</script>