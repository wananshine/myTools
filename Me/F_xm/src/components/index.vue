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
<style lang="less">
</style>
<script>
  import sitetopbar from './home/ssi/site-topbar'
  import sitefooter from './home/ssi/site-footer'
  import loading_0 from './home/ssi/loading_0'
  //  import signup from '../../components/home/sign-up'
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
