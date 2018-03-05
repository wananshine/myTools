<template>
  <div class="search-product">
    <router-view></router-view>
  </div>
</template>
<style lang="less" scoped="scoped">
	@import (reference) url(../../assets/css/cost.less);
	.search-product{
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
        msg: ''
      }
    }
  }
</script>