/**
 * Created by Gold on 2016/11/21.
 */

$(function () {
    //分别加载页眉，头部，页脚，侧边栏
    $("#titleTemp_main").load("lib/temp/page_title.html");
    $("#titleTemp2_main").load("lib/temp/page_title2.html");
    $("#bottomTemp_main").load("lib/temp/page_bottom.html");
    $("#sidebarTemp_main").load("lib/temp/page_sidebar.html");
    com.isTitleMenuShow(false);
    // var Width = $("body").outerWidth();
    // $(".img_banner").css("min-width", 1190+"px");
});

function special_district() {
    var url2  = promote1Url+orderServiceUrl.brand;
    var BrandId   = []; //品牌id
    var BrandName = []; //品牌name
    var isScr = true;

    com.executeAjax(url2, "", "GET", function (result) {
        var app = new Vue({
            el   : "#floorBrand",
            data : {list:result.brand}
        });

        var p=0;
        var stop=true;    //触发开关，防止多次调用事件

        //循环Brand id 存放
        $.each(result.brand, function (i, obj) {
            BrandId.push(obj.brand_id);
            BrandName.push(obj.brand_name);
        });

        ScrollData(p);
        p=p+1;  //当前要加载的页码
        $(window).scroll(function() {
            //当内容滚动到底部时加载新的内容 100当距离最底部100个像素时开始加载.
            if ($(this).scrollTop() + $(window).height() + 410 >= $(document).height() && $(this).scrollTop() > 410) {
                if(stop){
                    stop=false;
                    // $(".loading").show();

                    //滚动一次加载一次  p 是用数组下标到BrandId去拿id
                    ScrollData(p);
                    p=p+1;  //当前要加载的页码
                    stop=true;
                }
            }
        });

        $(".floor li").click(function(){
            if(!stop){
                return false;
            }
            var text2 = $(this).index();    //点击当前的下标
            for(var i=0; i<text2; i++){     //循环点的第几个，就加载多少次
                setTimeout(function () {
                    ScrollData(p);
                    p=p+1;//当前要加载的页码
                },i*100);
            }

            if(isScr){
                setTimeout(function () {
                    scr();
                    isScr = false;
                },100*text2);
            }else{
                scr();
            }

            function scr() {
                var floor      = $(".title_text");
                var clickFloor = [];
                for(var i=0; i<floor.length; i++){
                    var text = $(".title_text").eq(i).offset().top;
                    clickFloor.push(text);
                    // clickFloor[0] = clickFloor[0]-40;
                }
                $('html,body').animate({
                    scrollTop : clickFloor[text2-1]
                },300);
            }
        });

        var floorHeight = $(".floor").outerHeight();
        $(".floor").css("margin-top","-"+floorHeight/2+"px");

        $("#backTop").click(function () {
            com.backTop();
        });

        $("#top1").click(function () {
            var top = $(".background").offset().top;
            $('html,body').animate({
                scrollTop : top+30
            },300);
        });


        function ScrollData(p) {
            // consoleLog("+++++++++++++"+p);
            var Type = typeof BrandId[p] == "string";
            if(!Type){
                return false;
            }

            var url  = promote1Url+orderServiceUrl.goods+"&id="+BrandId[p];

            com.executeAjax(url, "", "POST", function (result) {
                /*$.each(result.goods, function (i, result) {
                    var name   = result.name.length;
                    var number = 33;

                    if(name > number){
                        result.name = result.name.substr(0,number)+"...";
                    }
                });*/
                isScr = false;
                // consoleLog("==========="+BrandId);
                // consoleLog("==========="+BrandName);
                // setTimeout(function () {
                // $(".loading").hide();
                var $html1 = '<p class="fs_24px white center title_text">【'+BrandName[p]+'】</p><ul class="over_hide special_list" id="list'+p+'"></ul>';
                $("#special_list").append($html1);
                $.each(result.goods, function (i, obj) {
                    var $html = '<li class="special_list_li"> ' +
                        '<div class="img"> ' +
                        '<img src="'+obj.thumb+'" /> ' +
                        '</div> ' +
                        '<p class="li_he_20px f_c_333 textHide fs_14px mar_t_15px" title="'+obj.name+'">'+obj.name+'</p> ' +
                        '<div class="over_hide pay_div">' +
                        '<div class="over_hide">' +
                        '<span class="red2 fl"><p class="fs_24px">'+obj.shop_price+'</p></span> ' +
                        '<div class="fr li_he_15px"> ' +
                        '<s class="fs_12px f_c_999">'+obj.promote_price+'</s> ' +
                        '<p class="fs_12px">已售<span class="red2">'+obj.cum_sales+'</span>件</p> ' +
                        '</div> ' +
                        '</div> ' +
                        '<span class="panic_buying toInfo" id='+ obj.id +'>立即抢购</span> ' +
                        '</div> ' +
                        '</li> ';
                        $("#list"+p).append($html);
                });
                // },1000);
                $(".toInfo").click(function () {
                    var Id = $(this).attr("id");
                    location.href = "product_list_info.html?infoId="+Id;
                });
            });
        }
    });

    Scroll();
    window.onscroll = function() {
        Scroll();
    }
    function Scroll() {
        var floor = $(".floor");
        var top   = $(".background").offset().top;
        var bottom   = $("#bottomTemp_main").offset().top-360;
        if($(document).scrollTop() > top) {
            floor.show();
        }else{
            floor.hide();
        }
        if($("body").scrollTop() > bottom) {
            floor.hide();
        }
    }

    var url3  = promote1Url+orderServiceUrl.goods+"&is_hot=1";
    com.executeAjax(url3, "", "POST", function (result) {
        var app1 = new Vue({
            el   : "#hotProducts",
            data : {list:result.goods},
            methods:{
                toInfo:function (id) {
                    location.href = "product_list_info.html?infoId="+id;
                }
            }
        })
    });
}