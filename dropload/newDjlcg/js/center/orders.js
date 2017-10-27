/**
 * Created by Administrator on 2016/11/4.
 */

var cur_order_type_name='';
$(function () {
    //订单首页未收货和付款数量
    com.executeAjax(orderUrl+orderServiceUrl.status_count, "", "GET", function (result) {
        new Vue({
            el: '#myOrderSumTemp',
            data: result.data,
            methods:{
                statusFilter:function(type){
                    cur_order_type_name = type;
                    productList(0);
                    obtainDivHeight();
                }
            }
        });
    });

    productList();

    var text   = $(".order_info_list");
    var text2  = $(".order_info_logistics");
    var isTrue = true;

    //一个列表两个商品时按钮左侧显示一根线
    var orderList = $(".order_con_list").length;
    for(var i=0; i<orderList; i++){
        var text = $(".order_con_list").eq(i).find(".order_info_list").length;
        if(text == 1){
            $(".order_con_list").eq(i).find(".info_input").css("border-left","transparent");
        }
    }

    if(isTrue){
        for(var i=0; i< $(".order_info_list").length; i++){
            var order_info_logistics = text2.eq([i]).outerHeight(true);
            text2.eq([i]).css("margin-top","-"+order_info_logistics/2+"px");
        }
        isTrue = false;
    }
    $(".order_schedule ul li hr").eq(0).css("width","50%");
    $(".order_schedule ul li hr").eq(4).css({"width":"50%","right":"50%"});



})

var vm = new Vue({
    el: '#myOrderListTemp',
    data: {items:[]},
    methods:{
        cancelOrder:function(orderid){
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
                    com.executeAjax(orderUrl+orderServiceUrl.cancel, data, "POST", function (result) {
                        if(result.code === 0){
                            $(".bg_mask,.mask_main").hide();
                            location.reload();
                        }else{
                            alert(result.msg);
                        }
                    });
                }
            });
        },
        goPay:function(orderid){
            window.location = '/purchase_orders_buy.html?orderid='+orderid;
        },
        detail:function(orderid){
            window.location = '/center/order_info.html?orderid='+orderid;
        },
        toInfo:function (Id) {
            window.open("/product_list_info.html?infoId="+Id);
        }
    }
});

function pageSelectCallback(page_index, jq) {
    productList(page_index);
    return false;
}

function productList(page) {
    page = page?page+1:1;
    //订单首页商品列表
    var data = {
        page : page,
        size : 5,
        type : cur_order_type_name
    };
    com.executeAjax(orderUrl+orderServiceUrl.list, data, "GET", function(result){
        $("#Pagination").pagination(result.data.total, {
            num_edge_entries: 1, //边缘页数
            num_display_entries: 4, //主体页数
            callback: pageSelectCallback,
            items_per_page:data.size, //每页显示1项
            prev_text: "前一页",
            next_text: "后一页",
            current_page:page-1
        });
        vm.items.splice(result.data.items.length);
        vm.items = result.data.items;

        if(result.data.items == ""){
            $("#NoData").show();
            $("#Pagination").hide();
        }
        var pageTabWidth = $("#Pagination").outerWidth();
        $("#Pagination").css("margin-left", "-"+pageTabWidth/2+"px");

        setTimeout(function(){
            //菜单栏切换
            $(".toInfo").click(function(){
                var activeTab = $(this).attr("href");
                $("#content_main").load(activeTab);
                obtainDivHeight();
            });
        },100);

        obtainDivHeight();

        //商品订单首页的切换筛选按钮
        $(".order_con_title .tab").click(function(){
            var searchResult = $(this).find(".teb_text").text();
            $(".order_con_title .tab").find(".teb_text").removeClass("border_b_red");
            $(this).find(".teb_text").addClass("border_b_red");

            // $(".order_con_list").css({"display": "none"});
            // $(".order_con_list .status:contains(" + searchResult + ")").parent().parent().parent().css({"display": "block"});
            obtainDivHeight();
            var index = $(this).index();
            if(index == 0) $(".order_con_list").css({"display": "block"});

            if(result.data.items == ""){
                $("#NoData").hide();
            }
        });
    });
}