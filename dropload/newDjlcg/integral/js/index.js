/**
 * Created by Administrator on 2017/4/6 0006.
 */
$(function(){
    //分别加载页眉，头部，页脚，侧边栏
    $("#titleTemp_main").load("../lib/temp/page_title.html");
    $("#bottomTemp_main").load("../lib/temp/page_bottom.html");


    /*轮播图*/
    var mySwiper1 = new Swiper('.swiper-container1',{
        pagination: '.pagination1',
        loop:true,
        speed: 500,
        autoplay : 5000,
        grabCursor: true,
        paginationClickable: true
    });
    $('.arrow-left').on('click', function(e){
        e.preventDefault();
        mySwiper1.swipePrev();
    });
    $('.arrow-right').on('click', function(e){
        e.preventDefault();
        mySwiper1.swipeNext();
    });

    var swiper = new Swiper('.swiper-container3', {
        loop:true,
        speed: 300,
        //autoplay : 3000,
        grabCursor: true,
        paginationClickable: true
    });
    $(".swiper_clear").click(function () {
        $(".swiper-container3").hide();
    });

    /*登录状态*/
    var cookieUserName =  $.cookie("ECS[username]");
    if(cookieUserName){
        $(".menu_login_integral").removeClass("hide");
        $("#integral_exchange").removeClass("hide");
        $(".menu_login_title").addClass("hide");
        $(".menu_login_login").addClass("hide");
    }else{
        $(".menu_login_integral").addClass("hide");
        $("#integral_exchange").addClass("hide");
        $(".menu_login_title").removeClass("hide");
        $(".menu_login_login").removeClass("hide");
    }

    /*table*/
    tabShow();
    function tabShow(){
        $(".integral_product_title ul li").click(function(){
            $(".integral_product_title ul li").removeClass("red");
            $(this).addClass("red");
            var width = $(this).width() + 26;
            var index = $(this).index();
            var left = index*width + 13 +'px';
            $(".xq_move").css("left",left);
        })

    }

    /*分页*/

    $("#Pagination").pagination( {
        num_edge_entries    : 1, //边缘页数
        num_display_entries : 4, //主体页数
        items_per_page      : 10, //每页显示项
        prev_text           : "前一页",
        next_text           : "后一页",
        current_page        :5
    });

    var pageTabWidth = $("#Pagination").outerWidth();
    $("#Pagination").css("margin-left", "-"+pageTabWidth/2+"px");




    /*商品显示效果*/
    divShadow();
    function divShadow() {
        $(".integral_product_list li").mouseenter(function(){
            $(this).removeClass("rem_shadow_5px");
            $(this).addClass("shadow_5px");
        });
        $(".integral_product_list li").mouseleave(function(){
            $(this).removeClass("shadow_5px");
            $(this).addClass("rem_shadow_5px");
        });
    }

});