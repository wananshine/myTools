/**
 * Created by Administrator on 2016/11/23 0023.
 */

com.executeAjax(helpCenterUrl+orderServiceUrl.list,'', "GET", function (result) {
    var items = new Vue({
        el: '#help_side_list',
        data: {list : result.data},
        methods:{
            toList:function(Id){
                var url = helpCenterUrl+orderServiceUrl.detail+"&id="+Id;
                com.executeAjax(url, "", "GET", function (result) {
                    $("#content").html(result.data.content);
                });
            }
        }
    });
});

//获取右边菜单div的高度
function obtainDivHeight(){
    var isTrue = true;
    var $div = $("#content_main,.content_main");
    $div.removeAttr("style");
    div1Hight = $(".right_menu").outerHeight(true);
    function DivHeight() {
        if(isTrue){
            div2Hight = $div.outerHeight(true);
            if(div1Hight > div2Hight){
                $div.css("height",div1Hight-1);
                isTrue = false;
            }else{
                $div.removeAttr("style");
                isTrue = false;
            }

            /* 判断浏览器版本号，适配 */
            var version = com.browserVersion();
            version = version.split(":");
            version = version[1];
            version = version.substr(0,3);
            if (version == 53){
                $(".unread_message").css("line-height","18px");
            }
            // clearInterval(DivHeight);
        }
    }
    // setInterval(DivHeight,10);
    for(var i=0; i<5; i++){
        setTimeout(DivHeight,0);
    }
}



//菜单栏切换
function helpSide(){
    var sideId = [];
    com.executeAjax(helpCenterUrl+orderServiceUrl.list,'', "GET", function (result) {
        $.each(result.data.one_article, function(i, obj){
            sideId.push(obj.article_id);
            var TabId = getQueryString("id");
            if(TabId){
                var infoId= getQueryString("infoid");
                var url = helpCenterUrl+orderServiceUrl.detail+"&id="+TabId;
                console.log(helpCenterUrl+orderServiceUrl.detail+"&id="+TabId);
                com.executeAjax(url, "", "GET", function (result) {
                    $("#content").html(result.data.content);
                    var items = new Vue({
                        el: '#content_main',
                        data: {list : result.data}
                    });
                });
                setTimeout(function(){
                    $('.right_menu ul li').removeClass('active');
                    $('.right_menu ul li').eq(infoId-1).addClass('active');
                },50);
            }else{
                var actId = sideId[0];
                var url2 = helpCenterUrl+orderServiceUrl.detail+"&id="+actId;
                com.executeAjax(url2, "", "GET", function (result) {
                    $("#content").html(result.data.content);
                    var items = new Vue({
                        el: '#content_main',
                        data: {list : result.data}
                    });
                });
            }
            setTimeout(function(){
                obtainDivHeight();
            },200);
            $('.right_menu ul li').find('a').click(function(){
                $('.right_menu ul li').removeClass('active');
                $(this).parent('li').addClass('active');
                setTimeout(function(){
                    obtainDivHeight();
                },200);
            });
        });
    });
}






