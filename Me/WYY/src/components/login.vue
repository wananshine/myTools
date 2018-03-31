<template>
  <div>
      <div>
          <div class="form-group">
                <input class="userName" v-model="userName">
                <input class="pwd" type="" v-model="pwd">
          </div>
      </div>
  </div>
</template>
<script>
export default {
  data(){
      return{
          userName: "admin",
          pwd: "admin"
      }
  }
}
</script>
<style lang="less" scoped="scoped">
@import (reference) url(../assets/css/cost.less);
.form-group{
    .userName{
        border: none;
        outline: none;
        .px2rem(font-size, 50)
    }
    .pwd{
        border: none;
        outline: none;
        .px2rem(font-size, 50)
    }
}
</style>


