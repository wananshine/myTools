/**
 * Created by Gold on 2016/10/14.
 */
$(function(){

    //分别加载页眉，头部，页脚，侧边栏
    $("#titleTemp_main").load("lib/temp/page_title.html");
    $("#titleTemp2_main").load("lib/temp/page_title2.html");
    $("#bottomTemp_main").load("lib/temp/page_bottom.html");
    $("#sidebarTemp_main").load("lib/temp/page_sidebar.html");






    /* 通知 */
    /*var notice = $.cookie('notice');
    if(!notice){
        $(".notice,.notice_bg").show();
        $(".notice_btn").click(function () {
            $(".notice,.notice_bg").hide();
            //window.location.href = 'new_year.html';
            $.cookie('notice', 'true', { expires: 1 });
        });
    }*/
    /* 欢迎 */
    var welcome = $.cookie('welcome');
     if(!welcome){
        $(".djl_welcome").addClass("welcomec3");
        $.cookie('welcome', 'true', { expires: 1 });
     }

    /*秒杀弹框*/
    var spike = $.cookie('spike');
     // if(!spike){
     //     var url  = seckillUrl+orderServiceUrl.goods;
     //     com.executeAjax(url,"","GET",function(resule){
     //         if(resule.time.one.status == 3){
     //             if(resule.time.second.status == 3){
     //                 $(".spike,.spike_bg").hide();
     //             }else{
     //                 var second_now = resule.time.second.now;                  //第一场现在时间
     //                 var second_start = resule.time.second.start_time;         //第一场开始时间
     //                 var second_end = resule.time.second.second_time;             //第一场结束时间
     //                 var second_successFun = function (result) {
     //                     $(".spike .text span").html('距离开始:<u><em>'+result.Day+'</em>天<em>'+result.Hour+'</em>时<em>'+result.Minute+'</em>分<em>'+result.Second+'</em>秒</u>');
     //                 };
     //                 var second_errorFun = function () {
     //                     var second_now = resule.time.second.now;   //开始时间
     //                     var second_end = resule.time.second.second_time;   //结束时间
     //                     var second_successFun2 = function (result) {
     //                         $(".spike .text span").html('距离结束:<u><em>'+result.Day+'</em>天<em>'+result.Hour+'</em>时<em>'+result.Minute+'</em>分<em>'+result.Second+'</em>秒</u>');
     //                     };
     //                     var second_errorFun2 = function () {
     //                         $(".spike .text span").html("已结束");
     //                     };
     //                     com.countDown(second_now, second_end, second_successFun2, second_errorFun2);
     //                 };
     //                 com.countDown(second_now, second_start, second_successFun, second_errorFun);
     //             }
     //         }else{
     //             var one_now = resule.time.one.now;                  //第一场现在时间
     //             var one_start = resule.time.one.start_time;         //第一场开始时间
     //             var one_end = resule.time.one.end_time;             //第一场结束时间
     //             var one_successFun = function (result) {
     //                 $(".spike .text span").html('距离开始:<u><em>'+result.Day+'</em>天<em>'+result.Hour+'</em>时<em>'+result.Minute+'</em>分<em>'+result.Second+'</em>秒</u>');
     //             };
     //             var one_errorFun = function () {
     //                 var one_now = resule.time.one.now;   //开始时间
     //                 var one_end = resule.time.one.end_time;   //结束时间
     //                 var one_successFun2 = function (result) {
     //                     $(".spike .text span").html('距离结束:<u><em>'+result.Day+'</em>天<em>'+result.Hour+'</em>时<em>'+result.Minute+'</em>分<em>'+result.Second+'</em>秒</u>');
     //                 };
     //                 var one_errorFun2 = function () {
     //                     $(".spike .text span").html("已结束");
     //                 };
     //                 com.countDown(one_now, one_end, one_successFun2, one_errorFun2);
     //             };
     //             com.countDown(one_now, one_start, one_successFun, one_errorFun);
     //         }
     //     });
     //     $(".spike,.spike_bg").show();
     //     $(".spike_close").click(function () {
     //         $(".spike,.spike_bg").hide();
     //         $.cookie('spike', 'true', { expires: 1 });
     //     });
     //     $(".spike_btn").click(function () {
     //         $(".spike,.spike_bg").hide();
     //         window.location.href = 'spike.html';
     //         $.cookie('spike', 'true', { expires: 1 });
     //     });
     // }


    var cookieUserName =  $.cookie("ECS[username]");
    if(cookieUserName){
        global.isLogin = true;
        $("#userName").text(cookieUserName);
        $("#userName").parent().attr("title",cookieUserName);
        //订单首页未收货和付款数量
        /*com.executeAjax(orderUrl+orderServiceUrl.status_count, "", "GET", function (result) {
         new Vue({
         el: '#myOrderSumTemp',
         data: result.data,
         methods:{
         statusFilter:function(statusName){
         inited = false;
         productList(0,statusName);
         obtainDivHeight();
         }
         }
         });
         });*/

        //会员认证接口
        var infoUrl = userInfoUrl+orderServiceUrl.user_info;
        var infoData = {
            info : 'identif'
        };
        com.executeAjax(infoUrl, infoData, "GET", function (result) {   //0 是未认证用户   1 是待审核    2是审核未通过    3是审核通过
            global.isLoginRZ = true;
            $(".login_true_rz").show();
            //$(".login_false_rz").hide();
            new Vue({
                el: '#identif',
                data: {list:result}
            });

            //订单首页未收货和付款数量
            com.executeAjax(orderUrl+orderServiceUrl.status_count, "", "GET", function (result) {
                var msgUrl = userCenterUrl+orderServiceUrl.message_list;
                com.executeAjax(msgUrl, "", "GET", function (obj) {
                    result.data['sum'] = obj.data.total;
                    new Vue({
                        el: '#login_temp',
                        data: {list:result.data}
                    });
                });
            });

            $(".login_help").click(function(){
                $(".login_img_help").toggle();
            });
        });
    }

    //首页文章列表接口
    $.ajax({
        url:"http://djlzix.com/index_article.php",
        dataType:'jsonp',
        data:'indexTop',
        jsonp:'callback',
        timeout:3000,
        success:function(result) {
            var articleT = new Vue({
                el: '#login_tab',
                data: {result : result}
            });
        }
    });



    $.ajax({
        url:"http://djlzix.com/index_article.php",
        dataType:'jsonp',
        data:'indexFoot',
        jsonp:'callback',
        timeout:3000,
        success:function(result) {
            consoleLog("index_article："+JSON.stringify(result));
            var article1 = new Vue({
                el: '#artL',
                data: {result : result}
            });
            var articleF2 = new Vue({
                el: '#artL2',
                data: {result : result}
            });
            var articleF3 = new Vue({
                el: '#artR',
                data: {result : result}
            });




            var mySwiper1 = new Swiper('.swiper-container2',{
                loop:true,
                speed: 500,
                autoplay : 5000,
                grabCursor: true,
                noSwiping : true,
                paginationClickable: true,
                prevButton:'.arrow-left2',
                nextButton:'.arrow-right2'
            });
            /*$('.arrow-left2').on('click', function(e){
             e.preventDefault();
             mySwiper1.swipePrev();
             });
             $('.arrow-right2').on('click', function(e){
             e.preventDefault();
             mySwiper1.swipeNext();
             });*/
        }
    });


    //登陆公告切换
    /*$(".login_bulletin p").mouseenter(function(){
     $(".login_bulletin p").removeClass("border_b_red");
     $(this).addClass("border_b_red");

     $(".login_bulletin_content").hide();
     var activeTab = $(this).attr("data-url");
     $(activeTab).show();
     });*/

    //tabShow(".main_content li",".main_content_img");

    //tab选项卡切换
    /*function tabShow(getClass,getshow){
     $(getClass).mouseenter(function(){
     $(getClass).removeClass("border_b2_red");
     $(this).addClass("border_b2_red");

     $(getshow).hide();
     var activeTab = $(this).attr("data-url");
     $(activeTab).show();

     var res = $(this).attr("data");
     today(res, activeTab);
     });
     }*/
    //登陆公告切换
    $(".login_bulletin p").mouseenter(function(){
        var index = $(this).index();
        var thisWidth = $(this).width();
        if(index === 0){
            var left = 20 + "px";
        }
        if(index === 1){
            var width = $(".login_bulletin p").eq(index - 1).width() +20;
            var left = 20 + width + "px";
        }
        if(index === 2){
            var width = $(".login_bulletin p").eq(index - 1).width() + $(".login_bulletin p").eq(index - 2).width() +40;
            var left = 20 + width + "px";
        }
        $(".xq_move1").css({
            "left"  : left,
            "width" : thisWidth
        });

        $(".login_bulletin_content").hide();
        var activeTab = $(this).attr("data-url");
        $(activeTab).show();
    });

    /*产品动态*/
    var moveUrl = menuUrl+orderServiceUrl.news;
    com.executeAjax(moveUrl,'','GET',function(result){
        new Vue({
            el:"#moving_content",
            data:{list:result.content}
        })
        var Mar = document.getElementById("moving_content");
        var child_div=Mar.getElementsByTagName("a");
        var picH = 22;//移动高度
        var scrollstep=3;//移动步幅,越大越快
        var scrolltime=20;//移动频度(毫秒)越大越慢
        var stoptime=3000;//间断时间(毫秒)
        var tmpH = 0;
        Mar.innerHTML += Mar.innerHTML;
        function start(){
            if(tmpH < picH){
                tmpH += scrollstep;
                if(tmpH > picH )tmpH = picH ;
                Mar.scrollTop = tmpH;
                setTimeout(start,scrolltime);
            }else{
                tmpH = 0;
                while(child_div.length){ 
                Mar.appendChild(child_div[0]); 
                } 
			    Mar.scrollTop = 0;
                setTimeout(start,stoptime);
            }
        }
        setTimeout(start,stoptime);
    });
    /*tabShow();
     today(2, '#main_con_tab2');
     //tab选项卡切换
     function tabShow(){
     $(".main_content li").mouseenter(function(){
     $(".main_content li").removeClass("f_c_333");
     $(this).addClass("f_c_333");
     var width = $(this).width() + 45;
     var index = $(this).index() - 1;
     var left = index*width - width + 152 +'px';
     $(".xq_move").css("left",left);
     $(".main_content_img").hide();
     var activeTab = $(this).attr("data-url");
     $(activeTab).show();

     var res = $(this).attr("data");
     today(res, activeTab);
     })

     }*/
    /*today(2, '#main_con_tab2');
     function today(res, getId) {
     //今日推荐
     var data = {
     type : res,
     num  : 6
     };
     com.executeAjax(menuUrl+orderServiceUrl.cat_goods, data, "GET", function (result) {

     $.each(result.content, function (i, result) {
     var name = result.name.length;
     //              if(name > 30){
     //                  result.name = result.name.substr(0,30)+"...";
     //              }
     });

     var app = new Vue({
     el: getId,
     data: {result : result.content}
     });

     $(".today_href").click(function () {
     var text = $(this).attr('id');
     window.open('product_list_info.html?infoId='+ text);
     });

     app.result.splice(result.content.length);
     app.result = result.content;
     gzButton();
     });
     }

     forListLenght("#login_tab1 li",3);
     forListLenght("#login_tab2 li",3);
     forListLenght("#login_tab3 li",3);

     //超出4条数据隐藏
     function forListLenght(id,size){
     var a = $(id);
     for(var i=0; i< a.length; i++){
     if(i>size){
     $(id).eq(i).addClass("hide");
     }
     }
     }*/
    //今日推荐
    com.executeAjax(menuUrl+orderServiceUrl.recommend, {}, "GET", function (result){
        var app = new Vue({
            el:"#main_con_today",
            data:{result:result.content}
        });
        /*$(".today_href").click(function () {
         var text = $(this).attr('id');
         window.open('product_list_info.html?infoId='+ text);
         });*/
        var swiperToday = new Swiper('.swiper-container4', {
            loop:true,
            speed: 500,
            //autoplay : 3000,
            //grabCursor: true,
            paginationClickable: true,
            noSwiping : true,
            prevButton:'.today-left',
            nextButton:'.today-right',
            slidesPerView : 5,
            slidesPerGroup : 5
        });
    });
    //品牌区
    com.executeAjax(menuUrl+orderServiceUrl.brand, "", "GET", function (result) {
        var app = new Vue({
            el: "#brandTemp",
            data: {result : result.content, maxImg : result.content[0].logo},
            methods:{
                toBrand:function (id) {
                    window.open("NewBrandZone.html?id="+id);
                }
            }
        });
        app.result.splice(result.content.length);
        app.result = result.content;

        //品牌专区
        $(".main_brand_zone li").mouseenter(function(){
            $(this).find(".brand_list_mask").css("top","0");
        });
        $(".main_brand_zone li").mouseleave(function(){
            $(".main_brand_zone li").find(".brand_list_mask").removeAttr("style");
        });

        //品牌专区
        $(".brand_main_more").mouseenter(function(){
            $(this).addClass("bg_light_dd3e3e").find("a").addClass("white");
            $(this).find("i").css("background-position","-57px -143px");
        });
        $(".brand_main_more").mouseleave(function(){
            $(".brand_main_more").removeClass("bg_light_dd3e3e").removeAttr("style");
            $(".brand_main_more a").removeClass("white").removeAttr("style");
            $(".brand_main_more").find("i").removeAttr("style");
        });
    });

    $(".main_content").eq(0).addClass("mar_t_25px");

    //楼层奇数偶数border-top颜色
    $(".main_floor:even").css("border-top","2px solid #e53935");
    $(".main_floor:odd").css("border-top","2px solid #c43737");

    $(window).scroll(function(){
        scr($(this));
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var height = document.documentElement.clientHeight || document.body.clientHeight;
        var num = 0;
		for(var i = 0; i < $(".floor").length;i++){
            if(scrollTop >= $(".floor")[i].offsetTop - 60){
                num = i;
            }
        }
        $(".left_floor li").eq(num).find("span").addClass("floor_active").parent("li").siblings().find("span").removeClass("floor_active");
        $(".floor .main_floor_img").eq(num).find(".move_buy").addClass("active").parents(".floor").siblings().find(".move_buy").removeClass("active");
    });
    function scr($obj) {
        if($obj.scrollTop()>600) {
            $(".scroll_top").css({"opacity":"1","top":"0"});
            $(".left_floor").show();

        }else{
            $(".scroll_top").css({"opacity":"0","top":"-60px"});
            $(".left_floor").hide();
        }
    }

    // var data = {
    //     inputName      : ".title3_input input",
    //     search_div     : ".search_result3",
    //     search_result  : ".search_result3 li"
    // }
    // com.searchList(data);

    //登陆状态
    if(global.isLogin){
        $(".login_true").show();
        $(".login_false").hide();
        $(".menu_login_title").removeClass("over_hide");
        $(".menu_login").css({"background-image":"none"});
        if(global.isLoginRZ){
            $(".login_true_rz").show();
            $(".login_false_rz").hide();
        }else{
            $(".login_true_rz").hide();
            $(".login_false_rz").show();
        }
    }else{
        $(".menu_login_title").addClass("over_hide");
        $(".login_true").hide();
        $(".login_false").show();
    }

    var main_content2 = $(".main_content2");
    for(var i=0; i<main_content2.length; i++){
        var text = main_content2.eq(i).find("li");
        if(text.length > 4){
            text.eq(4).text("更多");
        }
    }

    //banner广告图
    com.executeAjax(menuUrl+orderServiceUrl.banner, {ad_id : 1}, "GET", function (result) {
        var app = new Vue({
            el: '#bannerImgTemp',
            data: {result : result}
        });
        var mySwiper1 = new Swiper('.swiper-container1',{
            pagination: '.pagination1',
            loop:true,
            speed: 500,
            autoplay : 5000,
            //grabCursor: true,
            paginationClickable: true,
            prevButton:'.arrow-left',
            nextButton:'.arrow-right',
            effect : 'fade',
            noSwiping : true
            /*onSlideChangeStart: function(swiper){
             var index = swiper.realIndex;
             switch (index){
             case 0:
             bgColor="#31528b";
             break;
             case 1:
             bgColor="#3ec6f6";
             break;
             case 2:
             bgColor="#29b0e8";
             break;
             case 3:
             bgColor="#d42d2d";
             break;
             case 4:
             bgColor="#0067b2";
             break;
             }
             $("#bannerImgTemp").css({"background-color":bgColor,"opacity":"1","transition": "all 500ms","-o-transition": "all 500ms","-moz-transition": "all 500ms","-webkit-transition": "all 500ms"})
             }*/

        });

        /*$('.arrow-left').on('click', function(e){
         e.preventDefault();
         mySwiper1.swipePrev();
         });
         $('.arrow-right').on('click', function(e){
         e.preventDefault();
         mySwiper1.swipeNext();
         });*/

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
    });

    //侧边楼层分类
    var menuData = {
        // n     : 0,    //列表条数 1就一条
        m     : 0    //列表条数下面数据开始的位置  *这个参数是数组下标
        // level : 3     //列表下面的分类数据  *从2级分类开始
    };
    com.executeAjax(menuUrl+orderServiceUrl.cat, menuData, "GET", function (result) {
        var floorVal = [];
        $.each(result.content, function (i, obj) {
            /*var a = obj.name.split("、");
             obj.name = a[0];*/
            floorVal.push(obj);
        });

        var app = new Vue({
            el: '#main_floor',
            data: {result : floorVal},
            methods:{
                mainBackTop:function () {
                    com.backTop();
                }
            }
        });
        $(".left_floor li").mouseenter(function(){
            var index = $(this).index();
            $(this).find("span").addClass("floor_active1");
            $(this).find("span").text(floorVal[index-1].name+" / "+floorVal[index-1].name1)
        })
        $(".left_floor li").mouseleave(function(){
            var index = $(this).index();
            $(this).find("span").removeClass("floor_active1");
            $(this).find("span").text( floorVal[index-1].name )
        })
    });

    //楼层模板
    var floorData = {
        level : 1,
        n     : 26,
        num   : 1
    };
    com.executeAjax(menuUrl + orderServiceUrl.cat, floorData, "GET", function (result) {

        var app = new Vue({
            el: '#floorTemp',
            data: {result : result.content},

            methods:{
                toListInfo:function (url) {
                    url = url.split("=");
                    url = url[1];
                    window.open('product_list.html?id='+ url);
                },
                toListInfo2:function (url) {
                    url = url.split("=");
                    url = url[1];
                    window.open('product_list_info.html?infoId='+ url);
                },
                toList:function (url) {
                    window.open('product_list.html?keywords='+ url);
                }
            }
        });
        gzButton();

        var floor      = $(".floor");
        var clickFloor = [];
        for(var i=0; i<floor.length; i++){
            var text = $(".floor").eq(i).offset().top;
            clickFloor.push(text - 50);
        }

        $(".left_floor li").click(function(){
            var text = $(this).index();
            $('html,body').animate({
                scrollTop : clickFloor[text-1]
            },500);
            /*$(".left_floor li").find("span").removeClass("floor_active");
             $(this).find("span").addClass("floor_active");*/
        });
        /*$(".backTop").click(function(){
         com.backTop();
         });*/
        $(".main_content2 li").mouseenter(function () {
            $(this).addClass("main_content2_active").siblings().removeClass("main_content2_active");
            var thisId = $(this).find("a").attr('id');
            var titleId = $(this).parent().prev().attr('id');
            var data = {
                type    : 1,
                num     : 4,
                cat_id  :thisId,
                t_id    :titleId
            };
            if(data.cat_id != null){
                com.executeAjax(menuUrl+orderServiceUrl.cat_goods, data, "GET", function (result) {
                    app.result[data.t_id].goods.splice(result.content.length);
                    app.result[data.t_id].goods = result.content;
                });
            }else{
                com.executeAjax(menuUrl+orderServiceUrl.cat, floorData, "GET", function (result) {
                    app.result[data.t_id].goods.splice(result.content[data.t_id].goods.length);
                    app.result[data.t_id].goods = result.content[data.t_id].goods;
                });
            }

        });

    });


    //搜索
    com.executeAjax(suggestUrl + "a", "", "GET", function (result) {
        var text = document.getElementById("scroll_top_input");
        var _success = function (text) {
            if(text !== ""){
                com.executeAjax(searchUrl + text, "", "GET", function () {
                    location.href = '/product_list.html?keywords='+ text;
                });
            }
        };
        var autoComplete = new AutoComplete('scroll_top_input', 'search_result3', result, _success);
        text.onkeyup = function(event) {
            autoComplete.start(event);
        };
    });

    $(".title2_input input").focus(function(){
        var text = $(this).val();
        if(text.length > 0){
            $("#search_result3").show();
        }
    });

    $("#searchInput").click(function () {
        var searchText = $("#scroll_top_input").val();
        if(searchText !== "") {
            com.executeAjax(searchUrl + searchText, "", "GET", function (result) {
                location.href = 'product_list.html?keywords=' + searchText;
            });
        }
    });

    function gzButton() {
        //关注按钮
        $(".main_content_img li,.main_content_img2 li").mouseenter(function(){
            $(this).find(".main_con_img_gz").show();
            //图片移动
            $(this).find("div").find(".today_rec_img").addClass("img_move_left");
            $(this).find("div").find(".floor_max_img").addClass("img_move_left2");
        });
        $(".main_content_img li,.main_content_img2 li").mouseleave(function(){
            $(".main_content_img li,.main_content_img2 li").find(".main_con_img_gz").hide();
            //图片移动
            $(this).find("div").find(".today_rec_img").removeClass("img_move_left");
            $(this).find("div").find(".floor_max_img").removeClass("img_move_left2");
        });
        $(".main_con_img_gz").click(function(){
            var text = $(this).text();
            var $this = $(this);
            var dataUrl = $(this).attr("url");

            //global.productNumber = global.productNumber+1;
            //$(".product_number").text(global.productNumber);
            //consoleLog(global.productNumber);

            if(cookieUserName){
                if(text == "关注"){
                    var data = {
                        'goods_id':dataUrl
                    };
                    com.executeAjax(userCenterUrl + orderServiceUrl.add_collection,data, "POST", function (result) {
                        if(result.data == '添加成功'){
                            $this.text("取消关注");
                            $this.removeClass("bg_line_red white");
                            $this.addClass("bg_line_gray2");
                        }
                    });
                }else{
                    var data2 = {
                        'goods_id':dataUrl
                    };
                    com.executeAjax(userCenterUrl + orderServiceUrl.del_collection,data2, "POST", function (result) {
                        if(result.data == '取消成功'){
                            $this.text("关注");
                            $this.addClass("bg_line_red white");
                            $this.removeClass("bg_line_gray2");
                        }
                    });
                }
            }else{
                com.maskLogin($("#login_mask"));
            }
        });
    }
    //底部广告浮动
    $(".bottom_show_left").click(function(){
        $(".bottom_fiexd_box").animate({"left":"-150%"},200).animate({"left":"0px"},600);
        $(".bottom_show_left").animate({"left":"-136px"},200);
    });

    $(".bottom_fiexd_close").click(function(){
        $(".bottom_fiexd_box").animate({"left":"-150%"},600);
        $(".bottom_show_left").animate({"left":"-136px"},600).animate({"left":"0px"},300);
    });

});
//console.log( $("#firstpage"))
function wachatImg(types){
    var wechats = document.getElementsByClassName('wechatimg')[0];
    console.log(wechats)
    if(types==1){
        wechats.style.cssText="display:block;";
    }
}

