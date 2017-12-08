<template>
	<div class="serverContainer">
		<div class="serverInner w-inner">

			<!-- banner轮播 -->
			<div class="slider-wrap">
				<ul class="slide-list" :style="{ 'width':(listWidth*imglist.length)+'px', 'transform':'translate3d(-'+(listWidth*nowIndex)+'px, 0 ,0)' }">
					<li v-for="(img, index) in imglist" :style="{ 'width':listWidth+'px' }"><a href="javascript:;"><img :src="img.imgurl"  class="slide-img"></a></li>
				</ul>
				<div class="slide-option">
			        <span v-for="(img,index) in imglist" :class="{'active':index===nowIndex}"></span>
			    </div>
			    <div class="slide-arrow">
			        <div class="arrow-left" @click="switchDo('reduce')"></div>
			        <div class="arrow-right" @click="switchDo"></div>
			    </div>
			</div>

			<!-- nav效果 -->
			<nav class="slider-nav">
				<ul class="nav-list">
					<li v-for="(nav, index) in navlist" @mouseenter="enterCustomer(nav, index, $event)" :class="{ overActive: activeIndex===index }">{{ nav.navname }}</li>
				</ul>
				<div class="nav-active" :style="{ 'width': activeWidth+'px', 'transform': 'translate3d('+activeWidth*activeIndex+'px,0,0)' }"></div>
			</nav>

			<!-- 楼层导航 -->
			<section class="floor-wrap">
				<div class="floor-bd">
					<ul class="fb-list">
						<li class="fb-cell" :class="'fb-Cellbg-'+index" v-for="(floor, index) in floors">{{ floor.floorname }}</li>
					</ul>
					<div class="floor-tag">
						<a href="javascript:;" class="fb-tag" :class="{ isTag: tagIndex===index }" v-for="(tag, index) in tags" @click="toCustomer(tag, index, $event)">{{ tag.tagname }}</a>
					</div>
				</div>
			</section>

			<div class="form-horizontal">
				<div class="form-group">
				    <label for="input-name" class="control-label">姓名</label>
				    <div class="col-sm">
				      <input type="text" class="form-control" id="input-name" v-model="userData.username" @focus="focusCustomer(userData.username)" @input="inputCustomer(userData.username)" placeholder="请输入Email">
				 	</div>
  				</div>
  				<div class="form-group">
				    <label for="input-pwd" class="control-label">密码</label>
				    <div class="col-sm">
				      <input type="email" class="form-control" id="input-pwd" v-model="userData.userpwd" placeholder="请输入密码">
				 	</div>
  				</div>
  				<div class="form-group">
				    <label for="input-aginpwd" class="control-label">再次输入密码</label>
				    <div class="col-sm">
				      <input type="email" class="form-control" id="input-aginpwd" v-model="userData.useraginpwd" placeholder="请再次输入密码">
				 	</div>
  				</div>
  				<div class="form-group">
				    <label for="input-tel" class="control-label">电话号码</label>
				    <div class="col-sm">
				      <input type="email" class="form-control" id="input-tel" v-model="userData.usertel" placeholder="请输入电话号码">
				 	</div>
  				</div>
  				<div class="form-group">
				    <label for="input-email" class="control-label">Email</label>
				    <div class="col-sm">
				      <input type="email" class="form-control" id="input-email" v-model="userData.useremail" placeholder="请输入Email">
				 	</div>
  				</div>
  				<div class="form-group">
				    <label for="input-addr" class="control-label">地址</label>
				    <div class="col-sm">
				      <input type="text" class="form-control" id="input-addr" v-model="userData.useraddr" placeholder="请输入地址">
				 	</div>
  				</div>
  				<div class="form-group">
				    <label for="input-file-0" class="control-label">附件</label>
				    <div class="col-sm">
				      <input type="file" class="form-control" id="input-file-0" placeholder="请输入地址">
				 	</div>
  				</div>
  				<div class="form-btn">
  					<button @click="save(userData)">提交</button>
  				</div>
			</div>

		</div>
	</div>
</template>
<style lang="less" scoped="scoped">
	@import "../../../assets/css/server-detail.less";
</style>
<script type="text/javascript">
	export default{
		name: '',
		data(){
			return{
				// banner轮播
				nowIndex: 0,
				listWidth: '1226',
				timer: null,
				imglist: [
					{ imgurl: "../../../static/images/xmbanner1.jpg" },
					{ imgurl: "../../../static/images/xmbanner2.jpg" },
					{ imgurl: "../../../static/images/xmbanner3.jpg" }
				],
				
				//nav效果
				activeIndex: 0,
				activeWidth: null,
				navlist: [
					{ navname: "大家来" },
					{ navname: "大家看" },
					{ navname: "大家说" },
					{ navname: "大家走" },
					{ navname: "大家听" },
					{ navname: "大家写" },
					{ navname: "大家去" },
					{ navname: "大家读" },
				],

				//floor导航
				tagIndex: 0,
				floors: [
					{ floorname: "1楼" },
					{ floorname: "2楼" },
					{ floorname: "3楼" },
					{ floorname: "4楼" },
					{ floorname: "5楼" }
				],
				tags: [
					{ tagname: "one" },
					{ tagname: "two" },
					{ tagname: "three" },
					{ tagname: "four" },
					{ tagname: "five" },
				],
				offsetTop: [], //floor的offset().top容器

				//表单
				userData: {
					username: '',
					userpwd: '',
					useraginpwd: '',
					usertel:'',
					useremail: '',
					userfile: '',
				},
			}
		},
		methods: {

			//banner轮播
			switchDo(reduce){
				clearInterval(this.timer);
				if(reduce === "reduce"){
					if(this.nowIndex===0){
						this.nowIndex=this.imglist.length-1;
					}else{
						this.nowIndex--
					}
				}else{
					if(this.nowIndex===this.imglist.length-1){
						this.nowIndex=0;
					}else{
						this.nowIndex++;
						//1226 2452
					}
				}
				var _this = this;
				this.timer=setInterval(function(){
					_this.switchDo();
				},4000)
			},

			//nav效果
			enterCustomer(nav, index, e){
				this.activeIndex=index;
			},

			//floor楼层导航之所有楼层的offset().top
			floorOffsetTop(){
				var _this = this;
				var fbCell = $(".floor-wrap").find(".fb-cell");
				_this.offsetTop=[];
				fbCell.map(function(item, i){
					//console.log(item, i, $(this).offset().top);
					_this.offsetTop.push($(this).offset().top);
				})
				//console.log(_this.offsetTop);
			},
			//floor楼层导航之tag点击事件
			toCustomer(tag, index, e){
				var _this = this;
				$(window).off("scroll");
				_this.tagIndex = index;
				_this.floorOffsetTop();

				// var flag = true;
				// for(var i=0; i<_this.offsetTop.length; i++){
				// 	if(flag){
				// 		if(index === i){
				// 			$("html, body").animate({
				// 				scrollTop: _this.offsetTop[index]
				// 			},500,function(){
				// 				$(window).on("scroll",_this.scrollFloor);
				// 			});
				// 		}
				// 	}
				// }
				
				$("html, body").animate({
					scrollTop: _this.offsetTop[index]
				},500, function(){
					$(window).on("scroll", _this.scrollFloor);
				});
			},
			//floor楼层导航之楼层滚动监听
			scrollFloor(){
				var _this = this;
				var wst = $(window).scrollTop();
				_this.floorOffsetTop();

				var key=0;
				var flag = true;
				for (var i = 0; i < _this.offsetTop.length; i++) {
					key++;
					console.log("i",i)
					console.log("key",key)
					if(flag){
						if(wst>=_this.offsetTop[(_this.offsetTop.length)-key]-300){
							console.log('_this.offsetTop[(_this.offsetTop.length)-key',_this.offsetTop[(_this.offsetTop.length)-key])
							console.log('_this.offsetTop.length',_this.offsetTop.length)
							var index = _this.offsetTop.length-key;
							_this.tagIndex = index;
							flag = false;
						}else{
							flag=true;
						}
					}
					// if(wst>=_this.offsetTop[i] - 100){
					// 	_this.tagIndex =i
					// }
				}
			},

			//表单
			focusCustomer(name){
				console.log(name)
			},

			inputCustomer(valname){
				console.log(valname);
				if (valname.length>10) {
					alert(valname)
				}
			},

			save(userData){
				console.log(userData)
			},

		},
		mounted(){
			this.$nextTick(function(){

				var _this = this;

				//banner轮播
				this.timer=setInterval(function(){
					_this.switchDo();
				}, 4000)

				//nav效果
				_this.activeWidth = 1226/(_this.navlist.length);


				//floor楼层导航
				_this.floorOffsetTop();
				$(window).on("scroll", function(){
					_this.scrollFloor();

				})


			});
		},
		beforeUpdate(){
			this.$nextTick(function(){

			})
		},
		
	}
</script>