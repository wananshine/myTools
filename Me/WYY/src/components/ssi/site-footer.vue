<template>
	<div class="foot-wrap">
		<nav class="foot-nav">
			<router-link class="nav-cell" to="/">
				<i class="cell-icon">
					<svg class="icon" aria-hidden="true">
						<use xlink:href="#icon-shouye-1"></use>
					</svg>
				</i>
				<p class="cell-txt">首页</p>
			</router-link>
			<router-link class="nav-cell" to="/indexTypes">
				<i class="cell-icon">
					<svg class="icon" aria-hidden="true">
						<use xlink:href="#icon-all"></use>
					</svg>
				</i>
				<p class="cell-txt">分类</p>
			</router-link>
			<router-link class="nav-cell" to="/search">
				<i class="cell-icon">
					<svg class="icon" aria-hidden="true">
						<use xlink:href="#icon-search"></use>
					</svg>
				</i>
				<p class="cell-txt">发现</p>
			</router-link>
			<router-link class="nav-cell" to="/indexCart">
				<i class="cell-icon">
					<svg class="icon" aria-hidden="true">
						<use xlink:href="#icon-cart"></use>
					</svg>
				</i>
				<p class="cell-txt">购物车</p>
			</router-link>
			<router-link class="nav-cell" to="/indexUser">
				<i class="cell-icon">
					<svg class="icon" aria-hidden="true">
						<use xlink:href="#icon-account-copy"></use>
					</svg>
				</i>
				<p class="cell-txt">我的</p>
			</router-link>
		</nav>
	</div>
</template>
<style scoped lang="less">
	@import (reference) url(../../assets/css/cost.less);
	@import url(../../assets/font/iconfont.css);
	.foot-wrap{
		width: @full;
		.por;
		.hid;
		// .px2rem(height, 82);
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
				.cell-icon{
					.block;
					.px2rem(padding-top, 15);
					.px2rem(height, 44);
					margin:auto;
				}
				.cell-txt{
					.px2rem(font-size, 24);
					.px2rem(line-height, 38);
				}
				.icon{
					.icon;
					.px2rem(font-size, 45);
					color: @333;
				}
			}
		}
	}
</style>
<script type="text/javascript">
	import Iconfont from  '../../assets/font/iconfont.js';
	export default{
		name: "",
		mixins: [],
		data(){
			return{

			}
		}
	}
</script>