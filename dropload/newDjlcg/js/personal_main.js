/**
 * Created by Gold on 2016/10/10.
 */

var div1Hight = 0;
var div2Hight = 0;

/****** personal_main.js ******/
//function personal_main(){
//    //分别加载页眉，头部，页脚
//    $("#titleTemp_main").load("lib/temp/page_title.html");
//    $("#titleTemp2_main").load("lib/temp/page_title2.html");
//    $("#bottomTemp_main").load("lib/temp/page_bottom.html");
//
//    //菜单栏切换
//    $("#menu_chk_text").text($(".right_menu ul li").eq(0).text());
//    $(".right_menu ul li").find("span").click(function(){
//        var activeTab = $(this).attr("href");
//        $("#content_main").load(activeTab);
//
//        $("#menu_chk_text").text($(this).text());
//        $(".right_menu ul li").find("span").removeClass("red");
//        $(this).addClass("red");
//
//        obtainDivHeight();
//    });
//    $(".right_menu ul li").find("span").eq(0).trigger("click");
//
//    obtainDivHeight();
//
//    $("#Feedback").click(function () {
//        var object = {
//            getid        : $("#alertMask"),
//            text_title   : "意见反馈",
//            text_content : $("#feedBackMask").html(),
//            text_input1  : "提交"
//        }
//        com.mask(object);
//        $(".mask_main").css({'margin': '-240px -312.5px'});
//
//        $(".mask_main").attr("id","feed_back_mask");
//        $(".mask_title").css("background","#FFF");
//        $(".mask_input").hide();
//
//        $("#back_textarea").on("input", function () {
//            var text = $(this).val().length;
//            if(text < 151){
//                $(".numberSize").text(150-parseInt(text));
//            }
//            if(text >= 1){
//                $("#back_text1").attr("data","true").hide();
//            }else{
//                $("#back_text1").attr("data","false").show();
//            }
//        });
//
//        $("#back_phone").on("input", function () {
//            var text = $(this).val().length;
//            if(text >= 1){
//                $("#back_text2").attr("data","true").hide();
//            }else{
//                $("#back_text2").attr("data","false").show();
//            }
//        });
//
//        //提交意见反馈
//        $(".feedBack_submit").click(function () {
//            var text1 = $("#back_text1").attr("data");
//            var text2 = $("#back_text2").attr("data");
//            if(text1 === "true" && text2 === "true") {
//                var url = userLoginUrl + orderServiceUrl.add_message;
//
//                var content = $("#back_textarea").val();
//                var company_name = $("#company_name").val();
//                var back_phone = $("#back_phone").val();
//
//                var data = {
//                    msg_content : content,
//                    user_name : company_name,
//                    back_phone : back_phone
//                }
//                var success_callback = function (obj) {
//                    if ( obj == 3) {
//                        com.maskSuccess($("#alertMask"), "非常感谢，您的意见我们已经收到！");
//                    }
//                }
//                com.executeAjax(url, data, "POST", success_callback);
//            }
//        });
//    });
//}

$("#Feedback").click(function () {
    var object = {
        getid        : $("#alertMask"),
        text_title   : "意见反馈",
        text_content : $("#feedBackMask").html(),
        text_input1  : "提交"
    }
    com.mask(object);
    $(".mask_main").css({'margin': '-240px -312.5px'});

    $(".mask_main").attr("id","feed_back_mask");
    $(".mask_title").css("background","#FFF");
    $(".mask_input").hide();

    $("#back_textarea").on("input", function () {
        var text = $(this).val().length;
        if(text < 151){
            $(".numberSize").text(150-parseInt(text));
        }
        if(text >= 1){
            $("#back_text1").attr("data","true").hide();
        }else{
            $("#back_text1").attr("data","false").show();
        }
    });

    $("#back_phone").on("input", function () {
        var text = $(this).val().length;
        if(text >= 1){
            $("#back_text2").attr("data","true").hide();
        }else{
            $("#back_text2").attr("data","false").show();
        }
    });

    //提交意见反馈
    $(".feedBack_submit").click(function () {
       // var text1 = $("#back_text1").attr("data");
        //var text2 = $("#back_text2").attr("data");
       // if(text1 === "true" && text2 === "true") {
            var url = userLoginUrl + orderServiceUrl.add_message;

            var content = $("#back_textarea").val();
            var company_name = $("#company_name").val();
            var back_phone = $("#back_phone").val();

            var data = {
                msg_content : content,
                user_name : company_name,
                back_phone : back_phone
            }
            var success_callback = function (obj) {
                if ( obj == 3) {
                    com.maskSuccess($("#alertMask"), "非常感谢，您的意见我们已经收到！");
                }
            }
            com.executeAjax(url, data, "POST", success_callback);
       // }
    });
});

//获取右边菜单div的高度
function obtainDivHeight(){
    var isTrue = true;
    var $div = $("#content_main,.content_main");
    $div.removeAttr("style");
    div1Hight = $(".right_menu").outerHeight(true);
        function DivHeight() {
            if(isTrue){
                div2Hight = $div.outerHeight(true);
                if(div1Hight > div2Hight){
                    $div.css("height",div1Hight-1);
                    isTrue = false;
                }else{
                    $div.removeAttr("style");
                    isTrue = false;
                }

                /* 判断浏览器版本号，适配 */
                var version = com.browserVersion();
                version = version.split(":");
                version = version[1];
                version = version.substr(0,3);
                if (version == 53){
                    $(".unread_message").css("line-height","18px");
                }
                clearInterval(DivHeight);
            }
        }
    // setInterval(DivHeight,10);
    for(var i=0; i<5; i++){
        setTimeout(DivHeight,0);
    }
}


/****** personal_center.js ******/
function personal_center(){
    //关注商品与历史记录tab卡
    $(".order_con_title").find("c").click(function(){
        $(".order_con_title .tab").removeClass("border_b_red");
        $(this).parent("span").addClass("border_b_red");

        $(".history_record ul").hide();
        var activeTab = $(this).attr("href");
        $(activeTab).toggle();
        obtainDivHeight();
    });

    //关注商品删除
    $(".history_list_del").click(function(){
        $(this).parents(".history_list").remove();
    });

    //关注商品鼠标移上去显示删除按钮
    $(".history_list").mouseenter(function(){
        $(this).find(".history_list_del,.history_list_info").removeClass("vis_hide");
        $(this).find(".main_con_img_gz").show();
    });
    $(".history_list").mouseleave(function(){
        $(this).find(".history_list_del,.history_list_info").addClass("vis_hide");
        $(this).find(".main_con_img_gz").hide();
    });
}

//tab切换
function centerLeft() {
    var TabId = getQueryString("infoid");
    $(".right_menu ul li").find("a").removeClass("red");
    $(".right_menu ul li").find("a").eq(TabId-1).addClass("red");
}