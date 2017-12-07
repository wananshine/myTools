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
						<li class="fb-cell" v-for="floor in floors">{{ floor.floorname }}</li>
					</ul>
					<div class="floor-tag">
						<a href="javascript:;" class="fb-tag" v-for="tag in tags">{{ tag.tagname }}</a>
					</div>
				</div>
			</section>

		</div>
	</div>
</template>
<style lang="less" scoped="scoped">
	@import (reference) "../../../assets/css/cost.less";
	.serverContainer{
		.serverInner{
			.slider-wrap{
				.por;
				.hid;
				.slide-list{
					.flexbox;
					transition: all .5s ease;
					li{
						.flexitem;
					}
				}
				.slide-option{
					.poa;
					left: 0;
					bottom: 10px;
					width: @full;
		            text-align: center;
		            span{
		            	display: inline-block;
		            	width: 14px;
		            	height: 14px;
		            	border-radius: @full;
		            	background: #ccc;
            			margin: 0 10px;
		            }
		            .active{
			            background: #09f;
			        }
				}
				.slide-arrow{
					div{
						width: 50px;
			            height: 100px;
			            cursor: pointer;
			            position: absolute;
			            margin: auto;
			            top: 0;
			            bottom: 0;
			            background: url("http://i1.bvimg.com/1949/4d860a3067fab23b.jpg") no-repeat;
					}
					.arrow-right{
						transform: rotate(180deg);
						right: 0;
					}
					.arrow-left{
						left: 0;
					}
				}
			}

			.slider-nav{
				.por;
				.hid;
				.nav-list{
					.flexbox;
					height: 40px;
					background-color: rgba(0, 96, 123, 0.78);
					color: @fff;
					li{
						.flexitem;
						flex-grow: 1;
						text-align: center;
						line-height: 40px;
						cursor: pointer;
						z-index: 2;
					}
					.overActive{
						color: #000;
					}
				}
				.nav-active{
					.poa;
					top: 0;
					left: 0;
					z-index: 1;
					transition: all .5s cubic-bezier(0.4, -0.3, 0.57, 1.38);
					height: 40px;
					background-color: #f90;
				}
			}

			.floor-wrap{
				.floor-bd{
					.por;
					.fb-list{
						.fb-cell{
							.height(400px);
						}
					}
					.floor-tag{
						.pof;
						left: 10px;
						top: 50%;
						.translate(0, -50%);
						.hid;
						.height(@auto);
						width: 50px;
						.flexbox;
						flex-direction: column;
						align-items: flex-start;
						.fb-tag{
							.hid;
							.flexitem;
							.height(50px);
							line-height: 50px;
							flex-basis: auto;
							display: block;
							text-align: left;
							text-transform: uppercase;
							margin-bottom: 10px;
						}
					}
				}	
			}
		}
	}
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
					{ tagname: "six" },
				],
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
			}
		},
		mounted(){
			this.$nextTick(function(){

				//banner轮播
				var _this = this;
				this.timer=setInterval(function(){
					_this.switchDo();
				}, 4000)

				//nav效果
				_this.activeWidth = 1226/(_this.navlist.length);

			})
		},
		
	}
</script>