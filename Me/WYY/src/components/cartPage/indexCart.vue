<template>
  <div class="cartShoping">
    <div class="cart-title">购物车</div>
    <router-view :all-checked = "allChecked" v-on:oneCustomer = "oneCustomer"></router-view>
    <div class="cart-nav">
      <span class="cn-cell"><label class="cn-label"><input type="checkbox" class="all-checked" @change="allcheckedCustomer($event)">全选</label></span>
      <span class="cn-cell">合计:¥{{ totalMoney }}</span>
      <span class="cn-cell cn-accounts">结算()</span>
    </div>
  </div>
</template>
<style lang="less" scoped="scoped">
	@import (reference) url(../../assets/css/cost.less);
	.cartShoping{
    height: @full;
    .flexbox;
    flex-direction: column;
    .cart-title{
				&:extend(.padd30);
        .px2rem(font-size, 36);
        .px2rem(height, 90);
				.px2rem(line-height, 90);
        width: @full;
				text-align: center;
				background-color: @f5;
			}
    .cart-nav{
      .flexbox;
       width: @full;
      .px2rem(font-size, 36);
      .px2rem(height, 90);
      .px2rem(line-height, 90);
      background: @f5;
      .cn-cell{
        .por;
        .hid;
        .flex1;
      }
      .cn-accounts{
        background-color: @ff00;
        color: @fff;
        text-align: center;
      }
      .cn-label{
        display: block;
      }
      .all-checked{
        .px2rem(width, 36);
        .px2rem(height, 36);
        .px2rem(margin-left, 30);
        .px2rem(margin-right, 20);
        vertical-align: middle;
      }
    }
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
        const $allChecked1 = $(e.currentTarget).prop ('checked');
        const $allChecked2 = e.currentTarget.checked;
        console.log($allChecked1, $allChecked2);
        this.allChecked = $allChecked2
      },
      oneCustomer(totalPrice,e){
        this.$on('totalPrice', function(){
	            console.log('totalPrice2',totalPrice)
          })
          this.totalMoney = totalPrice;
          console.log('totalPrice',totalPrice)
      },
    }
  }
</script>