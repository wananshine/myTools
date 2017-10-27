/**
 * Created by haiping on 2017/7/18.
 */

$(function(){
    //分别加载页眉，头部，页脚，侧边栏
    $("#titleTemp_main").load("lib/temp/page_title.html");
    $("#titleTemp2_main").load("lib/temp/page_title2.html");
    $("#bottomTemp_main").load("lib/temp/page_bottom.html");


});

// var dataStatus = function (catId) {
//     var cat_id = getQueryString("cat_id");
//     var data = {
//         cat_id: catId
//     }
//     var sell_url = sellhotUrl+"?act=goods&cat_id="+cat_id;
//     com.executeAjax(sell_url, data, "GET", function (result) {
//         var brand_url = sellhotUrl+"?act=brand";
//         console.log(result)
//         com.executeAjax(brand_url, "", "GET", function (response) {
//             console.log(response)
//             new Vue({
//                 el   : "#sell_container",
//                 data: {
//                     goodslist: [],
//                     bannerurl: "img/spell_order_banner.png?t=201706071704",
//                     bars: [
//                         { img: "img/20170718/sell_icon_01.png?t=201707181038", txt: "视频监控" },
//                         { img: "img/20170718/sell_icon_01.png?t=201707181038", txt: "显示设备" },
//                         { img: "img/20170718/sell_icon_01.png?t=201707181038", txt: "综合布线" },
//                         { img: "img/20170718/sell_icon_01.png?t=201707181038", txt: "工程线缆" },
//                         { img: "img/20170718/sell_icon_01.png?t=201707181038", txt: "楼宇对讲" },
//                         { img: "img/20170718/sell_icon_01.png?t=201707181038", txt: "公共广播" },
//                         { img: "img/20170718/sell_icon_01.png?t=201707181038", txt: "卫星电视" },
//                         { img: "img/20170718/sell_icon_01.png?t=201707181038", txt: "网络通信" },
//                         { img: "img/20170718/sell_icon_01.png?t=201707181038", txt: "智能家居" },
//                         { img: "img/20170718/sell_icon_01.png?t=201707181038", txt: "门禁控制" }
//                     ],
//                     floors: [
//                         {
//                             tit_img: "img/20170718/sell_title_01.png?t=201707181038",
//                             tit_txt: "热销单品榜",
//                             products: result.hot_goods
//                         }
//                     ],
//                     layers: [
//                         {
//                             tit_img: "img/20170718/sell_title_02.png?t=201707181038",
//                             tit_txt: "人气排行榜",
//                             products: result.best_goods
//                         }
//                     ],
//                     storeys: [
//                         {
//                             tit_img: "img/20170718/sell_title_01.png?t=201707181038",
//                             tit_txt: "热销单品榜",
//                             products: response.brand
//                         }
//                     ]
//                 },
//                 beforeMount(){
//                     console.log(123)
//                 },
//                 mounted(){
//                     this.$nextTick(function () {
//
//                     })
//                 },
//                 methods: {
//                     link_buy: function(goods, index){
//                         console.log(goods)
//                         console.log(index)
//                         window.open("product_list_info.html?infoId="+ goods.goods_id);
//                     },
//                     sell_buy: function (pro, i) {
//                         console.log(pro)
//                         console.log(i)
//                         window.open("product_list_info.html?infoId="+ pro.goods_id);
//                     }
//                 },
//             });
//         })
//     })
// }
// dataStatus(1);

var vum = new Vue({
    el   : "#sell_container",
    data: {
        bars: [
            { img: "img/20170718/sell_icon_01.png?t=201707181038", txt: "视频监控", id: "1" },
            { img: "img/20170718/sell_icon_02.png?t=201707181038", txt: "综合布线", id: "3" },
            { img: "img/20170718/sell_icon_03.png?t=201707181038", txt: "网络通信", id: "9" },
            { img: "img/20170718/sell_icon_04.png?t=201707181038", txt: "显示设备", id: "2" },
            { img: "img/20170718/sell_icon_05.png?t=201707181038", txt: "楼宇对讲", id: "5" },
            { img: "img/20170718/sell_icon_06.png?t=201707181038", txt: "智能家居", id: "10" },
            { img: "img/20170718/sell_icon_07.png?t=201707181038", txt: "门禁控制", id: "13" },
            { img: "img/20170718/sell_icon_08.png?t=201707181038", txt: "机房功能", id: "16" },
            { img: "img/20170718/sell_icon_09.png?t=201707181038", txt: "开关插座", id: "22" },
            { img: "img/20170718/sell_icon_010.png?t=201707181038", txt: "防盗报警", id: "25" }


        ],
        floors: [
            {
                tit_img: "img/20170718/sell_title_01.png?t=201707181038",
                tit_txt: "热销单品榜",
                products: []
            }
        ],
        layers: [
            {
                tit_img: "img/20170718/sell_title_02.png?t=201707181038",
                tit_txt: "人气排行榜",
                products: []
            }
        ],
        storeys: [
            {
                tit_img: "img/20170718/sell_title_03.png?t=201707181038",
                tit_txt: "热销单品榜",
                products: []
            }
        ]
    },
    created(){
        // var dataStatus = function (catId) {
        //     var cat_id = getQueryString("cat_id");
        //     var data = {
        //         cat_id: catId
        //     }
        //     var sell_url = sellhotUrl+"?act=goods&cat_id="+cat_id;
        //     com.executeAjax(sell_url, data, "GET", function (result) {
        //         vum.floors[0].products = result.hot_goods;
        //         vum.layers[0].products = result.best_goods;
        //         var brand_url = sellhotUrl+"?act=brand";
        //         com.executeAjax(brand_url, "", "GET", function (response) {
        //             vum.storeys[0].products = response.brand;
        //         })
        //     })
        // };
        // dataStatus(1);
        // this.dataStatus();
    },
    beforeMount(){

    },
    mounted(){
        this.$nextTick(function () {
            var no = 1;
            this.dataStatus(no);

            $(".top_bar_cell").first().addClass("current");
            $(".top_bar_cell").click(function () {
                var index=$(this).index();
                // console.log(index)
                $(this).addClass("current").siblings().removeClass("current");
            })
        })
    },
    methods: {
        link_buy: function(goods, index){
            window.open("product_list_info.html?infoId="+ goods.goods_id);
        },
        sell_buy: function (pro, i) {
            window.open("product_list_info.html?infoId="+ pro.goods_id);
        },
        dataStatus: function (catId) {
            var cat_id = getQueryString("cat_id");
            var data = {
                cat_id: catId
            }
            //热销单品，人气排行
            var sell_url = sellhotUrl+"?act=goods&cat_id="+cat_id;
            com.executeAjax(sell_url, data, "GET", function (result) {
                vum.floors[0].products = result.hot_goods;
                vum.layers[0].products = result.best_goods;
            });

            //热销品牌榜
            var brand_url = sellhotUrl+"?act=brand";
            com.executeAjax(brand_url, "", "GET", function (response) {
                vum.storeys[0].products = response.brand;
            })
        },
        link_tab: function(catId){
            // console.log(catId)
            this.dataStatus(catId);
        }
    },
});

