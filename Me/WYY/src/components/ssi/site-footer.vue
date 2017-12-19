<template>
	<div class="foot-wrap">
		<nav class="foot-nav">
			<router-link class="nav-cell" to=""><i class="icon">123</i><p class="nav-cell-txt">首页</p></router-link>
			<router-link class="nav-cell" to="">分类</router-link>
			<router-link class="nav-cell" to="/indexList">发现</router-link>
			<router-link class="nav-cell" to="">购物车</router-link>
			<router-link class="nav-cell" to="">我的</router-link>
		</nav>
	</div>
</template>
<style scoped lang="less">
	@import (reference) url(../../assets/css/cost.less);
	.foot-wrap{
		width: @full;
		.por;
		.hid;
		.px2rem(height, 82);
		.foot-nav{
			color: @666;
			.flexbox;
			.nav-cell{
				color: @888;
				//.block;
				.flexitem;
				flex-grow: 1;
				.px2rem(font-size, 28);
				text-align: center;
				.icon{
					.block;
					.px2rem(height, 44);
					margin:auto;
				}
				.nav-cell-txt{
					.px2rem(line-height, 38);
				}
			}
		}
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