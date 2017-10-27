/**
 * Created by Administrator on 2017/4/11 0011.
 */
$(function(){
    //分别加载页眉，头部，页脚，侧边栏
    $("#titleTemp_main").load("../lib/temp/page_title.html");
    $("#bottomTemp_main").load("../lib/temp/page_bottom.html");
    MoveImg();
});