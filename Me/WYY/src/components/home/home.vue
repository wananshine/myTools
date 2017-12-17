<template>
	<div class="home-wrap">
		<section class="home-layout">
			<!-- banner -->
			<site-banner></site-banner> 

			<!-- 我的积分 -->  
			<site-point></site-point>

			<!-- floors -->  
			<site-floor></site-floor>
		</section>
		<sitefooter></sitefooter>
	</div>
</template>
<style lang="less" scoped="scoped">
	@import (reference) url(../../assets/css/cost.less);
	.home-wrap{
		.all;
		.por;
		.flexbox;
		height: @full;
		flex-direction: column;
		.home-layout{
			width: @full;
			overflow-y: scroll;
			.flexitem;
			flex: 1;
		}
	}
</style>
<script type="text/javascript">

	import siteBanner from '../ssi/site-banner'
	import sitePoint  from '../ssi/site-point'
	import siteFloor  from '../ssi/site-floor'
	import sitefooter from '../ssi/site-footer'
	export default{
		components: {
	      siteBanner,
	      sitePoint,
	      siteFloor,
	      sitefooter
	    },
		name: "",
		data(){
			return{}
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
				// this.$http.get('/api/floors').then(response=>{
				// 	// success callback
				// 	console.log(response.body)
				// 	this.floorsData = response.body;
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