/**
 * Created by Gold on 16/9/7.
 */
$(function () {
    //分别加载页眉，页脚
    $("#titleTemp_main").load("lib/temp/page_title.html");
    $("#bottomTemp_main").load("lib/temp/page_bottom.html");

    //产品筛选列表
    $(".main_title ul li").mouseenter('mouseover',function(){
        $("#main_tab dl").hide();
        var $li = $(this).attr("href");
        $($li).show();
        $(this).find("img").addClass("tran_180deg");
    });
    $("#main_tab dl,.main_title,.blur").mouseleave(function(){
        $("#main_tab dl").hide();
        $(".main_title ul li").find("img").removeClass("tran_180deg");
    });
    $(".blur").mouseenter(function(){
        $("#main_tab dl").hide();
        $(".main_title ul li").find("img").removeClass("tran_180deg");
    });

    //判断滚动距离
    //function backTop(){
    //    $(document).scroll(function(){
    //        var top = $(document).scrollTop();
    //        if(top === 0){
    //            $(".BackTop").hide();
    //        }else{
    //            $(".BackTop").show();
    //        }
    //    });
    //}
    //    backTop();

    $("#Taggle_title li").click(function(){
        $("#Taggle_title li").removeClass("b_b_blue");
        $(this).addClass("b_b_blue");
    });

    //top浮动点击事件
    $(".brandBox li").click(function(){
        var list    = $(this).index();
        var divPos1 = $(".Detail_content1").offset().top;
        var divPos2 = $(".Detail_content2").offset().top;
        var divPos3 = $(".Detail_content3").offset().top;

        switch (list)
        {
            case 0:
                $('body,html').animate({scrollTop:divPos1-55},300);
                break;
            case 1:
                $('body,html').animate({scrollTop:divPos2-55},300);
                break;
            case 2:
                $('body,html').animate({scrollTop:divPos3-55},300);
                break;
            case 3:
                window.location.href = 'NewBrandZone.html';
                break;
        }
    });

    $(".title_input_main input").focus(function(){
        var text = $(this).val();
        if(text.length > 0){
            $(".search_result").show();
        }
    });

    $("#searchInput").click(function () {
        var searchText = $("#search").val();
        com.executeAjax(searchUrl+searchText, "", "GET", function (result) {
            location.href = 'product_list.html?keywords='+ searchText;
        });
    });
});

/* 品牌区首页 */
function CtrBrandZone() {
    var BrandId = getQueryString("id");
    var url = brandUrl+"id="+BrandId;
    console.log(url)

    var success_callback = function (result) {
        if(result.brand_gallery == ""){
            $(".brand_title_ad").hide();
            $(".brand_introduce").css("height","280px");
        }
        var app1 = new Vue({
            el   : "#BrandVue1",
            data : {
                list:result,
                lists: { bannerurl: "http://127.0.0.1/img/background2_07.png" },
            }
        });
        var app2 = new Vue({
            el   : "#BrandVue2",
            data : {
                list:result,
            },
            mounted: function () {
                this.$nextTick(function () {
                    const gallery_len = (result.brand_gallery).length;
                    const $bigimg = $("#intro_bigimg span");
                    $bigimg.hover(function(){
                        const _self = $(this);
                        const $index = _self.index();
                        $(".showimg").find(".showimg_com").eq($index).show();
                    },function () {
                        const _self = $(this);
                        const $index = _self.index();
                        $(".showimg").find(".showimg_com").eq($index).hide();
                    })
                })
            },
            methods:{
                toNext:function (id) {
                    window.open("NewBrandZone_Detail.html?id="+id+"&Detail="+BrandId);
                }
            }
        });

        $.each(result.content, function (i, result) {
            var name = result.goods_name.length;
            if(name > 30){
                result.goods_name = result.goods_name.substr(0,30)+"...";
            }
        });
        var app3 = new Vue({
            el   : "#BrandVue3",
            data : {
                list:result,
                lists: {
                    product_title: "日盛",
                    tagnavs: [
                        { title: "夜狼安防", type: "", tagurl: "" },
                        { title: "大华",     type: "", tagurl: "" },
                        { title: "顺安居",   type: "", tagurl: "" },
                        { title: "光桥通信", type: "", tagurl: "" },
                        { title: "光桥通信", type: "", tagurl: "" },
                        { title: "光桥通信", type: "", tagurl: "" },
                        { title: "光桥通信", type: "", tagurl: "" },
                        { title: "光桥通信", type: "", tagurl: "" },
                        { title: "光桥通信", type: "", tagurl: "" },
                    ]
                }
            },
            mounted: function () {
                this.$nextTick(function () {
                    // console.log(123132)
                    // var tagnavs = [
                    //     { title: "夜狼安防", type: "", tagurl: "" },
                    //     { title: "大华",     type: "", tagurl: "" },
                    //     { title: "顺安居",   type: "", tagurl: "" },
                    //     { title: "光桥通信", type: "", tagurl: "" },
                    //     { title: "光桥通信", type: "", tagurl: "" },
                    //     { title: "光桥通信", type: "", tagurl: "" },
                    //     { title: "光桥通信", type: "", tagurl: "" },
                    //     { title: "光桥通信", type: "", tagurl: "" },
                    //     { title: "光桥通信", type: "", tagurl: "" },
                    // ];
                    // this.list.push(tagnavs);
                    // console.log(this.list)
                })
            },
            methods:{
                toInfo:function (id) {
                    location.href = "product_list_info.html?infoId="+id;
                },
                protype: function(content){
                    console.log(content);
                }
            },
            filters: {

            },
        });

        //轮播图
        var mySwiper1 = new Swiper('.swiper-container',{
            speed: 300,
            autoplay : 3000,
            grabCursor: true,
            paginationClickable: true
        });
        $('.arrow-left').on('click', function(e){
            e.preventDefault();
            mySwiper1.swipePrev();
        });
        $('.arrow-right').on('click', function(e){
            e.preventDefault();
            mySwiper1.swipeNext();
        });

        // js 奇数偶数显示不同颜色
        var trs = document.getElementsByClassName("main_list_but");
        for(var i=0; i<trs.length; i++){
            if(i%2===0){
                trs[i].className = "main_list_but bg_white";
            }else{
                trs[i].className = "main_list_but bg_white";
            }
        }

        // IE9及其以下都不支持 :even :odd
        // 奇数偶数显示不同颜色
        // $(".main_list_but:even").addClass("bg_blue");
        // $(".main_list_but:odd").addClass("bg_red");

        //产品列表样式
        $(".main_list").mouseenter(function(){
            $(this).addClass("box_s");
        });
        $(".main_list").mouseleave(function(){
            $(".main_list").removeClass("box_s");
        });

        //左边菜单的查看更多和返回头部样式
        var $fixedList = $(".fixed_move");
        $fixedList.mouseenter(function(){
            $(this).addClass("bg_blue").css("color","#FFF");
            $(this).find(".move_img2").show();
            $(this).find(".not_move_img2").hide();
        });
        $fixedList.mouseleave(function(){
            $fixedList.removeClass("bg_blue").css("color","#333");
            $(".move_img2").hide();
            $(".not_move_img2").show();
        });

        /*$(".BackTop").click(function(){
         com.backTop();
         });*/
        // var pt_txt_htl = result.brands.brand_name +"产品";
        // console.log(result);
        // $("#BrandVue4 .pt_txt").html(pt_txt_htl);

    };
    com.executeAjax(url, "", "POST", success_callback);

    var url2 = brandUrl+"act=brand&num=10";
    var success_callback2 = function (result) {
        var app4 = new Vue({
            el   : "#BrandVue4",
            data : {
                list:result,
            },
            methods:{
                refresh:function (list) {
                    location.href = "NewBrandZone.html?id="+list.id;
                },
                tag_more: function(){
                    window.open("BrandZone_More.html");
                }
            },
            computed:{
                arrFilter:function(){
                    // var listbrand =
                    return this.list.brand.slice(0,5);
                }
            }
        });


        //左边悬浮的菜单
        $(".brand_fixed_list").mouseenter(function(){
            $(this).children(".brand_fixed_move").show();
        });
        $(".brand_fixed_move").mouseleave(function(){
            $(".brand_fixed_move").hide();
        });

        //左边菜单不固定高度居中
        var height = $(".brand_fixed").outerHeight();
        $(".brand_fixed").css("margin-top","-"+height / 2 +"px");
    };
    com.executeAjax(url2, "", "POST", success_callback2);
}

/* 品牌区详情页 */
function CtrBrandZone2() {
    /* 根据点的哪个页面滚动到相应的位置 */
    var divPos2 = $(".Detail_content2").offset().top;
    var divPos3 = $(".Detail_content3").offset().top;
    var infoId = getQueryString("id");
    var DetailId = getQueryString("Detail");

    switch (infoId)
    {
        case "2":
            $('body,html').animate({scrollTop:divPos2-20},300);
            $("#Taggle_title li").removeClass("b_b_blue");
            $("#Taggle_title li").eq(1).addClass("b_b_blue");
            break;
        case "3":
            $('body,html').animate({scrollTop:divPos3-10},300);
            $("#Taggle_title li").removeClass("b_b_blue");
            $("#Taggle_title li").eq(2).addClass("b_b_blue");
            break;
    }

    var url = brandUrl+"id="+DetailId;

    var success_callback = function (result) {
        var app1 = new Vue({
            el   : "#BrandDetail1",
            data : {list:result}
        });
        var app2 = new Vue({
            el   : "#BrandDetail2",
            data : {list:result}
        });
        var app3 = new Vue({
            el   : "#BrandDetail3",
            data : {list:result}
        });
        var app4 = new Vue({
            el   : "#BrandDetail4",
            data : {list:result},
            methods:{
                toMore:function (id) {
                    location.href = "NewBrandZone_More.html?id="+id+"&Detail="+DetailId;
                }
            }
        });
    };
    com.executeAjax(url, "", "POST", success_callback);
}

/* 品牌区更多页 */
function CtrBrandZone3() {
    var infoId = getQueryString("id");
    var DetailId = getQueryString("Detail");
    var url = brandUrl+"act=cases&cases_id="+infoId+"&id="+DetailId;

    var success_callback = function (result) {
        result.content = com.htmldecode(result.content);
        $("#content").html(result.content);
        var app1 = new Vue({
            el   : "#BrandMore1",
            data : {list:result}
        });
        var app2 = new Vue({
            el   : "#BrandMore2",
            data : {list:result}
        });
    };
    com.executeAjax(url, "", "POST", success_callback);
}

/* 品牌区首页 */
function BrandZone_main() {
    var url = brandUrl+"act=brand";
    var success_callback2 = function (result) {
        var app = new Vue({
            el   : "#BrandZoneMore",
            data : {list:result.brand},
            methods:{
                refresh:function (id) {
                    window.open("NewBrandZone.html?id="+id);
                    // window.open("product_list.html?keywords="+name);
                }
            }
        });

        /*$(".BrandZone_More li").mouseenter(function () {
         $(this).find("img").hide();
         $(this).find("a").removeClass("hide");
         });
         $(".BrandZone_More li").mouseleave(function () {
         $(this).find("img").show();
         $(this).find("a").addClass("hide");
         });*/
    };
    com.executeAjax(url, "", "POST", success_callback2);
}
