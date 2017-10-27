// /**
//  * Created by Administrator on 2017/2/17 0017.
//  */




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
    var bg02_content = $(".bg02_content");
    var bg02_content_top =  $(".bg02_content").offset().top;

    var income_box_title_top = $(".income_box").offset().top;
    var income_box_title = $(".income_box_title");

    var bg03_top = $(".bg03").offset().top;
    var bg03_title = $(".bg03_title");
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
    if ((bodytop>bg02_content_top - num || htmltop>bg02_content_top - num)&& (bodytop+winH>bg02_content_top || htmltop+winH>bg02_content_top)){
        transLatesy(bg02_content)
    }else{
        transLatef(bg02_content)
    }

    if ((bodytop>income_box_title_top - num || htmltop>income_box_title_top - num)&& (bodytop+winH>income_box_title_top || htmltop+winH>income_box_title_top)){
        transLatesy(income_box_title);

    }else{
        transLatef(income_box_title)
    }

    if ((bodytop>bg03_top - num || htmltop>bg03_top - num)&& (bodytop+winH>bg03_top || htmltop+winH>bg03_top)){
        // transLatesy(bg03_title);

    }else{
        // transLatef(bg03_title)
    }
});

var btm_btn = document.getElementById("btm_btn");
var htlscrolltop = document.documentElement.scrollTop;
var bodyscrolltop = document.body.scrollTop;
var row_left = document.getElementsByClassName("row_left")[0];
var row_leftcrolltop = row_left.scrollTop;
var htltag = document.getElementsByTagName("html")[0];
var bodytag = document.getElementsByTagName("body")[0];
btm_btn.onclick = function(){
    htlscrolltop = row_leftcrolltop;
    bodyscrolltop = row_leftcrolltop;
}

$('.btm_btn').click(function(){
    $('html').animate({
            scrollTop:$('.row_left').offset().top
        },
        1000);
    $('body').animate({
            scrollTop:$('.row_left').offset().top
        },
        1000);
});
$(".link_service_btn").click(function(){
    window.open("help/contact.html")
});

var data = {
    Province : "#Province",
    City  : "#City",
    isShow: false
};
com.provinceCityArea(data);
$(".submit_btn").click(function(){
    var user_name = $("#user_name").val();
    var user_tel = $("#user_tel").val();
    var user_Province = $("#s_province").val();
    var user_City = $("#s_city").val();
    var user_industry = $("#user_industry").val();
    var user_company = $("#user_company").val();
    var all_input = $(".row_left").find("input");
    for (var i=0 ;i<all_input.length; i++){
        all_input.focusin(function(){
            all_input.css({
                border: "1px solid transparent"
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
        var data = {
            "username"     : $("#user_name").val(),
            "tel"          : $("#user_tel").val(),
            "address"      : user_Province+"_"+user_City,
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