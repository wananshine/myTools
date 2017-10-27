/**
 * Created by Administrator on 2016/11/25.
 */

$(function () {
    getNoticeList();
    //getSaleRank();
});

function getNoticeList() {
    var data = {
        cat_name: '渠道公告',
        top_count: 30//10
    };
    com.executeAjax(dtServiceUrl.article_top, data, "GET", function (result) {
        new Vue({
            el: '#notice_list',
            data: result,
            methods: {
                articleDetail:function(id,link){
                    if(link){
                        window.location = link;
                    }else{
                        com.executeAjax(dtServiceUrl.article_detail,{id:id}, "GET", function (result) {
                            $("#pop-ups .fL").html(result.data.title);
                            $("#pop-ups .pop-main").html(result.data.content);
                            /*弹窗*/
                            $("#pop-ups").fadeIn(300).siblings(".zhezhao").fadeIn(300);
                            $("#pop-ups .pop-head span").on("click",function(){
                                $("#pop-ups").fadeOut(100).siblings(".zhezhao").fadeOut(300)
                            })
                        });
                    }
                }
            }
        });
    });
}

var vmSaleRank = new Vue({
    el: '#sales_rank',
    data: {items:[]}
});

function pageSelectCallback(page_index, jq) {
    getSaleRank(page_index);
    return false;
}

function getSaleRank(page) {
    page = page?page+1:1;
    var data = {
        page : page,
        size : 10
    };
    com.executeAjax(dtServiceUrl.distributor_sales_rank, data, "GET", function(result){
        $("#Pagination").pagination(result.data.total, {
            num_edge_entries: 1, //边缘页数
            num_display_entries: 4, //主体页数
            callback: pageSelectCallback,
            items_per_page:data.size, //每页显示1项
            prev_text: "前一页",
            next_text: "后一页",
            current_page:page-1
        });
        vmSaleRank.items.splice(result.data.length);
        vmSaleRank.items = result.data.items;
    });
}
