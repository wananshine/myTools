/**
 * Created by Gold on 2016/11/9.
 */
$(function () {
    var listConHeight = $(".message_li_con");
    for(var i=0; i<listConHeight.length; i++){
        var BrandDivHeight = listConHeight.eq(i).children("p").outerHeight();
        if(BrandDivHeight > 15){
            listConHeight.eq(i).find(".open_text").show();
            listConHeight.eq(i).addClass("");
        }
    }

    var isShow = true;
    $(".open_text").click(function () {
        $(this).parent().parent().toggleClass("mes_max_height");
        if(isShow){
            $(this).text("收起");
            isShow = false;
        }else{
            $(this).text("展开");
            isShow = true;
        }
    });
    $("#gorz").click(function () {
        // alert(1);
        // $(".right_menu ul").eq(2).children("li").eq(2).trigger("click");
        // alert($(".right_menu ul").eq(2).children("li").eq(2).text());
    });
});
/*2017-8-17 列表分页菜单
* */

$(document).ready(function() {
    $(".tab_content").hide(); //Hide all content
    $("ul.tabs li a:first").addClass("active").show(); //Activate first tab
    $(".tab_content:first").show(); //Show first tab content

    //On Click Event
    $("ul.tabs li a").click(function() {
        $("ul.tabs li a").removeClass("active"); //Remove any "active" class
        $(this).addClass("active"); //Add "active" class to selected tab
        $(".tab_content").hide(); //Hide all tab content
        var activeTab = $(this).attr("href"); //Find the rel attribute value to identify the active tab + content
        $(activeTab).fadeIn(); //Fade in the active content
        return false;
    });

});