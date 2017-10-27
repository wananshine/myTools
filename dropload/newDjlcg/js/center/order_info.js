/**
 * Created by Administrator on 2016/11/3.
 */

$(function () {
    var orderid = getQueryString('orderid');
    if (!orderid) {
        alert('订单不存在');
        return false;
    } else {
        //订单首页未收货和付款数量
        com.executeAjax(orderUrl + orderServiceUrl.detail, {orderid: orderid}, "GET", function (result) {
            new Vue({
                el: '#order_detail_template',
                data: result.data,
                methods:{
                    //立即支付
                    gotoPay:function(){
                        window.location = '/purchase_orders_buy.html?orderid='+orderid;
                    },
                    //取消订单
                    cancelOrder:function(){
                        cancelOrder(orderid);
                    },
                    //立即购买
                    buyNow:function(goods_id,attr_ids){
                        buyNow(goods_id,attr_ids);
                    },
                    //确认收货（订单）
                    confirmReceive:function(){
                        confirmReceive(orderid);
                    },
                    //确认收货（部分发货时确认单个商品收货）
                    confirmReceiveGoods:function(goods_id){
                        confirmReceiveGoods(goods_id);
                    },
                    //取消订购（部分发货时取消订购单个商品）
                    cancelGoods:function(goods_id){
                        cancelGoods(goods_id);
                    },
                    go_after_service:function(goods_id){
                        location.href = '/center/returns_apply.html?infoId='+goods_id;
                    },
                    //意见反馈
                    feedBack:function () {
                        feedFun();
                    },
                    //申请发票
                    applyInvoice:function () {
                        window.open("/center/invoice.html?infoid=7");
                    },
                    //跳转详情页
                    toInfo:function (Id) {
                        window.open("/product_list_info.html?infoId="+Id);
                    }
                }
            });
            //orderInput();

            switch(result.data.order_status)  // 1: 提交订单  2: 正在出库  3: 等待收货  4: 完成  5: 取消
            {
                case "0":
                    $(".order_line2").show();
                    $("#Invoice").hide();
                    $(".order_schedule ul li hr").eq(0).css("border-color","#89ca55");
                    $(".order_schedule ul li img").eq(0).attr("src","/img/icon_01.png");
                    $(".order_status li img").attr("src","/img/waitBuy.png");
                    break;
                case "1":
                    $(".order_line1,#alreadyPaid").show();
                    var a = 2;
                    for(var i=0; i<a; i++){
                        $(".order_schedule ul li hr").eq(i).css("border-color","#89ca55");
                        $(".order_schedule ul li img").eq(i).attr("src","/img/icon_01.png");
                    }
                    break;
                case "2":
                    $(".order_line1").show();
                    var a = 3;
                    for(var i=0; i<a; i++){
                        $(".order_schedule ul li hr").eq(i).css("border-color","#89ca55");
                        $(".order_schedule ul li img").eq(i).attr("src","/img/icon_01.png");
                    }
                    break;
                case "3":
                case "4":
                    $(".pro_status,.order_info_status").show();
                    var a = 4;
                    for(var i=0; i<a; i++){
                        $(".order_schedule ul li hr").eq(i).css("border-color","#89ca55");
                        $(".order_schedule ul li img").eq(i).attr("src","/img/icon_01.png");
                    }
                    break;
                case "5":
                    $(".order_line3").show();
                    var a = 5;
                    for(var i=0; i<a; i++){
                        $(".order_schedule ul li hr").eq(i).css("border-color","#89ca55");
                        $(".order_schedule ul li img").eq(i).attr("src","/img/icon_01.png");
                    }
                    $(".order_status li img").attr("src","/img/success.png");
                    break;
                case "8":
                case "9":
                case "10":
                    $(".order_line4").show();
                    $("#Invoice").hide();
                    $(".order_status li img").attr("src","/img/error.png");
                    break;
                default:
                    $(".order_status li div").removeClass("li_he_25px").addClass("li_he_40px");
                    $(".order_schedule ul li hr").eq(0).css("border-color","#89ca55");
                    $(".order_schedule ul li img").eq(0).attr("src","/img/icon_01.png");
                    $(".order_status li img").attr("src","/img/waitBuy.png");
            }
            obtainDivHeight();
            if(result.data.goods_amount < 500){
                $("#Invoice").hide();
            }
            $(".login_help").mouseover(function (){
                $(this).css("text-decoration","underline");
                $(this).find(".login_img_help").show();
            }).mouseout(function (){
                $(this).css("text-decoration","");
                $(this).find(".login_img_help").hide();
            });
        });
    }
});

function cancelGoods(goods_id){
    var content = '<div class="f_c_666" style="height: 255px;"><p class="f_c_333" style="background:0px 0px url(../img/icon_warning.png) no-repeat;background-size: 20px 20px;padding-left: 25px">商品取消申请</p><p class="fs_14px red mar_t_25px">*请选择取消原因：</p><ul class="mask_con_text fs_14px"><li><input class="mar_t_20px" type="checkbox" value="此商品不能按预计时间送达">&nbsp;&nbsp;<span>此商品不能按预计时间送达</span></li><li><input class="mar_t_20px" type="checkbox" value="商品买错了">&nbsp;&nbsp;<span>商品买错了</span></li><li><input class="mar_t_20px" type="checkbox" value="重复下单">&nbsp;&nbsp;<span>重复下单</span></li><li><input class="mar_t_20px" type="checkbox" value="价格偏贵">&nbsp;&nbsp;<span>价格偏贵</span></li><li><input class="mar_t_20px" type="checkbox" value="不想买了">&nbsp;&nbsp;<span>不想买了</span></li><li><input class="mar_t_20px" type="checkbox" value="其他">&nbsp;&nbsp;<span>其他</span></li></ul><p class="center fs_14px red hide prompt">请至少勾选一项</p></div>';
    var object = {
        getid        : $("#alertMask"),
        text_title   : "提示",
        text_content : content
    }
    com.mask(object);

    //弹出窗确定按钮
    $(".mask_confirm").click(function(){
        //获取订单号码
        var value =[];
        $('.mask_con_text li input:checked').each(function(){
            value.push($(this).val());
        });

        var data = {
            order_goods_id: goods_id,
            cancel_note: value.join(",")  //取消原因
        };
        if(value == ''){
            $(".prompt").removeClass("hide");
        }else {
            //取消订单接口
            com.executeAjax(orderUrl + orderServiceUrl.cancel_goods, data, "POST", function (result) {
                if (result.code === 0) {
                    $(".bg_mask,.mask_main").hide();
                    location.reload();
                } else {
                    alert(result.msg);
                    return;
                }
            });
        }
    });
}

function confirmReceiveGoods(goods_id) {
    var data = {'order_goods_id': goods_id};
    com.executeAjax(orderUrl + orderServiceUrl.confirm_receive_goods, data, "POST", function (result) {
        window.location.reload();
    });
}

function buyNow(goods_id,attr_ids){
    var attrArr = [];
    if(attr_ids){
        attrArr = attr_ids.split('_');
    }
    var goods = {'goods_id':goods_id,'number':1,'spec':attrArr};
    var data = {'goods':JSON.stringify(goods)};
    com.executeAjax(cartUrl + orderServiceUrl.cart_add, data, "POST", function (result) {
        window.location = '/purchase_orders.html';
    });

}
function confirmReceive(orderid){
    var data = {
        orderid: orderid
    };
    com.executeAjax(orderUrl + orderServiceUrl.confirm_receive, data, "POST", function (result) {
        window.location.reload();
    });
}
function cancelOrder(orderid){
    var content = '<div class="f_c_666" style="height: 255px;"><p class="f_c_333" style="background:0px 0px url(../img/icon_warning.png) no-repeat;background-size: 20px 20px;padding-left: 25px">订单取消申请</p><p class="fs_14px red mar_t_25px">*请选择取消原因：</p><ul class="mask_con_text fs_14px"><li><input class="mar_t_20px" type="checkbox" value="不想买了">&nbsp;&nbsp;<span>不想买了</span></li><li><input class="mar_t_20px" type="checkbox" value="重复下单/误下单">&nbsp;&nbsp;<span>重复下单/误下单</span></li><li><input class="mar_t_20px" type="checkbox" value="其他渠道价格更低">&nbsp;&nbsp;<span>其他渠道价格更低</span></li><li><input class="mar_t_20px" type="checkbox" value="商品买错了（颜色、尺寸、数量等)">&nbsp;&nbsp;<span>商品买错了（颜色、尺寸、数量等)</span></li><li><input class="mar_t_20px" type="checkbox" value="支付方式有误/无法支付">&nbsp;&nbsp;<span>支付方式有误/无法支付</span></li><li><input class="mar_t_20px" type="checkbox" value="订单不能按预计时间送达">&nbsp;&nbsp;<span>订单不能按预计时间送达</span></li></ul><p class="center fs_14px red hide prompt">请至少勾选一项</p></div>';
    var object = {
        getid        : $("#alertMask"),
        text_title   : "提示",
        text_content : content
    }
    com.mask(object);

    //弹出窗确定按钮
    $(".mask_confirm").click(function(){
        //获取订单号码
        var value =[];
        $('.mask_con_text li input:checked').each(function(){
            value.push($(this).val());
        });

        var data = {
            orderid: orderid,
            cancel_note: value.join(",")  //取消原因
        };
        if(value == ''){
            $(".prompt").removeClass("hide");
        }else {
            //取消订单接口
            com.executeAjax(orderUrl + orderServiceUrl.cancel, data, "POST", function (result) {
                if (result.code === 0) {
                    $(".bg_mask,.mask_main").hide();
                    location.reload();
                } else {
                    alert(result.msg);
                }
            });
        }
    });
}

//点击查看详情和取消订单
function orderInput($input){
    var text   = $input.attr("ng-id");  //2:查看详情  3:取消订单
    var temp1  = $("#temp1");
    var temp2  = $("#temp2");
    var status = $input.attr("status");

    if(text === "3"){
        var content = '<div class="f_c_666" style="height: 255px;"><p class="f_c_333" style="background:0px 0px url(../img/icon_warning.png) no-repeat;background-size: 20px 20px;padding-left: 25px">订单取消申请</p><p class="fs_14px red mar_t_25px">*请选择取消原因：</p><ul class="mask_con_text fs_14px"><li><input class="mar_t_20px" type="checkbox" value="不想买了">&nbsp;&nbsp;<span>不想买了</span></li><li><input class="mar_t_20px" type="checkbox" value="重复下单/误下单">&nbsp;&nbsp;<span>重复下单/误下单</span></li><li><input class="mar_t_20px" type="checkbox" value="其他渠道价格更低">&nbsp;&nbsp;<span>其他渠道价格更低</span></li><li><input class="mar_t_20px" type="checkbox" value="商品买错了（颜色、尺寸、数量等)">&nbsp;&nbsp;<span>商品买错了（颜色、尺寸、数量等)</span></li><li><input class="mar_t_20px" type="checkbox" value="支付方式有误/无法支付">&nbsp;&nbsp;<span>支付方式有误/无法支付</span></li><li><input class="mar_t_20px" type="checkbox" value="订单不能按预计时间送达">&nbsp;&nbsp;<span>订单不能按预计时间送达</span></li></ul><p class="center fs_14px red hide prompt">请至少勾选一项</p></div>';
        var object = {
            getid        : $("#alertMask"),
            text_title   : "提示",
            text_content : content
        }
        com.mask(object);

        //弹出窗确定按钮
        $(".mask_confirm").click(function(){
            //获取订单号码
            var text = $input.parent().parent().parent().find(".orderNum").text();
            var value =[];
            $('.mask_con_text li input:checked').each(function(){
                value.push($(this).val());
                if(value == ''){
                    $(".prompt").removeClass("hide");
                }else {
                    //取消订单接口
                    com.executeAjax(orderUrl + orderServiceUrl.cancel, {'orderid': text}, "POST", function (result) {
                        if (result.code === 0) {
                            alert('操作成功');
                            $(".bg_mask,.mask_main").hide();
                            productList();
                        } else {
                            alert(result.msg);
                        }
                    });
                }
            });
        });
    }
    if(text === "2"){
        switch(status)  // 1: 提交订单  2: 正在出库  3: 等待收货  4: 完成  5: 取消
        {
            case "0":
                $(".order_status li div p").eq(2).hide();
                $(".order_status li div").removeClass("li_he_25px").addClass("li_he_40px");
                $(".order_schedule ul li hr").eq(0).css("border-color","#89ca55");
                $(".order_schedule ul li img").eq(0).attr("src","img/icon_01.png");
                $(".order_status li img").attr("src","img/waitBuy.png");
                $(".wldh,.wl,.wlfw,.wlfh,.wlwc,.yjfk").hide();
                break;
            case "1":
            case "2":
            case "3":
                var a = 3;
                for(var i=0; i<a; i++){
                    $(".order_schedule ul li hr").eq(i).css("border-color","#89ca55");
                    $(".order_schedule ul li img").eq(i).attr("src","img/icon_01.png");
                }
                $(".wlfw,.wlze,.wldh,.wl,.wldd_fk,.wlwc,.yjfk").hide();
                $(".wldd_qx").removeClass("mar_l_15px");
                break;
            case "4":
                var a = 4;
                for(var i=0; i<a; i++){
                    $(".order_schedule ul li hr").eq(i).css("border-color","#89ca55");
                    $(".order_schedule ul li img").eq(i).attr("src","img/icon_01.png");
                }
                $(".wlfw,.wlze,.wlfh,.wlwc,.yjfk").hide();
                break;
            case "5":
                var a = 5;
                for(var i=0; i<a; i++){
                    $(".order_schedule ul li hr").eq(i).css("border-color","#89ca55");
                    $(".order_schedule ul li img").eq(i).attr("src","img/icon_01.png");
                }
                $(".order_status li img").attr("src","img/success.png");
                $(".wlfw,.wlze,.wldh,.wl,.wldd_fk,.wldd_qx,.wlfh,.order_info_money .money").hide();
                $(".order_info_money").removeClass("mar_t_20px");
                $(".wlwc_gm").removeClass("Nhide mar_t_5px");
                break;
            case "8":
            case "9":
            case "10":
                $(".order_status li img").attr("src","img/error.png");
                $(".wlfw,.wlze,.wldh,.wl,.wldd_fk,.wlwc,.yjfk,.wlfh,.order_schedule").hide();
                $(".wldd_qx").removeClass("mar_l_15px");
                $(".wlqx").removeClass("Nhide");
                break;
            default:
                $(".order_status li div p").eq(2).hide();
                $(".order_status li div").removeClass("li_he_25px").addClass("li_he_40px");
                $(".order_schedule ul li hr").eq(0).css("border-color","#89ca55");
                $(".order_schedule ul li img").eq(0).attr("src","img/icon_01.png");
                $(".order_status li img").attr("src","img/waitBuy.png");
                $(".wldh,.wl,.wlfw,.wlfh,.wlwc,.yjfk").hide();
        }
        temp1.hide();
        temp2.removeClass("Nhide");
        obtainDivHeight();
    }
};

//意见反馈
function feedFun() {
    var object = {
        getid        : $("#alertMask"),
        text_title   : "意见反馈",
        text_content : $("#feedBackMask").html(),
        text_input1  : "提交"
    }
    com.mask(object);
    $(".mask_main").css({'margin': '-240px -312.5px'});

    $(".mask_main").attr("id","feed_back_mask");
    $(".mask_title").css("background","#FFF");
    $(".mask_input").hide();

    $("#back_textarea").on("input", function () {
        var text = $(this).val().length;
        if(text < 151){
            $(".numberSize").text(150-parseInt(text));
        }
        if(text >= 1){
            $("#back_text1").attr("data","true").hide();
        }else{
            $("#back_text1").attr("data","false").show();
        }
    });

    $("#back_phone").on("input", function () {
        var text = $(this).val().length;
        if(text >= 1){
            $("#back_text2").attr("data","true").hide();
        }else{
            $("#back_text2").attr("data","false").show();
        }
    });

    //提交意见反馈
    $(".feedBack_submit").click(function () {
        var text1 = $("#back_text1").attr("data");
        var text2 = $("#back_text2").attr("data");
        if(text1 === "true" && text2 === "true") {
            var url = userLoginUrl + orderServiceUrl.add_message;

            var content = $("#back_textarea").val();
            var company_name = $("#company_name").val();
            var back_phone = $("#back_phone").val();

            var data = {
                msg_content : content,
                user_name : company_name,
                back_phone : back_phone
            }
            var success_callback = function (obj) {
                if ( obj == 3) {
                    com.maskSuccess($("#alertMask"), "非常感谢，您的意见我们已经收到！");
                }
            }
            com.executeAjax(url, data, "POST", success_callback);
        }

    });
}

