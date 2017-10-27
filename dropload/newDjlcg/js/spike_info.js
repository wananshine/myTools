/**
 * Created by Gold on 2016/10/26.
 */
$(function () {

    var infoId = getQueryString('infoId');

    //分别加载页眉，头部，页脚，侧边栏
    $("#titleTemp_main").load("lib/temp/page_title.html");
    $("#titleTemp2_main").load("lib/temp/page_title2.html");
    $("#bottomTemp_main").load("lib/temp/page_bottom.html");
    $("#sidebarTemp_main").load("lib/temp/page_sidebar.html");

    //判断是什么用户登录的
    var userName = $.cookie("ECS[username]");
    if(userName){
        var infoUrl = userInfoUrl+orderServiceUrl.user_info;
        var infoData = {
            info : userName
        };
        com.executeAjax(infoUrl, infoData, "GET", function (result) {
            switch(result.company_verify_status)  //0 是未认证用户   1 是待审核    2是审核未通过    3是审核通过
            {
                case "0":
                case "1":
                case "2":
                    $(".Register").show();
                    break;
                case "3":
                    $(".FirmsUser").show();
                    break;
            }
        });
    }else {
        $(".NotRegister").show();
    }

    var info_id = getQueryString("infoId");
    var goods_id = getQueryString("times")
    var data = {
        times: goods_id
    };
    // console.log(goods_id)
    // var goods_url = "newapi/seckill.php?act=goods_info&goods_id="+goods_id+"&times=1";
    var goods_url = "newapi/seckill.php?act=goods_info&goods_id="+info_id;
    com.executeAjax(goods_url, data, "GET", function (obj) {
        var app = new Vue({
            el   : "#listTitle1",
            data : {
                layout: 0,
                list:obj
            },
            mounted: function () {
                this.$nextTick(function () {

                })
            }
        });
        obj.goods.goods_desc = htmldecode(obj.goods.goods_desc);
        // console.log(obj)
        $("#product_info1").html(obj.goods.goods_desc);
        function htmldecode(s){
            var div = document.createElement('div');
            div.innerHTML = s;
            return div.innerText || div.textContent;
        }


        /* 加减 库存数量 */
        var max_number = obj.goods.max_number;
        var min_moq = obj.goods.moq;
        var numbers = 1;
        $("#amount_num").on("input", function(){
            var text = $(this).val();
            text = parseInt(text);
            if(min_moq > max_number){
                $(".amount_num").attr("disabled",true);
            }else{
                $(".amount_num").attr("disabled",false);
            }
            numbers = text;
        });
        $("#amount_num").blur(function(){
            var text = $(this).val();
            if(text <= 0 || text == ""){
                $(this).val(min_moq);
            }
        });

        $(".amount_max").click(function(){
            if( numbers < max_number){
                numbers++;
            }
            $(this).siblings(".amount_num").val(numbers);
            $(this).siblings(".amount_min").removeAttr("style");
            var text = $(this).siblings(".amount_num").val();
            text = parseInt(text);
            if(numbers >= max_number){
                $(".amount_num").attr("disabled",true);
                numbers = max_number;
            }else{
                $(".amount_num").attr("disabled",false);
            }
            if(text == max_number){
                $(this).css("color","#c5c5c5");
            }else{
                $(this).removeAttr("style");
            }
        });
        $(".amount_min").click(function(){
            // var text = $(this).siblings(".amount_num").val();
            // text = parseInt(text);
            if( numbers <= max_number && numbers>min_moq){
                numbers--;
                $(this).siblings(".amount_num").val(numbers);
            }
            var text = $(this).siblings(".amount_num").val();
            text = parseInt(text);
            if(numbers <= min_moq){
                $(".amount_num").attr("disabled",true);
                numbers = min_moq;
            }else{
                $(".amount_num").attr("disabled",false);
            }
            if(text == min_moq){
                $(this).css("color","#c5c5c5");
            }
            $(this).siblings(".amount_max").removeAttr("style");
        });
        var text = $(".amount_num");
        for(var i=0; i<text.length; i++){
            if(text.eq(i).text() == 1){
                $(".amount_min").eq(i).css("color","#c5c5c5");
            }
        }

        $("#imageMenu ul li").eq(0).attr("id","onlickImg");
        $("#midimg").attr("src", obj.pictures[0].img_url);

        if(data.times == 1){
            if(obj.goods.status == 3 ){

                $(".skill_time").text("已结束");
                $("#ljdg").css({
                    background: "#3A59E1"
                }).html("已结束");
                $("#ljdg").unbind("click");
            }
            var now_time_one = obj.goods.one.now;                  //第一场现在时间
            var start_time_one = obj.goods.one.start_time;         //第一场开始时间
            var end_time_one = obj.goods.one.end_time;          //第一场结束时间
            var kill_successFun_one = function (result) {
                // console.log(result)
                $(".skill_time").text("距开始:"+result.Day+"天"+result.Hour+":"+result.Minute+":"+result.Second);
                $("#ljdg").css({
                    background: "#3A59E1"
                }).html("即将开始");
                $("#ljdg").unbind("click");
                if(result.Day==0&&result.Hour==0&&result.Minute==0&&result.Second==0){
                    window.location.reload();
                }
            };
            var kill_errorFun_one = function () {
                var now_time_one = obj.goods.one.now;                  //第一场现在时间
                var end_time_one = obj.goods.one.end_time;          //第一场结束时间
                var kill_successFun2_one = function (result) {
                    $(".skill_time").text("距结束:"+result.Day+"天"+result.Hour+":"+result.Minute+":"+result.Second);
                    $("#ljdg").addClass("bg_red").html("立即秒杀");
                    if(result.Day==0&&result.Hour==0&&result.Minute==0&&result.Second==0){
                        window.location.reload();
                    }
                };
                var kill_errorFun2_one = function () {
                    $(".skill_time").text("已结束");
                    $("#ljdg").css({
                        background: "#3A59E1 !important"
                    }).html("已结束");
                    $("#ljdg").unbind("click");
                    // if(result.Day==0&&result.Hour==0&&result.Minute==0&&result.Second==0){
                    //     window.location.reload();
                    // }
                };
                com.countDown(now_time_one, end_time_one, kill_successFun2_one, kill_errorFun2_one);
            };
            com.countDown(now_time_one, start_time_one, kill_successFun_one, kill_errorFun_one);
        }else if(data.times == 2){
            var now_time = obj.goods.second.now;                  //第二场现在时间
            var start_time = obj.goods.second.start_time;         //第二场开始时间
            var end_time = obj.goods.second.second_time;          //第二场结束时间
            var kill_successFun = function (result) {
                // console.log(result)
                $(".skill_time").text("距开始:"+result.Day+"天"+result.Hour+":"+result.Minute+":"+result.Second);
                $("#ljdg").css({
                    background: "#3A59E1"
                }).html("即将开始");
                $("#ljdg").unbind("click");
                if(result.Day==0&&result.Hour==0&&result.Minute==0&&result.Second==0){
                    window.location.reload();
                }
            };
            var kill_errorFun = function () {
                var now_time = obj.goods.second.now;                  //第二场现在时间
                var end_time = obj.goods.second.second_time;          //第二场结束时间
                var kill_successFun2 = function (result) {
                    $(".skill_time").text("距结束:"+result.Day+"天"+result.Hour+":"+result.Minute+":"+result.Second);
                    $("#ljdg").addClass("bg_red").html("立即秒杀");
                    if(result.Day==0&&result.Hour==0&&result.Minute==0&&result.Second==0){
                        window.location.reload();
                    }
                };
                var kill_errorFun2 = function () {
                    $(".skill_time").text("已结束");
                    $("#ljdg").css({
                        background: "#3A59E1 !important"
                    }).html("已结束");
                    $("#ljdg").unbind("click");
                    // if(result.Day==0&&result.Hour==0&&result.Minute==0&&result.Second==0){
                    //     window.location.reload();
                    // }
                };
                com.countDown(now_time, end_time, kill_successFun2, kill_errorFun2);

            };
            com.countDown(now_time, start_time, kill_successFun, kill_errorFun);
        }

        $("#ljdg").click(function () {
            if(userName){
                var spanId = ListAttr();
                var number = $(".content_amount .amount_num").val();
                var data = {

                    goods_id : obj.goods.goods_id,
                    number   : number,
                    spec     : spanId,
                    //type     : Type
                };
                buyNow(data);
            }else{
                var $text = document.getElementById("alert_mask");
                var $mask = '<div id="alert_mask"></div>';
                if($text === undefined || $text === null){

                    $("body").append($mask);
                }
                com.maskLogin($("#alert_mask"));
            }

        });
        function ListAttr() {
            imgToggleSpan = $(".product_info_text2 li");
            var spanId = [];  //每次点击初始化存放的id值
            var text = 0;     //初始化属性span的个数
            for(var i=0; i<imgToggleSpan.length-1; i++){    //循环属性span的个数
                var a = $(".product_info_text2 li").eq(i).find(".Attr").length;
                text += a;
            }

            for(var i=0; i<text; i++){     //拿到属性个数后，再循环拿到data 为true 的id
                var data = $(".product_info_text2 li .Attr").eq(i).attr("data");
                if(data === "true"){
                    var a = $(".product_info_text2 li .Attr").eq(i).attr("id");
                    spanId.push(a);
                }
            }
            // spanId.push(number);
            function sortNumber(a,b){
                return a - b;
            }
            spanId.sort(sortNumber);
            return spanId;
        }
        function buyNow(data){
            var data = {'goods':JSON.stringify(data)};
            com.executeAjax(cartUrl + orderServiceUrl.cart_add, data, "POST", function (result) {
                window.location = '/purchase_orders.html';
            });
        }
        setTimeout(function () {
            MoveImg();
        },100);
    });

});

/*function loginjc(userName){
 console.log(userName);
 if(userName){

 }else{
 com.maskLogin($("#alert_mask"));
 return false
 }
 }*/
