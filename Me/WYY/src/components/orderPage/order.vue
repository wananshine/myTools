<template>
  <div class="order-container">
    <router-view :ordersData="ordersData" :orderDetail="orderDetail" v-on:see-customer = "seeCustomer"></router-view>
  </div>
</template>
<style lang="less" scoped="scoped">
	@import (reference) url(../../assets/css/cost.less);
	.order-container{
    height: @full;
	}
</style>
<script>
  export default{
    components: {
    },
    name: '',
    data () {
      return {
        totalMoney: 0,
        allChecked: false,
        msg: '',
        ordersData: [],
        orderDetail: {},
      }
    },
    computed: {
      
    },
    beforeCreate(){},
		created(){
			this.$nextTick(function(){
				// //http://music.163.com/store/api/product/ipbanner?type=1
				// this.$http.get('/api/topay').then(response=>{
				// 	this.ordersData = response.body.data.orders;
				// 	console.log('api2/toPay',response.body.data.orders)
				// })
				// .catch(err=>{
				// 	console.log('err',err)
				// })
			});
		},
		beforeMount(){},
    methods:{
      allcheckedCustomer(e){
        
      },
      oneCustomer(totalPrice,e){
        // this.$on('totalPrice', function(){
	      //       console.log('totalPrice2',totalPrice)
        // })
      },
      seeCustomer(order, e){
        this.orderDetail = order;
        console.log(123,order,e);
      },
    }
  }
</script>