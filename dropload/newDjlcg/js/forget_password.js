/**
 * Created by Gold on 2016/11/15.
 */

/* 确认账号 */
$(function () {
    var phoneNumber = $("#phoneNumber");
    //var phoneCode   = $("#phoneCode");
    var password1   = $("#password1");
    var password2   = $("#password2");

    clickInput(phoneNumber);
    //clickInput(phoneCode);
    clickInput(password1);
    clickInput(password2);

    /* 验证码 *//*
    var imgData = {
        inputCode : 'phoneCode',
        code : 'code',
        yzmError : $(".yzmError"),
        getYzm   : $("#hqyzm")
    }*/
    //com.imgCode(imgData);

    function clickInput($input){
        $input.focus(function(){
            $(this).siblings("span").eq(0).show();
            $(this).addClass("bk2");
            $(this).siblings("span").eq(1).hide();
            $(this).siblings("span").eq(2).hide();
        })
        $input.blur(function(){
            $(this).siblings("span").eq(0).hide();
            $(this).removeClass("bk2");
            var text = $(this).siblings("span").eq(1).attr("data");
            if(text === "false"){
                $(this).siblings("span").eq(1).show();
            }
        })
    }

    $("#phoneNumber").blur(function(){
            var url  = userLoginUrl+orderServiceUrl.check_name;
            var data = {
                username : $("#phoneNumber").val()
            };
            var success_callback = function(){
                $("#error").hide();
                $("#error").attr("data","true");
            };
            com.executeAjax(url, data, "POST", success_callback);
    });

    phoneNumber.on("input", function () {

        com.Phone_Number($(this).val(),$(".numberError"));
        var text = $(this).siblings("span").eq(1).attr("available");
        if(text == "true"){

            $(this).siblings("span").eq(1).attr("data","true");
            $(this).siblings("span").eq(0).show();
            $(this).siblings("span").eq(1).hide();
        }else{

            $(this).siblings("span").eq(1).attr("data","false");
            $(this).siblings("span").eq(0).hide();
            $(this).siblings("span").eq(1).show();
        }
    });

    var yzmInput = $("#getYzm");	//input对象
    var wait = 100;				    //倒计时时间
    $("#next").click(function () {
        var isTrue = [];
        var data1 = phoneNumber.siblings("span").eq(1).attr("data");
        //var data2 = phoneCode.siblings("span").eq(1).attr("data");
        var data2 = $("#error").attr("data");
        isTrue.push(data1,data2);
        if(isTrue.indexOf("false") == -1){


            var username = $('#phoneNumber').val();
            var mobileCode;
            var data = {
                username : username
            }
            var success_callback = function (result) {
                var items1 = new Vue({
                    el: '#setNumber',
                    data: {list:result}
                });
                var mobile_phone = result.mobile_phone;
                var pwdString = result.my;
                if ( mobile_phone != '') {
                    var url  = userLoginUrl+orderServiceUrl.send_mobile_code;
                    var data ={
                        captcha: $('#phoneCode').val(),
                        mobile: $('#phoneNumber').val(),
                        sms_type: 'forget_pwd',
                    }
                    com.executeAjax(url, data, "POST", function (result) {
                        mobileCode = result;
                        $("#page1").addClass("Nhide");
                        $("#page2").removeClass("Nhide");
                        time(yzmInput);
                    });

                }

                /* 安全验证 */
                yzmInput.click(function(){
                    time(yzmInput);
                });

                $("#messageCode").on('input',function(){
                    $(this).siblings("span").eq(0).hide();
                    var text = $(this).val();
                    if(text == mobileCode){
                        $(this).siblings("span").eq(1).attr("data","true");
                        $(this).siblings("span").eq(1).hide();
                    }else{
                        $(this).siblings("span").eq(1).attr("data","false");
                        $(this).siblings("span").eq(1).show();
                    }
                });

                function time(o) {
                    if (wait == 0) {
                        o.attr("disabled");
                        o.val("获取验证码");
                        wait = 100;
                    } else {
                        o.attr("disabled", true);
                        o.val(wait + "后重新获取");
                        wait--;
                        setTimeout(function() {
                            time(o);
                        },1000)
                    }
                }
            }
            com.executeAjax(userLoginUrl + orderServiceUrl.forget_password,data,"POST", success_callback);

        }
    });

    $("#next2").click(function () {
    	var messageCode = $("#messageCode").val();
        var isTrue = [];
        var data1 = $("#messageCode").siblings("span").eq(0).attr("data");
        isTrue.push(data1);
        var captcha_url = userLoginUrl+orderServiceUrl.check_mobile_captcha;
//      console.log(url)
//      var data = {
//      	captcha: messageCode
//      }
        if(isTrue.indexOf("false") == -1){
        	
        	
//      	$("#messageCode").siblings("span").eq(1).show().removeClass("Nhide");
        	var captcha_url = userLoginUrl+orderServiceUrl.check_mobile_captcha;

        	if( messageCode != '' ){
                var data = {
                    captcha : messageCode,
                };
                var success_callback = function (result) {
                	console.log(123)
                    $("#page2").addClass("Nhide");
                    $("#page3").removeClass("Nhide");
                }
              com.executeAjax(captcha_url, data, "POST", success_callback);


            }
	    }
        
    });

    /* 密码重置 */
    password1.on("input", function () {
        var text = $(this).val();
        if(text.length < 6){
            $(this).siblings("span").eq(1).attr("data","false");
            $(this).siblings("span").eq(0).hide();
            $(this).siblings("span").eq(1).show();
            $(this).addClass("border_red");
        }else{
            $(this).siblings("span").eq(1).attr("data","true");
            $(this).siblings("span").eq(0).show();
            $(this).siblings("span").eq(1).hide();
            $(this).removeClass("border_red");
        }
        if(password2.val() !== ""){
            if(text === password2.val()){
                password2.siblings("span").eq(1).attr("data","true");
                password2.siblings("span").eq(0).hide();
                password2.siblings("span").eq(1).hide();
                password2.removeClass("border_red");
            }else{
                password2.siblings("span").eq(1).attr("data","false");
                password2.siblings("span").eq(0).hide();
                password2.siblings("span").eq(1).show();
                password2.addClass("border_red");
            }
        }
    });

    password2.on("input", function () {
        var text = $(this).val();
        if(text !== password1.val()){
            $(this).siblings("span").eq(1).attr("data","false");
            $(this).siblings("span").eq(0).hide();
            $(this).siblings("span").eq(1).show();
            $(this).addClass("border_red");
        }else{
            $(this).siblings("span").eq(1).attr("data","true");
            $(this).siblings("span").eq(0).hide();
            $(this).siblings("span").eq(1).hide();
            $(this).removeClass("border_red");
        }
    });

    $("#next3").click(function () {
        // $(this).addClass("icon_gif");
        // $(this).text("");
        var isTrue = [];
        var pwdError1= $(".pwdError1").attr("data");
        var pwdError2= $(".pwdError2").attr("data");
        isTrue.push(pwdError1,pwdError2);
        if(isTrue.indexOf("false") == -1){
            var user_id = $('#user_id').val();
            var new_pwd = $('#password2').val();

            if( new_pwd != '' ){
                var data = {
                    uid : user_id,
                    new_password : $.md5(new_pwd)
                };
                var success_callback = function (result) {
                    $("#page3").addClass("Nhide");
                    $("#page4").removeClass("Nhide");
                }
                com.executeAjax(userLoginUrl+orderServiceUrl.reset_password, data, "POST", success_callback);


            }

        }
    });

});