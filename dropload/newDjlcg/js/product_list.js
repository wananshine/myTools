/**
 * Created by Gold on 2016/10/26.
 */
$(function () {
    //分别加载页眉，头部，页脚，侧边栏
    $("#titleTemp_main").load("lib/temp/page_title.html");
    $("#titleTemp2_main").load("lib/temp/page_title2.html");
    $("#bottomTemp_main").load("lib/temp/page_bottom.html");
    $("#sidebarTemp_main").load("lib/temp/page_sidebar.html");

    var proId = getQueryString('id');
    var urlData = categoryUrl + "id=" +proId;
    if(!proId){
        proId = getQueryString('keywords');
        urlData = searchUrl +proId;
    }

    com.executeAjax(urlData, "", "GET", function (result) {
        var keywords = getQueryString('keywords');
        var pageUrl  = result.pager.page_number[0].url;
        var pageSize = result.pager.size;     //页面数据量
        var page1    = 0;  //默认页码
        var record_count = result.pager.record_count;  //记录总数
        //页面title
        var app1 = new Vue({
            el: '#productListTemp1',
            data: {list:result}
        });
        if(keywords){
            $("#search_title").show();
            $("#search_title").html("<em> > </em>"+result.ur_here.str+"&nbsp;&nbsp;"+keywords);
            $("#search").val(keywords);
            var title_text = app1.list.ur_here.str +'_'+ keywords+'_' + '大家来采购网';
            $('#productListTemp1').text(title_text);
        }else{
            var title_text = app1.list.ur_here.cat[0].cat_name +'_'+ '大家来采购网';
            $('#productListTemp1').text(title_text);
        }
        if(result.content == ""){
            // var text = result.ur_here.str.split("_");
            // text = text[1];
            $("#notData").show();
            $("#text").text(keywords);
            $("#goods_sort_temp,#Pagination").hide();
        }
        $.each(result.content, function (i, result) {
            var name = result.goods_name.length;
            var brief = result.goods_brief.length;
            if(name > 25){
                result.goods_name = result.goods_name.substr(0,35)+"...";
            }
            if(brief > 25){
                result.goods_brief = result.goods_brief.substr(0,35)+"...";
            }
        });

        if(result.all_attr_list == ""){
            $("#brandList,.more_options").hide();
        }

        //类型 价格之类排序
        var app_goods_sort = new Vue({
            el: '#goods_sort_temp',
            data: {list:{goods_sort:[]}},
            methods:{
                toSort:function (data,index) {
                    var str = data.split('order=')[1];
                        if(str == 'ASC'){
                            $(".listAndInfo2").eq(index-1).addClass("rotate");
                        }
                        if(str == 'DESC'){
                            $(".listAndInfo2").eq(index-1).removeClass("rotate");
                        }
                    com.executeAjax(Url+data, "", "GET", function (result) {
                        $.each(result.content, function (i, result) {
                            var name = result.goods_name.length;
                            var brief = result.goods_brief.length;
                            if(name > 25){
                                result.goods_name = result.goods_name.substr(0,35)+"...";
                            }
                            if(brief > 25){
                                result.goods_brief = result.goods_brief.substr(0,35)+"...";
                            }
                        });

                        app2.list.content.splice(result.content.length);
                        app2.list = result;

                        app_goods_sort.list.goods_sort.splice(result.goods_sort.length);
                        app_goods_sort.list = result;


                        var object = result.pager.page_number[0].url;
                        var data1 = {
                            defaultPage : 0,
                            pageSize    : result.pager.size,
                            recordCount : result.pager.record_count,
                            isDefaultUrl : 'goods_sort_temp',
                            pageUrl     : object
                        };
                        refresh(data1);
                    });

                }
            }
        });

        app_goods_sort.list.goods_sort.splice(result.goods_sort.length);
        app_goods_sort.list = result;
        setTimeout(function () {
            var conTitleText = $(".content_title li");
            conTitleText.click(function(){
                // var dataUrl = $(this).attr("href");
                conTitleText.removeClass("tit_active");
                conTitleText.find(".listAndInfo2").removeAttr("style");
                $(this).addClass("tit_active");
                $(this).find(".listAndInfo2").css({
                    "background-image": "url('./img/sort_white.png')",
                    "background-position": "0px 0px"
                });
                // $(this).find(".listAndInfo2").css("background-position","-26px -5px");

                /*com.executeAjax(Url+dataUrl, "", "GET", function (result) {

                 });*/
            });
            conTitleText.eq(0).click();
            conTitleText.eq(0).find(".listAndInfo2").remove();
        },100);

        //商品列表
        var app2 = new Vue({
            el: '#pro_list',
            data: {list:{content:[]}},
            methods:{
                toListInfo1:function (url) {
                    url = url.split("=");
                    url = url[1];
                    window.open("product_list_info.html?infoId="+ url);
                },
                concern:function (id, event) {
                    var el       = event.currentTarget;
                    var UserName =  $.cookie("ECS[username]");
                    var text     = $(el).find("span").text();
                    var $img		 =$(el).find("img");
                    if(UserName){
                        if(text == "关注"){
                            var data = {
                                'goods_id':id
                            };
                            com.executeAjax(userCenterUrl+orderServiceUrl.add_collection,data, "POST", function (result) {
                                if(result.data == '添加成功'){
                                    $(el).find("span").text("已关注");
                                    $img.attr("src","img/red.png");
                                }
                            });
                        }else{
                            var data = {
                                'goods_id':id
                            };
                            com.executeAjax(userCenterUrl+orderServiceUrl.del_collection,data, "POST", function (result) {
                                if(result.data == '取消成功'){
                                    $(el).find("span").text("关注");
                                    $img.attr("src","img/bai.png");
                                }
                            });
                        }
                    }else{
                        com.maskLogin($("#login_mask"));
                    }
                },
                addshoping: function(moq, id, event){
                    var el       = event.currentTarget;
                    var UserName =  $.cookie("ECS[username]");
                    var text     = $(el).find("span").text();
                    var $img         =$(el).find("img");
                    if (UserName){
                        var number = moq;
                        var goods = {
                            'goods_id': id,
                            'number'  : number
                        };
                        var data = {'goods':JSON.stringify(goods)};
                        // console.log(data);
                        com.executeAjax(cartUrl + orderServiceUrl.cart_add, data, "POST", function (result) {
                            console.log(cartUrl + orderServiceUrl.cart_add);
                            var content = '<div class="f_c_666 add_dhd">商品已成功加入进货单！</div>';
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
                        com.maskLogin($("#login_mask"));
                    }
                }
            }
        });

        app2.list.content.splice(result.content.length);
        app2.list = result;

        //分页
        /*var pageSelectCallback = function () {
         com.executeAjax(Url+url, "", "GET", function (result) {
         app2.list.content.splice(result.content.length);
         app2.list = result;
         });
         };

         var pageLength = result.pager.page_number.length;
         $("#Pagination").pagination(pageLength, {
         num_edge_entries    : 1, //边缘页数
         num_display_entries : 4, //主体页数
         callback            : pageSelectCallback,
         items_per_page      : 1, //每页显示1项
         prev_text           : "前一页",
         next_text           : "后一页",
         current_page        : 0
         });

         var pageTabWidth = $("#Pagination").outerWidth();
         $("#Pagination").css("margin-left", "-"+pageTabWidth/2+"px");*/

        //分页
        var page = new Vue({
            el: '#Pagination',
            data: {list :{page_number:[]}},
            methods:{
                /*toList:function (url) {
                 com.executeAjax(Url+url, "", "GET", function (result) {

                 $.each(result.content, function (i, result) {
                 var name = result.goods_name.length;
                 var brief = result.goods_brief.length;
                 if(name > 25){
                 result.goods_name = result.goods_name.substr(0,25)+"...";
                 }
                 if(brief > 25){
                 result.goods_brief = result.goods_brief.substr(0,25)+"...";
                 }
                 });

                 app2.list.content.splice(result.content.length);
                 app2.list = result;

                 // consoleLog(JSON.stringify(page.list.page_number));
                 page.list.page_number.splice(result.pager.page_number.length);
                 page.list = result.pager;
                 });
                 },
                 toListPrev:function (url) {
                 com.executeAjax(Url+url, "", "GET", function (result) {

                 $.each(result.content, function (i, result) {
                 var name = result.goods_name.length;
                 var brief = result.goods_brief.length;
                 if(name > 25){
                 result.goods_name = result.goods_name.substr(0,25)+"...";
                 }
                 if(brief > 25){
                 result.goods_brief = result.goods_brief.substr(0,25)+"...";
                 }
                 });

                 app2.list.content.splice(result.content.length);
                 app2.list = result;
                 });
                 },
                 toListNext:function (url) {
                 com.executeAjax(Url+url, "", "GET", function (result) {

                 $.each(result.content, function (i, result) {
                 var name = result.goods_name.length;
                 var brief = result.goods_brief.length;
                 if(name > 25){
                 result.goods_name = result.goods_name.substr(0,25)+"...";
                 }
                 if(brief > 25){
                 result.goods_brief = result.goods_brief.substr(0,25)+"...";
                 }
                 });

                 app2.list.content.splice(result.content.length);
                 app2.list = result;
                 });
                 }*/
            }
        });
        page.list.page_number.splice(result.pager.page_number.length);
        page.list = result.pager;

        /*setTimeout(function () {
         var pageTabWidth = $("#Pagination").outerWidth();
         $("#Pagination").css("margin-left", "-"+pageTabWidth/2+"px");

         $("#Pagination a").click(function () {
         // var url = $(this).attr("data-url");
         if($(this).text() == "上一页"){
         $(".current").parent("a").prev("a").find("span").addClass("current");
         $(".current").parent("a").next("a").find("span").removeClass("current");
         }
         if($(this).text() == "下一页"){
         $(".current").parent("a").next("a").find("span").addClass("current");
         $(".current").parent("a").prev("a").find("span").removeClass("current");
         }
         if($(this).text() == "下一页" || $(this).text() == "上一页"){
         return
         }else{
         $("#Pagination a span").removeClass("current");
         $(this).find("span").addClass("current");
         }

         var listTop = $("#goods_sort_temp").offset().top;
         $('html,body').animate({scrollTop:listTop},300);
         });
         },100);*/

        var q = true;
        if(q){
            var pageDefaultData = {
                defaultPage : 0,
                pageSize    : result.pager.size,
                recordCount : result.pager.record_count,
                pageUrl     : result.pager.page_number[0].url
            };
            var q = false;
        }else{
            var pageDefaultData = {
                defaultPage : 0,
                pageSize    : result.pager.size,
                recordCount : result.pager.record_count
            };
        }
        pageCallback(0, pageDefaultData);
        function pageCallback(page_index,data) {
            refresh(data, page_index);
            return false;
        }

        function refresh(data, page1) {
            if(data.pageUrl){
                pageUrl      = data.pageUrl;      //分页Url
                pageSize     = data.pageSize;     //页面数据量
                // page1        = data.defaultPage;  //默认页码
                record_count = data.recordCount;  //记录总数
            }

            page1 = page1?page1+1:1;
            //订单首页商品列表
            var data1 = {
                page  : page1,
                size  : pageSize,
                count : record_count
            };

            if(data.isDefaultUrl !== "goods_sort_temp"){
                //传的各个分页的参数，切割page参数  详情页各商品文字说明
                pageUrl = JSON.stringify(pageUrl);
                var a   = pageUrl.split("page");
                var b   = a[1].substr(2,a[1].length);

                pageUrl = eval(a[0]+'page='+page1+a[1]);
                // console.log(111111)
                // console.log(a[0]+'page=')
                // console.log(page1)
                // console.log(a)
                // console.log(a[1])
            }

            com.executeAjax(Url+pageUrl, "", "GET", function (result) {
                // console.log(Url+pageUrl)
                var content = $("#pro_list ul li");
                var world   = keywords;
                $.each(result.content, function (i, result) {
                    var name = result.goods_name.length;
                    var brief = result.goods_brief.length;
                    var text = result.goods_name;
                    text = text.replace(new RegExp("(" + world + ")","ig"), "<span class='red'>" + world + "</span>");
                    content.eq(i).find(".rec_text1").html(text);
//                  if(name > 25){
//                      result.goods_name = result.goods_name.substr(0,50)+"...";
//                  }
//                  if(brief > 25){
//                      result.goods_brief = result.goods_brief.substr(0,30)+"...";
//                  }
                });

                $("#Pagination").pagination(data1.count, {
                    num_edge_entries    : 1, //边缘页数
                    num_display_entries : 4, //主体页数
                    callback            : pageCallback,
                    items_per_page      : data1.size, //每页显示项
                    prev_text           : "前一页",
                    next_text           : "后一页",
                    current_page        :page1-1
                });

                $("#Pagination a,.current").click(function () {
                    var listTop = $("#goods_sort_temp").offset().top;
                    $('html,body').animate({scrollTop:listTop},300);
                });

                var pageTabWidth = $("#Pagination").outerWidth();
                $("#Pagination").css("margin-left", "-"+pageTabWidth/2+"px");

                app2.list.content.splice(result.content.length);
                app2.list = result;

                page.list.page_number.splice(result.pager.page_number.length);
                page.list = result.pager;

            });
        }

        var pageTitle = new Vue({
            el: '#pageTitle',
            data: {list:result}
        });
        var addPageTitle = new Vue({
            el: '#addPageTitle',
            data: {list:[]},
            methods:{
                removeBrand:function (url) {
                    com.executeAjax(Url+url, "", "GET", function (result) {

                        $.each(result.content, function (i, result) {
                            var name = result.goods_name.length;
                            var brief = result.goods_brief.length;

                            if(name > 25){
                                result.goods_name = result.goods_name.substr(0,30)+"...";
                            }
                            if(brief > 25){
                                result.goods_brief = result.goods_brief.substr(0,30)+"...";
                            }
                        });

                        app2.list.content.splice(result.content.length);
                        app2.list = result;

                        page.list.page_number.splice(result.pager.page_number.length);
                        page.list = result.pager;

                        addPageTitle.list.splice(result.selected.length);
                        addPageTitle.list = result.selected;

                        app3.list.all_attr_list.splice(result.all_attr_list.length);
                        app3.list = result;
                        if(!result.brands.value){
                            result.brands.value=[];
                        }
                        app4.list.brands.value.splice(result.brands.value.length);
                        app4.list = result;

                        var object = result.pager.page_number[0].url;
                        var data1 = {
                            defaultPage : 0,
                            pageSize    : result.pager.size,
                            recordCount : result.pager.record_count,
                            pageUrl     : object
                        };
                        refresh(data1);
                    });
                }
            }
        });

        //分类属性
        if(keywords){
            var app5 = new Vue({
                el: '#category',
                data: {list:result},
                methods: {
                    toList2: function (data) {
                        location.href = "/product_list.html?id="+data;
                    }
                }
            });
            $("#category1").hide();
            $("#category2").hide();
        }else{
            if(result.category.type){
                var app5 = new Vue({
                    el: '#category2',
                    data: {list2:result.category},
                    methods: {
                        toList1: function (data) {
                            location.href = data;
                        },
                        toList2: function (data) {
                            location.href = data;
                        }
                    }
                });
                if(!result.category.cat){
                    $("#category2").hide();
                }
                $("#category1").hide();
            }else{
                var app5 = new Vue({
                    el: '#category1',
                    data: {list1:result},
                    methods: {
                        toList1: function (data) {
                            location.href = data;
                        },
                        toList2: function (data) {
                            location.href = data;
                        }
                    }
                });
                $("#category2").hide();
            }
            $("#category").hide();
        }
        //品牌属性
        var app4 = new Vue({
            el: '#titleBrandList',
            data: {list:{brands:{name:'',value:[]}}},
            methods: {
                toList1: function (data) {
                    com.executeAjax(Url+data, "", "GET", function (result) {
                        $("#addPageTitle").removeClass("Nhide");

                        app2.list.content.splice(result.content.length);
                        app2.list = result;

                        page.list.page_number.splice(result.pager.page_number.length);
                        page.list = result.pager;

                        addPageTitle.list.splice(result.selected.length);
                        addPageTitle.list = result.selected;

                        app3.list.all_attr_list.splice(result.all_attr_list.length);
                        app3.list = result;
                        if(!result.brands.value){
                            result.brands.value=[];
                        }
                        app4.list.brands.value.splice(result.brands.value.length);
                        app4.list = result;

                        app_goods_sort.list.goods_sort.splice(result.goods_sort.length);
                        app_goods_sort.list.goods_sort = result.goods_sort;

                        var object = result.pager.page_number[0].url;
                        var data1 = {
                            defaultPage : 0,
                            pageSize    : result.pager.size,
                            recordCount : result.pager.record_count,
                            pageUrl     : object
                        };
                        refresh(data1);
                    });
                }
            }
        });
        app4.list.brands.value.splice(result.brands.value.length);
        app4.list = result;

        var app3 = new Vue({
            el: '#brandList',
            data: {list:{all_attr_list:[]}},
            methods: {
                toList2: function (data) {
                    com.executeAjax(Url+data, "", "GET", function (result) {
                        $("#addPageTitle").removeClass("Nhide");

                        app2.list.content.splice(result.content.length);
                        app2.list = result;

                        page.list.page_number.splice(result.pager.page_number.length);
                        page.list = result.pager;

                        addPageTitle.list.splice(result.selected.length);
                        addPageTitle.list = result.selected;

                        app3.list.all_attr_list.splice(result.all_attr_list.length);
                        app3.list = result;

                        var object = result.pager.page_number[0].url;
                        var data1 = {
                            defaultPage : 0,
                            pageSize    : result.pager.size,
                            recordCount : result.pager.record_count,
                            pageUrl     : object
                        };
                        refresh(data1);
                    });
                }
            }
        });
        app3.list.all_attr_list.splice(result.all_attr_list.length);
        app3.list = result;

        var $html = {};
        // $("#Pagination").append('<a data-url='+ result.pager.page_prev +'><span class="prev ban_prev">上一页</span></a>');
        // $.each(result.pager.page_number,function (index, object) {
        //     var url = JSON.stringify(object);
        //     $html = '<a data-url='+ url +'><span>'+ index +'</span></a>';
        //     $("#Pagination").append($html);
        // });
        // $("#Pagination").append('<a data-url='+ result.pager.page_next +'><span class="next">下一页</span></a>');

        $(".navigation_bar li:last-child").find("span").hide();
        // $("#Pagination a").eq(1).find("span").addClass("current");

        // if(result.pager.page_prev == ""){
        //     $("#Pagination a:first-child").removeAttr("data-url");
        // }
        // if(result.pager.page_next == ""){
        //     $("#Pagination a:last-child").removeAttr("data-url");
        // }

        setTimeout(function () {
            var brand_title_con = $(".brand_title_con div ul").length;
            for(var i=0; i<brand_title_con; i++){
                var BrandDivHeight = $(".brand_title_con div ul").eq(i).outerHeight();
                if(BrandDivHeight > 36){
                    $(".brand_title_con div ul").eq(i).siblings(".brand_more").show();
                }
            }

            var isShow = true;
            $(".brand_more").click(function () {
                $(this).parent().toggleClass("brand_maxHeight");
                $(this).children("i").toggleClass("rotate_180");
                if(isShow){
                    $(this).children("span").text("收起");
                    isShow = false;
                }else{
                    $(this).children("span").text("更多");
                    isShow = true;
                }
            });

            moreOptions();
            function moreOptions() {
                var listLength = $(".brand_title_con div ul").length;
                for(var i=0; i<listLength; i++){
                    if(i > 12){
                        $(".more_options").show();
                        $(".brand_title_con div").eq(i).hide();
                    }else{
                        $(".more_options").hide();
                    }

                }
            }
            var isShow2 = true;
            $(".more_options").click(function () {
                $(this).children("i").toggleClass("rotate_180");
                if(isShow2){
                    $(this).children("p").text("精简选项");
                    $(".brand_title_con .brand_ul").show();
                    $("#titleBrandList").show();
                    $("#brandList").show();
                    isShow2 = false;
                }else{
                    $(this).children("p").text("更多选项");
                    moreOptions();
                    isShow2 = true;
                }
            });

        },200);

        //热门推荐
        if(keywords){
            var catUrl = result.category[0][0].parent_id;
            var catId = catUrl;
            var data = {
                type : 1,  //类型
                num  : 5,   //限制数量
                cat_id:catId
            };
        }else{
            var catUrl = result.ur_here.cat[0].url;
            var catId = catUrl.substring(catUrl.indexOf("?id=")+4);
            var data = {
                type : 1,  //类型
                num  : 5,   //限制数量
                cat_id:catId
            };
        }
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
            setTimeout(function () {
                divShadow();
            },10)
        });
    });
    // console.log(urlData);
    // console.log(result)

    divShadow();
    function divShadow() {
        // $(".main_content_img li").mouseenter(function(){
        //     $(this).removeClass("rem_shadow_5px");
        //     $(this).addClass("shadow_5px");
        //     $(this).find(".content_img_text").addClass("img_text_hove");
        // });
        // $(".main_content_img li").mouseleave(function(){
        //     $(this).removeClass("shadow_5px");
        //     $(this).addClass("rem_shadow_5px");
        //     $(this).find(".content_img_text").removeClass("img_text_hove");
        // });
    }

});