<template>
  <div class="userCenter">
    <router-view></router-view>
  </div>
</template>
<style lang="less" scoped="scoped">
	@import (reference) url(../../assets/css/cost.less);
	.userCenter{
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
        msg: ''
      }
    },
    computed: {
      
    },
    beforeCreate(){},
		created(){
			this.$nextTick(function(){
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
    }
  }
</script>