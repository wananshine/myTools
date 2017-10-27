/**
 * Created by Administrator on 2017/8/10.
 */

$(function () {
    $(".nav_list_con").eq(3).addClass("nav_list_current").siblings().removeClass("nav_list_current")
    $(".calc_title").css({

    })


    // $(".calc_panel .panel_info").first().show();
    $(".tab_radio").click(function () {
        var index = $(this).parents(".title_group").index();
        $(".calc_panel .panel_info").eq(index-1).show().siblings(".panel_info").hide();
    })


    var sheying = new Vue({
        el: "#calc_sheYing",
        data: {
            tabRadio: 0,
            rule_val: 0 ,           //CCD/CMOS规格
            imagingsWH_val: 720,    //成像宽高度
            foresW_val: '',          //被摄物体宽度
            foresH_val: '' ,        //被摄物体高度
            focal_val: '',          //参照物距镜头距离
            ref_val: 2.1,             //焦距选中值
            ref_val_list: [
                { text: '2.1', value: '2.1' },
                { text: '3.6', value: '3.6' },
                { text: '4', value: '4' },
                { text: '6', value: '6' },
                { text: '8', value: '8' },
                { text: '12', value: '12' },
                { text: '16', value: '16' }
            ],             //焦距距离下拉列表
            total_number: '',
            tab_radios: [
                { id: "code_rate", checked: true , tab_txt: "焦距", val: "0"},
                { id: "resolution_ratio", checked: false , tab_txt: "物体距离", val: "1"}
            ],
            options: [
                { text: ' 1/3.6" ', value: '0' },
                { text: ' 1/3.2" ', value: '1' },
                { text: ' 1/3" '  , value: '2' },
                { text: ' 1/2.7" ', value: '3' },
                { text: ' 1/2" '  , value: '4' },
                { text: ' 1/1.8" ', value: '5' },
                { text: ' 2/3" '  , value: '6' },
                { text: ' 1" '    , value: '7' },
                { text: ' 4/3" '  , value: '8' }
            ],
            imagingsWH: [
                { text: '720', value: '720' },
                { text: '960', value: '960' },
                { text: '1080', value: '1080' }
            ],
            fores: [
                { text: '720', value: '720' },
                { text: '960', value: '960' },
                { text: '1080', value: '1080' }
            ],
            slides: []
        },
        beforeCreate(){
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
                this.swiperSlide();
            })
        },
        beforeUpdate(){
        },
        updated(){
        },
        methods: {
            btn_submit_focal: function () {

                //验证
                var foresW_val = parseInt(this.foresW_val);
                var foresH_val = parseInt(this.foresH_val);
                var focal_val = parseInt(this.focal_val);

                //错误提示弹窗
                function error_obj(content){
                    var object = {
                        getid        : $("#pop_error"),
                        text_title   : "提示",
                        text_content : content,
                        text_input2  : "确定",
                        // text_input1  : "确定text_input1"
                    };
                    com.mask(object);
                    $(".mask_confirm").remove();
                    $(".mask_cancel").addClass("bg_line_gray3 white").removeClass("bg_line_gray");
                }
                //isNum验证是否是数字
                function isNum(num){
                    var reNum=/^\d*$/;
                    return(reNum.test(num));
                }
                if (!isNum(foresW_val) || !isNum(foresH_val) || !isNum(focal_val)){
                    var content = '<div class="f_c_666 pop_error_txt">请填写完整的被摄物体宽度/高度和参照物距镜头距离！</div>';
                    error_obj(content);
                    return false;
                }else{
                    $(".calc_floor").show();
                    var data = {
                        type: 1,
                        standard : this.rule_val,  //规格
                        width: this.foresW_val, //被摄物体宽
                        height: this.foresH_val, //被摄物体高
                        // w_height : this.imagingsWH_val, //成像宽高度
                        // height: this.foresH_val,    //被摄物体宽/高度
                        distance: this.focal_val    //参照物距镜头距离
                    }
                    var sheying_url = calculateUrl+"projection_calculate";
                    com.executeAjax(sheying_url, data, "POST",function (result) {
                        sheying.$data.total_number = result;
                        var contenthtml = '焦距：<span class="state_red total_number">'+  sheying.$data.total_number  + 'mm</span>'
                        $(".panel_state").html(contenthtml);
                    })
                }
            },
            btn_submit_ref: function () {

                //验证
                var foresW_val = parseInt(this.foresW_val);
                var foresH_val = parseInt(this.foresH_val);
                var ref_val = this.ref_val;

                console.log(foresW_val)
                console.log(foresH_val)
                console.log(ref_val)

                //错误提示弹窗
                function error_obj(content){
                    var object = {
                        getid        : $("#pop_error"),
                        text_title   : "提示",
                        text_content : content,
                        text_input2  : "确定",
                        // text_input1  : "确定text_input1"
                    };
                    com.mask(object);
                    $(".mask_confirm").remove();
                    $(".mask_cancel").addClass("bg_line_gray3 white").removeClass("bg_line_gray");
                }
                //isNum验证是否是数字
                function isNum(num){
                    var reNum=/^\d*$/;
                    return(reNum.test(num));
                }
                if (!isNum(foresW_val) || !isNum(foresH_val)){
                    var content = '<div class="f_c_666 pop_error_txt">请填写完整的被摄物体宽度/高度和焦距！</div>';
                    error_obj(content);
                    return false;
                }else{
                    $(".calc_floor").show();
                    var data = {
                        type: 2,
                        standard : this.rule_val,  //规格
                        width: this.foresW_val,           //被摄物体宽
                        height:this.foresH_val,           //被摄物体高度
                        // w_height : this.imagingsWH_val,  //成像宽高度
                        // height: this.foresH_val,       //被摄物体宽/高度
                        focal_length: this.ref_val        //焦距距离
                    }
                    var sheying_url = calculateUrl+"projection_calculate";
                    com.executeAjax(sheying_url, data, "POST", function (result) {
                        sheying.$data.total_number = result;
                        var contenthtml = '物体距离：<span class="state_red total_number">'+  sheying.$data.total_number  + '</span>'
                        $(".panel_state").html(contenthtml);
                    });
                }

            },
            btn_reset: function () {

                this.rule_val=0 ;           //CCD/CMOS规格
                this.imagingsWH_val=720 ;   //成像宽高度
                this.foresW_val='' ;         //被摄物体宽度
                this.foresH_val='' ;         //被摄物体高度
                this.focal_val= '' ;     //参照物距镜头距离
                this.ref_val= 2.1;          //镜头距离
                this.total_number=0;
            },
            btn_goods: function (slide) {
                window.open("../product_list_info.html?infoId="+slide.id);
            },
            swiperSlide: function () {
                var dataRcom = {
                    num: 6,
                    catId: 24
                }
                var sheying_url = menuUrl+"cat_goods&type=1&num="+dataRcom.num+"&cat_id="+dataRcom.catId+"&t_id=1";
                com.executeAjax(sheying_url, dataRcom, "GET", function (result) {
                    sheying.slides = result.content;
                    var swiper = new Swiper('.swiper-container', {
                        slidesPerView : 4,
                        spaceBetween: 16,
                        prevButton:'.swiper-button-prev',
                        nextButton:'.swiper-button-next',
                        paginationClickable: true,
                        freeMode: true,
                        observer:true, //修改swiper自己或子元素时，自动初始化swiper
                        observeParents:true //修改swiper的父元素时，自动初始化swiper
                        // onSlideChangeEnd: function(swiper){
                        //     swiper.update();
                        //     swiper.startAutoplay();
                        //     swiper.reLoop();
                        // },
                        // onSlideNextStart: function(swiper){
                        //     swiper.update();
                        //     // swiper.startAutoplay();
                        //     // swiper.reLoop();
                        // },
                    });
                });
            }
        },
    })

})
