<template>
	<article class="hot-view">
		<div class="hot-title">热门商品</div>
		<div class="hot-list">
			<a class="hot-cell" v-for="hot in hotsData.hotProduct">
				<dl class="hot-dl">
					<dt class="hot-dt"><img :src="hot.products.coverUrl"></dt>
					<dd class="hot-dd">
						<div class="hot-name"><i v-for="tag in hot.products.tags">{{ tag }}</i>{{ hot.name }}</div>
						<div class="hot-price">{{ hot.products.maxPrice }}</div>
					</dd>
				</dl>
			</a>
		</div>
	</article>
</template>
<style lang="less" scoped="scoped">
	@import (reference) url(../../assets/css/cost.less);
	.hot-view{
		.px2rem(margin-top, 21);
		background-color: @fff;
		.hot-title{
			.all;
			color: @333;
			text-align: center;
			.bottomline;
			.px2rem(font-size, 35);
			.px2rem(line-height, 100);
		}
		.hot-list{
			.por;
			.hid;
			.flexbox;
			flex-wrap: wrap;
			.hot-cell{
				width: calc(@full/2);
				.flexitem;
				flex-basis: auto;
				.hot-dl{
					.hot-dt{
						img{
							.all;
						}
					}
					.hot-dd{
						.hot-name{
							.px2rem(font-size, 30);
						}
						.hot-price{
							color: @d33a;
							.px2rem(font-size, 32);
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
		data(){
			return{
				hotsData: []
			}
		},
		computed: {
			albumsFilter(){
				//return (this.floorsAlbumsDate.data[0]).products.slice(0,5); 
                this.$nextTick(function(){
                })
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

				//楼层
				//http://music.163.com/store/api/product/ipbanner?type=1
				this.$http.get('/api/getshot').then(response=>{
					// success callback
					this.hotsData = response.body.data.data;
					console.log("1",response.body.data.data)
					console.log(this.hotsData)
			    },  response => {
				    // error callback
				    console.log('error')
				});
				

				//
				this.$http.get('/api/goods').then(response=>{
					//console.log('api2/goods',response)
				})
				.catch(err=>{
					//console.log('err',err)
				})
			});
		},
		beforeMount(){},
		mounted(){},
		beforeUpdate(){},
		updated(){},
		methods: {}
	}
</script>

