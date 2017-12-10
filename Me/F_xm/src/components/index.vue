<template>
  <div class="all-container">
    <sitetopbar></sitetopbar>
    <router-view></router-view>
    <sitefooter></sitefooter>
    <loading-0 v-show="showLoading"></loading-0>
    <signup></signup>
    <!--123123-->
  </div>
</template>
<style lang="less" scoped>
</style>
<script>
  import sitefooter from './ssi/site-footer'
  import loading_0 from './ssi/loading_0'
  import sitetopbar from './ssi/site-topbar'
  //  import signup from '../../components/sign-up'
  export default{
    components: {
      sitetopbar,
      sitefooter,
      loading0:loading_0
      //      signup
    },
    name: '',
    data(){
      return{
        showLoading: false
      }
    },
    created(){
      this.$http.interceptors.push((request, next) => {
        this.showLoading = true
        next((response) => {
          this.showLoading = false
          return response
        });
      });
    }
  }
</script>
<style lang="less">
  @import "../assets/css/base.less";
  .all-container{
    min-width: 1226px;
    margin: 0 auto;
  }
</style>
