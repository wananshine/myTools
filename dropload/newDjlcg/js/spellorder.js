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
    var url  = spellorderUrl;
    com.executeAjax(url,"","GET",function(response){
        new Vue({
            el   : "#cou_container",
            data: {
                goodslist: [],
                bannerurl: "img/spell_order_banner.png?t=201706071704",
                floors: [
                    {
                        bigtitle: "参加拼单",
                        smalltitle: "精选不停",
                        pro_rule: [],
                        // products: [
                        //     {
                        //         pro_price: "100",
                        //         pro_id: "11854",
                        //         pro_img: "//www.djlcg.com/images/201703/goods_img/10427_G_1490666883431.jpg",
                        //         pro_product: "H3C  楼宇智能监控c878787989994545只能设备  安防",
                        //         pro_attend: "参加拼单",
                        //         pro_target: "40",
                        //         pro_existing: "25",
                        //         pro_time: "60",
                        //         start_time: "2017/06/23 10:16:00",
                        //         end_time: "2017/06/25 16:20:00",
                        //         btn_active: false
                        //     },
                        //     {
                        //         pro_price: "100",
                        //         pro_id: "11854",
                        //         pro_img: "//www.djlcg.com/images/201703/goods_img/10427_G_1490666883431.jpg",
                        //         pro_product: "H3C  楼宇智能监控c878787989994545只能设备  安防",
                        //         pro_attend: "参加拼单",
                        //         pro_target: "40",
                        //         pro_existing: "25",
                        //         pro_time: "60",
                        //         start_time: "2017/06/23 11:56:00",
                        //         end_time: "2017/06/23 16:13:00",
                        //         btn_active: "true",
                        //     },
                        //     {
                        //         pro_price: "100",
                        //         pro_id: "11854",
                        //         pro_img: "//www.djlcg.com/images/201703/goods_img/10427_G_1490666883431.jpg",
                        //         pro_product: "H3C  楼宇智能监控c878787989994545只能设备  安防",
                        //         pro_attend: "参加拼单",
                        //         pro_target: "40",
                        //         pro_existing: "25",
                        //         pro_time: "60",
                        //         start_time: "2017/06/23 11:56:00",
                        //         end_time: "2017/06/23 16:13:00",
                        //         btn_active: "true",
                        //     },
                        //     {
                        //         pro_price: "100",
                        //         pro_id: "11854",
                        //         pro_img: "//www.djlcg.com/images/201703/goods_img/10427_G_1490666883431.jpg",
                        //         pro_product: "H3C  楼宇智能监控c878787989994545只能设备  安防",
                        //         pro_attend: "参加拼单",
                        //         pro_target: "40",
                        //         pro_existing: "25",
                        //         pro_time: "60",
                        //         start_time: "2017/06/23 11:56:00",
                        //         end_time: "2017/06/23 16:13:00",
                        //         btn_active: "true",
                        //     },
                        //     {
                        //         pro_price: "100",
                        //         pro_id: "11854",
                        //         pro_img: "//www.djlcg.com/images/201703/goods_img/10427_G_1490666883431.jpg",
                        //         pro_product: "H3C  楼宇智能监控c878787989994545只能设备  安防",
                        //         pro_attend: "参加拼单",
                        //         pro_target: "40",
                        //         pro_existing: "25",
                        //         pro_time: "60",
                        //         start_time: "2017/06/23 11:56:00",
                        //         end_time: "2017/06/23 16:13:00",
                        //         btn_active: "true",
                        //     },
                        //     {
                        //         pro_price: "100",
                        //         pro_id: "11854",
                        //         pro_img: "//www.djlcg.com/images/201703/goods_img/10427_G_1490666883431.jpg",
                        //         pro_product: "H3C  楼宇智能监控c878787989994545只能设备  安防",
                        //         pro_attend: "参加拼单",
                        //         pro_target: "40",
                        //         pro_existing: "25",
                        //         pro_time: "60",
                        //         start_time: "2017/06/23 11:56:00",
                        //         end_time: "2017/06/23 16:13:00",
                        //         btn_active: "true",
                        //     }
                        // ]
                        products: response.goods
                    },
                    {
                        bigtitle: "领券广场",
                        smalltitle: "总有你想要的",
                        products: "",
                        pro_rule: [
                            {
                                rule_title: "一、如何参与拼单：",
                                rule_info: [
                                    { rule_txt: "1、商品拼单开启后，您可在活动专题页或商品详情页点击“参与拼单”按钮，参与拼单活动；" },
                                    { rule_txt: "2、当您的采购需求高于拼单目标数量时，也可参与拼单，支付定金后直接开拼；" }
                                ]
                            },
                            {
                                rule_title: "二.、关于定金：",
                                rule_info: [
                                    { rule_txt: "1、订单下达后的7个工作日内请按拼单价支付10%的定金，逾期未支付订单将被取消；" },
                                    { rule_txt: " 2、拼单在规定时间内未达到最低数量要求平台将自动将定金退还给相应汇款账户：拼单数量达到，完成拼单后，因个人原因要退出的，定金将不予退还；" }
                                ]
                            },
                            {
                                rule_title: " 三、关于尾款：",
                                rule_info: [
                                    { rule_txt: "1、拼单成功后（达到拼单的目标数量），平台将会以短信形式通知，用户可前往会员中心商品订单支付尾款；" }
                                ]
                            },
                            {
                                rule_title: " 四、关于发货：",
                                rule_info: [
                                    { rule_txt: "1、拼单成功后，平台可按您的要求提供相关发货服务（发货前付清尾款即可）；" }
                                ]
                            },
                            {
                                rule_title: " 五、退换货：",
                                rule_info: [
                                    { rule_txt: "1、拼单活动商品如有质量问题可换货，非质量问题，不享受无理由退换货。" }
                                ]
                            },
                            {
                                rule_title: "  六、咨询：",
                                rule_info: [
                                    { rule_txt: "1、如您有任何疑问可联系 【在线客服】 或拨打免费热线 0755-29888606。" }
                                ]
                            }
                        ],
                    }
                ]
            },
            methods: {
                couget: function(item, index){
                    // console.log(item.goods_id)
                    window.open("product_list_info.html?infoId="+item.goods_id);
                    item.cou_state = "领取成功";
                    var content = "今日已抢光";
                    item.isclick = false;
                    item.isclick2 = true;
                }
            },
        });

        $.each(response.goods,function(index, item){
            var total = item.restrict_amount;
            total = parseInt(total);
            var num = item.is_finished;
            num = parseInt(num);

            var date1 = response.date; //现在时间
            var date2 = item.formated_start_date; //开始时间
            var date3 = item.formated_end_date;   //结束时间
            // console.log(date1)
            // console.log(date2)
            // console.log(date3)
            // console.log(response.goods[index].formated_start_date)
            // date1 = item.formated_start_date; //现在时间
            // date3 = item.formated_end_date; //结束时间



            var successFun = function (result) {
                // console.log(result)
                $(".count_time").eq(index).text("距开始:"+result.Day+"天"+result.Hour+":"+result.Minute+":"+result.Second);
            };
            var errorFun = function () {
                date1 = response.date; //现在时间
                date3 = item.formated_end_date; //结束时间
                var successFun2 = function (result) {
                    $(".count_time").text("距结束："+result.Day+"天"+result.Hour+"时"+result.Minute+"分"+result.Second+"秒");
                };
                var errorFun2 = function () {
                    $(".count_time").text("活动已结束");
                };
                com.countDown(date1, date3, successFun2, errorFun2);

                // $(".count_time").text("活动已结束");
                // alert(1)
            };
            com.countDown(date1, date3, successFun, errorFun);

        });
        // console.log(this.$data)
    });



})