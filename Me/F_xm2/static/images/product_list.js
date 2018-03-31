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
            $("#goods_sort_temp,#Pagination01").hide();
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
                toSort:function (data) {
                    com.executeAjax(Url+data, "", "GET", false, function (result) {
                        console.log(categoryUrl)
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

                // document.getElementsByName()
                // document.getElementsByTagName()
                // document.getAttribute()
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
                    window.open("product_list_info.html?infoId="+url);
                },
                concern:function (id, event) {
                    var el       = event.currentTarget;
                    var UserName =  $.cookie("ECS[username]");
                    var text     = $(el).find("span").text();
                    var $img		 =$(el).find(".img");
                    if(UserName){
                        if(text == "关注"){
                            var data = {
                                'goods_id':id
                            };
                            com.executeAjax(userCenterUrl+orderServiceUrl.add_collection,data, "POST", function (result) {
                                if(result.data == '添加成功'){
                                    console.log("添加成功");
                                    console.log(userCenterUrl+orderServiceUrl.add_collection);
                                    console.log(data);
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
                                    console.log("取消成功");
                                    $(el).find("span").text("关注");
                                    $img.attr("src","img/bai.png");
                                }
                            });
                        }
                    }else{
                        com.maskLogin($("#login_mask"));
                    }
                },
                addshoping: function(id, event){
                    var el       = event.currentTarget;
                    var UserName =  $.cookie("ECS[username]");
                    var text     = $(el).find("span").text();
                    var $img		 =$(el).find("img");
                    if (UserName){
                        if (text == "加入订货单"){
                            var number = 1;
                            var goods = {
                                'goods_id': id,
                                'number'  : number,
                            };

                            var data = {'goods':JSON.stringify(goods)};
                            console.log(data);
                            com.executeAjax(cartUrl + orderServiceUrl.cart_add, data, "POST", function (result) {
                                console.log("成功加入购物车");
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
                        }else {
                            var data = {
                                'goods_id':id
                            };
                            com.executeAjax(cartUrl + orderServiceUrl.cart_drop,data, "POST", function (result) {
                                // if(result.data == '取消成功'){
                                //     $(el).find("span").text("关注");
                                //     $img.attr("src","img/bai.png");
                                // }
                            });
                        }
                    }else{
                        com.maskLogin($("#login_mask"));
                    }
                }
            },
            ready: {
            },
            watch: {

            }
        });
        app2.list.content.splice(result.content.length);
        app2.list = result;
        // console.log(result.content[0].goods_name);

        //分页
        var pageSelectCallback = function () {
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

        $("#Pagination01").createPage({
            pageNum: 7,//总页码
            current: 1,//当前页
            shownum: 6,//每页显示个数
//			activepage: "",//当前页选中样式
//			activepaf: "",//下一页选中样式
            backfun: function() {
                pageSelectCallback;
//				console.log(e);//回调
            }
        });

        var pageTabWidth = $("#Pagination01").outerWidth();
        // $("#Pagination01").css("margin-left", "-"+pageTabWidth/2+"px");

        //分页
        var page = new Vue({
            el: '#Pagination01',
            data: {list :{page_number:[]}},
            methods:{
                toList:function (url) {
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
                }
            }
        });
        page.list.page_number.splice(result.pager.page_number.length);
        page.list = result.pager;

        /*setTimeout(function () {
         var pageTabWidth = $("#Pagination01").outerWidth();
         $("#Pagination01").css("margin-left", "-"+pageTabWidth/2+"px");

         $("#Pagination01 a").click(function () {
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
         $("#Pagination01 a span").removeClass("current");
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
                pageUrl = eval(a[0]+'page='+page1+b);
            }

            com.executeAjax(Url+pageUrl, "", "GET", false, function (result) {
                $.each(result.content, function (i, result) {
                    var name = result.goods_name.length;
                    var brief = result.goods_brief.length;
                    if(name > 25){
                        result.goods_name = result.goods_name.substr(0,50)+"...";
                    }
                    if(brief > 25){
                        result.goods_brief = result.goods_brief.substr(0,30)+"...";
                    }
                });

                $("#Pagination01").pagination(data1.count, {
                    num_edge_entries    : 1, //边缘页数
                    num_display_entries : 4, //主体页数
                    callback            : pageCallback,
                    items_per_page      : data1.size, //每页显示项
                    prev_text           : "前一页",
                    next_text           : "后一页",
                    current_page        :page1-1
                });

                $("#Pagination01 a,.current").click(function () {
                    var listTop = $("#goods_sort_temp").offset().top;
                    $('html,body').animate({scrollTop:listTop},300);
                });

                $("")

                var pageTabWidth = $("#Pagination01").outerWidth();
                $("#Pagination01").css("margin-left", "-"+pageTabWidth/2+"px");

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
        // $("#Pagination01").append('<a data-url='+ result.pager.page_prev +'><span class="prev ban_prev">上一页</span></a>');
        // $.each(result.pager.page_number,function (index, object) {
        //     var url = JSON.stringify(object);
        //     $html = '<a data-url='+ url +'><span>'+ index +'</span></a>';
        //     $("#Pagination01").append($html);
        // });
        // $("#Pagination01").append('<a data-url='+ result.pager.page_next +'><span class="next">下一页</span></a>');

        $(".navigation_bar li:last-child").find("span").hide();
        // $("#Pagination01 a").eq(1).find("span").addClass("current");

        // if(result.pager.page_prev == ""){
        //     $("#Pagination01 a:first-child").removeAttr("data-url");
        // }
        // if(result.pager.page_next == ""){
        //     $("#Pagination01 a:last-child").removeAttr("data-url");
        // }

        setTimeout(function () {
            var brand_title_con = $(".brand_title_con div").length;
            for(var i=0; i<brand_title_con; i++){
                var BrandDivHeight = $(".brand_title_con div").eq(i).find("ul").outerHeight();
                if(BrandDivHeight > 36){
                    $(".brand_title_con div").eq(i).find(".brand_more").show();
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
                var listLength = $(".brand_title_con div").length;
                for(var i=0; i<listLength; i++){
                    if(i > 8){
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
                    isShow2 = false;
                }else{
                    $(this).children("p").text("更多选项");
                    moreOptions();
                    isShow2 = true;
                }
            });
        },200);

        //热门推荐
        var data = {
            type : 3,  //类型
            num  : 5   //限制数量
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
            setTimeout(function () {
                divShadow();
            },10)
        });
    });
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