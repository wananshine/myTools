/**
 * Created by Administrator on 2017/8/10.
 */

$(function () {
    $(".nav_list_con").eq(2).addClass("nav_list_current").siblings().removeClass("nav_list_current")
    $(".calc_title").css({

    })


    $(".calc_panel .panel_info").first().show();
    $(".tab_radio").click(function () {
        var index = $(this).parents(".title_group").index();
        $(".calc_panel .panel_info").eq(index-1).show().siblings(".panel_info").hide();
    })

    var video = new Vue({
        el: "#calc_video",
        data: {
            tabRadio: 0,
            selected_val: 0,   //设备参数
            code_rate_val: 0, //像素
            resolution_val: 1,  //分辨率
            g_val_m: 1 ,    //单个硬盘容量--码率
            t_val_m: '' ,    //存储时间--码率
            g_val_f: 1,     //单个硬盘容量--分辨率
            t_val_f: '',     //存储时间--分辨率
            format_val_m: 0,  //编码格式--码率
            format_val_f: 0,  //编码格式--分辨率
            s_val_m: '',   //摄像头个数--码率
            s_val_f: '',   //摄像头个数--分辨率
            total_number: '',
            total_number_f: '',
            tab_radios: [
                { id: "code_rate", tab_txt: "码率", val:'0'},
                { id: "resolution_ratio", tab_txt: "分辨率", val:'1'}
            ],
            options: [
                { text: '130', value: '0' },
                { text: '200', value: '1' },
                { text: '300', value: '2' },
                { text: '400', value: '3' },
                { text: '500', value: '4' },
                { text: '600', value: '5' }
            ],
            resolutions: [
                { text: '720', value: '1' },
                { text: '960', value: '2' },
                { text: '1080', value: '3' }
            ],
            table_trs: [
                {
                    id: 0,
                    table_tds: [
                        { td_txt: "D1(4CIF)" },
                        { td_txt: "704*576" },
                        { td_txt: "1.5Mb/s" },
                        { td_txt: "0.9Mb/s" }
                    ]
                },
                {
                    id: 1,
                    table_tds: [
                        { td_txt: "720P" },
                        { td_txt: "1280*720" },
                        { td_txt: "3Mb/s" },
                        { td_txt: "1.8Mb/s" }
                    ]
                },
                {
                    id: 2,
                    table_tds: [
                        { td_txt: "960P" },
                        { td_txt: "1280*960" },
                        { td_txt: "3.5Mb/s" },
                        { td_txt: "2.1Mb/s" }
                    ]
                },
                {
                    id: 3,
                    table_tds: [
                        { td_txt: "1080P" },
                        { td_txt: "1920*1080" },
                        { td_txt: "5Mb/s" },
                        { td_txt: "3Mb/s" }
                    ]
                },
                {
                    id: 4,
                    table_tds: [
                        { td_txt: "3MP" },
                        { td_txt: "2048*1536" },
                        { td_txt: "7Mb/s" },
                        { td_txt: "4.2Mb/s" }
                    ]
                },
                {
                    id: 5,
                    table_tds: [
                        { td_txt: "4MP" },
                        { td_txt: "2560*1440" },
                        { td_txt: "8Mb/s" },
                        { td_txt: "4.8Mb/s" }
                    ]
                },
                {
                    id: 6,
                    table_tds: [
                        { td_txt: "5MP" },
                        { td_txt: "2592*2048" },
                        { td_txt: "10Mb/s" },
                        { td_txt: "6Mb/s" }
                    ]
                },
                {
                    id: 7,
                    table_tds: [
                        { td_txt: "8MP" },
                        { td_txt: "3264*2448" },
                        { td_txt: "12Mb/s" },
                        { td_txt: "7.2Mb/s" }
                    ]
                },
                {
                    id: 8,
                    table_tds: [
                        { td_txt: "4K" },
                        { td_txt: "3840*2160" },
                        { td_txt: "16Mb/s" },
                        { td_txt: "9.6Mb/s" }
                    ]
                }
            ],
            format_ms: [
                { text: 'H.264', value: '0' },
                { text: 'H.265', value: '1' }
            ],  //编码格式下拉--码率
            format_fs: [
                { text: 'H.264', value: '0' },
                { text: 'H.265', value: '1' }
            ],  //编码格式下拉--分辨率
            g_valFs: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' },
                { text: '6', value: '6' },
                { text: '8', value: '8' },
                { text: '10', value: '10' },
                { text: '12', value: '12' }
            ],   //硬盘总容量下拉--码率
            g_valMs: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' },
                { text: '6', value: '6' },
                { text: '8', value: '8' },
                { text: '10', value: '10' },
                { text: '12', value: '12' }
            ],   //硬盘总容量下拉--分辨率
            slides: []
        },
        computed: {
            reversedMessage: function () {

            }
        },
        beforeCreate(){

        },
        created(){
            this.swiperSlide();
        },
        beforeMount(){
        },
        mounted(){
            this.$nextTick(function () {
                
            })
        },
        beforeUpdate(){
        },
        updated(){
        },
        methods: {
            btn_submit_m: function () {

                //验证
                var s_val_m = parseInt(this.s_val_m);
                var t_val_m = parseInt(this.t_val_m);

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
                if (!isNum(s_val_m) || !isNum(t_val_m)){
                    var content = '<div class="f_c_666 pop_error_txt">请填写完整的摄像头数量和存储时间！</div>';
                    error_obj(content);
                    return false;
                }else{
                    $(".calc_floor").show();
                    var data = {
                        type: 1,
                        rate: this.code_rate_val,
                        hard_disk: this.g_val_m,
                        day: this.t_val_m,
                        format: this.format_val_m,
                        cameras_num: this.s_val_m
                    }
                    var video_url = calculateUrl+"video_surveillance_calculate";
                    com.executeAjax(video_url, data, "POST", function (result) {
                        video.$data.total_number = result;
                    });
                }
            },
            btn_submit_f: function () {
                $(".calc_floor").show();

                var g_val_f = parseInt(this.g_val_f);
                var t_val_f = parseInt(this.t_val_f);

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
                if (!isNum(g_val_f) || !isNum(t_val_f)){
                    var content = '<div class="f_c_666 pop_error_txt">请填写完整的摄像头数量和存储时间！</div>';
                    error_obj(content);
                    return false;
                }else{
                    $(".calc_floor").show();
                    var data = {
                        type: 2,
                        rate : this.resolution_val,
                        hard_disk: this.g_val_f,
                        day: this.t_val_f,
                        format: this.format_val_f,
                        cameras_num: this.s_val_f
                    }
                    var video_url = calculateUrl+"video_surveillance_calculate";
                    com.executeAjax(video_url, data, "POST", function (result) {
                        video.$data.total_number = result;
                    });
                }


            },
            btn_reset: function () {
                this.g_val_m=1 ;        //硬盘总容量--码率
                this.t_val_m='' ;        //时间--码率
                this.g_val_f=1 ;        //硬盘总容量--分辨率
                this.t_val_f='' ;        //时间--分辨率
                this.format_val_m= 0;  //编码格式--码率
                this.format_val_f= 0;  //编码格式--分辨率
                this.s_val_m= '',   //摄像头个数--码率
                this.s_val_f= '',   //摄像头个数--分辨率
                this.code_rate_val= 0 ;  //像素
                this.resolution_val= 1;  //分辨率
                this.total_number=0;
            },
            btn_submit_com: function (selected_radio) {
                $(".calc_floor").show();
                //精品推荐
                var data = {
                    size: this.size_val,
                    width_number: this.area_01,
                    length_number: this.area_02,
                    width: this.area_w,
                    length: this.area_h,
                    // width1: this.area_03,
                    // length1: this.area_04,
                    type:selected_radio
                }
                var video_url = calculateUrl+"display_calculate";
                com.executeAjax(video_url, data, "POST", function (result) {
                    console.log(data)
                    display_d.$data.total_number = result;
                });
            },
            btn_goods: function (slide) {
                window.open("../product_list_info.html?infoId="+slide.id);
            },
            swiperSlide: function () {
                var dataRcom = {
                    num: 6,
                    catId: 1
                }
                var video_url = menuUrl+"cat_goods&type=1&num="+dataRcom.num+"&cat_id="+dataRcom.catId+"&t_id=1";
                com.executeAjax(video_url, dataRcom, "GET", function (result) {
                    video.slides = result.content;
                    var swiper = new Swiper('.swiper-container', {
                        slidesPerView: 4,
                        spaceBetween: 16,
                        prevButton:'.swiper-button-prev',
                        nextButton:'.swiper-button-next',
                        paginationClickable: true,
                        loop: true,
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
        filters:{
            formatMoney(value){
                return  value.toFixed(2);
            }
        }
    })

})
