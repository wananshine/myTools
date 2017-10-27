/**
 * Created by haiping on 2017/6/29.
 */
$(function(){
    //分别加载页眉，头部，页脚，侧边栏
    $("#titleTemp_main").load("lib/temp/page_title.html");
    $("#titleTemp2_main").load("lib/temp/page_title2.html");
    $("#bottomTemp_main").load("lib/temp/page_bottom.html");

    function spike(){
        var url  = seckillUrl+orderServiceUrl.goods;
        com.executeAjax(url,"","GET",function(resule){
                var app = new Vue({
                el   : "#spike",
                data : {
                    layout: 0,
                    list:resule
                },
                beforeMount:function () {
                    if(resule.time.one.status!=undefined&&resule.time.one.status == 3){
                        this.$data.layout = 1;
                        console.log()
                        $(".tab_active_1").click();
                    }
                },
                mounted: function () {
                    this.$nextTick(function () {
                        // if(resule.time.one.status!=undefined&&resule.time.one.status == 3){
                        //     this.$data.layout = 1;
                        //     console.log()
                        //     $(".tab_active_1").click();
                        // }
                        //活动倒计时
                        var one_now = resule.time.one.now;                  //第一场现在时间
                        var one_start = resule.time.one.start_time;         //第一场开始时间
                        var one_end = resule.time.one.end_time;             //第一场结束时间
                        var one_successFun = function (result) {
                            $(".tab_cell").eq(0).find(".tab_cell_calc").text("距开始:"+result.Day+"天"+result.Hour+":"+result.Minute+":"+result.Second);
                            $(".tab_cell").eq(0).find(".tab_cell_btn").text("未开始")
                            if(result.Day==0&&result.Hour==0&&result.Minute==0&&result.Second==0){
                                window.location.reload();
                            }
                        };
                        var one_errorFun = function () {
                            var one_now = resule.time.one.now;   //开始时间
                            var one_end = resule.time.one.end_time;   //结束时间
                            var one_successFun2 = function (result) {
                                $(".tab_cell").eq(0).find(".tab_cell_calc").text("距结束:"+result.Day+"天"+result.Hour+":"+result.Minute+":"+result.Second);
                                $(".tab_cell").eq(0).find(".tab_cell_btn").text("已开始");
                                if(result.Day==0&&result.Hour==0&&result.Minute==0&&result.Second==0){
                                    window.location.reload();
                                }
                            };
                            var one_errorFun2 = function () {
                                $(".tab_cell").eq(0).find(".tab_cell_btn").text("已结束");
                            };
                            com.countDown(one_now, one_end, one_successFun2, one_errorFun2);
                        };
                        com.countDown(one_now, one_start, one_successFun, one_errorFun);


                        var second_now = resule.time.second.now;            //第二场现在时间
                        var second_start = resule.time.second.start_time;   //第二场开始时间
                        var second_end = resule.time.second.second_time;    //第二场结束时间
                        var two_successFun = function (result) {
                            $(".tab_cell").eq(1).find(".tab_cell_calc").text("距开始:"+result.Day+"天"+result.Hour+":"+result.Minute+":"+result.Second);
                            $(".tab_cell").eq(1).find(".tab_cell_btn").text("未开始");
                            if(result.Day==0&&result.Hour==0&&result.Minute==0&&result.Second==0){
                                window.location.reload();
                            }
                        };
                        var two_errorFun = function () {
                            var second_now = resule.time.second.now; //开始时间
                            var second_end = resule.time.second.second_time;   //结束时间
                            var two_successFun2 = function (result) {
                                $(".tab_cell").eq(1).find(".tab_cell_calc").text("距结束:"+result.Day+"天"+result.Hour+":"+result.Minute+":"+result.Second);
                                $(".tab_cell").eq(1).find(".tab_cell_btn").text("已开始");
                                if(result.Day==0&&result.Hour==0&&result.Minute==0&&result.Second==0){
                                    window.location.reload();
                                }
                            };
                            var two_errorFun2 = function () {
                                $(".tab_cell").eq(1).find(".tab_cell_btn").text("已结束");
                            };
                            com.countDown(second_now, second_end, two_successFun2, two_errorFun2);
                        };
                        com.countDown(second_now, second_start, two_successFun, two_errorFun);
                    })
                }
            });





                // var one_status = resule.one_goods;
                // $.each(one_status, function(i , item){
                //     const status = item.status
                //     if (status == 1){
                //         $(".spike_list_0").find(".spike_goods_info_i").html("即将开始")
                //         $(".spike_list_0").find(".spike_goods_info_i").addClass("noRushbuy");
                //     }else if(status == 2){
                //         $(".spike_list_0").find(".spike_goods_info_i").html("立即秒杀")
                //         $(".spike_list_0").find(".spike_goods_info_i").removeClass("noRushbuy");
                //     }else{
                //         $(".spike_list_0").find(".spike_goods_info_i").html("已结束")
                //         $(".spike_list_0").find(".spike_goods_info_i").addClass("noRushbuy");
                //     }
                //     $(".tab_cell").eq(0).click(function(){
                //         if (status == 1){
                //             $(".spike_list_0").find(".spike_goods_info_i").html("即将开始")
                //             $(".spike_list_0").find(".spike_goods_info_i").addClass("noRushbuy");
                //         }else if(status == 2){
                //             $(".spike_list_0").find(".spike_goods_info_i").html("立即秒杀")
                //             $(".spike_list_0").find(".spike_goods_info_i").removeClass("noRushbuy");
                //         }else{
                //             $(".spike_list_0").find(".spike_goods_info_i").html("已结束")
                //             $(".spike_list_0").find(".spike_goods_info_i").addClass("noRushbuy");
                //         }
                //     })
                // })
                //
                // var two_status = resule.second_goods;
                // $.each(two_status, function(i , item){
                //     com.executeAjax(url,"","GET",function(resule){})
                //     const status = item.status
                //     $(".tab_cell").eq(1).click(function(){
                //         if (status == 1){
                //             $(".spike_list_1").find(".spike_goods_info_i").html("即将开始");
                //             $(".spike_list_1").find(".spike_goods_info_i").addClass("noRushbuy");
                //         }else if(status == 2){
                //             $(".spike_list_1").find(".spike_goods_info_i").html("立即秒杀");
                //             $(".spike_list_1").find(".spike_goods_info_i").removeClass("noRushbuy");
                //         }else{
                //             $(".spike_list_1").find(".spike_goods_info_i").html("已结束");
                //             $(".spike_list_1").find(".spike_goods_info_i").addClass("noRushbuy");
                //         }
                //     })
                // })

            var one_status = resule.one_goods;
            var two_status = resule.second_goods;
            var timeStatus = function(Datastatus, num) {
                $.each(Datastatus, function(i , item){
                    const status = item.status;
                    $(".tab_cell").eq(num).click();
                    function textinfo() {
                        if (status == 1){
                            $(".spike_list_"+num).find(".spike_goods_info_i").html("即将开始")
                            $(".spike_list_"+num).find(".spike_goods_info_i").addClass("noRushbuy");
                        }else if(status == 2){
                            $(".spike_list_"+num).find(".spike_goods_info_i").html("立即秒杀")
                            $(".spike_list_"+num).find(".spike_goods_info_i").removeClass("noRushbuy");
                        }else{
                            $(".spike_list_"+num).find(".spike_goods_info_i").html("已结束")
                            $(".spike_list_"+num).find(".spike_goods_info_i").addClass("noRushbuy");
                        }
                    };
                    $(".tab_cell").eq(num).click(function(){
                        textinfo();
                    })
                })
            }
            timeStatus(one_status, 0);
            timeStatus(two_status, 1);



        });




        $(".spike_module").hide();
        $(window).scroll(function(){
            var spike_content_top = $(".spike_content").offset().top;
            var htl_top = $("html").scrollTop() || $("body").scrollTop() ;
            if (htl_top>spike_content_top){
                $(".spike_module").show();
            }else{
                $(".spike_module").hide();
            }
        })
        // $(".tab_cell").first().addClass("tab_active_0");
        // $(".spike_info").find(".spike_list").first().show();
        // $(".tab_cell").click(function(){
        //     var index = $(this).index();
        //     $(".tab_cell").removeClass("tab_active_0");
        //     $(".tab_cell").removeClass("tab_active_1")
        //     $(this).addClass("tab_active_"+index);
        //     $(".spike_info").find(".spike_list").eq(index).show().siblings().hide();
        // })
    }
    spike();
});