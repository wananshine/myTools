<template>
	<div class="banner-slider">
		<div class="banner-list">
			<a class="banner-cell" v-for="(banner, index) in banners" :key="index">
				<img :src="banner.picStr" />
			</a>
		</div>
	</div>
</template>
<style lang="less" scoped="scoped">
	@import (reference) url(../../assets/css/cost.less);
	.banner-slider{
		background-color: @fff;
		.banner-list{
			.flexbox;
			.hid;
			overflow-x: scroll;
			.banner-cell{
				width: 100%;
			    display: block;
			    white-space: nowrap;
			    .flexitem;
			    flex-basis: 100%;
			    flex-shrink: 0;
			    img{
			    	width: 100%;
			    }
			}
		}
	}
	
</style>
<script>
	// import Api from "../../api/api";
	import {banners} from '@/api/api'
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

			var _self = this;
			// _self.$axios.get('/api/banners')
			// 	.then(function (response) {
			// 		_self.banners= response.data.data;
			// 		console.log('response2',response);
			// 	})
			// 	.catch(function (error) {
			// 		console.log(error);
			// 	});


			this.$nextTick(function(){
				// var _self = this;
				banners().then(res=>{
					// console.log(res)
					this.banners= res.data;
				}, error =>{

				}).catch(error =>{
					
				});


				// 	this.banners = response.body.data;
			    // },  response => {
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