<template>
	<article class="floor-view">
		<div class="floor-list">
			<section class="floor-cell" v-for="floor in floorsData.items">
				<figure class="cell-img">
					<img :src="floor.backGroudPic">
				</figure>
				<div class="cell-title">
					<h4 class="title-big" v-text="floor.columnTitle"></h4>
					<p class="title-small" v-text="floor.subColumnTitle"></p>
				</div>
				<div class="cell-product">
					<ul class="prod-list">
						<li class="prod-con" v-for="product in floor.products">
							<a href="javascript:;" class="prod-a">
								<p><img :src="product.coverUrl"></p>
								<div>{{ product.name }}</div>
								<div>¥{{ product.maxPrice }}</div>
							</a>
						</li>
					</ul>
				</div>		
			</section>
		</div>
	</article>
</template>
<style lang="less" scoped="scoped">
	@import (reference) url(../../assets/css/cost.less);
	.floor-view{
		.floor-list{
			.floor-cell{
				.all;
				.cell-img{
					.poa;
					top: 0;
					left: 0;
					right: 0;
					z-index: -1;
					img{
						max-width: @full;
					}
				}
				.cell-title{
					text-align: center;
					.px2rem(margin-top, 150);
					.title-big{
						.px2rem(font-size, 45);
						color: @333;
					}
					.title-small{
						.px2rem(line-height, 60);
						.px2rem(font-size, 30);
						color: @999;
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
		data(){
			return{
				floorsData:[]
			}
		},
		computed: {},
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
				this.$http.get('/api/floors').then(response=>{
					// success callback
					this.floorsData = response.body.data;
					console.log(this.floorsData.items)
			    },  response => {
				    // error callback
				    console.log('error')
				});
			});
		},
		beforeMount(){},
		mounted(){},
		beforeUpdate(){},
		updated(){},
		methods: {}
	}
</script>