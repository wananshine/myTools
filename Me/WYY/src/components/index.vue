<template>
	<div class="music-container">
		<div class="music-inner">
			<router-view/>
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
		}
	}
</style>
<script>
	export default{
	    components: {
	      
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