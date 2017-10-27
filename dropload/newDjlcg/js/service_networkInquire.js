/**
 * Created by Gold on 2016/10/26.
 */
$(function () {
    //分别加载页眉，头部，页脚，侧边栏
    $("#titleTemp_main").load("lib/temp/page_title.html");
    $("#titleTemp2_main").load("lib/temp/page_title2.html");
    $("#bottomTemp_main").load("lib/temp/page_bottom.html");
    $("#sidebarTemp_main").load("lib/temp/page_sidebar.html");


    var Query = $('#Query');
    var QueryInput = $(".query_input");

    Query.keydown(function(e){
        if(e.keyCode==13){
            QueryInput.click();
        }
    });
    var vm = new Vue({
        el: '#query_ul',
        data: {items:{}}
    });
    QueryInput.click(function () {
        var text = Query.val();
        if(text === ""){
            $("#query_ul").hide();
            $(".error1").show();
        }else{
            var success_callback = function(result){

                if(result.data.dt_grade_name != null){
                    $("#query_ul").show();
                    $(".error1").hide();
                    vm.items = result.data;
                }else{
                    $("#query_ul").hide();
                    $(".error1").show();
                }
            };
            com.executeAjax(dtServiceUrl.search_one_dt,{keyword:text}, "GET", success_callback);
        }
    });
});




