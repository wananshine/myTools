/********* 公共js **********/
var com = function() {
    return {
        /* 输入框限制多少个数字
         * getId html的ID
         * */
        maxNum: function(getId,maxnum) {
            var text = document.getElementById(getId);
            var number = maxnum;
            text.onkeyup = function() {
                this.value = this.value.replace(/\D/g, '');
                if (text.value > number) {
                    text.value = text.value.substr(0,maxnum);
                }else if(text.value === number){
                    text.value = number;
                }
            }
        },
        /* 输入限制数字
         * getId html的ID
         * */
        number: function(getId){
            var text = document.getElementById(getId);
            text.onkeyup = function(){
                this.value = this.value=this.value.replace(/\D/g,'');
            }
            text.onbeforepaste = function(){
                this.value = this.value=this.value.replace(/\D/g,'');
            }
        },
        /* 输入限制数字、字符
         * getId html的ID
         * */
        numberAndStr: function(getId){
            var text = document.getElementById(getId);
            text.onkeyup = function(){
                this.value = this.value=this.value.replace(/[^\a-\z\A-\Z\u4E00-\u9FA5]/g,'');
            }
            text.onbeforepaste = function(){
                this.value = this.value=this.value.replace(/[^\a-\z\A-\Z\u4E00-\u9FA5]/g,'');
            }
        },
        /* 手机号码验证
         * val	  输入的值
         * $text  获取html元素
         * $text1  错误信息
         * */
		Phone_Number: function(val,$text,text1){
			var re = /^(13[0123456789][0-9]{8}|15[012356789][0-9]{8}|18[0123456789][0-9]{8}|147[0-9]{8}|1349[0-9]{7}|17[0123456789][0-9]{8})$/;
			if (re.test(val)) {
				$text.attr("available","true");
			} else {
				$text.show();
				$text.attr("available","false");
				$text.text(text1);
			}
			if(val == ""){
				$text.text(text1);
			}
        },
        /* 座机号码验证
         * val	  输入的值
         * $text  返回错误信息
         * */
		firmNumber: function(val,$text,text1){
			var re = /^0\d{2,3}-?\d{7,8}$/;
			if (re.test(val)) {
				$text.attr("available","true");
			} else {
				$text.show();
				$text.attr("available","false");
				$text.text(text1);
			}
			if(val == ""){
				$text.text(text1);
			}
        },
        /* 银行卡号码验证
         * val	  输入的值
         * $text  返回错误信息
         * */
		bankCard: function(val,$text,text1){
			//var re = /^\d{16}|\d{19}$/;
			var re = /^\d{7}|\d{19}$/;
			if (re.test(val)) {
				$text.attr("available","true");
			} else {
				$text.show();
				$text.attr("available","false");
				$text.text(text1);
			}
			if(val == ""){
				$text.text(text1);
			}
        },
        /* 输入限制数字和字母
         * getId html的ID
         * */
        numAndEng: function(getId){
            var text = document.getElementById(getId);
            text.onkeyup = function(){
                this.value = this.value.replace(/[\W]/g,'');
            }
            text.onbeforepaste = function(){
                this.value = clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''));
            }
        },
        /* 输入限制特殊字符
         * getId html的ID
         * */
		special: function(getId){
            var text = document.getElementById(getId);
            text.onkeyup = function(){
                this.value = this.value.replace(/[%&',;=?$\\^]+/g,'');
            }
            text.onbeforepaste = function(){
                this.value = clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''));
            }
        },
		/* 弹出窗
		 * 参数示例
		 * var object = {
		 *	 getid : $("#cancel_orders_mask"),
		 *	 text_title : "提示",
		 *	 text_input1 : "确认",
		 *	 text_input2 : "取消"
		 *	}
		 * */
		mask: function(object){
			if(!object.text_input1){
				object.text_input1 = "确认";
			}if(!object.text_input2){
				object.text_input2 = "取消";
			}
			var $html = '<div class="bg_mask"></div><div class="mask_main"><div class="mask_title f_c_333"><span>'+object.text_title+'</span><div class="mask_img"><img class="img1" src="../img/icon-close1.svg"><img class="Nhide img2" src="../img/icon-close2.svg"></div></div>'+ object.text_content +'<div class="mask_input"><input class="mask_confirm bg_line_gray3 white" type="button" value="'+ object.text_input1 +'"> <input class="mask_cancel bg_line_gray" type="button" value="'+ object.text_input2 +'"></div></div>'
			object.getid.html($html);
			$(".mask_img").mouseenter(function(){
				$(this).find(".img1").hide();
				$(this).find(".img2").show();
			});
			$(".mask_img").mouseleave(function(){
				$(this).find(".img1").show();
				$(this).find(".img2").hide();
			});
			$(".mask_cancel,.mask_img img").click(function(){
				$(".bg_mask,.mask_main").hide();
			});
			var DivHeight = $(".mask_main").outerHeight();
			var DivWidth = $(".mask_main").outerWidth();
			$(".mask_main").css({'margin': '-'+parseInt(DivHeight)/2 +'px ' + '-'+parseInt(DivWidth)/2 +'px'});
			
		},
		/* 成功 弹出窗
		 * 参数示例
		 * getId  填充的id
		 * text   显示的文字
		 * */
		maskSuccess: function(getId, text){
			$(".mask_main2").removeAttr("style");
			setTimeout(function () {
				$(".mask_main2").addClass("mask_main2_scale");
				$(".feedBackMask2 .bg_mask").addClass("mask_main2_scale");
			}, 2000);
			setTimeout(function () {
				getId.html("");
			}, 2800);
			var $html = '<div class="feedBackMask2"><div class="bg_mask"></div><div class="mask_main2"><i class="icon_ok mar_t_40px"></i><p class="fs_18px f_c_666 center mar_t_25px">'+ text +'</p></div></div>';
			getId.html($html);

			var DivClass  = $(".mask_main2");
			var DivHeight = DivClass.outerHeight();
			var DivWidth  = DivClass.outerWidth();
			DivClass.css({'margin': '-'+parseInt(DivHeight)/2 +'px ' + '-'+parseInt(DivWidth)/2 +'px'});
		},
		/* 失败 弹出窗
		 * 参数示例
		 * getId  填充的id
		 * text   显示的文字
		 * */
		maskError: function(getId, text){
			$(".mask_main2").removeAttr("style");
			setTimeout(function () {
				$(".mask_main2").addClass("mask_main2_scale");
				$(".feedBackMask2 .bg_mask").addClass("mask_main2_scale");
			}, 2000);
			setTimeout(function () {
				getId.html("");
			}, 2800);
			var $html = '<div class="feedBackMask2"><div class="bg_mask"></div><div class="mask_main2"><i class="icon_error mar_t_40px"></i><p class="fs_18px f_c_666 center mar_t_25px">'+ text +'</p></div></div>';
			getId.html($html);

			var DivClass  = $(".mask_main2");
			var DivHeight = DivClass.outerHeight();
			var DivWidth  = DivClass.outerWidth();
			DivClass.css({'margin': '-'+parseInt(DivHeight)/2 +'px ' + '-'+parseInt(DivWidth)/2 +'px'});
		},
		/* 登录 弹出窗
		 * 参数示例
		 * getId  填充的id
		 * */
		maskLogin: function(getId){
			$(".login_mask").show();
			var $html = '<div class="login_mask"><div class="bg_mask"></div><div class="login_mask_main"></div></div>';
			getId.html($html);
			$(".login_mask_main").load("/lib/temp/loginTemp.html");
			setTimeout(function () {
				$(".login_main").css({"position":"fixed"});
			},10);
		},
		/* 是否显示首页的左边菜单栏
		* 默认不传值 是跟首页一样显示
		* null		不显示
		* false		鼠标放上去先显示
		* */
		isTitleMenuShow: function(object){
			if(object == false){
				setTimeout(function(){
					$("#menu_bg").hide();
					$("#titleTemp2").removeClass("bg_white").addClass("bg_white");

					$(".title2_menu ul li").eq(0).mouseenter(function(){
						$("#menu_bg").fadeIn(100);
					});
					//$(".title2_menu ul li").eq(0).mouseleave(function(){
					//	$("#menu_bg").fadeOut(100);
					//});
					$("#menu_bg").mouseenter(function(){
						$("#menu_bg").fadeIn(100);
					});
					$("#menu_bg").mouseleave(function(){
						$("#menu_bg").fadeOut(100);
					});
				},50)
			}else if(object){
				setTimeout(function(){
					$("#menu_bg").removeClass("Nhide");
				},50)
			}
			if(object == "null"){
				setTimeout(function(){
					$("#menu_bg").hide();
					$("#titleTemp2").removeClass("bg_white").addClass("bg_white box_s border_b2");
					$(".title2_menu").hide();
					$("#titleTemp2").removeClass("box_inset");
				},10)
			}
		},
        /*
         * 返回顶部
         * */
		backTop : function(){
			$('html,body').animate({scrollTop:0},300);
		},
        /*
         * 显示搜索结果列表
         * inputName      ".title2_input input"	 input输入框
         * search_div     ".search_result"		 搜索结果的父元素
         * search_result  ".search_result li"	 搜索结果的子元素 (结果文字所在行)
         * */
		searchList : function(obj){
			/*$(obj.inputName).on("input",function(){
				var text = $(this).val();
				if(text.length > 0){
					$(obj.search_div).show();
					$(obj.search_result).css({"display": "none"});
					$(obj.search_result +" p:contains(" + text + ")").parent("li").css({"display": "block"});
				}else{
					$(obj.search_div).hide();
				}
			});*/
			$(obj.inputName).focus(function(){
				var text = $(this).val();
				if(text.length > 0){
					$(obj.search_div).show();
				}
			});
			$(obj.search_result).click(function(){
				var text = $(this).find("p").text();
				$(obj.inputName).val(text);
				$(obj.search_div).hide();
			});
		},
        /*
         * 判断浏览器版本
         * */
		browserVersion : function(){
			var Sys = {};
			var ua = navigator.userAgent.toLowerCase();
			var s,success;
			(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
			(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
			(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
			(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
			(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

			//以下进行测试
			if (Sys.ie) success = 'IE:' + Sys.ie;
			if (Sys.firefox) success = 'Firefox:' + Sys.firefox;
			if (Sys.chrome) success = 'Chrome:' + Sys.chrome;
			if (Sys.opera) success = 'Opera:' + Sys.opera;
			if (Sys.safari) success = 'Safari:' + Sys.safari;

			return success;
		},
        /**
		 * 执行Ajax
		 * @para (url : 地址 , data : json数据格式类型 , type : post or get , success_callback : 成功后返回的信息)
		 */
		executeAjax : function(url, data, type, _success_callback,_error_callback,hideLoading) {
            if(hideLoading!==true) {
				/* loading动画 */
                // var dataSrc = com.getUrl('正在加载。。。')
                $("#loading").html('<div class="loading"><div class="load_img"><img src="../../img/loading_02.gif"></div></div>');
            }
		    function executeCall(url, data, type, _success_callback,_error_callback) {
		        consoleLog("----------------------- Ajax Start ----------------------------------");
		        consoleLog("请求地址：" + url);
		        consoleLog("请求参数：" + JSON.stringify(data));
		        consoleLog("请求类型：" + type);
		        _error_callback  = _error_callback || function () {
		            console.error("请求失败:" + url);
		            return;
		        };
		        try {
		            var ajax2 = $.ajax({
		                url: url,
		                type: type,
		                dataType: 'json',
						contentType: "application/x-www-form-urlencoded;charset=UTF-8",
		                timeout: 60000,
		                async: true,
		                data: data,
		                success: function (_res) {
		                    consoleLog("Ajax success!");
		                    if (_success_callback) {
		                        consoleLog("接收参数 ："+url+"-URL-"+ JSON.stringify(_res));
								if(_res.code){
									if(_res.code === 9999){		// 9999 = 没登录，要登陆;  10000 = 弹出登录;   大于零 = 弹出错误信息;  小于零 = 自定义处理
										location.href = "/login.html";
										return false;
									}
									if(_res.code === 10001){		// 跳转分销系统登录页面
										location.href = "/dt/login.html";
										return false;
									}
									if(_res.code === 10000){    //弹出登录窗口
										var $text = document.getElementById("alert_mask");
										var $mask = '<div id="alert_mask"></div>';
										if($text === undefined || $text === null){
											$("body").append($mask);
										}
										com.maskLogin($("#alert_mask"));
										return false;
									}
									if(_res.code > 0){    //弹出错误信息
										var $text = document.getElementById("alert_mask");
										var $mask = '<div id="alert_mask"></div>';
										if($text === undefined || $text === null){
											$("body").append($mask);
										}
                                        error_mask(_res);
										if(_error_callback){
											_error_callback();
										}
										return false;
									}
								}
		                        var newResData = _res;
		                        _success_callback(newResData);
		                    }
		                },
		                error: function (XMLHttpRequest, textStatus, errorThrown) {
		                    consoleLog("Ajax error!");
		                    if(_error_callback){
		                        _error_callback();
		                    }
		                    consoleLog(XMLHttpRequest.status);
							consoleLog(XMLHttpRequest.readyState);
							consoleLog(textStatus);
		                },
                        complete: function(){
                            //关闭动画
                            $(".loading").remove();
                            //有时loading动画并未消失，则定时移除
                            setTimeout(function(){
                                $(".loading").remove();
                            }, 1000);
                            consoleLog("Ajax complete!");
                        }
		            });
		        } catch (e) {
		            consoleLog(e.name + ":" + e.message);
		        }
		    }
		    executeCall(url, data, type, _success_callback,_error_callback);
		},
		/**
		 * HTML模板
		 * @para (template:temp  data:参数  bool：当值为null或undefined时，用字符串bool替代  dataCopy:数组[array]里面包的那个对象{object})
		 * dataCopy 举个栗子 {"a":"1","dataCopy":[{"aa":"11","bb":"21"}]}
		 */
		tempFormat : function (template, data, bool, dataCopy) {
			if(!!dataCopy){
				var obj = JSON.stringify(dataCopy); 	//转换string
				obj = obj.substring(1, obj.length-1);   //裁掉前后的中括号[]
				obj = JSON.parse(obj);                  //再换回object
				var res = Object.assign(data, obj);     //再和上面订单的合并  -.- 感觉有点智障
				data = res;
			}
			if(!!bool){
				var bool1 = bool;
			}else{
				var bool1 = "";
			}
			return template.replace(/\$\w+\|*\w+\$/gi, function(matchs) {
				var loadD = data;
				matchs = matchs.replace(/\$/g, "");
				while (matchs.indexOf("|") != "-1") {
					var sep = matchs.indexOf("|");
					var key = matchs.substring(0, sep);
					loadD = loadD[key];
					matchs = matchs.substring(matchs.indexOf("|") + 1);
					if(loadD == undefined) {
						return undefined;
					};
				};
				return (loadD[matchs]==undefined)||(loadD[matchs]==null)?bool1:loadD[matchs];
			});
		},
		countdown2:function (time, html) {
			var SysSecond;
			var InterValObj;
			$(document).ready(function() {
				SysSecond = new Date(time) ; //这里获取倒计时的起始时间
				InterValObj = window.setInterval(SetRemainTime, 1000); //间隔函数，1秒执行
			});
			//将时间减去1秒，计算天、时、分、秒
			function SetRemainTime() {
				if(SysSecond > 0) {
					SysSecond = SysSecond - 1;
					var second = Math.floor(SysSecond % 60); // 计算秒
					var minite = Math.floor((SysSecond / 60) % 60); //计算分
					var hour = Math.floor((SysSecond / 3600) % 24); //计算小时
//					var day = Math.floor((SysSecond / 3600) / 24); //计算天

					$(html).html(hour + "小时" + minite + "分" + second + "秒");
				} else { //剩余时间小于或等于0的时候，就停止间隔函数
					window.clearInterval(InterValObj);
					//这里可以添加倒计时时间为0后需要执行的事件
				}
			}
			SetRemainTime();
		},
		/*
		* 省份、城市、市区
		* var data = {
		*	 Province : "#Province2",
		*	 City  : "#City2",
		*	 Area  : "#Area2",
		*	 isShow: false
		*	 }
		* */
		provinceCityArea:function (data) {
			com.executeAjax(regionUrl + orderServiceUrl.region_get, "", "GET", function (result) {
				var vm1 = new Vue({
					el: data.Province,
					data: {options : result.data}
				});

				if(data.typeOf == 'update'){
					$(data.Province+" option[value="+ data.provinceCode +"]").attr("selected", true);
					City_fun(data.provinceCode);
					setTimeout(function () {
						$(data.City+" option[value="+ data.cityCode +"]").attr("selected", true);
					},300);
					Area_fun(data.cityCode);
					setTimeout(function () {
						$(data.Area+" option[value="+ data.areaCode +"]").attr("selected", true);
					},300);
				}else{
					//初始化
					City_fun(result.data[0].region_id, true);
				}

				var province = $(data.Province+" select");
				province.on("change",function(){
					var ProId = $(this).val();
					if(ProId){
						City_fun(ProId,data.isShow);
					}
				});
				var City = $(data.City+" select");
				City.on("change",function(){
					var ProId = $(this).val();
					Area_fun(ProId);
				});
			});
			var vm2 = new Vue({
				el: data.City,
				data: {options: []}
			});
			function City_fun(ProId, isShow) {
				com.executeAjax(regionUrl + orderServiceUrl.region_get, {pid: ProId}, "GET", function (result) {
					vm2.options.splice(result.data.length);
					vm2.options = result.data;
					if(data._success){
						data._success(result);
					}
					if(isShow){
						if(ProId){
							Area_fun(result.data[0].region_id);
						}
					}
				});
			}
			if(data.isShow){
				var vm3 = new Vue({
					el: data.Area,
					data: {options: []}
				});
			}
			function Area_fun(ProId) {
				com.executeAjax(regionUrl + orderServiceUrl.region_get, {pid: ProId}, "GET", function (result) {
					if(data.isShow){
						vm3.options.splice(result.data.length);
						vm3.options = result.data;
						if(data._success){
							data._success(result);
						}
						if(result.data == ''){
							$(data.Area).css({"display":"none"})
						}else{
							$(data.Area).css({"display":"block"})
						}
					}
				});
			}
		},
		/*
		* 上传图片
		* */
		updateImages:function ($input, $div, success_callback) {
			$($input).click(function(){
				$.imageFileVisible({wrapSelector: $div,
					fileSelector: $input,
					width : "",
					height: "",
					success_callback : success_callback
				});
			});
		},
		/*
		* 验证码
		* var imgData = {
		*  inputCode : 'phoneCode',    //输入框
		*  code      : 'code',         //验证码
		*  yzmError  : $(".yzmError"), //错误信息
		*  getYzm    : $("#hqyzm")	   //
		* }
		* */
		imgCode:function (data) {
			/****** 验证码 ******/
			var inp = document.getElementById(data.inputCode);
			var code = document.getElementById(data.code);

			var c = new KinerCode({
				len: 4,//需要产生的验证码长度
		        // chars: ["1+2","3+15","6*8","8/4","22-15"],//问题模式:指定产生验证码的词典，若不给或数组长度为0则试用默认字典
				chars: [
					1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
					'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
					'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
				],//经典模式:指定产生验证码的词典，若不给或数组长度为0则试用默认字典
				question:false,//若给定词典为算数题，则此项必须选择true,程序将自动计算出结果进行校验【若选择此项，则可不配置len属性】,若选择经典模式，必须选择false
				copy: false,//是否允许复制产生的验证码
				bgColor:"",//背景颜色[与背景图任选其一设置]
            	// bgImg:"bg.jpg",//若选择背景图片，则背景颜色失效
				randomBg : false,//若选true则采用随机背景颜色，此时设置的bgImg和bgColor将失效
				inputArea: inp,//输入验证码的input对象绑定【 HTMLInputElement 】
				codeArea: code,//验证码放置的区域【HTMLDivElement 】
				click2refresh:true,//是否点击验证码刷新验证码
				false2refresh:true,//在填错验证码后是否刷新验证码
				validateEven : "blur",//触发验证的方法名，如click，blur等
				validateFn : function(result,code){//验证回调函数
					if(result){
                    // consoleLog('验证成功');
						data.yzmError.attr("data","true");
						data.yzmError.hide();
						data.getYzm.css("color","#666");
					}else{

						if(this.opt.question){
                        // consoleLog('验证失败:'+code.answer);
						}else{
	                        // consoleLog('验证失败:'+code.strCode);
	                        // consoleLog('验证失败:' + code.arrCode);
							data.getYzm.css("color","#d0d0d0");
							data.yzmError.show();
							data.yzmError.attr("data","false");
						}
					}
				}
			});
		},
		/*
		* 加载按钮样式
		* changeDiv		显示转圈的div
		* changeText	被推上去的文字
		* */
		loading:function (changeDiv, changeText) {
			changeDiv.css({"top":"0","opacity":"1"});
			changeText.addClass("change_text");
			setTimeout(function () {
				changeText.removeClass("change_text");
			},1000);
			setTimeout(function () {
				$(".change_div").removeAttr("style");
			},1500);
		},
		/*
		* &gt;字符转义
		* */
		htmldecode:function(s){
			var div = document.createElement('div');
			div.innerHTML = s;
			return div.innerText || div.textContent;
		},
		/*
		* 计时
		* text  根据接口返回的时间计时
		* */
		countDown:function (StartDate, EndDate, _success, _error) {
			var NowTime;
			function GetRTime() {
				var EndTime   = new Date(EndDate); //截止时间
				// var StartTime = new Date("December 12 12:00:00 2016");
				var nMS = EndTime.getTime() - NowTime.getTime();
				var nD = Math.floor(nMS / (1000 * 60 * 60 * 24));
				var nH = Math.floor(nMS / (1000 * 60 * 60)) % 24;
				var nM = Math.floor(nMS / (1000 * 60)) % 60;
				var nS = Math.floor(nMS / 1000) % 60;
				// var nU = Math.floor(nMS / 100) % 10;
				if(nD >= 0) {
					var data = {
						Day : nD,
						Hour : nH,
						Minute : nM,
						Second : nS
					};
					_success(data);
					setTimeout(GetRTime, 1000);
				}else{
					_error();
				}
				NowTime = new Date(NowTime.valueOf() + 1000);
			}
			NowTime = new Date(StartDate); // 服务器当前时间加载页面从服务器获取
			GetRTime();
		},
		/*
		 * leftSecond 剩余秒数
		 * text  根据接口返回的时间计时
		 * */
		countDown2:function (leftSecond, _success, _error) {
			function GetRTime2(leftSec) {
				var nMS = leftSec;
				var nD = Math.floor(nMS / (60 * 60 * 24));
				var nH = Math.floor(nMS / (60 * 60)) % 24;
				var nM = Math.floor(nMS / 60) % 60;
				var nS = Math.floor(nMS) % 60;
				if(nD >= 0) {
					var data = {
						Day : nD,
						Hour : nH,
						Minute : nM,
						Second : nS
					};
					_success(data);
					setTimeout(function(){GetRTime2(--leftSec)}, 1000);
				}else{
					_error();
				}
			}
			GetRTime2(leftSecond);
		},
		/*
		 * 智能机浏览器版本信息:
		 */
        browser : function(){
            // var versions = function(){
            var u = navigator.userAgent, app = navigator.appVersion;
            return {  //移动终端浏览器版本信息
                trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1, //android终端或者uc浏览器
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1 //Safari内核
            };
            // };
            language: (navigator.browserLanguage || navigator.language).toLowerCase();
        }
    }
}();

/*
* 是否打印consoleLog标志
*/
var openConsoleLog = false;
/**
 * 打印consoleLog
 * 传入参数格式:string
 */
var consoleLog = function (str) {
    if (openConsoleLog) {
        console.log(str);
    }
};

/*
* IE8 及 IE8以下
* * */
if(com.browserVersion() == "IE:6.0"){
	$("#error").show();
}
if(com.browserVersion() == "IE:7.0"){
	$("#error").show();
}
if(com.browserVersion() == "IE:8.0"){
	$("#error").show();
}

/* 如果是在移动端打开就自动跳转移动端网站 */
var browser = com.browser();
if(browser.android || browser.iPhone ||browser.iPad){
	var URL = location.href;
	var URLName = URL.split('/');
	URLName = URLName[3];
	URLName = URLName.split('?');
	var URLNameId = URLName;
	URLName = URLName[0];
	URLNameId = URLNameId[1];
	if(URLName == "product_list_info.html"){
		location.href = 'http://m.djlcg.com/src/assets/product-list-info.html?'+URLNameId;
	}else{
		location.href = 'http://m.djlcg.com/';
	}
}

/* 显示隐藏搜索列表 */
$("body").click(function(e){
	e = e || window.event;
	var target = e.target || e.srcElement;
	if(target.className.indexOf("search_result") < 0&&target.id !="search"){
		$(".search_result").hide();
	}
	if(target.className.indexOf("search_result3") < 0&&target.id !="scroll_top_input"){
		$(".search_result3").hide();
	}
});

function error_mask(_res) {
    var object = {
        getid : $("#alert_mask"),
        text_title   : "错误信息",
        text_input1  : "确认",
        text_input2  : "取消",
        text_content : "<p class='center comErrorMsg'>"+ _res.msg +"</p>"
    }
    com.mask(object);
    $(".mask_confirm").click(function () {
        $(".bg_mask,.mask_main").hide();
    });
    $(".mask_main").css("width","400px");
    $(".mask_cancel").hide();
    $(".mask_confirm").css("margin-left","50px");
    var DivHeight = $(".mask_main").outerHeight();
    var DivWidth = $(".mask_main").outerWidth();
    $(".mask_main").css({'margin': '-'+parseInt(DivHeight)/2 +'px ' + '-'+parseInt(DivWidth)/2 +'px'});
}

function getQueryString(name) {
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null)return  decodeURIComponent(r[2]); return '';
}