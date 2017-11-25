/**
 * Created by Gold on 2016/10/20.
 */

//分别加载页眉，页脚
$("#titleTemp_main").load("lib/temp/page_title.html");
$("#bottomTemp_main").load("lib/temp/page_bottom.html");

function orders_one_init(){

    //购物车商品列表
    com.executeAjax(cartUrl + orderServiceUrl.cart_get, "", "GET", function () {
        com.executeAjax(cartUrl + orderServiceUrl.cart_get, "", "GET", function (result) {
            var res = result.data.list;
            var enquity = result.data.enquity;


            // if (enquity==0){
            //     $("#bupInput1,#notData").hide();
            //     $("#bupInput2").show();
            // }else if(enquity==1){
            //     console.log(456)
            //     $("#bupInput1,#notData").show();
            //     $("#bupInput2").hide();
            // }

            var app = new Vue({
                el: '#list_template',
                data: {list: []},
                methods: {
                    remove: function (obj) {
                        removeOrder(obj.rec_id, obj.goods_id);
                    },
                    toInfo: function (Id) {
                        if(Id==0){
                            return false;
                        }else{
                            window.open("product_list_info.html?infoId=" + Id);
                        }
                    },
                    lookshoping: function(goods){
                        lookshoping(goods);
                    }
                },

            })

            app.list.splice(result.data.list.length);
            app.list = result.data.list;
            /*if(result.data.list[0].dt_price != 0){
             $(".allSelect li").eq(4).html("<span class='red'>渠道价</span>");
             }*/
            var app2 = new Vue({
                el: '#sum_template',
                methods: {
                    gotoCheckout: function (event) {
                        var cookieUserName = $.cookie("ECS[username]");
                        if (cookieUserName) {
                            window.location = 'purchase_orders_info.html';
                        } else {
                            com.maskLogin($("#del_orders_mask"));
                        }
                    },
                    customsp: function(){
                        addshoping();
                    },

                },
                created: function(){}
            });
            setTimeout(function () {
                var a = 0;
                $.each(res, function (i, object) {
                    if (object.selected) {
                        a++;
                        $(".radioInput").eq(i).find("input").siblings(".copy_input").find("img").show();
                        $(".radioInput").eq(i).find("input").attr("checked", "checked");
                        var value = $(".radioInput").eq(i).find("input").val();
                        //单选按钮接口
                        var data = {
                            cart_id: parseInt(value),
                            select: 1    //是否勾选 0=否；1=是
                        };
                        com.executeAjax(cartUrl + orderServiceUrl.cart_set_select, data, "POST", function (result) {
                            $("#Amount").text(result.data.total_amount);
                            //$("#Coupon").text(result.data.coupon_val);
                            $("#number").text(result.data.total_count);
                        });
                    }
                    if (res.length == a) {
                        $("#allSelect").siblings(".copy_input").find("img").show();
                        $("#allSelect").attr("checked", "checked");
                        var data = {
                            select: 1    //是否勾选 0=否；1=是
                        };
                        com.executeAjax(cartUrl + orderServiceUrl.cart_set_select_all, data, "POST", function (result) {
                            $("#Amount").text(result.data.total_amount);
                            //$("#Coupon").text(result.data.coupon_val);
                            $("#number").text(result.data.total_count);
                        });
                    }



                });


                if (result.data.list.length <= 0 ) {
                    $("#bupInput1,#notData").show();
                    $("#bupInput2").hide();
                    $("#list_tit_txt").hide();
                    $("#sum_template").hide();
                }else if(enquity==1){
                    $("#bupInput1").show();
                    $("#bupInput2").hide();
                }else if(result.data.list.length >= 1 || enquity==0){
                    $("#bupInput1,#notData").hide();
                    $("#bupInput2").show();
                    $("#list_tit_txt").show();
                    $("#sum_template").show();
                }

                // $(".classInput").each(function(index, item){
                //     console.log(enquity)
                //     if (enquity.indexOf()){}
                // })
                orders_one();
            }, 100);
            /*var version = com.browserVersion();
             version = version.split(":");
             version = version[0];
             if(version === "IE"){
             setTimeout(function () {
             if(!window.name){
             window.name = 'test';
             window.location.reload();
             }
             },300);
             }*/

            //热门推荐
            var catId = result.data.cat_id;
            var data = {
                type : 1,  //类型
                num  : 5,   //限制数量
                cat_id:catId
            };

            com.executeAjax(menuUrl+orderServiceUrl.cat_goods, data, "GET", function (result) {
                var sellWell = new Vue({
                    el: "#sellWellPro",
                    data: {list:{content:[]}},
                    methods:{
                        toListInfo2:function (url) {
                            window.open("product_list_info.html?infoId="+url);
                        }
                    }
                });
                sellWell.list.content.splice(result.content.length);
                sellWell.list = result.content;
                // setTimeout(function () {
                //     divShadow();
                // },10)
            });

        });


    });
};

$(".add_custom_sp").click(function () {
    addshoping();
})
$(".para_txt").click(function () {

})

//商品自定义弹出层
function addshoping(){
    $("#sp_mask").css({
        display: "block",
    });
    var content = $("#sp_mask_con").html();
    // console.log(content);
    var object={
        getid        : $("#sp_mask"),
        text_title   : "添加自定义商品",
        text_content : content,
        // text_input2  : "取消",
        text_input1  : "确定"
    }
    com.mask(object);
    $(".sp_content").find("input").focusin(function(){
        $(this).css({ "borderColor": "#dfdfdf" });
    });
    $(".mask_confirm").click(function(){
        var inputprobrand = $("#inputprobrand").val();      //品牌
        var inputproname  = $("#inputproname").val();       //名称
        var inputtype     = $("#inputtype").val();          //类型
        var inputparam    = $("#inputparam").val();         //技术参数
        var inputnum      = $("#inputnum").val();           //数量
        var inputprice    = $("#inputprice").val();         //单价
        var inputunit     = $("#inputunit").val();          //单位
        var inputnote     = $("#inputnote").val();          //备注


        var is_spTrue = [];
        for ( var len=0; len<$(".sp_content .sp_li").length; len++){
            $(this).find("input").focusin(function(){
                $("#sp-f-danger").css({ "display": "none" });
            })
        }
        var promptimg = '<img src="img/icon_warning.png">';
        if(inputproname==""){
            //console.log("brand-null")
            $("#sp-f-danger").css({ "display": "block" }).html(promptimg + "您的品牌信息填写不完整，请填写完整后提交");
            return;
        }
        if(inputparam==""){
            $("#sp-f-danger").css({ "display": "block" }).html(promptimg + "您的技术参数信息填写不完整，请填写完整后提交");
            return;
        }
        if(inputnum==""||inputnum<1){
            $("#sp-f-danger").css({ "display": "block" }).html(promptimg+"您的数量信息填写不完整，请填写完整后提交");
            return;
        }
        if(inputprice==""||inputprice<0){
            $("#sp-f-danger").css({ "display": "block" }).html(promptimg+"您的价格信息填写不完整，请填写完整后提交");
            return;
        }
        if(inputunit==""){
            $("#sp-f-danger").css({ "display": "block" }).html(promptimg+"您的单位信息填写不完整，请填写完整后提交");
            return;
        }
        else {
            $("#sp-f-danger").hide();
            var data = {
                // 'address_id'         : isAdd,                      //收货地址id 大于0为编辑，其他为新增
                'input_probrand'     : inputprobrand,               //商品品牌
                'inputpro_name'      : inputproname,                //商品名称
                'input_type'         : inputtype,                   //商品类型
                'input_param'        : inputparam,                  //技术参数
                'input_num'          : inputnum,                    //数量
                'input_price'        : inputprice,                  //单价
                'input_unit'         : inputunit,                   //单位
                'input_note'         : inputnote,                   //备注

                // 'goods_id'         : inputprobrand,               //商品品牌
                // 'goods_name'       : inputproname,                //商品名称
                // 'input_type'       : inputtype,                   //商品类型
                // 'goods_sn'         : inputparam,                  //技术参数
                // 'goods_number'     : inputnum,                    //数量
                // 'goods_price'      : inputprice,                  //单价
                // 'unit'             : inputunit,                   //单位
                // 'goods_sn'         : inputnote,                   //备注

            };
            //console.log(cartUrl + orderServiceUrl.cart_add);
            //   //127.0.0.1/newapi/cart.php?act=addshoping
            $("#sp_mask").css({
                display: "none",
            });
            com.executeAjax(cartUrl + orderServiceUrl.addshoping, data, "POST", function (result) {
                $("#orders_mask").hide();
                // orders_two_init();
                location.reload();
            });
        }
    });
}

function lookshoping(goods){
    // console.log(goods.goods_name)
    $("#sp_masklook").css({
        display: "block",
    });
    // console.log(goods.seller_note)

    var lookli01 = '<li class="sp_li"><p class="sp_tit"><b class="red">*</b>商品名称/品牌：</p><input disabled class="sp_inp" value="'+ goods.goods_name +'"/></li>';
    var lookli02 = '<li class="sp_li"><p class="sp_tit"><b class="red">*</b>技术参数：</p><input disabled class="sp_inp" value="'+ goods.input_param +'"/></li>';
    var lookli03 = '<li class="sp_li"><p class="sp_tit"><b class="red">*</b>数量：</p><input disabled class="sp_inp" value="'+ goods.goods_number +'"/></li>';
    var lookli04 = '<li class="sp_li"><p class="sp_tit"><b class="red">*</b>单价：</p><input disabled class="sp_inp" value="'+ goods.goods_price +'"/></li>';
    var lookli05 = '<li class="sp_li"><p class="sp_tit"><b class="red">*</b>单位：</p><input disabled class="sp_inp" value="'+ goods.unit +'"/></li>';
    var lookli06 = '<li class="sp_li"><p class="sp_tit"><b class="red">*</b>备注：</p><textarea disabled class="sp_inp">'+ goods.seller_note +'</textarea></li>';

    var contlook = $("#sp_mask_look");
    var sp_content = contlook.find(".sp_content");
    sp_content.html(lookli01+lookli02+lookli03+lookli04+lookli05+lookli06);
    // sp_content.append(lookli01);
    // sp_content.append(lookli02);
    // sp_content.append(lookli03);
    // sp_content.append(lookli04);
    // sp_content.append(lookli05);
    // sp_content.append(lookli06)

    var content = $("#sp_mask_look").html();
    var object={
        getid        : $("#sp_masklook"),
        text_title   : "查看自定义商品",
        text_content : content,
        // text_input2  : "取消",
        // text_input1  : "确定"
    }
    com.mask(object);
    $(".mask_input").hide();
    // $(".mask_confirm").click(function(){
    //     var inputprobrand = $("#inputprobrand").val();      //品牌
    //     var inputproname  = $("#inputproname").val();       //名称
    //     var inputtype     = $("#inputtype").val();          //类型
    //     var inputparam    = $("#inputparam").val();         //技术参数
    //     var inputnum      = $("#inputnum").val();           //数量
    //     var inputprice    = $("#inputprice").val();         //单价
    //     var inputunit     = $("#inputunit").val();          //单位
    //     var inputnote     = $("#inputnote").val();          //备注
    //
    //     if(inputprobrand==""){
    //         $("#sp-f-danger").css({ "display": "block" });
    //     }
    //     if(inputparam==""){
    //         $("#sp-f-danger").css({ "display": "block" });
    //     }
    //     if(inputnum==""||inputnum<1){
    //         $("#sp-f-danger").css({ "display": "block" });
    //     }
    //     if(inputprice==""||inputprice<0){
    //         $("#sp-f-danger").css({ "display": "block" });
    //     }
    //     if(inputunit==""){
    //         $("#sp-f-danger").css({ "display": "block" });
    //     }
    //     else {
    //         $("#sp-f-danger").hide();
    //         var data = {
    //             // 'address_id'         : isAdd,                      //收货地址id 大于0为编辑，其他为新增
    //             'input_probrand'     : inputprobrand,               //商品品牌
    //             'inputpro_name'      : inputproname,                //商品名称
    //             'input_type'         : inputtype,                   //商品类型
    //             'input_param'        : inputparam,                  //技术参数
    //             'input_num'          : inputnum,                    //数量
    //             'input_price'        : inputprice,                  //单价
    //             'input_unit'         : inputunit,                   //单位
    //             'input_note'         : inputnote,                   //备注
    //         };
    //         console.log(cartUrl + orderServiceUrl.cart_add);
    //         $("#sp_mask").css({
    //             display: "none",
    //         });
    //         com.executeAjax(cartUrl + orderServiceUrl.addshoping, data, "POST", function (result) {
    //             $("#orders_mask").hide();
    //             // orders_two_init();
    //             location.reload();
    //         });
    //     }
    // });
}

function orders_one(){
    var productNumber = 0;
    $("#number").text(productNumber);

    //单选
    $(".classInput").click(function(){
        var  isChecked = $(this).attr("checked");
        var  inputValue = $(this).val();
        if(isChecked === undefined){
            selectInput(1, inputValue);
            $(this).siblings(".copy_input").find("img").show();
            $(this).attr("checked","checked");
        }else{
            selectInput(0, inputValue);
            $(this).siblings(".copy_input").find("img").hide();
            $(this).removeAttr("checked","checked");
        }



        var isTrue = [];
        var $moneyAll = $(".radioInput");
        for(var i=0; i<$moneyAll.length; i++){
            var a = $(".radioInput").eq(i).find("input").attr("checked");
            isTrue.push(a);
        }


        /*consoleLog(isTrue);
         consoleLog(isTrue.indexOf(undefined));*/
        if(isTrue.indexOf(undefined) === -1){
            $(".allSelect_input .copy_input").find("img").show();
            $(".allSelect_input input").attr("checked","checked");
        }else{
            $(".allSelect_input .copy_input").find("img").hide();
            $(".allSelect_input input").removeAttr("checked");
        }


        //单选按钮接口
        function selectInput(isSelect, inputValue) {
            var data = {
                cart_id : parseInt(inputValue),
                select  : isSelect    //是否勾选 0=否；1=是
            };
            com.executeAjax(cartUrl + orderServiceUrl.cart_set_select, data, "POST", function (result) {
                $("#Amount").text(result.data.total_amount);
               // $("#Coupon").text(result.data.coupon_val);
                $("#number").text(result.data.total_count);
                com.executeAjax(cartUrl + orderServiceUrl.cart_get, "", "GET", function (result){
                    var enquity = result.data.enquity;
                    if (result.data.list.length <= 0 ) {
                        $("#bupInput1,#notData").show();
                        $("#bupInput2").hide();
                    }else if(enquity==1){
                        $("#bupInput1").show();
                        $("#bupInput2").hide();
                    }else if(result.data.list.length >= 1 || enquity==0){
                        $("#bupInput1,#notData").hide();
                        $("#bupInput2").show();
                    }
                })
                if(result.data.total_count <= 0){
                    $("#bupInput1").show();
                    $("#bupInput2").hide();
                }else{
                    $("#bupInput1").hide();
                    $("#bupInput2").show();
                }
            });
        }
    });




    //全选
    $("#allSelect").click(function(){
        var number = [];
        var $money = $(".radioInput");
        var text3 = $(this).attr("checked");
        for(var i=1; i<$money.length; i++){
            var a = $(".content ul li").eq(i).find("input").attr("checked");
            number.push(a);
            consoleLog(text3);
            if(text3 === undefined){
                selectAllInput(1);
                $(this).siblings(".copy_input").find("img").show();
                $(".content ul li .copy_input").find("img").show();
                $(".content ul li input").attr("checked","checked");
                $(".content ul li").eq(i).find("input").attr("checked","checked");
                productNumber++;
                $("#number").text(productNumber);
            }else if(text3 === "checked"){
                var $money = $(".radioInput");
                for (var i = 1; i < $money.length; i++) {
                    selectAllInput(0);
                    // $("#Amount").text("0.00");
                    $(this).siblings(".copy_input").find("img").hide();
                    $(".content ul li .copy_input").find("img").hide();
                    $(".content ul li input").removeAttr("checked");
                    productNumber=0;
                    $("#number").text(productNumber);
                }
            }
        }

        //全选按钮接口
        function selectAllInput(isSelect) {
            var data = {
                select  : isSelect    //是否勾选 0=否；1=是
            };
            com.executeAjax(cartUrl + orderServiceUrl.cart_set_select_all, data, "POST", function (result) {
                $("#Amount").text(result.data.total_amount);
				//$("#Coupon").text(result.data.coupon_val);
                $("#number").text(result.data.total_count);
                com.executeAjax(cartUrl + orderServiceUrl.cart_get, "", "GET", function (result){
                    var enquity = result.data.enquity;
                    if (result.data.list.length <= 0 ) {
                        $("#bupInput1,#notData").show();
                        $("#bupInput2").hide();
                    }else if(enquity==1){
                        $("#bupInput1").show();
                        $("#bupInput2").hide();
                    }else if(result.data.list.length >= 1 || enquity==0){
                        $("#bupInput1,#notData").hide();
                        $("#bupInput2").show();
                    }
                })


                if(result.data.total_count <= 0){
                    $("#bupInput1").show();
                    $("#bupInput2").hide();
                }else{
                    $("#bupInput1").hide();
                    $("#bupInput2").show();
                }
            });
        }
    });
    //购物车加减商品及匹配库存量限制
    $(".amount_max").click(function(){
        var inputValue = $(this).parent().parent().parent().find(".classInput").val();
        var text = parseInt($(this).siblings(".amount_num").text());
        var maxNumber= $(this).siblings(".max_cont").text();
        maxNumber = parseInt(maxNumber);
        if(text>=maxNumber){
            $(this).css("color","#c5c5c5");
            text = $(this).siblings(".max_cont").text();
            /*var content = '<div class="f_c_666" style="height: 115px;margin-top: 10px;padding-top: 5px;text-align:center;color:#ee8f76;font-weight:bold;">已达最大库存量！</div>';
             var object={
             getid        : $("#del_orders_masks"),
             text_title   : "提示",
             text_content : content,
             text_input2  : "取消",
             text_input1  : "确定"
             }
             $("#del_orders_masks").show();

             com.mask(object);
             var DivHeight = $(".mask_main").outerHeight();
             var DivWidth = $(".mask_main").outerWidth();
             $(".mask_main").css({'margin': '-'+parseInt(DivHeight)/2 +'px ' + '-'+parseInt(DivWidth)/2 +'px'});
             $("#del_orders_masks").find(".mask_confirm").css("margin-left","55px").click(function(){
             $("#del_orders_masks").hide();
             })
             $("#del_orders_masks .mask_cancel").hide();*/
        }else if(text<maxNumber){
            text++;
        }
        $(this).siblings(".amount_num").text(text);
        $(this).siblings(".amount_min").removeAttr("style");
        update(inputValue, $(this).siblings(".amount_num").text(), this);
    });

    $(".amount_min").click(function(){

        var inputValue = $(this).parent().parent().parent().find(".classInput").val();
        var text = $(this).siblings(".amount_num").text();
        text = parseInt(text)
        var mixNumber= $(this).siblings(".min_cont").text();
        mixNumber = parseInt(mixNumber)

        if(text<=mixNumber){
            $(this).css("color","#c5c5c5");

            /*var content = '<div class="f_c_666" style="height: 115px;margin-top: 10px;padding-top: 5px;text-align:center;color:#ee8f76;font-weight:bold;">已达最小订货量！</div>';
             var object={
             getid        : $("#del_orders_masks"),
             text_title   : "提示",
             text_content : content,
             text_input2  : "取消",
             text_input1  : "确定"
             }
             $("#del_orders_masks").show();
             com.mask(object);
             var DivHeight = $(".mask_main").outerHeight();
             var DivWidth = $(".mask_main").outerWidth();
             $(".mask_main").css({'margin': '-'+parseInt(DivHeight)/2 +'px ' + '-'+parseInt(DivWidth)/2 +'px'});
             $("#del_orders_masks").find(".mask_confirm").css("margin-left","55px").click(function(){
             $("#del_orders_masks").hide();
             })
             $("#del_orders_masks .mask_cancel").hide();*/

        }else{
            text--;
            text = $(this).siblings(".amount_num").text(text);
        }
        $(this).siblings(".amount_max").removeAttr("style");
        /*if(text > 1){

         $(this).siblings(".amount_num").text(text);
         }
         text = $(this).siblings(".amount_num").text();
         if(text == 1){
         $(this).css("color","#c5c5c5");
         }*/
        update(inputValue, $(this).siblings(".amount_num").text(), this);
    });

    //修改商品数量接口
    function update(inputValue, number, money) {
        var isCheckbox = $('input[type=checkbox]').is(':checked');
        consoleLog(isCheckbox);
        var data = {
            cart_id : parseInt(inputValue),
            count  : number    //是否勾选 0=否；1=是
        };
        com.executeAjax(cartUrl + orderServiceUrl.cart_set_count, data, "POST", function (result) {

            if(isCheckbox){
                $("#Amount").text(result.data.total_amount);
                //$("#Coupon").text(result.data.coupon_val);
                $("#number").text(result.data.total_count);
                //console.log($("#max_"+data.cart_id))
                $("#sub_coupon_"+data.cart_id).text(result.data.sub_coupon_val);
                $("#subtotal_"+data.cart_id).text(result.data.sub_total);
            }
            // $(money).parent().parent().parent().find(".money").text(result.data.total_amount);
        });
    }

    var text = $(".amount_num");
    for(var i=0; i<text.length; i++){
        if(text.eq(i).text() == 1){
            $(".amount_min").eq(i).css("color","#c5c5c5");
        }
    }
}
function removeOrder(rec_id, goods_id) {
    //删除订单
    var content = '<div class="mask_content"><i class="icon_warning fl"></i><p class="orange fs_24px">删除商品？</p><p class="fs_14px li_he_30px">您可以选择移动关注，或删除商品。</p></div>';
    var object = {
        getid        : $("#del_orders_mask"),
        text_title   : "提示",
        text_content : content,
        text_input1 : "删除",
        text_input2 : "移到我的关注"
    }
    com.mask(object);
    $(".mask_cancel").addClass("bg_line_red bor_rad_5px white addConcern").removeClass("bg_line_gray mask_cancel").css("border","none");

    $(".addConcern").click(function () {
        var data = {
            'goods_id':goods_id
        };
        com.executeAjax(userCenterUrl+orderServiceUrl.add_collection,data, "POST", function (result) {
            $("#del_orders_mask").hide();
        });
    });

    $(".mask_confirm").click(function () {
        com.executeAjax(cartUrl + orderServiceUrl.cart_drop, {cart_id:rec_id}, "POST", function (result) {
            // console.log(cartUrl + orderServiceUrl.cart_drop);
            $("#del_orders_mask").hide();
            location.reload();
            orders_one_init();
        });
    });
}

function orders_two_init(){
    var selected_addr = {},isShow = true;
    //购物车商品列表
    com.executeAjax(orderUrl + orderServiceUrl.checkout, "", "GET", function (result) {
        //console.log(orderUrl + orderServiceUrl.checkout)
        new Vue({
            el: '#addrs_template',//收货地址
            data: result.data,
            methods:{
                remove:function(rec_id){
                    var content2 = '<div class="mask_content"><i style="margin-top: -5px;margin-left: 30px" class="icon_warning fl"></i><p class="orange fs_24px">删除收货地址？</p></div>';
                    var object2 = {
                        getid        : $("#orders_mask"),
                        text_title   : "提示",
                        text_content : content2
                    };
                    com.mask(object2);
                    $(".mask_confirm").click(function(){
                        $(".bg_mask,.mask_main").hide();

                        //购物车商品列表
                        com.executeAjax(userAddressUrl + orderServiceUrl.cart_drop, {address_id:rec_id}, "GET", function (result) {
                            location.reload();
                            orders_two_init();
                        });

                        $(".toggle_card").eq(0).click();
                    });
                },
                update:function (address) {
                    //console.log(address)
                    //console.log(123)
                    var data = jQuery.extend({}, address);
                    addAddress('update', data.province, data.city, data.district, data.address_id);
                    var updateVm = new Vue({
                        el: '#dataUpdate',//订单信息
                        data: {list:data}
                    });

                    var updateVm2 = new Vue({
                        el: '#dataUpdate2',//订单信息
                        data: {list:data}
                    });
                },
                toggleCard:function (data) {
                    isShow = false;
                    selected_addr = selected_addr = data;
                    $("#name").text(data.consignee);
                    $("#mobileNumber").text(data.mobile);
                    $("#selected_address").text(data.province_name + data.city_name + data.district_name + data.address);
                    // orderAddAddress(data);
                }
            }
        });


        var order = new Vue({
            el: '#order_goods_template',//订单商品
            data: result.data,
            methods:{
                remove:function(rec_id){
                    alert(rec_id);
                },
                toInfo:function (Id){
                    window.open("product_list_info.html?infoId="+Id);
                }
            }
        });

        /*var update1 = new Vue({
         el: '#confirmAddress',//订单商品
         data: {addr:result.data.address_list[0]},
         methods:{
         UpDate2:function () {
         alert(1);
         addAddress('update', data.province, data.city, data.district, data.address_id);
         var updateVm = new Vue({
         el: '#dataUpdate',//订单信息
         data: {list:data}
         });
         var updateVm2 = new Vue({
         el: '#dataUpdate2',//订单信息
         data: {list:data}
         });
         }
         }
         });*/

        //订单信息
        if(isShow){
            if(result.data.address_list.length>0){
                selected_addr = result.data.address_list[0];
            }
        }
        result.data.selected_addr = selected_addr;
        var order_two_vue = new Vue({
            el: '#order_sum_template',//订单信息
            data: result.data,
            methods:{
                submitOrder:function(event){
                    var data = {
                        address_id : selected_addr.address_id,
                        postscript : $('#postscript').val()
                    };
                    com.executeAjax(orderUrl + orderServiceUrl.create, data, "POST", function (result) {
                        if(result.data.dt_grade== -1){
                            var goodsamount = result.data.goods_amount;
                            var content3 = '<div class="mask_content" style="width: 425px;"><i style="margin-top: -5px;margin-left: 25px" class="icon_warning fl"></i><p class="fs_16px">你当前不是合伙人，交易时以会员价<span class="red">￥'+goodsamount+'</span>支付</p></div>';
                            var object = {
                                getid        : $("#orders_mask1"),
                                text_title   : "提示",
                                text_content : content3,
                                text_input1 : "成为合伙人",
                                text_input2 : "会员价支付"
                            };
                            com.mask(object);

                            $(".mask_confirm").click(function(){
                                window.location = "/center/franchisee_payment.html?infoid=13";
                            });
                            $(".mask_cancel").click(function(){
                                com.executeAjax(orderUrl + orderServiceUrl.be_dt_create, data, "POST", function (result) {
                                    window.location = 'purchase_orders_buy.html?orderid='+ result.data;
                                });
                            });
                        }else{
                            window.location = 'purchase_orders_buy.html?orderid='+ result.data;

                        }
                    });
                    /*var data = {
                     address_id : selected_addr.address_id,
                     postscript : $('#postscript').val()
                     };
                     com.executeAjax(orderUrl + orderServiceUrl.create, data, "POST", function (result) {
                     if(result.data.dt_grade){
                     var allamount = result.data.order_amount;
                     var content3 = '<div class="mask_content" style="width: 425px;"><i style="margin-top: -5px;margin-left: 25px" class="icon_warning fl"></i><p class="fs_16px">你当前不是合伙人，交易时以会员价￥'+allamount+'支付</p></div>';
                     var object = {
                     getid        : $("#orders_mask1"),
                     text_title   : "提示",
                     text_content : content3,
                     text_input1 : "成为合伙人",
                     text_input2 : "会员价支付"
                     };
                     com.mask(object);

                     $(".mask_confirm").click(function(){
                     window.location = "/center/franchisee_verify.html?infoid=13";
                     });
                     $(".mask_cancel").click(function(){
                     window.location = 'purchase_orders_buy.html?orderid='+ result.data.order_sn;
                     });
                     }else{
                     window.location = 'purchase_orders_buy.html?orderid='+ result.data;
                     }

                     });*/
                },
                update:function (data) {
                    addAddress('update', selected_addr.province, selected_addr.city, selected_addr.district, selected_addr.address_id);
                    var updateVm = new Vue({
                        el: '#dataUpdate',//订单信息
                        data: {list:selected_addr}
                    });
                    var updateVm2 = new Vue({
                        el: '#dataUpdate2',//订单信息
                        data: {list:selected_addr}
                    });
                }
            }
        });
        orders_two();
    });
}



// ****************************************************

function orders_two(){

    $(".toggle_card").eq(0).addClass('border_red').removeClass('border').find('img').show();
    $(".toggle_card").click(function () {
        var a=$(this).closest(".orders_card2")
        var b=$(this).closest("#addrs_template .orders_card2").first()
        $(".toggle_card").removeClass("border_red").addClass("border_e7").attr("data","false").find("img").hide();
        $(this).addClass("border_red").removeClass("border_e7").attr("data","true").find("img").show();

        var Id=$(this).closest(".orders_card2").attr("id");
        var Index=$(this).closest(".orders_card2").index();

    });
    $(".toggle_card").mouseover(function(){
        $(this).addClass("li_hover")
    }).mouseout(function (){
        $(this).removeClass("li_hover");
    });
    var input1 =  $(".change_address li").eq(0).find("input");

    $(".upload_bg").click(function(){
        addAddress('add');
    });
}
//显示隐藏
(function(){
    $("#addrs_template").css({"overflow":"hidden","height":"42px"});
    $(".orders_card2").hide();
    $(".orders_card2").eq(0).attr("data",true).show();
    $(".head").eq(0).closest(".orders_card2").show();
    $("#but").click(function() {
        var len=$("#addrs_template").find(".orders_card2").length;
        var h=($(".orders_card2").height() + 10)*len;

        if(len==0){
            addAddress('add');
            h=30;
        };
        if($("#but").html()=="更多地址"){
            $(this).html("收起地址")
            $(".orders_card2").show();
            if(h>188){
                $("#addrs_template").css("overflow","auto");
                h=188;
            }
            $("#addrs_template").css("height",h);
        }else{
            $(this).html("更多地址")
            $(".orders_card2").hide();
            $("#addrs_template").css({"overflow":"hidden","height":"42px"})
            $(".orders_card2").eq(0).attr("data",true).show();
            $(".head").eq(0).closest(".orders_card2").show();
            $(".head").removeClass("border_red").addClass("border_e7").attr("data","false").find("img").hide();
            $(".head").eq(0).attr("data",true).addClass('border_red').removeClass('border').find('img').show();
        }
    });

})();
//以上地址栏显示隐藏功能
function addAddress(typeOf, provinceCode, cityCode, areaCode, addressId){

    var object = {
        getid        : $("#orders_mask"),
        text_title   : "编辑收货人信息",
        text_content : $("#update_Address").html(),
        text_input1 : "保存收货人信息",
        text_input2 : ""
    };

    if(typeOf == 'add'){
        object.text_title = "添加收货人信息";
        object.text_input1 = "添加收货人信息";
        object.text_content = $("#orders_mask_con").html();
    }

    com.mask(object);
    $(".mask_cancel").hide();
    $(".mask_input").css({"left":"80px","margin-left":"0px","bottom":"60px"});

    com.executeAjax(regionUrl + orderServiceUrl.region_get, "", "GET", function (result) {
        var vm1 = new Vue({
            el: '#Province',
            data: {options : result.data}
        });

        if(typeOf == 'update'){
            $("#s_province option[value="+ provinceCode +"]").attr("selected", true);
            City_fun(provinceCode);
            setTimeout(function () {
                $("#s_city option[value="+ cityCode +"]").attr("selected", true);
            },100);
            Area_fun(cityCode);
            setTimeout(function () {
                $("#s_county option[value="+ areaCode +"]").attr("selected", true);
            },100);
        }

        if(typeOf == 'add'){
            //初始化
            City_fun(result.data[0].region_id, true);
        }

        var province = $("#Province select");
        province.on("change",function(){
            var ProId = $(this).val();
            City_fun(ProId,true);
        });
        var City = $("#City select");
        City.on("change",function(){
            var ProId = $(this).val();
            Area_fun(ProId);
        });
    });
    var vm2 = new Vue({
        el: '#City',
        data: {options: []}
    });
    function City_fun(ProId, isShow) {
        com.executeAjax(regionUrl + orderServiceUrl.region_get, {pid: ProId}, "GET", function (result) {

            vm2.options.splice(result.data.length);
            vm2.options = result.data;
            if(isShow){
                Area_fun(result.data[0].region_id);
            }
        });
    }
    var vm3 = new Vue({
        el: '#Area',
        data: {options: []}
    });
    function Area_fun(ProId) {
        com.executeAjax(regionUrl + orderServiceUrl.region_get, {pid: ProId}, "GET", function (result) {

            vm3.options.splice(result.data.length);
            vm3.options = result.data;
            if(result.data == ''){
                $("#Area").css({"display":"none"})
            }else{
                $("#Area").css({"display":"block"})
            }
        });
    }

    $("#input1").on("input",function(){
        var text = $(this).val();
        if(text.length < 2 || text.length > 20){
            $(".ErrorText").eq(0).show().attr("data","false");
        }else{
            $(".ErrorText").eq(0).hide().attr("data","true");
        }
    });

    var $input1 = $(".change_address li").eq(0).find("input");
    var $input2 = $("#phoneNumber");
    var $input3 = $(".change_address li").eq(4).find("input");
    isTextNull($input3);
    com.number("phoneNumber");

    function isTextNull($input1){
        $input1.on("input", function(){
            if($(this).val() == ""){
                $(this).siblings(".ErrorText").show();
                $(this).siblings(".ErrorText").attr("data","false");
            }else{
                $(this).siblings(".ErrorText").hide();
                $(this).siblings(".ErrorText").attr("data","true");
            }
        });
    }

    $input2.on("input",function(){
        com.Phone_Number($(this).val(),$(".ErrorText").eq(1),"请填写正确手机号码");
        var text = $(".ErrorText").eq(1).attr("available");
        if(text === "false"){
            $(".ErrorText").eq(1).show().attr("data","false");
        }else{
            $(".ErrorText").eq(1).hide().attr("data","true");
        }
    });

    var isAdd;
    $(".mask_confirm").click(function(){
        var input1Val1 = $(".change_address li").eq(0).find("input").val();
        var input1Val2 = $("#phoneNumber").val();
        var input1Val3 = $(".change_address li").eq(4).find("input").val();
        var input1Val4 = $(".change_address li").eq(1).find("input").val();

        var input5=document.querySelector(".checks");
        var is_default = 0;

        var select1 = $(".province select").eq(0).val();
        var select2 = $(".province select").eq(1).val();
        var select3 = $(".province select").eq(2).val();
        var phone1  = $("#phoneNumber").val();
        var phone2  = $("#tel").val();

        if(input1Val1.length < 2){
            $(".ErrorText").eq(0).show();
        }else{
            $(".ErrorText").eq(0).hide();
        }if(input1Val2 === ""){
            $(".ErrorText").eq(1).show();
        }else{
            $(".ErrorText").eq(1).hide();
        }if(select1 === "省份" || select2 === "地级市" || select3 === "市、县级市"){
            $(".ErrorText").eq(2).show();
        }else{
            $(".ErrorText").eq(2).hide();
        }if(input1Val3 == ""){
            $(".ErrorText").eq(3).show();
        }else{
            $(".ErrorText").eq(3).hide();
        }

        // alert(input5.checked);
        var isTrue = [];
        var a = $("#orders_mask").find(".ErrorText").length;
        for(var i=0; i<a; i++){
            var b = $("#orders_mask").find(".ErrorText").eq(i).attr("data");
            isTrue.push(b);
            consoleLog(b);
        }
        if(isTrue.indexOf("false") == -1){
            if(typeOf == 'add'){
                isAdd = -1;
            }else{
                isAdd = addressId;
            }
            if(input5.checked==true){
                is_default = 1;
            }
            var data = {
                'address_id'  : isAdd,                      //收货地址id 大于0为编辑，其他为新增
                'company_name': input1Val4,               //公司名称,别名
                'province'    : select1,                  //省id
                'city'        : select2,                   //地级市id
                'district'    : select3,                //县区id
                'address'     : input1Val3,             //详细地址
                'consignee'   : input1Val1,            //收货人
                'mobile'      : phone1,                //手机
                'tel'         : phone2,                //固定电话
                // 'email'       : input1Val5           //邮箱
                'is_default' : is_default
            };
            com.executeAjax(userAddressUrl + orderServiceUrl.address_save, data, "POST", function (result) {
                $("#orders_mask").hide();
                // orders_two_init();

                location.reload();

            });
        }
    });

}

var money = 0;
function orders_three_init(){
    var orderid = getQueryString('orderid');
    if(!orderid){
        alert('支付订单不存在');
        return ;
    }
    getOfflinePayment(orderid);
    //购物车商品列表
    com.executeAjax(orderUrl + orderServiceUrl.order_for_pay, {orderid:orderid}, "GET", function (result) {
        if(result.code == "1000"){
            com.maskError($("#del_orders_mask"), result.msg);
            setTimeout(function () {
                self.location=document.referrer;
            },2800);
        }else{
            money = result.data.order_amount;
        }
        new Vue({
            el: '#order_info_template',//订单基本信息
            data: result.data
        });

        var date1 = result.data.server_time; //现在时间
        var date2  = result.data.pay_expire_time2; //距离结束时间

        var $input = $("#remainTime");
        var successFun2 = function (result) {
            $input.text(result.Hour+"时"+result.Minute+"分"+result.Second+"秒");
        };
        var errorFun2 = function () {
            $("#text1,#text2").hide();
            $input.text("你的订单超时，已自动取消");
            $("#text3").text("订单已取消");
            $(".success_img").attr("src","/img/icon_rz_error.png");
            $(".submit_order").css({"background":"#999","cursor":"auto"});
            $(".submit_order").removeAttr("onclick");
        }
        com.countDown(date1, date2, successFun2, errorFun2);

        orders_three();
    });
}

function orders_three() {
    //切换支付方式
    $(".toggle_buy li").click(function () {
        $(".toggle_buy li").removeAttr("id");
        $(this).attr("id", "toggle_buy_click");

        $(".toggle_buy_content li").hide();
        var activeTab = $(this).attr("data-url");
        $(activeTab).show();
        if(activeTab == "#tab5"){
            $(".orders_main").eq(1).css("height","735px");
        }else {
            $(".orders_main").eq(1).css("height","380px");
        }
    });

    $("#order_info").click(function () {
        $(".orders_buy_info").toggle();
        $(this).find("i").toggleClass("rotate_180");
    });

    $(".toggle_buy_content").find("ol i").click(function () {
        $(".toggle_buy_content").find("ol input").removeAttr("checked", "checked");
        $(this).siblings("input").attr("checked", "checked");
    });
    // com.countdown(3600 * 2, "#remainTime");
}

function getOfflinePayment(orderid){
    var url = '/newapi/order.php?act=get_offline_payment';
    com.executeAjax(url, {orderid:orderid}, "GET", function (result) {
        const code_no = 10000;
        if(result.code == code_no){
            $(".submit_order").removeAttr("onclick").css({
                backgroundColor: "#dedede"
            });
        }else{
        }
        vm_offline.info = result.data;
    });
}

function pay_now(type){
    var orderid = getQueryString('orderid');
    if(!orderid){
        alert('支付订单不存在');
        return ;
    }
    var selectVal = '';
    switch (type){
        case 'platform':
            selectVal = $('#tab1 input[name="Pay1"]:checked').val();
            if(selectVal == 'weixin'){
                var wxurl = '/newapi/pay_online.php?type=platform&defaultbank=weixin&orderid='+orderid+'&t='+(new Date().getTime());
                var content2 = '<div class="pos_rel fs_14px" style="width: 730px;"><img width="235" height="233" class="fl wechat_img1" src="'+wxurl+'"/><img class="fr mar_r_10px" src="img/wechat2.png"/><div class="center li_he_20px wechat_text"><p>请使用<span class="orange">&nbsp;微信&nbsp;</span>扫一扫</p><p class="center">二维码完成支付</p></div></div>';
                var object2 = {
                    getid        : $("#del_orders_mask"),
                    text_title   : "微信支付",
                    text_content : content2
                };
                com.mask(object2);
                $(".mask_main").css("width","730px");
                $(".mask_input").hide();
                $(".mask_confirm").click(function () {
                    $(".bg_mask,.mask_main").hide();
                });
                var DivHeight = $(".mask_main").outerHeight();
                var DivWidth = $(".mask_main").outerWidth();
                $(".mask_main").css({'margin': '-'+parseInt(DivHeight)/2 +'px ' + '-'+parseInt(DivWidth)/2 +'px'});

                setInterval(function () {
                    com.executeAjax(orderUrl+orderServiceUrl.pay_status, {orderid:orderid}, "GET", function (result) {
                        if(result.data > 0){
                            location.href = "/pay_success.html?out_trade_no="+orderid+"&total_fee="+money;
                        }
                    });
                },1000);

                return false;
            }
            break;
        case 'bank':
            selectVal = $('#tab2 input[name="Pay2"]:checked').val();
            break;
        case 'credit_card':
            selectVal = $('#tab3 input[name="Pay3"]:checked').val();
            break;
        case 'ent_bank':
            selectVal = $('#tab4 input[name="Pay4"]:checked').val();
            break;
        default:
            alert('请选择支付方式');
            return ;
    }
    if(!selectVal){
        alert('请选择支付方式');
        return ;
    }
    window.open('/newapi/pay_online.php?orderid='+ orderid +'&type='+type+'&defaultbank='+selectVal);

    setTimeout(function () {
        var content3 = '<div class="pos_rel"><p class="fs_18px f_c_333 center mar_t_30px"><b>请您在新打开的网上银行页面进行支付，支付完成后选择：</b></p><p class="fs_14px f_c_333 center mar_t_25px"><img src="img/pay_success1.png" class="pay1" />若您支付成功：<a href="/center/orders.html?infoid=2"><span class="green curP">查看订单</span></a><a href="/main.html"><span class="green mar_l_10px curP">继续购物</span></a></p><p class="fs_14px f_c_333 center mar_t_13px"><img src="img/pay_success2.png" class="pay2" />若您支付失败：<span class="orange curP" id="shuaXin">重新支付</span><span class="orange mar_l_10px curP">联系在线客服</span></p></div>';
        var object3 = {
            getid        : $("#del_orders_mask"),
            text_title   : "支付反馈",
            text_content : content3
        };
        com.mask(object3);
        $(".mask_input").hide();
        $("#shuaXin").click(function () {
            location.reload();
        })
        $(".mask_main").css("height","200px");
        var DivHeight = $(".mask_main").outerHeight();
        var DivWidth = $(".mask_main").outerWidth();
        $(".mask_main").css({'margin': '-' + parseInt(DivHeight)/2 +'px ' + '-'+parseInt(DivWidth)/2 +'px'});

    },300);

}

