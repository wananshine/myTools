/**
 * Created by Gold on 2016/10/26.
 */
$(function () {

    //订单首页未收货和付款数量
    com.executeAjax(orderUrl+orderServiceUrl.status_count, "", "GET", function (result) {
        new Vue({
            el: '#myOrderSumTemp',
            data: result.data
        });
    });

    productList();

    function pageselectCallback(page_index, jq) {
        if (inited) {
            productList(page_index);
        }
        inited = true;
        return false;
    }
    var inited = false;//是否已初始化过
    var vm = new Vue({
        el: '#myOrderListTemp',
        data: {items:[]}
    });

    function productList(page) {
        page = page?page+1:1;

        //订单首页商品列表
        var data = {
            page : page,
            size : 5
        };
        com.executeAjax(orderUrl+orderServiceUrl.list, data, "GET", function(result){
            if(!inited){
                $("#Pagination").pagination(result.data.total, {
                    num_edge_entries: 1, //边缘页数
                    num_display_entries: 4, //主体页数
                    callback: pageselectCallback,
                    items_per_page:data.size, //每页显示1项
                    prev_text: "前一页",
                    next_text: "后一页"
                });
            }
            vm.items.splice(result.data.length);
            vm.items = result.data.items;
            //菜单栏切换
            $(".order_info_input p").find("c").click(function(){
                var activeTab = $(this).attr("href");
                $("#content_main").load(activeTab);
                obtainDivHeight();
            });

            //商品订单首页的切换筛选按钮
            $(".order_con_title .tab").click(function(){
                var searchResult = $(this).find(".teb_text").text();
                $(".order_con_title .tab").find(".teb_text").removeClass("border_b_red");
                $(this).find(".teb_text").addClass("border_b_red");

                $(".order_con_list").css({"display": "none"});
                $(".order_con_list .status:contains(" + searchResult + ")").parent().parent().parent().css({"display": "block"});
                obtainDivHeight();
                var index = $(this).index();
                if(index === 0) $(".order_con_list").css({"display": "block"});
            });
        });
    }

    var text   = $(".order_info_list");
    var text2  = $(".order_info_logistics");
    var isTrue = true;

    //一个列表两个商品时按钮左侧显示一根线
    var orderList = $(".order_con_list").length;
    for(var i=0; i<orderList; i++){
        var text3 = $(".order_con_list").eq(i).find(".order_info_list").length;
        if(text3 == 1){
            $(".order_con_list").eq(i).find(".info_input").css("border-left","transparent");
        }
    }

    if(isTrue){
        for(var a=0; a< $(".order_info_list").length; a++){
            var order_info_logistics = text2.eq([a]).outerHeight(true);
            text2.eq([a]).css("margin-top","-"+order_info_logistics/2+"px");
        }
        isTrue = false;
    }
    $(".order_schedule ul li hr").eq(0).css("width","50%");
    $(".order_schedule ul li hr").eq(4).css({"width":"50%","right":"50%"});


    //点击查看详情和取消订单
    function orderInput($input){
        var text   = $input.attr("ng-id");  //2:查看详情  3:取消订单
        var temp1  = $("#temp1");
        var temp2  = $("#temp2");
        var status = $input.attr("status");

        if(text === "3"){
            var content = '<div class="f_c_666" style="height: 255px;"><p class="f_c_333">订单取消申请</p><p class="fs_14px red mar_t_25px">*请选择取消原因：</p><ul class="mask_con_text"><li><input class="mar_t_20px" type="checkbox" value="不想买了">&nbsp;&nbsp;<span>不想买了</span></li><li><input class="mar_t_20px" type="checkbox" value="重复下单/误下单">&nbsp;&nbsp;<span>重复下单/误下单</span></li><li><input class="mar_t_20px" type="checkbox" value="其他渠道价格更低">&nbsp;&nbsp;<span>其他渠道价格更低</span></li><li><input class="mar_t_20px" type="checkbox" value="商品买错了（颜色、尺寸、数量等)">&nbsp;&nbsp;<span>商品买错了（颜色、尺寸、数量等)</span></li><li><input class="mar_t_20px" type="checkbox" value="支付方式有误/无法支付">&nbsp;&nbsp;<span>支付方式有误/无法支付</span></li><li><input class="mar_t_20px" type="checkbox" value="订单不能按预计时间送达">&nbsp;&nbsp;<span>订单不能按预计时间送达</span></li></ul></div>';
            var object = {
                getid        : $("#cancel_orders_mask"),
                text_title   : "提示",
                text_content : content
            };
            com.mask(object);

            //弹出窗确定按钮
            $(".mask_confirm").click(function(){
                //获取订单号码
                var text = $input.parent().parent().parent().find(".orderNum").text();
                var value =[];
                $('.mask_con_text li input:checked').each(function(){
                    value.push($(this).val());

                    //取消订单接口
                    com.executeAjax(orderUrl+orderServiceUrl.cancel, {'orderid':text}, "POST", function (result) {
                        if(result.code === 0){
                            alert('操作成功');
                            $(".bg_mask,.mask_main").hide();
                            productList();
                        }else{
                            alert(result.msg);
                        }
                    });
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
                    var c = 4;
                    for(var d=0; d<c; d++){
                        $(".order_schedule ul li hr").eq(d).css("border-color","#89ca55");
                        $(".order_schedule ul li img").eq(d).attr("src","img/icon_01.png");
                    }
                    $(".wlfw,.wlze,.wlfh,.wlwc,.yjfk").hide();
                    break;
                case "5":
                    var b = 5;
                    for(var i=0; i<b; i++){
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
    }
});