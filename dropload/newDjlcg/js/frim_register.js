/**
 * Created by Gold on 2016/10/19.
 */
$(function(){
    /*com.numAndEng("pwd1");
    com.numAndEng("pwd2");*/
    // com.number("bankCard1");
    com.number("bankCard2");

    var input1 = $(".login_main_content ul li").eq(0).find("input");
    var input2 = $(".login_main_content ul li").eq(1).find("input");
    var input3 = $(".login_main_content ul li").eq(2).find("input");
    var input4 = $(".login_main_content ul li").eq(3).find("input");
    var input5 = $(".login_main_content ul li").eq(4).find("input");
    var input6 = $(".login_main_content ul li").eq(5).find("input");
    var input7 = $(".login_main_content ul li").eq(6).find("input");
    var input8 = $(".login_main_content ul li").eq(7).find("input");
    var input9 = $(".login_main_content ul li").eq(8).find("input");
    var input10 = $(".login_main_content ul li").eq(9).find("input");
    var input11 = $(".login_main_content ul li").eq(10).find("input");
    var input12 = $(".login_main_content ul li").eq(11).find("input");
    var input13 = $(".login_main_content ul li").eq(12).find("input");
    var input14 = $(".login_main_content ul li").eq(13).find("input");
    var input15 = $(".login_main_content ul li").eq(14).find("input");

    inputText(input1,4);    //限制长度
    inputText(input2,6);
    inputText(input4,2);
    inputText(input5,1);
    inputText(input8,2);
    inputText(input9,2);
    inputText(input12,2);

    clickInput(input1);     //获取、失去焦点
    clickInput(input2);
    clickInput(input3);
    clickInput(input4);
    clickInput(input5);
    clickInput(input6);
    clickInput(input7);
    clickInput(input8);
    clickInput(input9);
    clickInput(input10);
    //clickInput(input11);
    clickInput(input12);
    clickInput(input13);
    clickInput(input14);
    clickInput(input15);

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
        });
        $input.blur(function(){
            $(this).siblings("span").eq(0).hide();
            $(this).removeClass("border_green");
            var text = $(this).siblings("span").eq(1).attr("data");
            if(text === "false"){
                $(this).siblings("span").eq(1).show();
            }
        });
    }

    input3.on("input",function(){
        var text = $(this).val();
        $(this).siblings("span").eq(0).hide();
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
    });

    input6.on("input",function(){
        var text = $(this).siblings("span").eq(1).attr("data");
        var index = $(this).parent("li").index();
        $(this).siblings("span").eq(0).hide();
        if($(this).val().length > 0){
            $(this).siblings("span").eq(1).attr("data","true");
            $(this).siblings("span").eq(1).hide();
            $(this).siblings(".chose_color").show();
            $(this).removeClass("border_red");
        }else{
            $(this).siblings("span").eq(1).attr("data","false");
            $(this).siblings("span").eq(1).show();
            $(this).siblings(".chose_color").hide();
            $(this).addClass("border_red");
        }
    });

    input7.on("input",function(){
        com.firmNumber($(this).val(),$(this).siblings("span").eq(1),"请填写公司座机");
        var text = $(this).siblings("span").eq(1).attr("available");
        var index = $(this).parent("li").index();
        $(this).siblings("span").eq(0).hide();

        if(text === "false"){
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
    });

    // bank_Card(input9,"请填写开户银行");
    bank_Card(input10,"请填写对公银行账号");
    function bank_Card($input,text){
        $input.on("input",function(){
            com.bankCard($(this).val(),$(this).siblings("span").eq(1),text);
            var text = $(this).siblings("span").eq(1).attr("available");
            var index = $(this).parent("li").index();
            $(this).siblings("span").eq(0).hide();

            if(text === "false"){
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
        });
    }

    input13.on("input",function(){
        com.Phone_Number($(this).val(),$(".numberError"),"格式不正确");
        var text = $(this).siblings("span").eq(1).attr("available");
        var index = $(this).parent("li").index();
        $(this).siblings("span").eq(0).hide();

        if(text === "false"){
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
    });

    input15.on('input',function(){
        $(this).siblings("span").eq(0).hide();
        var text = $(this).val();
        if(text == yzm){
            $(this).siblings("span").eq(1).attr("data","true");
            $(this).siblings("span").eq(1).hide();
        }else{
            $(this).siblings("span").eq(1).attr("data","false");
            $(this).siblings("span").eq(1).show();
        }
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

    //$("#selProvince").click(function(){
    //    var text = $(this).text();
    //    provinceChange(text)
    //});
	
    input1.blur(function(){		
		var text = $(this).siblings("span").eq(1).attr("data");
		if(text === "true"){			
			var url  = userLoginUrl+orderServiceUrl.check_name;		    			
			var data = {								
				username : $('#username').val(),               					    
			};			
			var success_callback = function(obj){
				if(obj.data === 1){
					$(".login_main_content ul li").eq(0).find("span").eq(1).show();
					$(".login_main_content ul li").eq(0).find("span").eq(1).attr("data","false");
					$(".login_main_content ul li").eq(0).siblings(".chose_color").hide();
					$(".login_main_content ul li").eq(0).find("span").eq(1).text("用户名已注册");
				}else{
					$(".login_main_content ul li").eq(0).siblings("span").eq(1).attr("data","true");
					$(".login_main_content ul li").eq(0).find("span").eq(1).hide();
					$(".login_main_content ul li").eq(0).siblings(".chose_color").show();
					$(".login_main_content ul li").eq(0).find("span").eq(1).text("格式不正确");
				}
			};
					
			com.executeAjax(url, data, "POST", success_callback);
		}
	});
	
	input13.blur(function(){
		var text = $(this).siblings("span").eq(1).attr("data");
		if(text === "true"){
			var url  = userLoginUrl+orderServiceUrl.check_mobile;		    
			var data = {								
				mobile: $('#phoneNumber').val()
			};			
			var success_callback = function(obj){
				if(obj.data === 1){
					$(".numberError").attr("data","false");
					$(".numberError").show();
					$(".numberError").siblings(".chose_color").hide();
					$(".numberError").text("手机号码已注册");
				}else{
					$(".numberError").siblings("span").eq(1).attr("data","true");
					$(".numberError").siblings("span").eq(1).hide();
					$(".numberError").siblings(".chose_color").show();
					$(".numberError").text("格式不正确");
                    $("#hqyzm").css("color","#666");
                    $(".yzmError").attr("data","true");
				}
			};
					
			com.executeAjax(url, data, "POST", success_callback);
		}
	});

    $("#showSample").click(function () {
        $(".show_sample").toggle();
    });
	
    $(".now_login").click(function(){
        var text = $(".login_main_content ul li");
        var text2 = $(".upload .upload_file");
        var text3 = $(".province select");
        var isTrue = [];
        for(var i=0; i<text.length; i++){
            var a = $(".login_main_content ul li").eq(i).find("span").eq(1).attr("data");
            isTrue.push(a);
        }
        for(var a=0; a<text2.length; a++){
            var b = $(".upload .upload_file").eq(a).attr("data");
            isTrue.push(b);
        }
        for(var b=0; b<text3.length; b++){
            var d = $(".province select").eq(b).attr("data");
            isTrue.push(d);
        }
        var c = $("#agreementInput").attr("data");
        isTrue.push(c);

        consoleLog(isTrue);
        if(isTrue.indexOf("false") == -1){
            var url  = userLoginUrl+orderServiceUrl.company_register;
			var data = {
				username : $('#username').val(),
				psw : $.md5($('#pwd1').val()),
				company_name : $('#firmName').val(),
				office_num : $('#firmNumber').val(),
				province : $('#s_province').val(),
				city : $('#s_city').val(),
				county : $('#s_county').val(),
                province_name :$('#s_province').find('option:selected').text(),
                city_name : $('#s_city').find('option:selected').text(),
                county_name : $('#s_county').find('option:selected').text(),
                addr : $('#addr').val(),
				bossname : $('#bossname').val(),
				bankname : $('#bankCard1').val(),
				bankcode : $('#bankCard2').val(),
				realname : $('#real_name').val(),
				mobile : $('#phoneNumber').val(),
                mobilecode  : $('#mobilecode').val(),
				tuijian : $('#tuijian').val(),
				yyzz    : $('#image_wrap1 img').attr("src"),
				swdjz   : $('#image_wrap2 img').attr("src"),
				sfz     : $('#image_wrap3 img').attr("src"),
				zzjgdmz : $('#image_wrap4 img').attr("src")
							    
			};
			var success_callback = function(obj){
                if(obj.code === 0){
                    location.href = 'frim_register_success.html';
                }
			};
			com.executeAjax(url, data, "POST", success_callback);
        }
    });

    var yzm  = 123456;			//验证码值
    var wait = 100;				//倒计时时间
    var yzmInput = $("#hqyzm");	//input对象

    var a1 = $(".login_main_content ul li").eq(13).find("span").eq(1).attr("data");
    var a2 = $(".login_main_content ul li").eq(14).find("span").eq(1).attr("data");
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
		   pwdString = pwdString.replace('"','');
   };
    com.executeAjax(url, data, "POST", success_callback);*/
	
    yzmInput.click(function(){
        var b1 = $(".login_main_content ul li").eq(13).find("span").eq(1).attr("data");
        var b2 = $(".yzmError").attr("data");
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
                }else{
                    $("#mycode").click();
                }
			};
			com.executeAjax(url, data, "POST", success_callback);
        }
    });

    function time(o) {
        if (wait === 0) {
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

    $(".certificates").click(function(){
        $(".certificates").removeClass("f_c_333 border_green").addClass("f_c_999");
        $(this).removeClass("f_c_999").addClass("f_c_333 border_green");
        $(".certificates img").hide();
        $(this).find("img").show();
        $(".certificates").attr("data","false");
        $(this).attr("data","true");
        if($(this).index() == 2){
            $(".certificates_imgs dd").eq(1).hide().find(".upload_file").attr("data","true");
            $(".certificates_imgs dd").eq(2).attr("class","mar_l_20px");
            $(".certificates_imgs dd").eq(3).hide().find(".upload_file").attr("data","true");
            $(".cer_imgs_text2").hide();
        }else{
            $(".certificates_imgs dd").eq(1).show().find(".upload_file").attr("data","false");
            $(".certificates_imgs dd").eq(2).attr("class","mar_t_20px");
            $(".certificates_imgs dd").eq(3).show().find(".upload_file").attr("data","false");
            $(".cer_imgs_text2").show();
        }
    });

    //上传图片
    var success_callback2 = function () {

    };
    com.updateImages("#file1", "#image_wrap1", success_callback2);
    com.updateImages("#file2", "#image_wrap2", success_callback2);
    com.updateImages("#file3", "#image_wrap3", success_callback2);
    com.updateImages("#file4", "#image_wrap4", success_callback2);

    /*$(".clear_img").click(function(){
        $(this).siblings(".upload_bg").html('<p>请换一张</p>').removeAttr("style");
        $(this).hide();
        $(this).siblings("input").attr("data","false");
        $(this).parent().siblings("p").eq(1).show();

    });*/

    var province = $(".province select");
    province.on("change",function(){
        for(var i=0; i<province.length; i++){
            var d = province.eq(i).val();
            if(province.eq(0).val() === "省份"){
                province.eq(0).attr("data", "false");
            }else{
                province.eq(0).attr("data", "true");
            }

            if(province.eq(1).val() === "地级市"){
                province.eq(1).attr("data", "false");
            }else{
                province.eq(1).attr("data", "true");
            }

            if(province.eq(2).val() === "市、县级市"){
                province.eq(2).attr("data", "false");
            }else{
                province.eq(2).attr("data", "true");
            }
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
//            bgImg:"bg.jpg",//若选择背景图片，则背景颜色失效
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
                var b1 = $(".login_main_content ul li").eq(13).find("span").eq(1).attr("data");
                var b2 = $(".yzmError").attr("data");
                if(b1 === "true" && b2 === "true"){
                    $("#hqyzm").css("color","#666");
                }else{
                    $("#hqyzm").css("color","#d0d0d0");
                }
            }else{

                if(this.opt.question){
                    //consoleLog('验证失败:'+code.answer);
                    $(".yzmError").show();
                    $(".yzmError").attr("data","false");
                }else{
                    //consoleLog('验证失败:'+code.strCode);
                    //consoleLog('验证失败:' + code.arrCode);
                    $(".yzmError").show();
                    $(".yzmError").attr("data","false");
                }
            }
        }
    });*/

    //省份、城市、市区
    com.executeAjax(regionUrl + orderServiceUrl.region_get, "", "GET", function (result) {
        var vm1 = new Vue({
            el: '#Province',
            data: {options : result.data}
        });

        //初始化
        City_fun(result.data[0].region_id, true);

        var province = $("#Province select");
        province.on("change",function(){
            var ProId = $(this).val();
            City_fun(ProId,true);
            var City = $("#City select");
            City.on("change",function(){
                var ProId = $(this).val();
                Area_fun(ProId);
            });

        });
    });
    var vm2 = new Vue({
        el: '#City',
        data: {options: []}
    });
    function City_fun(ProId, isShow) {
        com.executeAjax(regionUrl + orderServiceUrl.region_get, {pid: ProId}, "GET", function (result) {

            vm2.options.splice(result.data.length);
            vm2.options = result.data;
            if(isShow){
                Area_fun(result.data[0].region_id);
            }
        });
    }
    var vm3 = new Vue({
        el: '#Area',
        data: {options: []}
    });
    function Area_fun(ProId) {
        com.executeAjax(regionUrl + orderServiceUrl.region_get, {pid: ProId}, "GET", function (result) {

            vm3.options.splice(result.data.length);
            vm3.options = result.data;
            if(result.data == ''){
                $("#Area").css({"display":"none"})
            }else{
                $("#Area").css({"display":"block"})
            }
        });
    }

    var isAgree = true;
    $("#agreement").click(function () {
        var content = "<div id='agree' style='height: 450px;overflow-y: scroll'></div><p class='agreeInput white bg_light_dd3e3e'>同意并继续</p>";
        var object = {
            getid        : $("#alert_mask"),
            text_title   : "提示",
            text_content : content
        };
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
});