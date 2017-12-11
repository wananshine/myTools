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

			<!-- 奇偶颜色 -->
			<div class="oddEven">
				<span class="oe" v-for="(oE, index) in oEs">{{ oE.oEname }}</span>
			</div>

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
              	

			<!-- form表单 -->
			<section class="form-wrap">
				<div class="form-horizontal">
					<div class="form-group">
						<label for="inputEmail" class="control-label">Email</label>
					    <div class="col-sm">
					      <input type="email" class="control-input" id="inputEmail" ref="inputEmail" v-model="formData.userEmail" @focus="focusCustomer($event)" @input="inputCustomer(formData.userEmail, 3, 20, $event)" @blur="blurCustomer($event)" data-valid='false' placeholder="Email">
					      <p v-if="" class="explain">Please input your E-mail!</p>
					      <!-- <p class="explain">The input is not valid E-mail!</p> -->
					    </div>
					</div>
					<div class="form-group">
						<label for="inputPassword" class="control-label">Password</label>
					    <div class="col-sm">
					      <input type="password" class="control-input" id="inputPassword" ref="inputPassword" v-model="formData.userPwd" @focus="focusCustomer($event)" @input="inputCustomer(formData.userPwd,3, 20, $event)" @blur="blurCustomer($event)" data-valid='false' placeholder="Password">
					      <p class="explain">Please input your Password!</p>
					    </div>
					</div>
					<div class="form-group">
						<label for="confirmPassword" class="control-label">Confirm Password</label>
					    <div class="col-sm">
					      <input type="password" class="control-input" id="confirmPassword" ref="confirmPassword" v-model="formData.userConfirmPwd" @focus="focusCustomer($event)" @input="againPwdCustomer(formData.userConfirmPwd,3, 20, $event)" @blur="blurCustomer($event)" data-valid='false' placeholder="Confirm Password">
					      <p class="explain">Please confirmPassword</p>
					    </div>
					</div>
					<div class="form-group">
						<label for="inputNickname" class="control-label">Nickname</label>
					    <div class="col-sm">
					      <input type="text" class="control-input" id="inputNickname" ref="inputNickname" v-model="formData.userNickname" @focus="focusCustomer($event)" @input="inputCustomer(formData.userNickname, 3, 20, $event)" @blur="blurCustomer($event)" data-valid='false' placeholder="Nickname">
					      <p class="explain">Please input your Nickname</p>
					    </div>
					</div>
					<div class="form-group">
						<label for="inputPhone" class="control-label">Phone Number</label>
					    <div class="col-sm">
					      <input type="text" class="control-input" id="inputPhone" ref="inputPhone" v-model="formData.userPhone" @focus="focusCustomer($event)" @input="inputCustomer(formData.userPhone, 3, 20, $event)" @blur="blurCustomer($event)" data-valid='false' placeholder="Phone Number">
					      <p class="explain">Please input your Phone</p>
					    </div>
					</div>
					<div class="form-group">
						<label for="inputWebsite" class="control-label">Website</label>
					    <div class="col-sm">
					      <input type="text" class="control-input" id="inputWebsite" ref="inputWebsite" v-model="formData.userWebsite" @focus="focusCustomer($event)" @input="inputCustomer(formData.userWebsite, 3, 20, $event)" @blur="blurCustomer($event)" data-valid='false' placeholder="Website Number">
					      <p class="explain">Please input your Website</p>
					    </div>
					</div>
					<div class="form-group">
						<label for="inputPrice" class="control-label">Price</label>
					    <div class="col-sm">
					      <input type="text" class="control-input" id="inputPrice" ref="inputPrice" v-model="formData.userPrice" @focus="focusCustomer($event)" @input="inputCustomer(formData.userPrice, 1, 20, $event)" @blur="blurCustomer($event)" data-valid='false' placeholder="Price">
					      <p class="explain">error</p>
					    </div>
					</div>
					<div class="form-group">
						<label for="inputFile" class="control-label">File</label>
					    <div class="col-sm">
					      <input type="text" class="control-input" id="inputFile" ref="inputFile" v-model="formData.userFile" @focus="focusCustomer($event)" @input="inputCustomer(formData.userFile, 1, 20, $event)" @blur="blurCustomer($event)" data-valid='false' placeholder="File">
					      <p class="explain">error</p>
					    </div>
					</div>
					<div class="form-group">
						<label for="inputRemark" class="control-label">Remark</label>
					    <div class="col-sm">
					      <textarea class="control-input" id="inputRemark" ref="inputRemark" v-model="formData.userRemark" @focus="focusCustomer($event)" @input="inputCustomer(formData.userRemark, 1, 200, $event)" @blur="blurCustomer($event)" data-valid='false' placeholder="Remark"></textarea>
					      <p class="explain">error</p>
					    </div>
					</div>
					<div class="form-group">
						<label class="checkbox-wrapper">
							<span class="agree-checkbox">
								<input type="checkbox" class="checkbox-input" v-model="formData.userCheckbox" value="on">
								<span class="checkbox-inner"></span>
							</span>
							<span>I have read the <a href="">agreement</a></span>
						</label>
					</div>
					<div class="form-group">
						<div class="form-btn">
							<div class="form-btn-control ">
								<button type="submit" class="btn-primary" @click="saveCustomer(formData)">
									<span>Register</span>
								</button>
							</div>
						</div>
					</div>
					<!-- // Website-->
				</div>
			</section>



		</div>
	</div>
</template>
<style lang="less" scoped="scoped">
	@import "../../assets/css/server-detail.less";
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

				// 奇数偶数
				oEs: [
					{ oEname: "1" },
					{ oEname: "2" },
					{ oEname: "3" },
					{ oEname: "4" },
					{ oEname: "5" },
					{ oEname: "6" }
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

				//form表单
				formData: {
					userEmail: '',
					userPwd: '',
					userConfirmPwd: '',
					userNickname: '',
					userPhone: '',
					userWebsite: '',
					userPrice: '',
					userRemark: '',
					userCheckbox: true,
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
					if(flag){
						if(wst>=_this.offsetTop[(_this.offsetTop.length)-key]-300){
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

			//form表单
			//聚焦验证
			focusCustomer(e){
				//console.log(this.$refs[e.currentTarget.id]);
				this.$refs[e.currentTarget.id].classList.add("focus-input");
			},
			//失焦验证
			blurCustomer(e){
				const dataValid=this.$refs[e.currentTarget.id].getAttribute("data-valid");
				if(dataValid){
					this.$refs[e.currentTarget.id].classList.remove("focus-input");
				}
			},
			iCustomer(itdata, minNumber, maxNumber, e){
				itdata = itdata.trim();
				if(itdata.length < minNumber || itdata.length > maxNumber){
                    e.currentTarget.parentNode.parentNode.classList.add("has-error");
                    this.$refs[e.currentTarget.id].setAttribute("data-valid", false);
                }else{
                    e.currentTarget.parentNode.parentNode.classList.remove("has-error");
                    this.$refs[e.currentTarget.id].setAttribute("data-valid",true);
                }
			},
			//输入验证
			inputCustomer(itdata, minNumber, maxNumber, e){
				const _this = this;
				// const inputEmail = this.$refs['inputEmail'];  
				// const inputPassword = this.$refs['inputPassword'];
				// const inputNickname = this.$refs['inputNickname'];
				// const inputPhone = this.$refs['inputPhone'];
				// const inputWebsite = this.$refs['inputWebsite'];
				// const inputPrice = this.$refs['inputPrice'];
				// const inputRemark = this.$refs['inputRemark'];
				console.log(itdata, minNumber, maxNumber, e)
				const inputType = e.currentTarget.id;
				//console.log(this.$refs[e.currentTarget.id]);
				const isTrue=function(){
					e.currentTarget.parentNode.parentNode.classList.remove("has-error");
                    _this.$refs[e.currentTarget.id].setAttribute("data-valid",true);
				};
				const isFalse=function(){
					e.currentTarget.parentNode.parentNode.classList.add("has-error");
                    _this.$refs[e.currentTarget.id].setAttribute("data-valid", false);	
				};
				switch (inputType){
					case 'inputEmail': //验证邮箱
					  	var reg = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
					  	if(reg.test(itdata)){
							isTrue();
							return
						}else{
							isFalse();
						}
					  break;
					case 'inputPassword': //密码
					  	_this.iCustomer(itdata, minNumber, maxNumber, e);
					  	break;
					case 'inputNickname': //名字
					  	_this.iCustomer(itdata, minNumber, maxNumber, e);
					  break;
					case 'inputPhone': //手机号码
					  	var reg = /^(13[0123456789][0-9]{8}|15[012356789][0-9]{8}|18[0123456789][0-9]{8}|147[0-9]{8}|1349[0-9]{7}|17[0123456789][0-9]{8})$/;
					  	if(reg.test(itdata)){
							isTrue();
							return
						}else{
							isFalse();
						}
					  	break;
					case 'inputWebsite': //网站
					  	_this.iCustomer(itdata, minNumber, maxNumber, e);
					  	break;
					case 'inputPrice': //验证价格
					  	var reg = /^(\d|([1-9]\d+))(\.\d+)?$/; 
					  	if(reg.test(itdata)){
							isTrue();
							return
						}else{
							isFalse();
						}
					  	break;
					case 'inputRemark': //备注
					  	_this.iCustomer(itdata, minNumber, maxNumber, e);
					  	break;     
					default:
					  	//默认
					  	_this.iCustomer(itdata, minNumber, maxNumber, e);
				};
				//this.$refs[e.currentTarget.id];
                //var  phone_reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;  验证手机号码
                //var  phone_reg = /^(13[0123456789][0-9]{8}|15[012356789][0-9]{8}|18[0123456789][0-9]{8}|147[0-9]{8}|1349[0-9]{7}|17[0123456789][0-9]{8})$/;验证手机号码
				//var  idCard_reg = /^(\d{6})(\d{4})(\d{2})(\d{2})\d{2}(\d)(\d|X)$/; 验证身份证号码(最后一位可能是字母X)
				//var  num_reg = /^-?(\d|([1-9]\d+))(\.\d+)?$/; 验证是否为有效数字(-?为可以出现负号)
			},
			//再次输入密码验证
			againPwdCustomer(itdata, minNumber, maxNumber, e){
				console.log(this.$refs)
				const inputPwd = this.$refs['inputPassword'].value;
				console.log(inputPwd)
				if(itdata===inputPwd){
					this.iCustomer(itdata, minNumber, maxNumber, e);
				}else{
					e.currentTarget.parentNode.parentNode.classList.add("has-error");
                    this.$refs[e.currentTarget.id].setAttribute("data-valid", false);
				}
			},
			//提交
			saveCustomer(formData){
				console.log(formData);
				console.log(this.$refs);
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


				// 奇数偶数颜色设置					
				var oe = document.getElementsByClassName("oe") 
				for(var i = 0; i < oe.length; i++) { 
					console.log(i)
				   if(i%2 == 0) {   
				       oe[i].style.backgroundColor = "skyblue";  
				    }else{
				    	oe[i].style.backgroundColor = "lightyellow";  
				    }
				}



			});
		},
		beforeUpdate(){
			this.$nextTick(function(){

			})
		},
		
	}
</script>