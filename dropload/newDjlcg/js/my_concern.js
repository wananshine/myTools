/**
 * Created by Gold on 2016/11/9.
 */
function my_concern(){
    var infoUrl = userCenterUrl+orderServiceUrl.collection_list;
    com.executeAjax(infoUrl, "", "GET", function (result) {
        var items = new Vue({
            el: '#content_main',
            data: {list: result},
            methods:{
                del_collection:function (obj,e) {
                    var el = e.currentTarget;
                    var data = {
                        'goods_id':obj
                    };
                    com.executeAjax(userCenterUrl+orderServiceUrl.del_collection,data, "POST", function (result) {
                        if(result.code === 0){
                            $(el).parent().remove();
                        }
                        if($(".history_list").length <= 0){
                            $("#notMsg").show();
                        }else{
                            $("#notMsg").hide();
                        }
                    });
                },
                add_cart:function (obj) {
                    var number = 1;
                    var goods = {
                        'goods_id': obj,
                        'number'  : number,
                        'spec'    : ''
                    };
                    var data = {'goods':JSON.stringify(goods)};
                    com.executeAjax(cartUrl + orderServiceUrl.cart_add, data, "POST", function (result) {
                        var content = '<div class="f_c_666 center" style="height: 115px;margin-top: 15px">商品已成功加入进货单！</div>';
                        var object = {
                            getid        : $("#alert_mask"),
                            text_title   : "提示",
                            text_content : content,
                            text_input2  : "继续购物",
                            text_input1  : "去结算"
                        };
                        com.mask(object);
                        $(".mask_confirm").click(function () {
                            window.location = '/purchase_orders.html';
                        })
                    });
                }
            }
        });

        //关注商品鼠标移上去显示删除按钮
        $(".history_list").mouseenter(function(){
            $(this).find(".history_list_del,.history_list_info").removeClass("vis_hide");
        });
        $(".history_list").mouseleave(function(){
            $(this).find(".history_list_del,.history_list_info").addClass("vis_hide");
        });
    });
}

function browsing_record(){
    var infoUrl = userLoginUrl+orderServiceUrl.history_list;
    com.executeAjax(infoUrl, "", "GET", function (result) {
        var items = new Vue({
            el: '#tab2',
            data: {list: result},
            methods:{
                add_cart:function (obj) {
                    var number = 1;
                    var goods = {
                        'goods_id': obj,
                        'number'  : number,
                        'spec'    : ''
                    };
                    var data = {'goods':JSON.stringify(goods)};
                    com.executeAjax(cartUrl + orderServiceUrl.cart_add, data, "POST", function (result) {
                        var content = '<div class="f_c_666 center" style="height: 200px;line-height: 110px;">商品已成功加入进货单！</div>';
                        var object = {
                            getid        : $("#alert_mask"),
                            text_title   : "提示",
                            text_content : content,
                            text_input2  : "继续购物",
                            text_input1  : "去结算"
                        };
                        com.mask(object);
                        $(".mask_input").css("margin-left","-110px");
                        $(".mask_confirm").click(function () {
                            window.location = '/purchase_orders.html';
                        })
                    });
                }
            }
        });

        /*//关注商品删除
         $(".history_list_del").click(function(){
         $(this).parents(".history_list").remove();
         });*/

        //关注商品鼠标移上去显示删除按钮
        $(".history_list").mouseenter(function(){
            $(this).find(".history_list_del,.history_list_info").removeClass("vis_hide");
        });
        $(".history_list").mouseleave(function(){
            $(this).find(".history_list_del,.history_list_info").addClass("vis_hide");
        });


        if(result.data == null){
            $("#notData").show();
        }
    });
}