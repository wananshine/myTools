$(function () {
    com.executeAjax(dtServiceUrl.distributor_basic_info,{}, "GET", function (result) {
        new Vue({
            el: '#user_info',
            data: result.data
        });
        $("#today").text('('+result.data.today+')');
        $("#spread_link").text(result.data.dt_spreader_link);
        setTimeout(function(){
            clickCopy();
        },100)
    });

    com.executeAjax(dtServiceUrl.distributor_top_sales_rank,{}, "GET", function (result) {
        new Vue({
            el: '#sales_rank',
            data: result
        });
    });

    getAchievement('today');

    com.executeAjax(dtServiceUrl.article_top,{cat_name:'渠道政策',top_count:3}, "GET", function (result) {
        new Vue({
            el: '#policy',
            data: result,
            methods:{
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

    /*点击切换时间*/
    $(".title ul li em").on('click',function(){
        $(this).addClass("active").parent().siblings().find('em').removeClass("active")
    })

})

var vmAchievement = new Vue({
    el: '#achievement',
    data: {
        info: {
            "member_sales": 0,
            "member_profit": 0,
            "channel_sales": 0,
            "channel_profit": 0
        }
    }
});
function getAchievement(interval){
    com.executeAjax(dtServiceUrl.distributor_achievement,{interval:interval}, "GET", function (result) {
        vmAchievement.info = result.data;
    });
}

function clickCopy(){
    /*点击复制*/
    $('#copy_input').zclip({
        path: 'js/ZeroClipboard.swf',
        copy: $('#spread_link').text(),
        afterCopy: function(){//复制成功
            $("<span id='msg'/>").insertAfter($('#copy_input')).text('复制成功');
        }
    });
}

