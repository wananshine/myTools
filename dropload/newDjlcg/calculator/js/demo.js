/**
 * Created by haiping on 2017/8/9.
 */


$(function(){
    //分别加载页眉，头部，页脚，侧边栏
    $("#titleTemp_main").load("../lib/temp/page_title.html");
    // $("#titleTemp2_main").load("../lib/temp/page_title2.html");
    $("#bottomTemp_main").load("../lib/temp/page_bottom.html");


    //创建js标签
    var createJs = function (url_js) {
        $("#load_js").remove();
        var new_element=document.createElement("script");
        new_element.setAttribute("type","text/javascript");
        new_element.setAttribute("id","load_js");
        new_element.setAttribute("src",url_js+'?time='+new Date());
        document.body.appendChild(new_element);
    }

    //默认显示的计算器菜单选项
    $(".nav_list_con").eq(0).addClass("nav_list_current")
    $('#calc_content_l').load("load/display_device.html",function(){
        createJs('js/js_display.js');
    });

    //点击后显示对应的计算器菜单选项
    $(".nav_list_con").click(function () {
        var index = $(this).index();
        switch (index){
            case 0: $('#calc_content_l').load("load/display_device.html",function(){
                createJs('js/js_display.js');
                //function load(url, data){
                    //alert($(url).attr("href"));
                    // $.ajaxSetup({cache: false });
                    // $("#content").load($(url).attr("href")+ " #content ", data, function(result){
                    //     //alert(result);
                    //     //将被加载页的JavaScript加载到本页执行
                    //     var $result = $(result);
                    //     $result.find("script").appendTo('#content');
                    // });
                //}
            });
                break;
            case 1: $('#calc_content_l').load("load/UPS_device.html",function(){
                createJs('js/js_ups.js');
            });
                break;
            case 2: $('#calc_content_l').load("load/video_surveillance.html",function(){
                createJs('js/js_video.js');
            });
            break;
            case 3: $('#calc_content_l').load("load/sheYing_device.html",function(){
                createJs('js/js_sheYing.js');
            });
                break;
            case 4: $('#calc_content_l').load("load/Integrated_wiring.html",function(){
                createJs('js/js_integrated.js');
            });
                break;
            case 5: $('#calc_content_l').load("load/Engineering_cable.html",function(){
                createJs('js/js_engineering.js');
            });
                break;
        }
    })

})
