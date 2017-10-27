/**
 * Created by Gold on 2016/11/8.
 */
$(function () {
    $("#update_phone_number").click(function () {
        var content = '<div class="f_c_666 fs_14px" style="height: 240px">' +
            '<p class="blue center">已验证手机：159****1759</p>' +
                '<ul class="basic_input">' +
                    '<li id="basic_yzm">' +
                        '<span class="fs_14px basic_text1 fl">手机验证码</span>' +
                        '<input class="input fl" style="width: 170px" placeholder="请填写手机验证码" type="text">' +
                        '<input class="time f_c_666 curP" id="hqyzm_basic" value="获取验证码">'+
                    '</li>' +
                '</ul>' +
            '</div>';
        var object = {
            getid        : $("#basic_data_mask"),
            text_title   : "修改手机号码",
            text_content : content,
            text_input1  : '下一步'
        };
        com.mask(object);
        $(".mask_confirm").removeClass("bg_line_gray").addClass("bg_line_red2 white").css("margin-left","50px");
        $(".mask_cancel").hide();
        $("#hqyzm_basic").click(function () {
            time(this);
        });
        $(".mask_confirm").click(function () {
            var content2 = '<div class="f_c_666 fs_14px" style="height: 240px">' +
                '<ul class="basic_input" style="margin-left: 55px;">' +
                '<li style="margin-top: 0px">' +
                    '<span class="fs_14px basic_text3 fl">手机号：</span>' +
                    '<input class="input fl" maxlength="11"  style="width: 170px" placeholder="请填写新的手机号码"><br/>' +
                    '<p class="fs_12px basic_text4 red Nhide" data="false" available="false">请填写正确的手机号</p>' +
                '</li>'+
                '<li>' +
                    '<span class="fs_14px basic_text3 fl">手机验证码：</span>' +
                    '<input class="input fl" style="width: 170px" placeholder="请填写手机验证码" type="text">' +
                    '<input class="time f_c_666 curP" id="hqyzm_basic" value="获取验证码">'+
                    '<p class="fs_12px basic_text4 red Nhide" data="false" available="false">请填写正确的手机验证码</p>' +
                '</li>' +
                '<li>' +
                    '<span class="fs_14px basic_text3 fl">验证码：</span>' +
                    '<input class="input fl" maxlength="4" id="inputCode" style="width: 170px" placeholder="请填写验证码" type="text"><i id="code" class="mycode"></i>' +
                    '<p class="fs_12px basic_text4 red yzmError Nhide" data="false" available="false">请填写正确的验证码</p>' +
                '</li>' +
                '</ul>' +
                '</div>';
            var object2 = {
                getid        : $("#basic_data_mask"),
                text_title   : "修改手机号码",
                text_content : content2,
                text_input1  : '提交'
            };
            com.mask(object2);
            $(".mask_confirm").removeClass("bg_line_gray").addClass("bg_line_red2 white");
            yzm();
            $(".mask_confirm").click(function () {
                var content3 = '<div class="f_c_666 fs_14px" style="height: 240px">' +
                    '<div>' +
                        '<img class="basic_icon_success" src="img/icon_submit_ok.png" />'+
                        '<p class="fs_18px f_c_666 center">你的手机号 186****2437 修改成功</p>' +
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
            });
        });
    });

    //获取验证码
    var wait = 100;  //倒计时时间
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

    var imgWidth = $("#image_wrap").outerWidth();
    var imgHeight = $("#image_wrap").outerHeight();

    $("#updateImg").click(function () {
        $("#image").click();
    });

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

    //省市区
    var data = {
        Province : "#Province",
        City  : "#City",
        Area  : "#Area",
        isShow: false
    };
    com.provinceCityArea(data);

    //失去光标提示文字
    function clickInput($input){
        $input.focus(function(){
            $(this).siblings("p").eq(0).show();
            $(this).siblings("p").eq(1).hide();
        });
        $input.blur(function(){
            $(this).siblings("p").eq(0).hide();
            var text = $(this).siblings("p").eq(1).attr("data");
            if(text === "false"){
                $(this).siblings("p").eq(1).show();
            }
        });
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
    function yzm(){
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
    }
});