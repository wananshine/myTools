/**
 * Created by Administrator on 2016/11/4.
 */
$(function () {
    get_latest_orders();
	get_user_info();
    get_collections();
    //显示兑换按钮
    $(".integral_list").mouseenter(function(){
        $(this).find(".history_list_info").removeClass("vis_hide");
    });
    $(".integral_list").mouseleave(function(){
        $(this).find(".history_list_info").addClass("vis_hide");
    });
});
var vm_userInfo = new Vue({
    el: '#userInfo',
    data: {userInfo:{},stationList:[]},
    methods:{
        save_my_station:function(station_id){
            var data = {station_id: station_id};
            com.executeAjax(dtServiceUrl.save_my_service_station, data, "POST", function (result) {
                //alert('操作成功');
                window.location.reload();
            });
        }
    }
});
function get_user_info(){
    var url = userCenterUrl+orderServiceUrl.user_index;
	var data = {
        info : 'userInfo'
    };
    com.executeAjax(url,data, "GET", function (result) {
        vm_userInfo.userInfo = result.data.userInfo;
        var Img = result.data.userInfo.image;
        if(Img == ""){
            $("#notImg").removeClass("Nhide");
        }
    });

}

function get_latest_orders(){
    var data = {
        page : 1,
        size : 2
    };
    com.executeAjax(orderServiceUrl.latest_list, data, "GET", function (result) {  //360未知原因，调取两次接口才会刷新数据
        com.executeAjax(orderServiceUrl.latest_list, data, "GET", function (result) {
            new Vue({
                el: '#order_template',
                data: result,
                methods:{
                    cancelOrder:function(orderid){
                        cancelOrder(orderid);
                    },
                    detail:function(orderid){
                        window.location = '/center/order_info.html?orderid='+orderid;
                    },
                    toInfo:function (Id) {
                        window.open("/product_list_info.html?infoId="+Id);
                    }

                }
            });
            if(result.data == ""){
                $("#NoData").show();
            }
        });
    });
}

function cancelOrder(orderid){
    var content = '<div class="f_c_666" style="height: 255px;"><p class="f_c_333" style="background:0px 0px url(../img/icon_warning.png) no-repeat;background-size: 20px 20px;padding-left: 25px">订单取消申请</p><p class="fs_14px red mar_t_25px">*请选择取消原因：</p><ul class="mask_con_text fs_14px"><li><input class="mar_t_20px" type="checkbox" value="不想买了">&nbsp;&nbsp;<span>不想买了</span></li><li><input class="mar_t_20px" type="checkbox" value="重复下单/误下单">&nbsp;&nbsp;<span>重复下单/误下单</span></li><li><input class="mar_t_20px" type="checkbox" value="其他渠道价格更低">&nbsp;&nbsp;<span>其他渠道价格更低</span></li><li><input class="mar_t_20px" type="checkbox" value="商品买错了(颜色、尺寸、数量等)">&nbsp;&nbsp;<span>商品买错了（颜色、尺寸、数量等)</span></li><li><input class="mar_t_20px" type="checkbox" value="支付方式有误/无法支付">&nbsp;&nbsp;<span>支付方式有误/无法支付</span></li><li><input class="mar_t_20px" type="checkbox" value="订单不能按预计时间送达">&nbsp;&nbsp;<span>订单不能按预计时间送达</span></li></ul><p class="center fs_14px red hide prompt">请至少勾选一项</p></div>';
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
//我的关注前4条
function get_collections(){
    var data = {
        page : 1,
        size : 4
    };
    var url = userCenterUrl+orderServiceUrl.collection_list;
    com.executeAjax(url,data, "GET", function (result) {
       var items = new Vue({
            el: '#tab1',
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
        setTimeout(function () {
            personal_center();
            //gzButton();
        },100);
    });
}
/*function cancelCollect(goods_id){
    var url = userCenterUrl+orderServiceUrl.del_collection;
    var data = {
        id: goods_id
    };
    com.executeAjax(url , data, "GET", function (result) {
        consoleLog(result.msg);
    });
}*/

/*//关注按钮
function gzButton() {
    $(".main_con_img_gz").click(function(){
        var text = $(this).text();
        var $this = $(this);
        var dataUrl = $(this).attr("url");

        if(text == "关注"){
            var data = {
                'goods_id':dataUrl
            };
            com.executeAjax(userCenterUrl+orderServiceUrl.add_collection,data, "POST", function (result) {
                if(result.data == '添加成功'){
                    $this.text("取消关注");
                    $this.removeClass("bg_line_red white");
                    $this.addClass("bg_line_gray2");
                }
            });
        }else{
            var data = {
                'goods_id':dataUrl
            };
            com.executeAjax(userCenterUrl+orderServiceUrl.del_collection,data, "POST", function (result) {
                if(result.data == '取消成功'){
                    $this.text("关注");
                    $this.addClass("bg_line_red white");
                    $this.removeClass("bg_line_gray2");
                }
            });
        }
    });
}*/


function switchStation(){
    $('.change').toggle();
    com.executeAjax(dtServiceUrl.available_station,{}, "GET", function (result) {
        vm_userInfo.stationList.slice(result.data.length);
        vm_userInfo.stationList = result.data;
        /*更改上级*/
        setTimeout(function(){
            $(".change ul li").mouseenter(function(){
                $(this).find('input').removeClass('hide');
            }).mouseleave(function(){
                $(this).find('input').addClass('hide');
            });
        },100);
    });
    $('.change p input').click(function(){
        $('.change').hide();
    })
}