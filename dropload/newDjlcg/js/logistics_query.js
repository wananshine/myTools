/**
 * Created by Gold on 2016/12/1.
 */
$(function () {
    //分别加载页眉，头部，页脚，侧边栏
    $("#titleTemp_main").load("lib/temp/page_title.html");
    $("#titleTemp2_main").load("lib/temp/page_title2.html");
    $("#bottomTemp_main").load("lib/temp/page_bottom.html");

    var queryInput = $(".Query");
    com.numAndEng("Query");

    var Query = $('#Query');
    var QueryInput = $(".query_input");

    Query.keydown(function(e){
        if(e.keyCode==13){
            QueryInput.click();
        }
    });

    QueryInput.click(function () {
        var text = Query.val();
        if(text === ""){
            $(".error1,#query_table").hide();
            $(".error2").show();
        }else{
            var success_callback = function(result){
                if(result.result !== null){
                    if(result.result.goodsTraceInfos !== ""){
                        $("#query_table").show();
                        $(".error1,.error2").hide();
                        var app = new Vue({
                            el   : "#query_table",
                            data : {list:result.result.goodsTraceInfos}
                        });
                        app.list.splice(result.result.goodsTraceInfos.length);
                        app.list = result.result.goodsTraceInfos;

                        var listLength = result.result.goodsTraceInfos.length-1;
                        $("#query_table tr").eq(listLength).addClass("orange");
                    }else{
                        $(".error1,#query_table").hide();
                        $(".error2").show();
                    }
                }else{
                    $(".error1,#query_table").hide();
                    $(".error2").show();
                }
            };
            com.executeAjax(logisticsUrl+text, "", "POST", success_callback);
        }
    });
});