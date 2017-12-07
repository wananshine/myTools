<template>
	<div class="banner-slider">
		<div class="banner-list">
			<a class="banner-cell" v-for="banner in banners">
				<img :src="banner.picStr" />
			</a>
		</div>
	</div>
</template>
<style lang="less" scoped="scoped">
	@import (reference) url(../../assets/css/cost.less);
	.banner-slider{
		.banner-list{
			.flexbox;
			.hid;
			overflow-x: scroll;
			.banner-cell{
			    display: inline-block;
			    white-space: nowrap;
			    flex: 1;
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
            	return this.banners.slice(0,this.limitNum);
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
				this.$http.get('/api/banners').then(response=>{
					// success callback
					//http://music.163.com/store/api/product/ipbanner?type=1
					//console.log(response.body.data.goodsList);
					this.banners = response.body.data;
					console.log(response.body.data)
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