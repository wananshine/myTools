<template>
	<div class="page-banner">
	    <div class="banner-inner">
	      <a class="banner-cell" v-for="bcell in bcells"><img :src="bcell.imgurl"/></a>
	    </div>
	    <ul class="banner-icon">
	      <!--<li class="b-icon b-active"></li>-->
	      <!--<li class="b-icon"></li>-->
	      <!--<li class="b-icon"></li>-->
	      <!--<li class="b-icon"></li>-->
	    </ul>
	    <span class="direc banner-pre"><</span>
	    <span class="direc banner-next">></span>
	</div>
</template>
<style lang="less" scoped></style>
<script type="text/javascript">
	export default{
		components:{

		},
		name: '',
		data(){
			return{
				bcells:[]
			}
		},
		created() {
	      this.$http.get("/api/notes").then(res =>{
	        this.bcells = res.data.data.bcells;
	        console.log(this.list)
	      })
	    }
	}
</script>