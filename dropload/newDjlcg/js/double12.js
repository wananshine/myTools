/**
 * Created by Gold on 2016/11/29.
 */
$(function () {
    //分别加载页眉，头部，页脚，侧边栏
    $("#titleTemp_main").load("lib/temp/page_title.html");
    $("#titleTemp2_main").load("lib/temp/page_title2.html");
    $("#bottomTemp_main").load("lib/temp/page_bottom.html");
    $("#sidebarTemp_main").load("lib/temp/page_sidebar.html");
    com.isTitleMenuShow(false);
    //菜单分类
    var menuData = {
        m     : 0    //列表条数下面数据开始的位置  *这个参数是数组下标
    };
    com.executeAjax(menuUrl+orderServiceUrl.cat, menuData, "GET", function (result) {
        var app1 = new Vue({
            el   : "#floor",
            data : {list:result.content}
        });

        $(".putAway").click(function () {
            $("#floor").animate({left : '-124px'},150);
            $(".open_menu").animate({left : '0px'},150);
        });

        $(".putAway_content").click(function () {
            $("#floor").animate({left : '0px'},150);
            $(".open_menu").animate({left : '-40px'},150);
        });

        /*$(window).scroll(function() {
         var bodytop = $("body").scrollTop();
         var htmltop = $("html").scrollTop();

         if (bodytop > 116) {
         $("#floor").animate({left: '0px'}, 150);
         $(".open_menu").animate({left: '-40px'}, 150);
         }
         else {
         $("#floor").animate({left: '-124px'}, 150);
         $(".open_menu").animate({left: '0px'}, 150);
         }
         });*/

    });
    // $(window).scroll(function(){
    //     var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //     for(var i = 0; i < $(".double_floor").length;i++){
    //         if(scrollTop >= $(".double_floor")[i].offsetTop){
    //             num = i;
    //         }
    //     }
    //     $(".double12_floor li").eq(num - 1).find("span").addClass("floor_active").parent("li").siblings().find("span").removeClass("floor_active");
    // });
});

function double12() {
    url = Url + 'topic.php?level=1&n=26&num=1';
    com.executeAjax(url, "", "POST", function (result) {
        var app3 = new Vue({
            el   : "#double_list2",
            data : {list:result.content},
            methods:{
                toInfo:function (id) {
                    window.open("product_list_info.html?infoId="+id);
                }
            }
        });
        var floor      = $(".double_floor");
        var clickFloor = [];
        for(var i=0; i<floor.length; i++){
            var text = $(".double_floor").eq(i).offset().top;
            clickFloor.push(text);
        }

        // $(".double12_floor li").click(function(){
        //     var text = $(this).index();
        //     $('html,body').animate({
        //         scrollTop : clickFloor[text-2]
        //     },500);
        // });
    });
}
/*function double12_f() {
    var getId = getQueryString("id");
    com.executeAjax(topicUrl+orderServiceUrl.goods+"&id="+getId, "", "POST", function (result) {
        //limitText(result);
        var app4 = new Vue({
            el   : "#double_list3",
            data : {list:result.goods},
            methods:{
                toInfo:function (id) {
                    window.open("product_list_info.html?infoId="+id);
                }
            }
        });
    });
}*/

