// /**
//  * Created by Administrator on 2017/2/17 0017.
//  */
// var animateTime = 700,
//     step_item = 2;
// //开始
// $(function() {
//     var scrlObj = $("body > div.myScroll");
//     scrlObj.scrollTop(0);
//     if (browerObj.name == "firefox") {
//         window.addEventListener('DOMMouseScroll', wheel, false);
//     } else {
//         document.onmousewheel = wheel;
//     }
//     resizeHeight();
//     markEvent();
//     $(window).bind("resize",function() {
//         resizeHeight();
//     });
//     $("body").bind("mousewheel",function() {//chrome会设置body的scrollTop值
//         return;
//     });
//
//     $(document).bind("keyup",function(event) {
//         var e = event || window.event;
//         keyEvent(e);
//     });
// });
// //上下箭头控制翻页
// function keyEvent(e) {
//     var code = e.keyCode;
//
//     if(code == 40) {
//         handle(-1);
//     } else if(code == 38) {
//         handle(1);
//     }
// }
//
// function setMarginForIe8(zoom) {
//     var scrW = $("body > .myScroll").width()*zoom,
//         cW = $(window).width();
//
//     $("body > .myScroll").css("margin-left",(cW - scrW)/2+"px");
// }
//
// function resizeHeight() {
//     var cH = $(window).height(),
//         cW = $(window).width(),
//         name = browerObj.name,
//         ver = browerObj.version,
//         zoom = cH/1080,
//         scrlObj = $("body > div.myScroll > div.wrap > div"),
//         divObj = $("body > div.myScroll > div.wrap"),
//         onObj = $("body > div.myScroll > div.on"),
//         index = divObj.index(onObj);
//
//     // $("body").css('height',cH);
//     // if(name == "firefox") {
//     //     scrlObj.css({"-moz-transform":"scale(" + zoom + ")","-moz-transform-origin":"0% 0% 0"});//firefox
//     //     //setMarginForIe8(zoom);
//     // } else {
//     //     scrlObj.css({"zoom":zoom}); //
//     // }
//
//     // scrlObj.css("width",cW/zoom+"px");
//     // $("body > div.myScroll").scrollTop(index * cH);
// }
//
// //mark
// function markEvent() {
//     var mA = $("body > .nav > a");
//     len = mA.length,
//         onM = $("body > .nav > span.on");
//     mA.bind("click",function() {
//         var index = mA.index($(this)),
//             scrlDiv = $("body > div.myScroll"),
//             sH = scrlDiv.scrollTop(),
//             cH = scrlDiv.height(),
//             pos = index - mA.index(mA.filter(".active")),
//             times = Math.abs(pos);
//
//         if(!scrlDiv.is(":animated")) {
//             $("div.weixin_pop").hide();
//             $(this).addClass("active").siblings().removeClass("active");
//             onM.css("top",index*42+"px");
//             scrlDiv.animate({scrollTop:(sH + pos*cH) + "px"},animateTime,function() {
//                 scrlDiv.children("div:eq("+index+")").addClass("on css3").siblings("div").removeClass("on");
//                 if(index == 0) {
//                     step_item = 2;
//                     scrlDiv.children("div").removeClass("css3").filter(":eq(3)").find(".min4_bd > .min4_step").removeClass("step_item2_on step_item3_on step_item4_on step_item5_on step_item6_on step_item7_on step_item8_on");
//                 }
//             });
//         }
//     });
// }
//
// function unBindScroll(delay) {
//     if (browerObj.name == "firefox") {
//         window.removeEventListener('DOMMouseScroll', wheel, false);
//     } else {
//         document.onmousewheel = null;
//     }
//     setTimeout(function() {
//         if (browerObj.name == "firefox") {
//             window.addEventListener('DOMMouseScroll', wheel, false);
//         } else {
//             document.onmousewheel = wheel;
//         }
//     },delay);
// }
//
// //scroll
// function handle(delta) {
//     var scrlDiv = $("body > div.myScroll"),
//         divObj = scrlDiv.children("div"),
//         onObj = divObj.filter(".on"),
//         len = divObj.length,
//         index = divObj.index(onObj),
//         sH = scrlDiv.scrollTop(),
//         cH = scrlDiv.height(),
//         onM = $("body > .nav > span.on");
//
//     if (delta <0) {//down
//         if(index <= len - 2 && !scrlDiv.is(":animated")) {
//             index++;
//             $("body > .nav > a:eq("+index+")").addClass("active").siblings().removeClass("active");
//             onM.css("top",index*42+"px");
//             scrlDiv.animate({scrollTop:(sH + cH) + "px"},animateTime,function() {
//                 onObj.removeClass("on").next("div").addClass("on css3");
//                 unBindScroll(800);
//             });
//         }
//     } else {//up
//         $("div.weixin_pop").hide();
//         if(index > 0 && !scrlDiv.is(":animated")) {
//             index--;
//             $("body > .nav > a:eq("+index+")").addClass("active").siblings().removeClass("active");
//             onM.css("top",index*42+"px");
//             scrlDiv.animate({scrollTop:(sH - cH) + "px"},animateTime,function() {
//                 onObj.removeClass("on").prev("div").addClass("on css3");
//                 unBindScroll(800);
//                 if(index == 0) {
//                     step_item = 2;
//                     divObj.removeClass("css3").filter(":eq(3)").find(".min4_bd > .min4_step").removeClass("step_item2_on step_item3_on step_item4_on step_item5_on step_item6_on step_item7_on step_item8_on");
//                 }
//             });
//         }
//     }
// }
// //ensure direction
// function wheel(event){
//     var delta = 0;
//     if (!event) event = window.event;
//     if (event.wheelDelta) {
//         delta = event.wheelDelta/120;
//         if (window.opera) delta = -delta;
//     } else if (event.detail) {
//         delta = -event.detail/3;
//     }
//     if (delta) {
//         handle(delta);
//     }
// }



var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    effect: 'flip',
    grabCursor: true,
    loop : true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    // autoplay : 3000,
    // speed:3000,
});

$(window).scroll(function() {
    var bg01H = $(".bg01").height();
    var bodytop = $("body").scrollTop();
    var htmltop = $("html").scrollTop();
    var num = 300
    var winH = document.documentElement.clientHeight;
    // console.log(bg03_top)
    function transLatesy(e) {
        e.css({
            "-webkit-transform": "translateY(30px)",
            "-moz-transform": "translateY(30px)",
            "-ms-transform": "translateY(30px)",
            "-o-transform": "translateY(30px)",
            "transform": "translateY(30px)",
        })
    }
    function transLatef(e) {
        e.css({
            "-webkit-transform": "translateY(0px)",
            "-moz-transform": "translateY(0px)",
            "-ms-transform": "translateY(0px)",
            "-o-transform": "translateY(0px)",
            "transform": "translateY(0px)",
        })
    }
    // if ((bodytop>bg02_content_top - num || htmltop>bg02_content_top - num)&& (bodytop+winH>bg02_content_top || htmltop+winH>bg02_content_top)){
    //     transLatesy(bg02_content)
    // }else{
    //     transLatef(bg02_content)
    // }

    // if ((bodytop>income_box_title_top - num || htmltop>income_box_title_top - num)&& (bodytop+winH>income_box_title_top || htmltop+winH>income_box_title_top)){
    //     transLatesy(income_box_title);
    //
    // }else{
    //     transLatef(income_box_title)
    // }

    // if ((bodytop>bg03_top - num || htmltop>bg03_top - num)&& (bodytop+winH>bg03_top || htmltop+winH>bg03_top)){
    //     // transLatesy(bg03_title);
    //
    // }else{
    //     // transLatef(bg03_title)
    // }
});

var btm_btn = document.getElementById("btm_btn");
var htlscrolltop = document.documentElement.scrollTop;
var bodyscrolltop = document.body.scrollTop;
var form_box = document.getElementsByClassName("form_box")[0];
var row_leftcrolltop = form_box.scrollTop;
var htltag = document.getElementsByTagName("html")[0];
var bodytag = document.getElementsByTagName("body")[0];
btm_btn.onclick = function(){
    htlscrolltop = row_leftcrolltop;
    bodyscrolltop = row_leftcrolltop;
}

$('.btm_btn').click(function(){
    $('html').animate({
            scrollTop:$('.form_box').offset().top
        },
        1000);
    $('body').animate({
            scrollTop:$('.form_box').offset().top
        },
        1000);
});
$(".link_service_btn").click(function(){
    window.open("help/contact.html")
});
// var data = {
//     Province : "#Province",
//     City  : "#City",
//     isShow: false
// };
// com.provinceCityArea(data);
$(".submit_btn").click(function(){
    var user_name = $("#user_name").val();
    var user_tel = $("#user_tel").val();
    var user_Province = $("#s_province").val();
    var user_City = $("#s_city").val();
    var user_industry = $("#user_industry").val();
    var user_company = $("#user_company").val();
    var all_input = $(".form_box").find("input");
    for (var i=0 ;i<all_input.length; i++){
        all_input.focusin(function(){
            all_input.css({
                border: "1px solid #d6d6d6"
            })
        })
    }
    if (user_name==""){
        $("#user_name").css({
            border: "1px solid red"
        });
        return;
    }else if (user_tel=="" || isNaN(user_tel) ){
        $("#user_tel").css({
            border: "1px solid red"
        });
        return;
    }else if (user_industry==""){
        $("#user_industry").css({
            border: "1px solid red"
        });
        return;
    }else if (user_company==""){
        $("#user_company").css({
            border: "1px solid red"
        });
        return;
    }else {
        var url = Url+"city_partner.php?act=city_partner";
        console.log(url)
        var data = {
            "username"     : $("#user_name").val(),
            "tel"          : $("#user_tel").val(),
            "address"      : $("#user_addr").val(),
            "industry"     : $("#user_industry").val(),
            "company"      : $("#user_company").val()
        }
        com.executeAjax(url,  data ,"POST",function (result) {
            $(".pop_success").show();
            $(".s_tit_close,.s_yes").click(function(){
                $(".pop_success").hide();
                location.reload() ;
            });

        });
        // $.ajax({
        //     type: "post",
        //     url: url,
        //     async : false,
        //     dataType: "json",
        //     success: function (data){
        //         var
        //         console.log("提交成功")
        //     },
        //     error:function (data) {
        //         alert("请求失败！");
        //     }
        // });
    }


})