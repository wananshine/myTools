/**
 * Created by Gold on 2016/11/9.
 */
$(function () {
    getInvList();
    function pageSelectCallback(page_index, jq) {
        getInvList(page_index);
        return false;
    }
    var items = new Vue({
        el: '#feedback',
        data: {list:[]}
    });
    function getInvList(page){
        page = page?page+1:1;
        //列表
        var data = {
            page : page,
            size : 10
        };
        var infoUrl = userCenterUrl+orderServiceUrl.message_list;
        com.executeAjax(infoUrl, data, "GET", function (result) {
            if(result.data.items.length === 0){
                $("#notData").show();
            }

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
            $("#Pagination").pagination(result.data.total, {
                num_edge_entries: 1, //边缘页数
                num_display_entries: 4, //主体页数
                callback: pageSelectCallback,
                items_per_page:data.size, //每页显示1项
                prev_text: "前一页",
                next_text: "后一页",
                current_page:page-1
            });
            items.list = result.data;
            var pageTabWidth = $("#Pagination").outerWidth();
            $("#Pagination").css("margin-left", "-"+pageTabWidth/2+"px");
        });
    }

    var infoUrl2 = userInfoUrl+orderServiceUrl.get_identif;
    var infoData = {
        info : 'identif'
    };
    com.executeAjax(infoUrl2, infoData, "GET", function (result) {
        var isShow = result.is_validated;
        if(isShow == 2){
            var items1 = new Vue({
                el: '#unvalidated',
                data: {list:result}
            });
        }
    });

    $("#gorz").click(function () {
        // alert(1);
        // $(".right_menu ul").eq(2).children("li").eq(2).trigger("click");
        // alert($(".right_menu ul").eq(2).children("li").eq(2).text());
    });


})