<template>
	<div class="foot-wrap">
		<nav class="foot-nav">
			<router-link class="nav-cell" to="">搜索</router-link>
			<router-link class="nav-cell" to="/indexList">分类</router-link>
			<router-link class="nav-cell" to="">购物车</router-link>
			<router-link class="nav-cell" to="">我的</router-link>
		</nav>
	</div>
</template>
<style scoped lang="less">
	@import (reference) url(../../assets/css/cost.less);
	.foot-wrap{
		.por;
		.hid;
		.px2rem(height, 49);
	}
</style>
<script type="text/javascript">
	export default{
		name: "",
		data(){
			return{

			}
		}
	}
</script>