/**
 * Created by Gold on 2016/11/15.
 */
function applyReturns() {
    var goods_id = getQueryString('infoId');
    var showpage = getQueryString('show');
    if(showpage){
        $("#page1").addClass("Nhide");
        $("#page2").removeClass("Nhide");

        com.executeAjax(orderUrl + orderServiceUrl.get_current_after_service, {serviceId:goods_id}, "GET", function (result) {
            var items1 = new Vue({
                el: '#service_goods_info',
                data: result
            });

            var items2 = new Vue({
                el: '#user_service_info',
                data: result
            });

        });
    }else{
        var data = {
            order_goods_id : goods_id
        };
        com.executeAjax(orderUrl+orderServiceUrl.apply_after_service,data, "GET", function (result) {
            var items = new Vue({
                el: '#order_goods_info',
                data: result
            });

            var phoneNumber =  $("#phoneNumber");
            phoneNumber.val(result.data.mobile);
            $("#numChecked").click(function(){
                phoneNumber.toggleClass("bg_gray border_e7 f_c_999");
                var phoneAttr = phoneNumber.attr("disabled");
                var phoneText = phoneNumber.parent().find(".Error").attr("data");
                if(phoneAttr === "disabled"){
                    phoneNumber.removeAttr("disabled");
                    phoneNumber.val("");
                    phoneNumber.parent().find(".Error").attr("data","false");
                }else{
                    phoneNumber.attr("disabled","disabled");
                    phoneNumber.val(result.data.mobile);
                    phoneNumber.parent().find(".Error").attr("data","true");
                }
                phoneText = phoneNumber.parent().find(".Error").attr("data");
                if(phoneText === "false"){
                    phoneNumber.parent().find(".Error").show();
                }else{
                    phoneNumber.parent().find(".Error").hide();
                }
            });
        });

        var pageSelectCallback = function () {

        };

        $("#Pagination").pagination(17, {
            num_edge_entries    : 1, //边缘页数
            num_display_entries : 4, //主体页数
            callback            : pageSelectCallback,
            items_per_page      : 1, //每页显示1项
            prev_text           : "前一页",
            next_text           : "后一页",
            current_page        : 0
        });

        var pageTabWidth = $("#Pagination").outerWidth();
        $("#Pagination").css("margin-left", "-"+pageTabWidth/2+"px");

        //菜单栏切换
        $(".teb_text").click(function(){
            $(".teb_text").removeClass("border_b2_red");
            $(this).addClass("border_b2_red");

            $(".tab_content").hide();
            var activeTab = $(this).attr("data-url");
            $(activeTab).show();
        });

        var Numbers = 1;
        $(".amount_max").click(function(){
            Numbers++;
            $(this).siblings(".amount_num").text(Numbers);
            $(this).siblings(".amount_min").removeAttr("style");
        });
        $(".amount_min").click(function(){
            var text = $(this).siblings(".amount_num").text();
            if(text > 1){
                Numbers--;
                $(this).siblings(".amount_num").text(Numbers);
            }
            text = $(this).siblings(".amount_num").text();
            if(text == 1){
                $(this).css("color","#c5c5c5");
            }
        });

        var text = $(".amount_num");
        for(var i=0; i<text.length; i++){
            if(text.eq(i).text() == 1){
                $(".amount_min").eq(i).css("color","#c5c5c5");
            }
        }

        $(".service_type").click(function(){
            $(".service_type").removeClass("border_red").addClass("border_e7 f_c_999");
            $(this).removeClass("f_c_999 border_e7").addClass("border_red");
            $(".service_type").find("img").hide();
            $(this).find("img").show();
        });

        inputText($("#question"),2);
        inputText($("#userName"),2);
        inputText($("#phoneNumber"),11);

        function inputText($class,number){
            $class.on("input",function(){
                var text = $(this).val();
                if(text.length < number || text.length > 20){
                    $(this).parent().find(".Error").show();
                    $(this).parent().find(".Error").attr("data","false");
                }else{
                    $(this).parent().find(".Error").hide();
                    $(this).parent().find(".Error").attr("data","true");
                }
            });
        }

        $(".returns_submit").click(function(){
            var isTrue = [];
            var data1 = $("#question").parent().find(".Error").attr("data");
            var data2 = $("#userName").parent().find(".Error").attr("data");
            var data3 = $("#phoneNumber").parent().find(".Error").attr("data");
            var s_type = $("#service").find(".border_red").text();
            var goods_num = $('#amount').text();
            var question = $("#question").val();
            var img  = $('#WU_FILE_0 img').attr("src");
            var name = $("#userName").val();
            var mobile = $("#phoneNumber").val();
            isTrue.push(data1,data2,data3);
            if(isTrue.indexOf("false") == -1){
                var url  = orderUrl+orderServiceUrl.save_apply_after_service;
                var data = {
                    order_goods_id : goods_id,
                    service_type : s_type,
                    goods_number : goods_num,
                    reason : question,
                    imgs  : img,
                    cust_name : name,
                    mobile : mobile
                }
                var success_callback = function(obj) {
                    var serviceId = obj.data.service_id;
                    if (serviceId) {
                        $("#page1").addClass("Nhide");
                        $("#page2").removeClass("Nhide");

                        com.executeAjax(orderUrl + orderServiceUrl.get_current_after_service, {serviceId:serviceId}, "GET", function (result) {
                            var items1 = new Vue({
                                el: '#service_goods_info',
                                data: result
                            });

                            var items2 = new Vue({
                                el: '#user_service_info',
                                data: result
                            });

                        });
                    }
                };
                com.executeAjax(url, data, "POST", success_callback);

            }
        });

        uploadImg();
        function uploadImg() {
            // 初始化Web Uploader
            var uploader = WebUploader.create({
                // 选完文件后，是否自动上传。
                auto: true,

                // swf文件路径
    //				swf: BASE_URL + '/js/Uploader.swf',
                // 文件接收服务端。
                // server: 'http://webuploader.duapp.com/server/fileupload.php',

                // 选择文件的按钮。可选。
                // 内部根据当前运行是创建，可能是input元素，也可能是flash.
                pick: '#filePicker',

                // 只允许选择图片文件。
                accept: {
                    title: 'Images',
                    extensions: 'gif,jpg,jpeg,bmp,png',
                    mimeTypes: 'image/*'
                }/*,
                 compress:{
                 fileNumLimit:5,
                 fileSingleSizeLimit:5*1024
                 }*/
            });
            // 当有文件添加进来的时候
            var size = 0;
            uploader.on('fileQueued', function(file) {
                var $list = $("#fileList");
                var $li = $(
                        '<div id="' + file.id + '" class="file-item thumbnail">' +
                        '<img>' +
                        '<div class="delFile curP" id="' + file.id + '">删除</div>' +
                        '</div>'
                    ),
                    $img = $li.find('img');

                // $list为容器jQuery实例
                if(size == 5){
                    return false;
                }
                $list.append($li);
                size++;

                // 创建缩略图
                // 如果为非图片文件，可以不用调用此方法。
                // thumbnailWidth x thumbnailHeight 为 100 x 100
                uploader.makeThumb(file, function(error, src) {
                    if(error) {
                        $img.replaceWith('<span>不能预览</span>');
                        return;
                    }
                    $img.attr('src', src);
                }, 105, 90);

                $li.on('click', '.delFile', function() {
                    var imgId = $(this).attr("id");
                    uploader.removeFile(imgId, true);
                    $("#"+imgId).remove();
                    size--;
                })
            });

            // 文件上传成功，给item添加成功class, 用样式标记上传成功。
            uploader.on('uploadSuccess', function(file) {
                $('#' + file.id).addClass('upload-state-done');
                $("#fileList .file-item").mouseenter(function () {
                    $("#fileList .file-item .delFile").removeAttr("style");
                    $(this).find(".delFile").css("bottom","0");
                })
                $("#fileList .file-item").mouseleave(function () {
                    $("#fileList .file-item .delFile").removeAttr("style");
                })
            });

            // 文件上传失败，显示上传出错。
            /*uploader.on('uploadError', function(file) {
             var $li = $('#' + file.id),
             $error = $li.find('div.error');
             // 避免重复创建
             if(!$error.length) {
             $error = $('<div class="error"></div>').appendTo($li);
             }
             $error.text('上传失败');
             });*/

        }
    }
}

//获取订单
function get_latest_orders(){
    var data = {
        page : 1,
        size : 2
    };
    /*com.executeAjax(orderServiceUrl.latest_list, data, "GET", function (result) {
        new Vue({
            el: '#tab1',
            data: result,
            methods:{
                cancelOrder:function(orderid){
                    cancelOrder(orderid);
                },
                detail:function(orderid){
                    window.location = '/center/order_info.html?orderid='+orderid;
                }

            }
        });
        if(result.data == ""){
            $("#NoData").show();
        }
    });*/
}
/*
function get_after_service_list(){
    com.executeAjax(orderUrl+orderServiceUrl.get_after_service_list,'', "GET", function (result) {
        var items = new Vue({
            el: '.after_service_lists',
            data: {list:result.data},
            methods:{
                toRecord:function (orderId) {
                    location.href = 'returns_apply.html?infoId='+orderId+"&show=2";
                },
                toInfo:function (Id) {
                    window.open("/product_list_info.html?infoId="+Id);
                }
            }
        });
    });
}
*/
//初始化加载售后商品信息
var vmAfterList = new Vue({
    el: '#tab2',
    data: {items:[]},
    methods:{
        toRecord:function (orderId) {
            location.href = 'returns_apply.html?infoId='+orderId+"&show=2";
        },
        toInfo:function (Id) {
            window.open("/product_list_info.html?infoId="+Id);
        }
    }


});
getAfterList();
function pageSelectCallback(page_index, jq) {
    getAfterList(page_index);
    return false;
}
function getAfterList(page){
    page = page?page+1:1;
    //首页售后商品列表
    var data = {
        page : page,
        size : 2
    };
    com.executeAjax(orderUrl+orderServiceUrl.get_after_service_list, data, "GET", function(result) {
        $("#invoicePagination").pagination(result.data.total, {
            num_edge_entries: 1, //边缘页数
            num_display_entries: 4, //主体页数
            callback: pageSelectCallback,
            items_per_page:data.size, //每页显示1项
            prev_text: "前一页",
            next_text: "后一页",
            current_page:page-1
        });
        var pageTabWidth = $("#invoicePagination").outerWidth();
        $("#invoicePagination").css("margin-left", "-"+pageTabWidth/2+"px");
        vmAfterList.items.splice(result.data.items.length);
        vmAfterList.items = result.data.items;
        if(result.data.items == ""){
            $("#NoData").show();
            $("#invoicePagination").hide();
        }
    });
}
