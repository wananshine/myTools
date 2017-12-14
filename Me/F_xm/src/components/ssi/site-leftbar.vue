<template>
	<aside class="page-category">
	    <ul class="category-list">
	      <li class="category-item" v-for="category in categorys">
	        <router-link to = "/index/demoList" class="category-cell" >{{ category.asidetxt }}</router-link>
	      </li>
	    </ul>
  </aside>
</template>
<style lang="less" scoped="scoped">
	@import "../../assets/css/homepage.less";
</style>
<script type="text/javascript">
	export default{
		components:{

		},
		name: '',
		data(){
			return{
				categorys:[]
			}
		},
		created() {
	      this.$http.get("/api/notes").then(res =>{
	        this.categorys = res.data.data.categorys;
	      })
	    }
	}
</script>