/**
 * Created by Administrator on 2016/11/25.
 */
$(function () {
    getList();
});

function getList() {
    var data = {
        cat_name: '渠道政策',
        top_count: 30
    };
    com.executeAjax(dtServiceUrl.article_top, data, "GET", function (result) {
        new Vue({
            el: '#my_list',
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