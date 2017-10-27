/**
 * Created by Gold on 2016/10/19.
 */
$(function(){
    /*com.numAndEng("pwd1");
    com.numAndEng("pwd2");*/
    com.number("phoneNumber");

    var input1 = $(".login_main_content ul li").eq(0).find("input");
    var input2 = $(".login_main_content ul li").eq(1).find("input");
    var input3 = $(".login_main_content ul li").eq(2).find("input");
    var input5 = $(".login_main_content ul li").eq(3).find("input");
    var input6 = $(".login_main_content ul li").eq(4).find("input");
    var input7 = $(".login_main_content ul li").eq(5).find("input");

    inputText(input1,4);
    inputText(input2,6);

    clickInput(input1);
    clickInput(input2);
    clickInput(input3);
    clickInput(input5);
    // clickInput(input6);
    clickInput(input7);

    function inputText($class,number){
        $class.on("input",function(){
            $(this).siblings("span").eq(0).hide();
            var text = $(this).val();
            if(text.length < number || text.length > 20){
                $(this).siblings("span").eq(1).show();
                $(this).siblings(".chose_color").hide();
                $(this).siblings("span").eq(1).attr("data","false");
                $(this).addClass("border_red");
            }else{
                $(this).siblings("span").eq(1).hide();
                $(this).siblings(".chose_color").show();
                $(this).siblings("span").eq(1).attr("data","true");
                $(this).removeClass("border_red");
            }
        });
    }

    function clickInput($input){
        $input.focus(function(){
            $(this).siblings("span").eq(0).show();
            $(this).addClass("border_green");
            $(this).siblings("span").eq(1).hide();
            $(this).siblings("span").eq(2).hide();
        })
        $input.blur(function(){
            $(this).siblings("span").eq(0).hide();
            $(this).removeClass("border_green");
            var text = $(this).siblings("span").eq(1).attr("data");
            if(text === "false"){
                $(this).siblings("span").eq(1).show();
            }
        })
    }
	
	input1.blur(function(){
		var text = $(this).siblings("span").eq(1).attr("data");	
		if(text === "true"){			
			var url  = userLoginUrl+orderServiceUrl.check_name;		    			
			var data = {			
				username : $('#username').val(),               					    
			};			
			var success_callback = function(obj){
				if(obj.data === 1){
					$(".login_main_content ul li").eq(0).find("span").eq(2).show();
					$(".login_main_content ul li").eq(0).find("span").eq(1).attr("data","false");
				}
			};
					
			com.executeAjax(url, data, "POST", success_callback);
		}
	})
	
	input5.blur(function(){
		var text = $(this).siblings("span").eq(1).attr("data");
		if(text === "true"){
			var url  = userLoginUrl+orderServiceUrl.check_mobile;		    
			var data = {								
				mobile: $('#phoneNumber').val()
			};			
			var success_callback = function(obj){
				if(obj.data === 1){
					$(".login_main_content ul li").eq(3).find("span").eq(2).show();
                    $(".login_main_content ul li").eq(3).find(".chose_color").hide();
					$(".login_main_content ul li").eq(3).find("span").eq(2).attr("data","false");
				}else{
                    $("#hqyzm").css("color","#666");
                    $(".yzmError").attr("data","true");
                }
			};
			com.executeAjax(url, data, "POST", success_callback);
		}
	});
    
    input3.on("input",function(){
        var text = $(this).val();
        $(this).siblings("span").eq(0).hide();
        var a = input2.siblings("span").eq(1).attr("data");
        if(a === "true"){
            if(text !== input2.val()){
                $(this).siblings("span").eq(1).attr("data","false");
                $(this).siblings("span").eq(1).show();
                $(this).siblings(".chose_color").hide();
                $(this).addClass("border_red");
            }else{
                $(this).siblings("span").eq(1).attr("data","true");
                $(this).siblings("span").eq(1).hide();
                $(this).siblings(".chose_color").show();
                $(this).removeClass("border_red");
            }
        }else{
            $(this).siblings("span").eq(1).attr("data","false");
            $(this).siblings("span").eq(1).show();
            $(this).siblings(".chose_color").hide();
            $(this).addClass("border_red");
        }
    });

    input3.on("input",function(){
        var text = $(this).val();
        $(this).siblings("span").eq(0).hide();
        var a = input2.siblings("span").eq(1).attr("data");
        if(a === "true"){
            if(text !== input2.val()){
                $(this).siblings("span").eq(1).attr("data","false");
                $(this).siblings("span").eq(1).show();
                $(this).siblings(".chose_color").hide();
                $(this).addClass("border_red");
            }else{
                $(this).siblings("span").eq(1).attr("data","true");
                $(this).siblings("span").eq(1).hide();
                $(this).siblings(".chose_color").show();
                $(this).removeClass("border_red");
            }
        }else{
            $(this).siblings("span").eq(1).attr("data","false");
            $(this).siblings("span").eq(1).show();
            $(this).siblings(".chose_color").hide();
            $(this).addClass("border_red");
        }
    });

    input5.on("input",function(){
        com.Phone_Number($(this).val(),$(".numberError"));
        var text = $(this).siblings("span").eq(1).attr("available");
        if(text == "true"){
            $(this).siblings("span").eq(1).attr("data","true");
            $(this).siblings(".chose_color").show();
            $(this).siblings("span").eq(1).hide();
        }else{
            $(this).siblings("span").eq(1).attr("data","false");
            $(this).siblings(".chose_color").hide();
            $(this).siblings("span").eq(1).show();
        }
        var index = $(this).parent("li").index();
        $(this).siblings("span").eq(0).hide();
    });

    $("#agreementInput").click(function(){
        var text = $(this).is(':checked');
        if(text === true){
            $(this).attr("data","true");
            $(this).siblings("span").eq(1).hide();
        }else{
            $(this).attr("data","false");
            $(this).siblings("span").eq(1).show();
        }
    });

    $("#selProvince").click(function(){
        var text = $(this).text();
        provinceChange(text)
    });

    $(".now_login").click(function(){
        var text = $(".login_main_content ul li");
        var isTrue = [];
        for(var i=0; i<text.length; i++){
            var a = $(".login_main_content ul li").eq(i).find("span").eq(1).attr("data");
            isTrue.push(a);
        }
        var c = $("#agreementInput").attr("data");
        isTrue.push(c);
        console.log(isTrue);

        if(isTrue.indexOf("false") == -1){
			var url  = userLoginUrl+orderServiceUrl.register;

            var data = {
				username : $('#username').val(),
				psw      : $.md5($('#pwd1').val()),
				realname : $('#real_name').val(),
				mobile   : $('#phoneNumber').val(),
                mobilecode  : $('#mobilecode').val(),
				province : $('#s_province').val(),
			    city     : $('#s_city').val(),
                province_name :$('#s_province').find('option:selected').text(),
                city_name : $('#s_city').find('option:selected').text(),
                tuijian : $('#tuijian').val()
			}
			var success_callback = function(obj){
                if(obj.code === 0){
                    location.href = 'register_success.html';
                }
			}
			com.executeAjax(url, data, "POST", success_callback);
        }
    });

    var yzm;			//验证码值
    var wait = 100;				//倒计时时间
    var yzmInput = $(".time");	//input对象

    var a1 = $(".login_main_content ul li").eq(4).find("span").eq(1).attr("data");
    var a2 = $(".login_main_content ul li").eq(5).find("span").eq(1).attr("data");
    if(a1 === "false" || a2 === "false"){
        $("#hqyzm").css("color","#d0d0d0");
    }

	/*var pwdString = 0;
    var url  = userLoginUrl+orderServiceUrl.my;
    var data = {
        code : 'my'
    };
    var success_callback = function(obj){
           pwdString = obj;
		   pwdString = JSON.stringify(pwdString);
           pwdString = pwdString.replace('"','');
		   pwdString = pwdString.replace('"','')
   };
    com.executeAjax(url, data, "POST", success_callback);*/

    yzmInput.click(function(){
        var b1 = $(".login_main_content ul li").eq(3).find("span").eq(1).attr("data");
        var b2 = $(".login_main_content ul li").eq(4).find("span").eq(1).attr("data");
        if(b1 === "false" || b2 === "false"){
            return false;
        }else{
            var url  = userLoginUrl+orderServiceUrl.send_mobile_code;
			var data = {
				captcha: $('#inputCode').val(),
				mobile: $('#phoneNumber').val()
			};
			var success_callback = function(obj){
                if(obj.code === 0){
                    var getTimeId = document.getElementById("hqyzm");
                    time(getTimeId);
                    $(".login_main_content ul li").eq(4).find("span").eq(1).attr("data","true");
                }else{
                    $("#mycode").click();
                }
			};
			com.executeAjax(url, data, "POST", success_callback);
        }
    });

	
	
    function time(o) {
        if (wait == 0) {
            o.removeAttribute("disabled");
            o.value="获取验证码";
            wait = 60;
        } else {
            o.setAttribute("disabled", true);
            o.value = wait + "后重新获取";
            wait--;
            setTimeout(function() {
                time(o);
            },1000);
        }
    }

    input7.on('input',function(){
        $(this).siblings("span").eq(0).hide();
        var text = $(this).val();
        if(text == yzm){
            $(this).siblings("span").eq(1).attr("data","true");
            //$(this).siblings("span").eq(1).hide();
        }else{
            $(this).siblings("span").eq(1).attr("data","false");
            //$(this).siblings("span").eq(1).show();
        }
    });

    /****** 验证码 ******/

    /*var inp = document.getElementById('inputCode');
    var code = document.getElementById('code');

    var c = new KinerCode({
        len: 4,//需要产生的验证码长度
//        chars: ["1+2","3+15","6*8","8/4","22-15"],//问题模式:指定产生验证码的词典，若不给或数组长度为0则试用默认字典
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
//                    consoleLog('验证成功');
                $(".yzmError").attr("data","true");
                $(".yzmError").hide();
                $("#hqyzm").css("color","#666");
            }else{

                if(this.opt.question){
//                        consoleLog('验证失败:'+code.answer);
//                     $(".yzmError").show();
//                     $(".yzmError").attr("data","false");
                }else{
//                        consoleLog('验证失败:'+code.strCode);
//                        consoleLog('验证失败:' + code.arrCode);
                    $("#hqyzm").css("color","#d0d0d0");
                    $(".yzmError").show();
                    $(".yzmError").attr("data","false");
                }
            }
        }
    });*/

    var data = {
        Province : "#Province",
        City  : "#City",
        isShow: false
    };
    com.provinceCityArea(data);


    var isAgree = true;
    $("#agreement").click(function () {
        var content = "<div id='agree' style='height: 450px;overflow-y: scroll'></div><p class='agreeInput white bg_light_dd3e3e'>同意并继续</p>";
        var object = {
            getid        : $("#alert_mask"),
            text_title   : "提示",
            text_content : content
        }
        com.mask(object);
        $("#agree").load("/agreement/agreement_01.html");
        $(".mask_main").css({"width":"800px","padding":"60px 0px 30px 20px"});
        $(".mask_input").hide();

        $(".agreeInput").click(function () {
            $(".bg_mask,.mask_main").hide();
            if(isAgree){
                $("#agreementInput").click();
                isAgree = false;
            }
        });

        var DivHeight = $(".mask_main").outerHeight();
        var DivWidth = $(".mask_main").outerWidth();
        $(".mask_main").css({'margin': '-'+parseInt(DivHeight)/2 +'px ' + '-'+parseInt(DivWidth)/2 +'px'});
    });
})