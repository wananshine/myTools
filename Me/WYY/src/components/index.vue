<template>
	<div class="music-container">
		<div class="music-inner">
			<router-view/>
			<sitefooter></sitefooter>
		</div>
	</div>
</template>
<style scoped lang="less">
	//@import "../assets/css/cost.less"
	@import (reference) url(../assets/css/cost.less);
	.music-container{
		height: @full;
		.music-inner{
			height: @full;
			.flexbox;
			flex-direction: column;
		}
	}
</style>
<script>

	import sitefooter from './ssi/site-footer'
	export default{
	    components: {
	      sitefooter
	    },
	    name: "",
	    data(){
	        return{
	            
	        }
	    },
	    filters:{
	      moneytype: function(value, type){
	        return "￥" + value + type;
	      }
	    },
	}
</script>