<template>
	<div class="goods-container">
		<div class="goods-inner w-inner">
		    <!-- 商品排序 -->
		    <nav class="goods-filter">
		    	<a class="filter-bar filter-active">推荐</a>
		    	<a class="filter-bar">销量</a>
		    	<a class="filter-bar">新品</a>
		    	<a class="filter-bar" @click="filter_price()">价格</a>
		    </nav>
			<!-- 商品类表 -->
			<section class="goods-box clearfix">
				<ul class="goods-list">
					<li class="goods-cell" v-for="goods in goods_list">
						<div class="goods-mat">
							<p class="goods-img"><img :src="goods.goods_img"></p>
							<div class="goods-price">
								<em class="goods-price-title" :title="goods.goods_price">
									<b class="goods-price-icon">¥</b>{{ goods.goods_price }}
								</em>
							</div>
							<div class="goods-name">{{ goods.goods_name }}</div>
							<div class="goods-status">
								<span class="goods-disc">{{ goods.goods_disc }}</span>
								<span class="goods-attent">关注</span>
								<span class="goods-addcart">加入购物车</span>
								<span class="goods-remove" @click="goods_remove(goods.goods_id)">删除</span>
							</div>
						</div>
					</li>
				</ul>
			</section>
		</div>
		<div></div>
	</div>
</template>

<style  scoped lang="less">
	// @import "../../assets/css/goods-list";
	@import url('../../assets/css/goods-list');
</style>

<script type="text/javascript">
    // seajs.config({
    //     alias:{
    //         'jquery':'./jquery-3.2.1.js',
    //         'mm':'./mm.js'
    //     },

    // });
    // seajs.use(['main','jquery'],function(main,$) {

    // });

</script>
<script type="text/javascript">
	//方法一：
	// import goodslist from '../../assets/js/goodslist_01.js'   //goodslist
	// export default{
	// 	mixins: [goodslist]
	// }

	//方法二：
	// import goodslist from '../../assets/js/goodslist_02.js'   //goodslist
	// export default{
	// 	mixins: [goodslist]
	// }

	//方法三：
	//import goodslist from '../../assets/js/goodslist_01.js';  //goodslist  
	//export default goodslist;

	//方法四：
	// import goodslist from '../../assets/js/goodslist_04.js';  //goodslist  
	// export default goodslist;

	//方法五：
	var goodslist = require('../../assets/js/goodslist_01.js');  //goodslist 
	export default goodslist;
	
	// export default{}
</script>