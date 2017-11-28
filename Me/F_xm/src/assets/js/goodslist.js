/**
 * Created by Administrator on 2017/5/12.
 */

// define(function (require, exports, module) {
//   $(function () {


//   })
// })

define(function(require, exports, module) {
    module.exports={
		name: 'gl',
		data() {
			return{
				goods_list: []
			}
		},
		watch: {
			fb_email_val: function () {

        	}
    	},
		created() {
		  
	      this.$http.get('/api/notes').then(response=>{
			// success callback
			console.log(response.body.data.goodsList);
			this.goods_list = response.body.data.goodsList;
	      },  response => {
		    // error callback
		  });
		  
	    },
		mounted: function(){
			this.$nextTick(function(){

			})
		},
		beforeUpdate: function () {

    	},
		methods:{
			filter_price: function(){
				console.log(123);

				/*********************此方法有效start**********************************/
				// Array.prototype.sortby = function(key, flag) { 
				// // 此方法只适用于当前这个问题
				//     return this.slice(0).sort((a, b) => flag ? b[key] - a[key] : a[key] - b[key]);
				// }
				// this.goods_list = this.goods_list.sortby('goods_price', true)
				/*********************此方法有效end**********************************/



				/*********************排序*此方法有效start**********************************/
				function sortArr(arr, sortStr) {
					// 排序函数（用以返回次序关系）
					var bySort = function() {
						return function(o, p) {  // p 是 o 的下一项
							var a = o[sortStr],
								b = p[sortStr];
							if (isNaN(a)) {  // 非数字排序
								return a.localeCompare(b);  // 用本地特定顺序来比较(支持中文)
							} else {
								if (a === b) {
									return 0;
								} else {
									return a > b ? 1 : -1;
								}
							}
						}
					};
					for (var i = 0; i < arr.length; i++) {
						//console.log(arr[i][sortStr])
						arr.sort(bySort(arr[i][sortStr]));
					}
				}

				sortArr(this.goods_list, 'goods_price');  // 按 goods_price 排序
				//sortArr(array, 'name');  // 按 name 排序
				//sortArr(array, 'cnName');  // 按 中文名 cnName 排序
				/*********************排序*此方法有效end**********************************/



				var goodsCell = $(".goods-cell");
				var goodsPrice = [];
				var goodsObj = goodsCell.map(function(i, item){
					var gp = $(".goods-price-title").eq(i).attr("title");
					console.log(gp)
					return gp
				}).get().join(",");
				goodsPrice = goodsObj.split(",");
				console.log(goodsPrice);


				this.goods_list.forEach(function(i, item){
					console.log(i);
					console.log(item);
				})


				// for (var i = 0; i < this.goods_list.length; i++) {
				// 	p1.push(this.goods_list[i].goods_price);
				// 	console.log(p1);
				// }

				var priceSort = function(arr){
					for (var i = 0; i<arr.length; i++) {
						for(var j=i + 1; j<arr.length; j++){
							if(arr[i]>arr[j]){
								var temp=arr[i];  
				                arr[i]=arr[j];  
				                arr[j]=temp; 
							}
						}
					}
					return arr;
				}

				priceSort(goodsPrice)
				console.log(goodsPrice)
			},
			goods_remove: function(goodsid){
				// vm.$http.delete(this.apiUrl + '/' + customer.customerId)
				// 			.then((response) => {
				// 				vm.getCustomers()
				// 			})



				var productId = function () {
			        var goodsId = getQueryString('infoId');
			        var info_str = window.location.pathname;
			        var infoString = info_str.replace(/[^0-9]/ig,"");
			        var skuId = goodsId?goodsId:infoString;
			        return skuId;
			    }
			    var infoId = productId();

				console.log(goodsid)
				this.$http.delete('/api/notes').then(response=>{
					// success callback
					console.log(123)
			      })
			}
		}
	}


    // var init= function() {
        
    // }
    // module.exports = {
    //     init:init
    // }


    //    export default{
		
	// }
})

// export const goodsli = {
// 		name: 'gl',
// 		data() {
// 			return{
// 				goods_list: []
// 			}
// 		},
// 		watch: {
// 			fb_email_val: function () {

//         	}
//     	},
// 		created() {
		  

// 	      this.$http.get('/api/notes').then(response=>{
// 			// success callback
// 			console.log(response.body.data.goodsList);
// 			this.goods_list = response.body.data.goodsList;
// 	      },  response => {
// 		    // error callback
// 		  });
// 	    },
// 		mounted: function(){
// 			this.$nextTick(function(){

// 			})
// 		},
// 		beforeUpdate: function () {

//     	},
// 		methods:{
// 			filter_price: function(){
// 				console.log(123);

// 				/*********************此方法有效start**********************************/
// 				// Array.prototype.sortby = function(key, flag) { 
// 				// // 此方法只适用于当前这个问题
// 				//     return this.slice(0).sort((a, b) => flag ? b[key] - a[key] : a[key] - b[key]);
// 				// }
// 				// this.goods_list = this.goods_list.sortby('goods_price', true)
// 				/*********************此方法有效end**********************************/



// 				/*********************排序*此方法有效start**********************************/
// 				function sortArr(arr, sortStr) {
// 					// 排序函数（用以返回次序关系）
// 					var bySort = function() {
// 						return function(o, p) {  // p 是 o 的下一项
// 							var a = o[sortStr],
// 								b = p[sortStr];
// 							if (isNaN(a)) {  // 非数字排序
// 								return a.localeCompare(b);  // 用本地特定顺序来比较(支持中文)
// 							} else {
// 								if (a === b) {
// 									return 0;
// 								} else {
// 									return a > b ? 1 : -1;
// 								}
// 							}
// 						}
// 					};
// 					for (var i = 0; i < arr.length; i++) {
// 						//console.log(arr[i][sortStr])
// 						arr.sort(bySort(arr[i][sortStr]));
// 					}
// 				}

// 				sortArr(this.goods_list, 'goods_price');  // 按 goods_price 排序
// 				//sortArr(array, 'name');  // 按 name 排序
// 				//sortArr(array, 'cnName');  // 按 中文名 cnName 排序
// 				/*********************排序*此方法有效end**********************************/



// 				var goodsCell = $(".goods-cell");
// 				var goodsPrice = [];
// 				var goodsObj = goodsCell.map(function(i, item){
// 					var gp = $(".goods-price-title").eq(i).attr("title");
// 					console.log(gp)
// 					return gp
// 				}).get().join(",");
// 				goodsPrice = goodsObj.split(",");
// 				console.log(goodsPrice);


// 				this.goods_list.forEach(function(i, item){
// 					console.log(i);
// 					console.log(item);
// 				})


// 				// for (var i = 0; i < this.goods_list.length; i++) {
// 				// 	p1.push(this.goods_list[i].goods_price);
// 				// 	console.log(p1);
// 				// }

// 				var priceSort = function(arr){
// 					for (var i = 0; i<arr.length; i++) {
// 						for(var j=i + 1; j<arr.length; j++){
// 							if(arr[i]>arr[j]){
// 								var temp=arr[i];  
// 				                arr[i]=arr[j];  
// 				                arr[j]=temp; 
// 							}
// 						}
// 					}
// 					return arr;
// 				}

// 				priceSort(goodsPrice)
// 				console.log(goodsPrice)
// 			},
// 			goods_remove: function(goodsid){
// 				// vm.$http.delete(this.apiUrl + '/' + customer.customerId)
// 				// 			.then((response) => {
// 				// 				vm.getCustomers()
// 				// 			})



// 				var productId = function () {
// 			        var goodsId = getQueryString('infoId');
// 			        var info_str = window.location.pathname;
// 			        var infoString = info_str.replace(/[^0-9]/ig,"");
// 			        var skuId = goodsId?goodsId:infoString;
// 			        return skuId;
// 			    }
// 			    var infoId = productId();

// 				console.log(goodsid)
// 				this.$http.delete('/api/notes').then(response=>{
// 					// success callback
// 					console.log(123)
// 			      })
// 			}
// 		}
// }