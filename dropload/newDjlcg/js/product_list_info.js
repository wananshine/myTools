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

    //浏览记录
    com.executeAjax(userLoginUrl+orderServiceUrl.history_list, "", "GET", function (result) {
        $.each(result.data, function (i, result) {
            var name = result.goods_name.length;
            if(name > 25){
                result.goods_name = result.goods_name.substr(0,25)+"...";
            }
        });
        var items = new Vue({
            el: '#history_tab',
            data: {list: result},
            methods:{
                toListInfo:function (id) {
                    window.open("/product_list_info.html?infoId="+id);
                }
            }
        });
    });

    com.executeAjax(goodsUrl+infoId, "", "GET", function (obj) {                       //首先先去请求一个goodsUrl+infoId,-->'/newapi/goods.php?id='id值   得到obj数据
        var catUrl = obj.ur_here.cat[0].url;
        // console.log(catUrl)             // product_list.html?id=1   从obj里面获取
        var catId = catUrl.substring(catUrl.indexOf("?id=")+4);                      //  获取catUrl的id值
        com.executeAjax(menuUrl+orderServiceUrl.cat_goods, {type:1,num:6,cat_id:catId}, "GET", function (result) {     //menuUrl=Url+'index.php?act=';  orderServiceUrl=订单接口地址  cat_goods
                                                                                       //newapi/index.php?act=cat_goods  代表着这个页面请求数据的接口          我就是直接在订单的接口地址里面直接调用数据
            var recommendList = new Vue({
                el: "#recommend_list",
                data: {list:{content:[]}},
                methods:{
                    toListInfo:function (id) {
                        window.open("/product_list_info.html?infoId="+id);
                    }
                }
            });
            recommendList.list.content.splice(result.content.length);
            recommendList.list = result.content;
        });


        //请求数据 侧边栏当中的图片地址
        var look_id = obj.goods.cat_id;
        com.executeAjax(menuUrl+orderServiceUrl.cat_goods, {type: 5,num:9, cat_id: catId}, "GET", function (result) {

             var imgUrl=result.content
             var html;
            for(var i=0;i<imgUrl.length;i++){
                // if(i<3){
                // html='<a target="_blank" href="product_list_info.html?infoId='+ imgUrl[i].id+'" style="height:150px"><p><img src="'+imgUrl[i].goods_img+'" alt=""/></p><span style="display: block; text-align: center; font-size: 16px; font-weight: bold; color: #e73838">'+imgUrl[i].shop_price+'</span></a>'
                // $("#slide1").append(html)
                // }
                // if(3<i<6){
                //     html+='<a target="_blank" href="product_list_info.html?infoId='+ imgUrl[i].id+'" style="height:150px"><p><img src="'+imgUrl[i].goods_img+'" alt=""/></p><span style="display: block; text-align: center; font-size: 16px; font-weight: bold; color: #e73838">'+imgUrl[i].shop_price+'</span></a>'
                //     $("#slide2").append(html)
                // }
                // if(6<i<9){
                //     html+='<a target="_blank" href="product_list_info.html?infoId='+ imgUrl[i].id+'" style="height:150px"><p><img src="'+imgUrl[i].goods_img+'" alt=""/></p><span style="display: block; text-align: center; font-size: 16px; font-weight: bold; color: #e73838">'+imgUrl[i].shop_price+'</span></a>'
                //     $("#slide3").append(html)
                // }
                var html_0='<a target="_blank" href="product_list_info.html?infoId='+ imgUrl[0].id+'" style="height:150px"><p><img src="'+imgUrl[0].goods_img+'" alt=""/></p><span style="display: block; text-align: center; font-size: 16px; font-weight: bold; color: #e73838">'+imgUrl[0].shop_price+'</span></a>'
                var html_1='<a target="_blank" href="product_list_info.html?infoId='+ imgUrl[1].id+'" style="height:150px"><p><img src="'+imgUrl[1].goods_img+'" alt=""/></p><span style="display: block; text-align: center; font-size: 16px; font-weight: bold; color: #e73838">'+imgUrl[1].shop_price+'</span></a>'
                var html_2='<a target="_blank" href="product_list_info.html?infoId='+ imgUrl[2].id+'" style="height:150px"><p><img src="'+imgUrl[2].goods_img+'" alt=""/></p><span style="display: block; text-align: center; font-size: 16px; font-weight: bold; color: #e73838">'+imgUrl[2].shop_price+'</span></a>'
                var html_3='<a target="_blank" href="product_list_info.html?infoId='+ imgUrl[3].id+'" style="height:150px"><p><img src="'+imgUrl[3].goods_img+'" alt=""/></p><span style="display: block; text-align: center; font-size: 16px; font-weight: bold; color: #e73838">'+imgUrl[3].shop_price+'</span></a>'
                var html_4='<a target="_blank" href="product_list_info.html?infoId='+ imgUrl[4].id+'" style="height:150px"><p><img src="'+imgUrl[4].goods_img+'" alt=""/></p><span style="display: block; text-align: center; font-size: 16px; font-weight: bold; color: #e73838">'+imgUrl[4].shop_price+'</span></a>'
                var html_5='<a target="_blank" href="product_list_info.html?infoId='+ imgUrl[5].id+'" style="height:150px"><p><img src="'+imgUrl[5].goods_img+'" alt=""/></p><span style="display: block; text-align: center; font-size: 16px; font-weight: bold; color: #e73838">'+imgUrl[5].shop_price+'</span></a>'
                var html_6='<a target="_blank" href="product_list_info.html?infoId='+ imgUrl[6].id+'" style="height:150px"><p><img src="'+imgUrl[6].goods_img+'" alt=""/></p><span style="display: block; text-align: center; font-size: 16px; font-weight: bold; color: #e73838">'+imgUrl[6].shop_price+'</span></a>'
                var html_7='<a target="_blank" href="product_list_info.html?infoId='+ imgUrl[7].id+'" style="height:150px"><p><img src="'+imgUrl[7].goods_img+'" alt=""/></p><span style="display: block; text-align: center; font-size: 16px; font-weight: bold; color: #e73838">'+imgUrl[7].shop_price+'</span></a>'
                var html_8='<a target="_blank" href="product_list_info.html?infoId='+ imgUrl[8].id+'" style="height:150px"><p><img src="'+imgUrl[8].goods_img+'" alt=""/></p><span style="display: block; text-align: center; font-size: 16px; font-weight: bold; color: #e73838">'+imgUrl[8].shop_price+'</span></a>'
                $("#slide1").html(html_0+html_1+html_2);
                $("#slide2").html(html_3+html_4+html_5);
                $("#slide3").html(html_6+html_7+html_8)
            }


        })



        //热销商品
        com.executeAjax(menuUrl+orderServiceUrl.cat_goods, {type:3,num:6,cat_id:catId}, "GET", function (result) {
            var recommendList = new Vue({
                el: "#recommend_list1",
                data: {list:{content:[]}},
                methods:{
                    toListInfo:function (id) {
                        window.open("/product_list_info.html?infoId="+id);
                    }
                }
            });
            recommendList.list.content.splice(result.content.length);
            recommendList.list = result.content;
        });

        if(obj.goods.is_promote == "1"){
            obj.goods.shop_price = obj.goods.promote_price;
        }
        if(obj.properties == ""){
            $("#NotData").show();
        }
        if(obj.promotion != "" ){
            $(".double12IsShow,#notStart,.double12_right,.double12_left").show();
            $("#ordinary_price").hide();

            var date1 = obj.now_time; //现在时间
            var date2 = obj.promotion.start_time; //开始时间
            var date3 = obj.promotion.end_time; //结束时间

            var successFun = function (result) {
                $(".Countdown").text("距离开始："+result.Day+"天"+result.Hour+"时"+result.Minute+"分"+result.Second+"秒");
            };
            var errorFun = function () {
                $("#notStart").hide();
                $("#start").show();
                com.executeAjax(goodsUrl+infoId, "", "GET", function (obj) {
                    date1 = obj.now_time; //现在时间
                    date3 = obj.promotion.end_time; //结束时间

                    var successFun2 = function (result) {
                        $(".Countdown").text("距离结束："+result.Day+"天"+result.Hour+"时"+result.Minute+"分"+result.Second+"秒");
                        $("#Order").show();
                        $("#notOrder").hide();
                    };
                    var errorFun2 = function () {
                        $(".Countdown").text("活动已结束");
                    };
                    com.countDown(date1, date3, successFun2, errorFun2);
                });
            };
            com.countDown(date1, date2, successFun, errorFun);
            // com.countdown(obj.now_time, ".Countdown");
        }
        /*if(obj.goods.is_promote == "1"){
         $(".specialIsShow").show();
         $("#ordinary_price").hide();
         }*/

        document.title = obj.page_title;
        $("meta[name='Keywords'],meta[name='description']").attr("content", obj.page_title);
        var listTitle1 = new Vue({
            el: "#listTitle1",
            data: {list : obj,Lstatus:obj.goods.login_status}

        });
        var listTitle2 = new Vue({
            el: "#listPro",
            data: {list : obj}
        });
        /*$(".attr_list p").each(function(){
         $(this).prependTo(".attr_list");
         });*/
        var listTitle3 = new Vue({
            el: "#proAttr",
            data: {list : obj}
        });
        obj.goods.goods_parameter = htmldecode(obj.goods.goods_parameter);
        $("#proParameter").html(obj.goods.goods_parameter);


        var listTitle4 =  new Vue({
            el: "#gundong",
            data: {list : obj}
        });
        var pageTitle = new Vue({
            el: '#pageTitle',
            data: {list:obj}
        });
        obj.goods.goods_desc = htmldecode(obj.goods.goods_desc);
        $("#product_info1").html(obj.goods.goods_desc);

        function htmldecode(s){
            var div = document.createElement('div');
            div.innerHTML = s;
            return div.innerText || div.textContent;
        }

        setTimeout(function () {
            var text = $(".shopPrice").text();
            if(text == "面议" || text == "面议面议" || text == "面议面议面议"){
                $("#Order").hide();
                $("#notOrder").show();
            }
        },100);
        /* 库存限制个数 */
        var Numbers = 1;
        var Stock = 1;
        var Start = 1;
        if(obj.promotion == ""){
            Stock = obj.goods.goods_number;
            Start = obj.goods.moq;
            //    //var Type = 0;
        }else{
            Stock = obj.promotion.stock;
            Start = obj.promotion.moq;
            //var Type = 4;
        }
        Stock = parseInt(Stock);
        Start = parseInt(Start);
        Numbers = Start;
        $(".amount_num").val(Start);

        var imgToggle = $(".product_info_text2 li .attr_list .text2");      //选择多属性
        var imgToggleSpan = $(".product_info_text2 li");                    //总栏目
        for(var i=0; i<imgToggleSpan.length; i++){
            imgToggleSpan.eq(i).find(".text2").eq(0).addClass("b_border_red").attr("data","true").children("img").addClass("show");    //默认找到总栏目下面每个属性中的第一个属性,添加样式,将data->true
        }
        setTimeout(function () {
            $(".product_info_text2 li").eq(0).find(".text2").eq(0).click();
        },200);
        imgToggle.click(function () {
            $(this).parent().parent("li").find(".text2").removeClass("b_border_red").addClass("s_border").find("img").removeAttr("class");   //点击p ->div->li->p->清除掉所有样式,添加border样式->
            $(this).removeClass("s_border").addClass("b_border_red").find("img").addClass("show");
            $(this).parent().parent("li").find(".text2").attr("data","false");
            $(this).attr("data","true");
            var spanId = ListAttr();
            var ArraySpanId = "";
            for(var i=0; i<spanId.length; i++){
                ArraySpanId += spanId[i]+"_";
            }
            ArraySpanId = ArraySpanId.substring(0, ArraySpanId.length-1);                                             //获取到每个属性上面的id
            var url    = ArraySpanId + "&id="+obj.goods.goods_id;                                                     //127&id=11630  商品id跟商品属性值
            url = url.toString();
            com.executeAjax(goodsUrl2+url, "", "POST", function (result) {
                $(".shopPrice").html("￥"+result.shop_price);
                $(".s_shopPrice").html("￥"+result.shop_price);                                                         //然后直接价格动态改变  也就是市场价的那个价格shop_Price
                $(".d_shopPrice").html("￥"+result.dt_price);                                                           //然后直接价格动态改变  也就是渠道价的那个价格dt_Price
                $(".activity_price").html("￥"+result.act_price);
                $(".shopPrice1").html("￥"+result.act_price);
                $(".shopPrice1").siblings('s').html("原价：￥"+result.price);
                if(result.price!==''){
                    $(".old_price").html("原价：￥"+result.price);
                }
                if(result.act_price <= 0.00){
                    $(".shopPrice1").html("￥面议");
                    $(".activity_price").html("￥面议");
                }
                Stock = result.store_count;
                Start = parseInt(Start);
                Stock = parseInt(Stock);
                Numbers = Start;
                var text1 = $(".amount_num").val(Start);
                text = text1.val();
                if (text > Stock) {
                    $(".overNumber").show();
                }else{
                    $(".overNumber").hide();
                }
                if(text < Start){
                    $(".startNumber").show();
                }else{
                    $(".startNumber").hide();
                }
                if(Start > Stock){
                    $(".stopNumber").show();
                    $(".overNumber").hide();
                    $(".amount_num").attr("disabled",true);
                }else{
                    $(".amount_num").attr("disabled",false);
                    $(".stopNumber").hide();
                }
            });
        });

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

        $("#imageMenu ul li").eq(0).attr("id","onlickImg");
        $("#midimg").attr("src", obj.pictures[0].img_url);

        /* 加减 库存数量 */
        $("#amount_num").on("input", function(){
            var text = $(this).val();
            text = parseInt(text);
            if (text > Stock) {
                $(".overNumber").show();
            }else{
                $(".overNumber").hide();
            }
            if(text < Start){
                $(".startNumber").show();
            }else{
                $(".startNumber").hide();
            }
            if(Start > Stock){
                $(".stopNumber").show();
                $(".overNumber").hide();
                $(".amount_num").attr("disabled",true);
            }else{
                $(".amount_num").attr("disabled",false);
                $(".stopNumber").hide();
            }
            Numbers = text;
        });
        $("#amount_num").blur(function(){
            var text = $(this).val();
            if(text <= 0 || text == ""){
                $(this).val(1);
            }
        });
        $(".amount_max").click(function(){
            if(Numbers <= Stock-1){
                Numbers++;
            }
            $(this).siblings(".amount_num").val(Numbers);
            $(this).siblings(".amount_min").removeAttr("style");
            var text = $(this).siblings(".amount_num").val();
            text = parseInt(text);
            if (text < Start) {
                $(".startNumber").show();
            }else{
                $(".startNumber").hide();
            }
            if (text > Stock) {
                $(".overNumber").show();
            }else{
                $(".overNumber").hide();
            }
            if(Start > Stock){
                $(".stopNumber").show();
                $(".overNumber").hide();
                $(".amount_num").attr("disabled",true);
            }else{
                $(".amount_num").attr("disabled",false);
                $(".stopNumber").hide();
            }
            if(text == Stock){
                $(this).css("color","#c5c5c5");
            }else{
                $(this).removeAttr("style");
            }
        });
        $(".amount_min").click(function(){
            var text = $(this).siblings(".amount_num").val();
            text = parseInt(text);
            if(Numbers > Start){
                Numbers--;
                $(this).siblings(".amount_num").val(Numbers);
            }
            text = $(this).siblings(".amount_num").val();
            text = parseInt(text);
            if (text < Start) {
                $(".startNumber").show();
            }else{
                $(".startNumber").hide();
            }
            if (text > Stock) {
                $(".overNumber").show();
            }else{
                $(".overNumber").hide();
            }
            if(Start > Stock){
                $(".stopNumber").show();
                $(".overNumber").hide();
                $(".amount_num").attr("disabled",true);
            }else{
                $(".amount_num").attr("disabled",false);
                $(".stopNumber").hide();
            }
            if(text == Start){
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

        //列表菜单切换
        tab("#menuTab");
        function tab(getId) {
            var menuTab = $(getId +" .product_info_title li");
            menuTab.click(function(){
                var tabId = $(this).attr("id");
                menuTab.removeAttr("class");
                $(this).addClass("menu_active");

                $(".tabMenu").hide();
                var activeTab = $(this).attr("data-url");
                $(activeTab).show();
                $('html,body').animate({scrollTop: 713},500);
            });
        }
        //关注
        $(".attention").click(function(){
            var text = $(this).text();
            var $this = $(this);
            var dataUrl = $(this).attr("url");

            //global.productNumber = global.productNumber+1;
            //$(".product_number").text(global.productNumber);
            //consoleLog(global.productNumber);

            if(userName){
                if(text == "关注"){
                    var data = {
                        goods_id : obj.goods.goods_id
                    };
                    com.executeAjax(userCenterUrl+orderServiceUrl.add_collection,data, "POST", function (result) {
                        if(result.data == '添加成功'){
                            $this.text("已关注");
                        }
                    });
                }else{
                    var data2 = {
                        goods_id : obj.goods.goods_id
                    };
                    com.executeAjax(userCenterUrl + orderServiceUrl.del_collection,data2, "POST", function (result) {
                        if(result.data == '取消成功'){
                            $this.text("关注");
                        }
                    });
                }
            }else{
                com.maskLogin($("#login_mask"));
            }
        });

        $(window).scroll(function(){
            if($(this).scrollTop()>713) {
                $("#menuTab .product_info_title").addClass("scroll_top_text");
                $(".scroll_top").removeClass("Nhide").css({"opacity":"1","top":"0"});
                // $(".left_floor").show(300);
                // $("#menuTab2").html($("#menuTab").html());
                // tab("#menuTab2");
            }else{
                $("#menuTab .product_info_title").removeClass("scroll_top_text");
                $(".scroll_top").css({"opacity":"0"}).addClass("Nhide");
                // $(".left_floor").hide(300);
                // $("#menuTab").html($("#menuTab2").html());
                // tab("#menuTab");
            }
        });

        $(".jrjhd").click(function(){
            if(userName){
                var spanId = ListAttr();
                var number = $(".content_amount .amount_num").val();
                var goods = {
                    goods_id : obj.goods.goods_id,
                    number   : number,
                    spec     : spanId,
                    //type     : Type
                };

                var data = {'goods':JSON.stringify(goods)};
                com.executeAjax(cartUrl + orderServiceUrl.cart_add, data, "POST", function (result) {

                    var content = '<div class="f_c_666" style="height: 115px;margin-top: 10px;padding-top: 5px;padding-left: 100px;background:60px 2px url(../img/success_buy.png) no-repeat;background-size: 30px 30px">商品已成功加入进货单！</div>';
                    var object = {
                        getid        : $("#orders_mask"),
                        text_title   : "提示",
                        text_content : content,
                        text_input2  : "继续购物",
                        text_input1  : "去结算"
                    };
                    com.mask(object);
                    $("#titleTemp2_main").load("lib/temp/page_title2.html");
                    $(".mask_confirm").click(function () {
                        window.location = '/purchase_orders.html';
                    })
                });
            }else{
                var $text = document.getElementById("alert_mask");
                var $mask = '<div id="alert_mask"></div>';
                if($text === undefined || $text === null){
                    $("body").append($mask);
                }
                com.maskLogin($("#alert_mask"));
            }

        });
        setTimeout(function () {
            MoveImg();
        },100);
        /*优惠劵有专题活动隐藏*/
        /*if(obj.promotion != ""){

         }else{*/
        /*var userName = $.cookie("ECS[username]");
        if(userName) {
            if(obj.promotion != ""){

            }else{
                var url2 = '/newapi/cash_coupon.php';
                com.executeAjax(url2, {id:infoId}, 'GET', function (obj2) {
                    var status = obj2.status;
                    var list4 = new Vue({
                        el   : '#couponReceive',
                        data : {list:obj2.data},
                        methods:{
                            coupon:function () {
                                //var url2 = globalUrl.cash_coupon;
                                var data = {
                                    id  : infoId,
                                    add : 1
                                };
                                console.log(data.id)
                                com.executeAjax(url2, data, 'POST', function (object) {
                                    if(object.status === 0){
                                        $(".coupon-receive-main").hide();
                                        $(".coupon-receive-main").eq(1).show();
                                        status = object.status;
                                        //alert('购物劵领取成功');
                                    }
                                });
                            }
                        }
                    });

                    if(status !== 3){
                        $("#coupon").show();
                        $("#ordinary_price").hide();
                        $("#coupon_money").text(obj2.data.val);
                        $(".couponName").text(obj.goods.goods_name);
                    }

                    *//* 打开优惠券窗口 *//*
                    $(".coupon").click(function () {
                        $(".coupon-receive,.coupon-bg").show();
                        $(".coupon-receive-main").hide();
                        switch (status){   // 2 有购物券未领取   0 已领取   1 已失效
                            case 2:
                                $(".coupon-receive-main").eq(0).show();
                                break;
                            case 0:
                                *//* 倒计时 *//*
                                var success = function (result) {
                                    $("#time").text(result.Minute);
                                };
                                var error = function () {
                                    $(".coupon-receive-main").hide();
                                    $(".coupon-receive-main").eq(2).show();
                                };
                                com.countDown2(obj2.data.remaining_time, success, error);
                                $(".coupon-receive-main").eq(1).show();
                                break;
                            case 1:
                                $(".coupon-receive-main").eq(2).show();
                                break;
                        }
                    });
                    *//* 关闭优惠券窗口 *//*
                    $(".mui-icon,.coupon-bg").click(function () {
                        $(".coupon-receive,.coupon-bg").hide();
                    });
                });
            }
        }
        else if(obj.goods.cash_coupon>0){
            $("#coupon").show();
            $("#ordinary_price").hide();
            $("#coupon_money").text(obj.goods.cash_coupon);
            $("#goTakeCoupon").click(function () {
                var $text = document.getElementById("alert_mask");
                var $mask = '<div id="alert_mask"></div>';
                if($text === undefined || $text === null){
                    $("body").append($mask);
                }
                com.maskLogin($("#alert_mask"));
            });
        }*/
        //}
    });

    function buyNow(data){
        var data = {'goods':JSON.stringify(data)};
        com.executeAjax(cartUrl + orderServiceUrl.cart_add, data, "POST", function (result) {
            window.location = '/purchase_orders.html';
        });
    }




});





/*function loginjc(userName){
 console.log(userName);
 if(userName){

 }else{
 com.maskLogin($("#alert_mask"));
 return false
 }
 }*/
