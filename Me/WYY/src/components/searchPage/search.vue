<template>
  <div class="search-container">
    <router-view></router-view>
  </div>
</template>
<style lang="less" scoped="scoped">
	@import (reference) url(../../assets/css/cost.less);
	.search-container{
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