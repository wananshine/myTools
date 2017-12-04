<template>
  <div class="sign_up" :class="{ hide: 'isHideMask' }">
    <div class="sign_inner">
      <div class="form_container">
        <form class="form-normal">
          <div class="row">
            <input type="text" name="username" v-model="userName">
          </div>
          <div class="row">
            <input type="text" name="age" v-model="age">
          </div>
          <a href="javascript:;" @click="addUser">提交</a>
          <a @click="makeActive">取消</a>
        </form>

      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  @import  "../../assets/css/homepage.less";
  .sign_up{
    .hid;
    .pof;
    left: 0px;
    top: 0px;
    background-color: rgba(0,0,0,0.5);
    width: @full;
    height: @full;
    z-index: 22;
    .sign_inner{
      .por;
      .hid;
      width: @full;
      height: @full;
      .form_container{
        width: 500px;
        .height(300px);
        .poa;
        left: 50%;
        top: 50%;
        .translate;
        background-color: @fff;
        .form-normal{
          width: @full;
          height: @full;
          display: block;
          padding: 50px;
          box-sizing: border-box;
          .por;
          .hid;
          .row{
            .height(35px);
          }
        }
      }
    }
  }
</style>
<script>
  export default {
    name: 'hello',
    vuex: {
        state: {
          isHideMask : state => state.isHideMask
        }
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        userName: '',
        age: ''
      }
    },
    methods: {
      addUser() {
        var name = this.userName;
        var age = this.age;
        this.$http.post('/api/user/addUser', {
          username: name,
          age: age
        },{}).then((response) => {
          console.log(response);
        })
      },
      makeActive(){
          return this.show = !this.show
      },


    }
  }
</script>
