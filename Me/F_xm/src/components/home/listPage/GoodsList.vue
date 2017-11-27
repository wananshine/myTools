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
	// @import "../../../assets/css/goods-list";
	@import url('../../../assets/css/goods-list');
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
	import goodslist_import from '../../../assets/js/goodslist_import.js'   //goodslist
	//import goodslist from '../../../assets/js/goodslist.js'   //goodslist
	//import goodsli from '../../../assets/js/goodslist.js'   //goodslist
	//var goodslist = require('../../../assets/js/goodslist.js');
	export default{
		mixins: [goodslist_import]
	}
	// export default{
	// 	name: 'gl',
	// 	data() {
	// 		return{
	// 			goods_list: []
	// 		}
	// 	},
	// 	watch: {
	// 		fb_email_val: function () {

 //        	}
 //    	},
	// 	created() {
		  

	//       this.$http.get('/api/notes').then(response=>{
	// 		// success callback
	// 		console.log(response.body.data.goodsList);
	// 		this.goods_list = response.body.data.goodsList;
	//       },  response => {
	// 	    // error callback
	// 	  });
	//     },
	// 	mounted: function(){
	// 		this.$nextTick(function(){

	// 		})
	// 	},
	// 	beforeUpdate: function () {

 //    	},
	// 	methods:{
	// 		filter_price: function(){
	// 			console.log(123);

	// 			/*********************此方法有效start**********************************/
	// 			// Array.prototype.sortby = function(key, flag) { 
	// 			// // 此方法只适用于当前这个问题
	// 			//     return this.slice(0).sort((a, b) => flag ? b[key] - a[key] : a[key] - b[key]);
	// 			// }
	// 			// this.goods_list = this.goods_list.sortby('goods_price', true)
	// 			/*********************此方法有效end**********************************/



	// 			/*********************排序*此方法有效start**********************************/
	// 			function sortArr(arr, sortStr) {
	// 				// 排序函数（用以返回次序关系）
	// 				var bySort = function() {
	// 					return function(o, p) {  // p 是 o 的下一项
	// 						var a = o[sortStr],
	// 							b = p[sortStr];
	// 						if (isNaN(a)) {  // 非数字排序
	// 							return a.localeCompare(b);  // 用本地特定顺序来比较(支持中文)
	// 						} else {
	// 							if (a === b) {
	// 								return 0;
	// 							} else {
	// 								return a > b ? 1 : -1;
	// 							}
	// 						}
	// 					}
	// 				};
	// 				for (var i = 0; i < arr.length; i++) {
	// 					//console.log(arr[i][sortStr])
	// 					arr.sort(bySort(arr[i][sortStr]));
	// 				}
	// 			}

	// 			sortArr(this.goods_list, 'goods_price');  // 按 goods_price 排序
	// 			//sortArr(array, 'name');  // 按 name 排序
	// 			//sortArr(array, 'cnName');  // 按 中文名 cnName 排序
	// 			/*********************排序*此方法有效end**********************************/



	// 			var goodsCell = $(".goods-cell");
	// 			var goodsPrice = [];
	// 			var goodsObj = goodsCell.map(function(i, item){
	// 				var gp = $(".goods-price-title").eq(i).attr("title");
	// 				console.log(gp)
	// 				return gp
	// 			}).get().join(",");
	// 			goodsPrice = goodsObj.split(",");
	// 			console.log(goodsPrice);


	// 			this.goods_list.forEach(function(i, item){
	// 				console.log(i);
	// 				console.log(item);
	// 			})


	// 			// for (var i = 0; i < this.goods_list.length; i++) {
	// 			// 	p1.push(this.goods_list[i].goods_price);
	// 			// 	console.log(p1);
	// 			// }

	// 			var priceSort = function(arr){
	// 				for (var i = 0; i<arr.length; i++) {
	// 					for(var j=i + 1; j<arr.length; j++){
	// 						if(arr[i]>arr[j]){
	// 							var temp=arr[i];  
	// 			                arr[i]=arr[j];  
	// 			                arr[j]=temp; 
	// 						}
	// 					}
	// 				}
	// 				return arr;
	// 			}

	// 			priceSort(goodsPrice)
	// 			console.log(goodsPrice)
	// 		},
	// 		goods_remove: function(goodsid){
	// 			// vm.$http.delete(this.apiUrl + '/' + customer.customerId)
	// 			// 			.then((response) => {
	// 			// 				vm.getCustomers()
	// 			// 			})



	// 			var productId = function () {
	// 		        var goodsId = getQueryString('infoId');
	// 		        var info_str = window.location.pathname;
	// 		        var infoString = info_str.replace(/[^0-9]/ig,"");
	// 		        var skuId = goodsId?goodsId:infoString;
	// 		        return skuId;
	// 		    }
	// 		    var infoId = productId();

	// 			console.log(goodsid)
	// 			this.$http.delete('/api/notes').then(response=>{
	// 				// success callback
	// 				console.log(123)
	// 		      })
	// 		}
	// 	}
	// }
</script>