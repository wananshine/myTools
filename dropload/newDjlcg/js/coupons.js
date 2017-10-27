/**
 * Created by Administrator on 2017/5/24.
 */


$(function () {
    //分别加载页眉，头部，页脚，侧边栏
    $("#titleTemp_main").load("lib/temp/page_title.html");
    $("#titleTemp2_main").load("lib/temp/page_title2.html");
    $("#bottomTemp_main").load("lib/temp/page_bottom.html");
    $("#sidebarTemp_main").load("lib/temp/page_sidebar.html");

    // $(function () {
    //     var url = '/newapi/mobile/user.php?act=user_coupon_list';
    //     com.executeAjax(url, '', 'GET', function (result) {
    //         if(result.data.length==0){
    //             $('#noCoupon').show();
    //         }
    //         var list = new Vue({
    //             el   : '#cou_container',
    //             data : {list:result.data},
    //             methods:{
    //                 couget:function (infoId) {
    //                     var url2 = '/newapi/mobile/cash_coupon.php';
    //                     var data = {
    //                         id  : infoId,
    //                         add : 1
    //                     };
    //                     com.executeAjax(url2, data, 'POST', function (object) {
    //                         if(object.status === 0){
    //                             //mui.toast('购物劵领取成功');
    //                             setTimeout(function () {
    //                                 location.reload(true);
    //                             },1000);
    //                         }
    //                     });
    //                 },
    //                 toInfoPage:function (infoId) {
    //                     window.location = '/product_list_info.html?infoId='+infoId;
    //                 }
    //             }
    //         });
    //
    //         $.each(result.data, function (index, obj) {
    //             /* 倒计时 */
    //             var success = function (result) {
    //                 $("#"+obj.goods_id).text(result.Minute);
    //                 console.log(result.Minute);
    //                 console.log(result);
    //             };
    //             var error = function (result) {
    //
    //             };
    //             com.countDown2(obj.rest_time, success, error);
    //         });
    //     });
    // });


    new Vue({
        el: "#cou_container",
        data: {
            bannerurl: "img/coup_banner_01.jpg",
            floors: [
                {
                    bigtitle: "每日精选",
                    smalltitle: "精选不停",
                    cou_item: [
                        {
                            cou_price: "100",
                            goods_id: "11854",
                            cou_product: "爱谱华顿 超五类4对UTP电AP-5E-01 305米每箱（灰色）",
                            cou_time: "60",
                            cou_state: "已抢光",
                            btn_text: "今日已抢光",
                            isclick: true,
                            isclick2: false
                        },
                        {
                            cou_price: "100",
                            cou_product: "爱谱华顿 超五类4对UTP电AP-5E-01 305米每箱（灰色）",
                            cou_time: "200",
                            goods_id: "11855",
                            cou_state: "已抢光",
                            btn_text: "今日已抢光",
                            isclick: true,
                            isclick2: false
                        },
                        {
                            cou_price: "100",
                            goods_id: "11856",
                            cou_product: "爱谱华顿 超五类4对UTP电AP-5E-01 305米每箱（灰色）",
                            cou_time: "60",
                            cou_state: "已抢光",
                            btn_text: "今日已抢光",
                            isclick: true,
                            isclick2: false
                        },
                        {
                            cou_price: "100",
                            goods_id: "11857",
                            cou_product: "爱谱华顿 超五类4对UTP电AP-5E-01 305米每箱（灰色）",
                            cou_time: "200",
                            cou_state: "剩余56%",
                            btn_text: "立即领取",
                            isclick: true,
                            isclick2: false
                        },
                        {
                            cou_price: "100",
                            goods_id: "11858",
                            cou_product: "爱谱华顿 超五类4对UTP电AP-5E-01 305米每箱（灰色）",
                            cou_time: "20",
                            cou_state: "剩余56%",
                            btn_text: "立即领取",
                            isclick: true,
                            isclick2: false
                        },
                        {
                            cou_price: "100",
                            goods_id: "11859",
                            cou_product: "爱谱华顿 超五类4对UTP电AP-5E-01 305米每箱（灰色）",
                            cou_time: "20",
                            cou_state: "剩余56%",
                            btn_text: "立即领取",
                            isclick: true,
                            isclick2: false
                        },
                    ]
                },
                {
                    bigtitle: "领券广场",
                    smalltitle: "总有你想要的",
                    cou_item: [
                        {
                            cou_price: "100",
                            goods_id: "11822",
                            cou_product: "爱谱华顿 超五类4对UTP电AP-5E-01 305米每箱（灰色）",
                            cou_time: "20",
                            cou_state: "剩余56%",
                            btn_text: "立即领取",
                            isclick: true,
                            isclick2: false
                        },
                        {
                            cou_price: "100",
                            goods_id: "11823",
                            cou_product: "爱谱华顿 超五类4对UTP电AP-5E-01 305米每箱（灰色）",
                            cou_time: "20",
                            cou_state: "剩余56%",
                            btn_text: "立即领取",
                            isclick: true,
                            isclick2: false
                        },
                        {
                            cou_price: "100",
                            goods_id: "11824",
                            cou_product: "爱谱华顿 超五类4对UTP电AP-5E-01 305米每箱（灰色）",
                            cou_time: "20",
                            cou_state: "56%",
                            btn_text: "立即领取",
                            isclick: true,
                            isclick2: false
                        },
                        {
                            cou_price: "100",
                            goods_id: "11825",
                            cou_product: "爱谱华顿 超五类4对UTP电AP-5E-01 305米每箱（灰色）",
                            cou_time: "20",
                            cou_state: "剩余56%",
                            btn_text: "立即领取",
                            isclick: true,
                            isclick2: false
                        },
                        {
                            cou_price: "100",
                            goods_id: "11826",
                            cou_product: "爱谱华顿 超五类4对UTP电AP-5E-01 305米每箱（灰色）",
                            cou_time: "20",
                            cou_state: "剩余56%",
                            btn_text: "立即领取",
                            isclick: true,
                            isclick2: false
                        },
                        {
                            cou_price: "100",
                            goods_id: "11827",
                            cou_product: "爱谱华顿 超五类4对UTP电AP-5E-01 305米每箱（灰色）",
                            cou_time: "20",
                            cou_state: "剩余56%",
                            btn_text: "立即领取",
                            isclick: true,
                            isclick2: false
                        },
                    ],
                },
            ]
        },
        mounted: function () {
            this.$nextTick(function () {
                var content = "今日已抢光";
                $(".cou_cell").each(function(index, item){
                    var couhtl = $(".cou_btn").eq(index).html();
                    if(couhtl==content){
                        $(this).find(".cou_btn").attr('disabled',"true");
                        $(this).find(".cou_btn").css('backgroundColor',"transparent");
                    }
                })
            })
        },
        methods: {
            couget: function(item){
                console.log(item.cou_state)
                item.cou_state = "领取成功";
                var content = "今日已抢光";
                    item.isclick = false;
                    item.isclick2 = true;
                var success = function (result) {
                    $("#"+item.goods_id).text(result.Minute);
                    // console.log(item.goods_id);
                    // console.log(result);
                };
                var error = function (result) {
                };
                com.countDown2(item.cou_time, success, error);
            }
        },
    })

})