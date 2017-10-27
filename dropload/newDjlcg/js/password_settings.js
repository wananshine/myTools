/**
 * Created by Gold on 2016/11/9.
 */
$(function () {
    var default_pwd = $("#default_pwd");
    var pwd1 = $("#pwd1");
    var pwd2 = $("#pwd2");

    inputText(default_pwd, 6);
    inputText(pwd1, 6);

    clickInput(default_pwd);
    clickInput(pwd1);
    clickInput(pwd2);

    //输入框的字数
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

    //获取焦点切换显示文字
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

    pwd2.on("input",function(){
        $(this).siblings("span").eq(0).hide();
        var text = $(this).val();
        if(text !== pwd1.val() ||text.length < 6 || text.length > 20){
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

    $("#confirmUpdate").click(function(){
        var old_pwd = $("#default_pwd").val();
        var new_pwd = $("#pwd2").val();
		var isTrue =[];
        var text = $(".login_main_content3 ul li");
        for(var i=0; i<text.length; i++){
            var a = $(".login_main_content3 ul li").eq(i).find("span").eq(1).attr("data");
            isTrue.push(a);
        }

        if(isTrue.indexOf("false") == -1) {
            var data = {
			  old_password : old_pwd,
              new_password : new_pwd
            };
            var success_callback = function (result) {
                // $("#page1").addClass("Nhide");
                // $("#page2").removeClass("Nhide");
            };
            com.executeAjax(resetPswUrl+orderServiceUrl.reset_password, data, "POST", success_callback);
        }
    });

    $("#confirm").click(function(){
        location.href = '../personal_main.html';
    });
});