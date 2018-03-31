<template>
  <div class="sign_up" v-if="signinDefault">
    <div class="sign_inner">
      <div class="form_container">
        <form class="form-normal">
          <h5 class="form-title"><i class="tit-close" @click="sign_close()">x</i></h5>
          <div class="form-group">
            <div class="row">
              <input type="text" name="username" v-model="userName">
            </div>
            <div class="row">
              <input type="text" name="age" v-model="age">
            </div>
          </div>
          <div class="form-btn">
            <a href="javascript:;" @click="addUser">登录</a>
            <a @click="makeActive">取消</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped="scoped">
  @import  "../assets/css/homepage.less";
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
          .form-title{
            .tit-close{
              cursor: pointer;
            }
          }
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
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        userName: '',
        age: ''
      }
    },
    computed: {
      signinDefault: function() {
          return this.$store.state.signinDefault;
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
      sign_close(){
        this.$store.dispatch('sign_out');
      },
    }
  }
</script>
