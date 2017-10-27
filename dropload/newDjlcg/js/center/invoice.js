/**
 * Created by Gold on 2016/11/17.
 */
$(function () {
    $(".ordinary_invoice p").click(function () {
        $(".ordinary_invoice p").removeClass("change_title");
        $(this).addClass("change_title");

        $(".ordinary_invoice_con").hide();
        var activeTab = $(this).attr("data-url");
        $(activeTab).show();
    });

    $(".coupon_title .title").click(function () {
        $(".coupon_title .title a").removeClass("border_b2_red");
        $(this).find("a").addClass("border_b2_red");

        $(".page").hide();
        var activeTab = $(this).attr("data-url");
        $(activeTab).show();
        obtainDivHeight();
    });
    var input_1 = $("#invoice1 ul li").eq(0).children("input");

    var input1 = $("#invoice2 ul li").eq(0).children("input");
    var input2 = $("#invoice2 ul li").eq(1).children("input");
    var input3 = $("#invoice2 ul li").eq(2).children("input");
    var input4 = $("#invoice2 ul li").eq(3).children("input");
    var input5 = $("#invoice2 ul li").eq(4).children("input");
    var input6 = $("#invoice2 ul li").eq(5).children("input");

    inputText(input_1,2);
    inputText(input1,2);
    inputText(input2,2);
    inputText(input3,2);
    inputText(input4,2);
    inputText(input5,2);
    inputText(input6,2);

    //初始加载发票设置
    com.executeAjax(userInvUrl+orderServiceUrl.get_user_inv, {}, "GET", function(result) {
        if(result.data){
            $('#title').val(result.data.title);
            $('#firmName').val(result.data.company);
            $('#taxpayer_code').val(result.data.taxpayer_code);
            $('#company_address').val(result.data.company_address);
            $('#firmNumber').val(result.data.company_phone);
            $('#bank_name').val(result.data.bank_name);
            $('#bank_account').val(result.data.bank_account);
        }
    });


    getInvList();

    $("#save_invoice1").click(function () {
        var url  = userInvUrl+orderServiceUrl.save_user_inv;
        var data = {
            inv_type : 1,
            title : $('#title').val()
        }
        var success_callback = function(obj){
            if( obj.code == 0 ){
                com.maskSuccess($("#alertMask"), "保存成功！");
            }
        }
        com.executeAjax(url, data, "POST", success_callback);
    });


    $("#save_invoice").click(function () {
        var url  = userInvUrl+orderServiceUrl.save_user_inv;
        var data = {
            inv_type : 2,
            company : $('#firmName').val(),
            taxpayer_code : $('#taxpayer_code').val(),
            company_address : $('#company_address').val(),
            company_phone : $('#firmNumber').val(),
            bank_name : $('#bank_name').val(),
            bank_account : $('#bank_account').val()
        }
        var success_callback = function(obj){
            if( obj.code == 0 ){
                com.maskSuccess($("#alertMask"), "保存成功！");
            }
        }
        com.executeAjax(url, data, "POST", success_callback);
    });


});

var cur_apply_order_id = ''; //当前要申请的订单id
function save_inv_apply(inv_type){
    var url  = userInvUrl+orderServiceUrl.save_apply;
    var data = {};
    if(inv_type==1){
        data = {
            'orderid':cur_apply_order_id,
            'inv_type':1, //发票类型 1=增值税普通发票 2=增值税专用发票
            'title': $('#c_title').val(),//抬头
            'consignee':$('#c_consignee').val(),//收件人
            'mobile':$('#c_mobile').val(),//收件人电话
            'address':$('#c_address').val()//收件地址
        }
    }else if(inv_type==2){
        data = {
            'orderid':cur_apply_order_id,
            'inv_type':2, //发票类型 1=增值税普通发票 2=增值税专用发票
            'company':$('#s_company').val(),//单位名称
            'taxpayer_code':$('#s_taxpayer_code').val(),//纳税人识别码
            'bank_name':$('#s_bank_name').val(),//开户银行
            'bank_account':$('#s_bank_account').val(),//银行账户
            'company_address':$('#s_company_address').val(),//注册地址
            'company_phone':$('#s_company_phone').val(), //注册电话
            'consignee':$('#s_consignee').val(),//收件人
            'mobile':$('#s_mobile').val(),//收件人电话
            'address':$('#s_address').val()//收件地址
        };
    }

    var success_callback = function(obj){
        if( obj.code == 0 ){
            $(".mask_img .img1").click();
            com.maskSuccess($("#alertMask"), "申请成功！");
            getInvList();
        }
    }
    com.executeAjax(url, data, "POST", success_callback);
}

//初始化加载订单列表信息
var vmInvList = new Vue({
    el: '#page2',
    data: {items:[]},
    methods:{
        apply:function(orderid){
            popUpApply();
            com.executeAjax(userInvUrl+orderServiceUrl.init_apply_data, {orderid:orderid}, "GET", function(result) {
                //普通
                $('#c_title').val(result.data.title);
                $('#c_consignee').val(result.data.consignee);
                $('#c_mobile').val(result.data.mobile);
                $('#c_address').val(result.data.address);
                //专用
                $('#s_company').val(result.data.company);
                $('#s_taxpayer_code').val(result.data.taxpayer_code);
                $('#s_company_address').val(result.data.company_address);
                $('#s_company_phone').val(result.data.company_phone);
                $('#s_bank_name').val(result.data.bank_name);
                $('#s_bank_account').val(result.data.bank_account);
                $('#s_consignee').val(result.data.consignee);
                $('#s_mobile').val(result.data.mobile);
                $('#s_address').val(result.data.address);

                cur_apply_order_id = orderid;
            });
        },
        cancel:function(orderid){
            com.executeAjax(userInvUrl+orderServiceUrl.cancel_apply, {orderid:orderid}, "POST", function(result) {
                com.maskSuccess($("#alertMask"), "操作成功！");
                getInvList();
            });
        },
    }
});


function getInvList(page){
    page = page?page+1:1;
    //订单首页商品列表
    var data = {
        page : page,
        size : 10
    };
    com.executeAjax(userInvUrl+orderServiceUrl.get_orders_for_inv, data, "GET", function(result) {
        $("#invoicePagination").pagination(result.data.total, {
            num_edge_entries: 1, //边缘页数
            num_display_entries: 4, //主体页数
            callback: pageSelectCallback,
            items_per_page:data.size, //每页显示1项
            prev_text: "前一页",
            next_text: "后一页",
            current_page:page-1
        });
        vmInvList.items.splice(result.data.length);
        vmInvList.items = result.data.items;
        var pageTabWidth = $("#invoicePagination").outerWidth();
        $("#invoicePagination").css("margin-left", "-"+pageTabWidth/2+"px");
    });
}

function pageSelectCallback(page_index, jq) {
    getInvList(page_index);
    return false;
}

function popUpApply(){
    /* 弹出框 */
    var content = $("#MaskContent").html();
    var object = {
        getid        : $("#del_orders_mask"),
        text_title   : "申请开票",
        text_content : content,
        text_input1 : "提交",
        text_input2 : "取消"
    };
    com.mask(object);
    $("#tab4").show();
    $(".default").addClass("border_red");
    $(".mask_cancel,.mask_confirm").hide();
    $(".mask_main").css("width","650px");

    var DivHeight = $(".mask_main").outerHeight();
    var DivWidth = $(".mask_main").outerWidth();
    $(".mask_main").css({'margin': '-'+parseInt(DivHeight)/2 +'px ' + '-'+parseInt(DivWidth)/2 +'px'});

    $(".textInput").click(function () {
        $(".textInput").removeClass("border_red");
        $(this).addClass("border_red");

        $(".tabContent").hide();
        var activeTab = $(this).attr("data-url");
        $(activeTab).show();
    });

    var maskA1 = $("#tab4 li").eq(0).children("input");
    var maskA2 = $("#tab4 li").eq(1).children("input");
    var maskA3 = $("#tab4 li").eq(2).children("input");
    var maskA4 = $("#tab4 li").eq(3).children("input");
    inputText(maskA1,2);
    inputText(maskA2,2);
    inputText(maskA3,11);
    inputText(maskA4,2);

    var maskB1 = $("#tab5 li").eq(0).children("input");
    var maskB2 = $("#tab5 li").eq(1).children("input");
    var maskB3 = $("#tab5 li").eq(2).children("input");
    var maskB4 = $("#tab5 li").eq(3).children("input");
    var maskB5 = $("#tab5 li").eq(4).children("input");
    var maskB6 = $("#tab5 li").eq(5).children("input");
    var maskB7 = $("#tab5 li").eq(6).children("input");
    var maskB8 = $("#tab5 li").eq(7).children("input");
    var maskB9 = $("#tab5 li").eq(8).children("input");
    inputText(maskB1,2);
    inputText(maskB2,2);
    inputText(maskB3,2);
    inputText(maskB4,2);
    inputText(maskB5,2);
    inputText(maskB6,2);
    inputText(maskB7,2);
    inputText(maskB8,11);
    inputText(maskB9,2);


    maskA3.on("input",function(){
        com.Phone_Number($(this).val(),$("#c_mobile"));
        var text = $(this).attr("available");
        if(text == "true"){
            $(this).siblings("span").attr("data","true");
            $(this).siblings(".Error").hide();
        }else{
            $(this).siblings("span").attr("data","false");
            $(this).siblings(".Error").show();
        }
    });
    maskB8.on("input",function(){
        com.Phone_Number($(this).val(),$("#s_mobile"));
        var text = $(this).attr("available");
        if(text == "true"){
            $(this).siblings("span").attr("data","true");
            $(this).siblings(".Error").hide();
        }else{
            $(this).siblings("span").attr("data","false");
            $(this).siblings(".Error").show();
        }
    });

    $(".mask_confirm1").click(function () {
        var isTrue = [];
        var list = $("#tab4 li");
        for(var i=0; i<list.length/2; i++){
            var number = 2;
            var a = list.eq(i).children(".Error").attr("data");
            var text = list.eq(i).find('input').val();
            isTrue.push(a);
            if(i== 2){
                number = 11;
                if(text.length < number || text.length > 50){
                    list.eq(i).find(".Error").show();
                    list.eq(i).find(".Error").attr("data","false");
                }else{
                    list.eq(i).find(".Error").hide();
                    list.eq(i).find(".Error").attr("data","true");
                }
            }else{
                if(text.length < number || text.length > 50){
                    list.eq(i).find(".Error").show();
                    list.eq(i).find(".Error").attr("data","false");
                }else{
                    list.eq(i).find(".Error").hide();
                    list.eq(i).find(".Error").attr("data","true");
                }
            }
        }
        if(isTrue.indexOf("false") == -1){
            save_inv_apply(1);
        }
    });

    $(".mask_confirm2").click(function () {
        var isTrue = [];
        var list = $("#tab5 li");
        for(var i=0; i<list.length/2; i++){
            var number = 2;
            var a = list.eq(i).children(".Error").attr("data");
            var text = list.eq(i).find('input').val();
            isTrue.push(a);
            if(i== 7){
                number = 11;
                if(text.length < number || text.length > 50){
                    list.eq(i).find(".Error").show();
                    list.eq(i).find(".Error").attr("data","false");
                }else{
                    list.eq(i).find(".Error").hide();
                    list.eq(i).find(".Error").attr("data","true");
                }
            }else{
                if(text.length < number || text.length > 50){
                    list.eq(i).find(".Error").show();
                    list.eq(i).find(".Error").attr("data","false");
                }else{
                    list.eq(i).find(".Error").hide();
                    list.eq(i).find(".Error").attr("data","true");
                }
            }
        }
        if(isTrue.indexOf("false") == -1){
            save_inv_apply(2);
        }
    });
}

function inputText($class,number){
    $class.on("input",function(){
        var text = $(this).val();
        if(text.length < number || text.length > 50){
            $(this).parent().find(".Error").show();
            $(this).parent().find(".Error").attr("data","false");
        }else{
            $(this).parent().find(".Error").hide();
            $(this).parent().find(".Error").attr("data","true");
        }
    });
}
