/**
 * Created by Gold on 2016/11/8.
 */
$(function () {

    var infoUrl = userInfoUrl+orderServiceUrl.user_info;
    var infoData = {
        info : 'userInfo'
    };
    com.executeAjax(infoUrl, infoData, "GET", function (result) {
        var items =  new Vue({
            el: '#userInfo',
            data: {list:result}
        });
        var items2 =  new Vue({
            el: '#userInfo2',
            data: {list:result}
        });
        var items3 =  new Vue({
            el: '#userInfo3',
            data: {list:result}
        });
		
		if(result.sex == 2){  //1 男   2 女
			$("#man").removeAttr("checked");
			$("#women").attr("checked","checked");
		}

        //省市区
        var data = {
            Province : "#Province",
            City   : "#City",
            Area   : "#Area",
            isShow : false,
            typeOf : 'update',
            provinceCode : result.province,
            cityCode     : result.city
        };
        com.provinceCityArea(data);
        $(".update_phone_number").click(function () {
            var content = '<div class="f_c_666 fs_14px" style="height: 240px">' +
                '<p class="blue center">已验证手机：'+ result.mobile_phone +'</p>' +
                '<ul class="basic_input">' +
                '<li id="basic_yzm">' +
                '<span class="fs_14px basic_text1 fl">手机验证码</span>' +
                '<input class="input fl" style="width: 170px" id="yzm_input" placeholder="请填写手机验证码" type="text">' +
                '<input class="time f_c_666 curP" id="hqyzm_basic" value="获取验证码">' +
                '<p style="margin-left: 90px;" class="fs_12px red hide" data="false">请填写正确的验证码</p>'+
                '</li>' +
                '</ul>' +
                '</div>';
            var object = {
                getid        : $("#basic_data_mask"),
                text_title   : "修改手机号码",
                text_content : content,
                text_input1  : '下一步'
            }
            com.mask(object);
            $(".mask_confirm").removeClass("bg_line_gray").addClass("bg_line_red2 white").css("margin-left","50px");
            $(".mask_cancel").hide();
            $("#hqyzm_basic").click(function () {
                var url  = userLoginUrl+orderServiceUrl.send_mobile_code;
                var data = {
                    mobile: $('#phoneNumber').val(),
                    sms_type: 'reset_mobile'
                };
                var success_callback = function(obj){
                    /*$("#basic_yzm .input").on("input",function(){
                        var text = $(this).val();
                        text = parseInt(text);
                        $(this).siblings("p").eq(0).attr("data","true");
                        $(this).siblings("p").eq(0).hide();
                       *//* if(text === obj){
                            $(this).siblings("p").eq(0).attr("data","true");
                            $(this).siblings("p").eq(0).hide();
                        }else{
                            $(this).siblings("p").eq(0).attr("data","false");
                            $(this).siblings("p").eq(0).show();
                        }
                        *//*
                    });*/
                };
                time(this);
                com.executeAjax(url, data, "POST", success_callback);
            });
            $(".mask_confirm").click(function () {
                /*var yzmInput =  $("#basic_yzm p:last-child").attr('data');
                if(yzmInput === 'false'){
                    return;
                }*/
                var captcha = $("#yzm_input").val();
                var urlNext = userLoginUrl+orderServiceUrl.check_mobile_captcha;
                var data = {
                    captcha:captcha
                };
                var success_callback = function(obj){
                    if(obj.code === 0){
                        var content2 = '<div class="f_c_666 fs_14px" style="height: 240px">' +
                            '<ul class="basic_input" id="mask2" style="margin-left: 55px;">' +
                            '<li style="margin-top: 0px">' +
                            '<span class="fs_14px basic_text3 fl">手机号：</span>' +
                            '<input class="input fl" id="maskPhoneNumber" maxlength="11"  style="width: 170px" placeholder="请填写新的手机号码"><br/>' +
                            '<p class="fs_12px basic_text4 red PhoneNumberError hide" data="false" available="false">请填写正确的手机号</p>' +
                            '</li>'+
                            '<li>' +
                            '<span class="fs_14px basic_text3 fl">手机验证码：</span>' +
                            '<input class="input fl" id="yzm" style="width: 170px" placeholder="请填写手机验证码" maxlength="6">' +
                            '<input class="time f_c_666 curP" id="hqyzm_basic2" value="获取验证码">'+
                            '<p class="fs_12px basic_text4 red phoneYzmError hide" data="true" available="true">请填写正确的手机验证码</p>' +
                            '</li>' +
                            '<li>' +
                            '<span class="fs_14px basic_text3 fl">验证码：</span>' +
                            '<input class="input fl" maxlength="4" id="inputCode" style="width: 170px" placeholder="请填写验证码" type="text"><img src="/newapi/captcha.php?4" class="mycode curP" id="mycode" onClick=this.src="/newapi/captcha.php?"+Math.random()>' +
                            '<p class="fs_12px basic_text4 red yzmError hide" data="true" available="true">请填写正确的验证码</p>' +
                            '</li>' +
                            '</ul>' +
                            '</div>';
                        var object2 = {
                            getid        : $("#basic_data_mask"),
                            text_title   : "修改手机号码",
                            text_content : content2,
                            text_input1  : '提交'
                        }
                        com.mask(object2);
                        $(".mask_confirm").removeClass("bg_line_gray").addClass("bg_line_red2 white");
                        //var rel_yzm = 0;
                        $("#hqyzm_basic2").click(function () {
                            var numberAttr = $(".PhoneNumberError").attr("data");
                            if(numberAttr == "true"){
                                var url  = userLoginUrl+orderServiceUrl.send_mobile_code;
                                var data = {
                                    //captcha: $('#inputCode').val(),
                                    mobile: $('#maskPhoneNumber').val(),
                                    sms_type: 'reset_mobile'

                                };
                                var success_callback = function(){
                                    //rel_yzm = obj;
                                };
                                var wait = 100;
                                time(this);
                                com.executeAjax(url, data, "POST", success_callback);
                            }
                        });
                        $("#maskPhoneNumber").on("input",function(){
                            com.Phone_Number($(this).val(),$(".PhoneNumberError"),"格式不正确");
                            var text = $(this).siblings("p").eq(0).attr("available");
                            if(text === "false"){
                                $(this).siblings("p").eq(0).attr("data","false");
                                $(this).siblings("p").eq(0).removeClass('hide');
                            }else{
                                $(this).siblings("p").eq(0).attr("data","true");
                                $(this).siblings("p").eq(0).addClass('hide');
                            }
                        });
                        /*$("#yzm").on("input",function(){
                            var text = $(this).val();
                            if(text != rel_yzm){
                                $(this).siblings("p").eq(0).attr("data","false");
                                $(this).siblings("p").eq(0).show();
                            }else{
                                $(this).siblings("p").eq(0).attr("data","true");
                                $(this).siblings("p").eq(0).hide();
                            }
                        });*/
                        //yzm();
                        $(".mask_confirm").click(function () {
                            var text     = $("#mask2 li");
                            var isTrue   = [];
                            for(var i=0; i<text.length; i++){
                                var a = $("#mask2 li").eq(i).children("p").attr("data");
                                var b = $("#mask2 li p").val();
                                isTrue.push(a);
                            }

                            if(isTrue.indexOf("false") == -1){
                                var url  = userInfoUrl+orderServiceUrl.edit_mobile;
                                var data = {
                                    mobile : $('#maskPhoneNumber').val(),
                                    mobilecode: $('#yzm').val(),
                                    captcha: $('#inputCode').val()
                                };
                                var success_callback = function(obj){
                                    var content3 = '<div class="f_c_666 fs_14px" style="height: 240px">' +
                                        '<div>' +
                                        '<img class="basic_icon_success" src="../img/icon_submit_ok.png" />'+
                                        '<p class="fs_18px f_c_666 center">你的手机号修改成功</p>' +
                                        '</div>' +
                                        '</div>';
                                    var object3 = {
                                        getid        : $("#basic_data_mask"),
                                        text_title   : "修改手机号码",
                                        text_content : content3,
                                        text_input1  : '确认'
                                    };
                                    com.mask(object3);
                                    $(".mask_confirm").removeClass("bg_line_gray").addClass("bg_line_red2 white");
                                    $(".mask_confirm").click(function () {
                                        $("#basic_data_mask").hide();
                                    });
                                };
                                var _error_callback = function(){
                                    $("#basic_data_mask .bg_mask,#basic_data_mask .mask_main").hide();

                                };

                                com.executeAjax(url, data, "POST", success_callback, _error_callback);
                            }
                        });
                    }

                };
                var _error_callback = function(){
                    $("#basic_data_mask .bg_mask,#basic_data_mask .mask_main").hide();

                };
                com.executeAjax(urlNext,data,"POST",success_callback,_error_callback);

            });
        });

        var text     = $("#userInfo2 li");
        for(var i=0; i<text.length; i++){
            var a = text.eq(i).children("input").val();
            if(a !== ''){
                text.eq(i).children("p:last-child").attr("data", 'true');
            }
        }

        $(".basic_save").click(function(){

            var text     = $("#userInfo2 li");
            var isTrue   = [];
            for(var i=0; i<text.length; i++){
                var a = text.eq(i).children("p:last-child").attr("data");
                isTrue.push(a);
            }
            console.log(isTrue);
            if(isTrue.indexOf("false") == -1){
                var url  = userInfoUrl+orderServiceUrl.edit_info;
                var data = {
                    img  : $('#image_wrap img').attr("src"),
                    username : $('.username').val(),
                    realname : $('#real_name').val(),
                    sex : $("input[name='sex']:checked").val(),
                    province : $('#s_province').val(),
                    city : $('#s_city').val(),
                    province_name :$('#s_province').find('option:selected').text(),
                    city_name : $('#s_city').find('option:selected').text(),
                    qq : $('.uqq').val(),
                    email: $('#email').val(),
                    tuijian : $('#tuijian').val()

                };
                var success_callback = function(obj){
                    if( obj === 3){
                        com.maskSuccess($("#alertMask"), "修改成功！");
                    }
                };
                com.executeAjax(url, data, "POST", success_callback);
            }
        });


        //获取验证码
        var wait = 100;  //倒计时时间
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
                    time(o)
                },1000)
            }
        }

        var imgWidth = $("#image_wrap").outerWidth();
        var imgHeight = $("#image_wrap").outerHeight();

        $("#updateImg").click(function () {
            $("#image").click();
        });

        var touxiang = $(".img");
        var thisImgWidth = touxiang.outerWidth();
        var thisImgHeight = touxiang.outerHeight();
        if(thisImgWidth < imgWidth){
            touxiang.css("max-height","none");
        }else{
            touxiang.css("max-height","100%");
        }
        if(thisImgHeight < imgHeight){
            touxiang.css("max-width","none");
        }else{
            touxiang.css("max-width","100%");
        }

        var success_callback = function () {
            var thisImgWidth = $("#image_wrap img").outerWidth();
            var thisImgHeight = $("#image_wrap img").outerHeight();
            if(thisImgWidth < imgWidth){
                $("#image_wrap img").css("max-height","none");
            }else{
                $("#image_wrap img").css("max-height","100%");
            }
            if(thisImgHeight < imgHeight){
                $("#image_wrap img").css("max-width","none");
            }else{
                $("#image_wrap img").css("max-width","100%");
            }
        };

        //上传图片
        com.updateImages("#image","#image_wrap", success_callback);

        var input1 = $(".basic_input li").eq(0).children("input");
        var input3 = $(".basic_input li").eq(2).children("input");

        clickInput(input1);
        clickInput(input3);
        inputText(input1,4);
        inputText(input3,2);

        //失去光标提示文字
        function clickInput($input){
            $input.focus(function(){
                $(this).siblings("p").eq(0).show();
                $(this).siblings("p").eq(1).hide();
            })
            $input.blur(function(){
                $(this).siblings("p").eq(0).hide();
                var text = $(this).siblings("p").eq(1).attr("data");
                var textVal = $(this).val();
                if(textVal === ""){
                    if(text === "false"){
                        $(this).siblings("p").eq(1).show();
                    }
                }
            })
        }

        //限制输入的字符长度
        function inputText($class,number){
            $class.on("input",function(){
                $(this).siblings("p").eq(0).hide();
                var text = $(this).val();
                if(text.length < number || text.length > 20){
                    $(this).siblings("p").eq(1).show();
                    $(this).siblings("p").eq(1).attr("data","false");
                }else{
                    $(this).siblings("p").eq(1).hide();
                    $(this).siblings("p").eq(1).attr("data","true");
                }
            });
        }

        /****** 验证码 ******/
        /*function yzm(){
            var inp = document.getElementById('inputCode');
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
                        $(".yzmError").attr("data","true");
                        $(".yzmError").hide();
                        var b1 = $(".login_main_content ul li").eq(4).find("span").eq(1).attr("data");
                        var b2 = $(".yzmError").attr("data");
                        // if(b1 === "true" && b2 === "true"){
                        //     $("#hqyzm").css("color","#666");
                        // }else{
                        //     $("#hqyzm").css("color","#d0d0d0");
                        // }
                    }else{

                        if(this.opt.question){
                            $(".yzmError").show();
                            $(".yzmError").attr("data","false");
                        }else{
                            $(".yzmError").show();
                            $(".yzmError").attr("data","false");
                        }
                    }
                }
            });
        }*/
    });
});