/**
 * Created by Administrator on 2016/11/8.
 */
$(function () {

    var orderid = getQueryString('out_trade_no');
    var total_fee = getQueryString('total_fee');
    var underLine = getQueryString('underline');    //是否是线下支付跳转过来的
    if(underLine){
        $("#payTitle").html('提交成功');
        $("#msg").html('您的转账信息已提交成功，审核通过后会及时通知您');
    }

    var vm = new Vue({
        el: '#pay_info_template',
        data: {orderid:orderid,total_fee:total_fee},
        methods:{
            goOn:function(){
                window.location = '/main.html';
            },
            orderDetail:function(){
                window.location = '/center/order_info.html?orderid='+orderid;
            }
        }
    });

    var data = {
        type : 1,
        num  : 4
    };
    com.executeAjax(menuUrl + orderServiceUrl.cat_goods, data, "GET", function (result) {
        new Vue({
            el: '#goods_list_template',
            data: result,
            methods:{
                toInfo:function (Id) {
                    location.href = "product_list_info.html?infoId="+Id;
                }
            }
        });

        $(".main_content_img li").mouseenter(function(){
            $(this).removeClass("rem_shadow_5px");
            $(this).addClass("shadow_5px");
        });
        $(".main_content_img li").mouseleave(function(){
            $(this).removeClass("shadow_5px");
            $(this).addClass("rem_shadow_5px");
        });
    });
});
