<template>
	<div id="loading_0">
		//<div v-show="showLoading"></div>	
	</div>
</template>
<style lang="less" scoped>
	@import "../../../assets/css/style.css";
</style>

<script type="text/javascript">
	export default{
		name: 'loading_0',
		data(){
			return {
				showLoading: false
			}
		},
		watch: {
			fb_email_val: function () {

        	}
    	},
    	created() {
	      
	    },
		mounted: function(){
			this.$nextTick(function(){

			})
		},
		beforeUpdate: function () {

    	},
	}
</script>