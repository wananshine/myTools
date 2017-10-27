/**
 * Created by haiping on 2017/8/11.
 */

$(function () {
    $(".nav_list_con").eq(0).addClass("nav_list_current").siblings().removeClass("nav_list_current");

    var display_d = new Vue({
        el: "#calc_display",
        data: {
            selected_radio: 0,
            size_val: 0 ,
            area_01:  '',    //拼接屏数量
            area_02: '',     //拼接屏数量
            area_03: 0,     //屏幕大小
            area_04: 0,     //屏幕大小
            area_w: '',      //预拼接宽度
            area_h: '',      //预拼接高度
            total_number: '',
            options: [
                { text: '46', value: '0' },
                { text: '49', value: '1' },
                { text: '55', value: '2' },
                { text: '60', value: '3' }
            ],
            resolutions: [
                { text: '720', value: '720' },
                { text: '960', value: '960' },
                { text: '1080', value: '1080' }
            ],
            tab_radios: [
                { id: "cable_0", checked: true , tab_txt: "面积", val: '0'},
                { id: "cable_1", checked: false , tab_txt: "数量", val: '1'}
            ],
            slides: []
        },
        watch: {
            // area_01: function () {
            //     $("#area_01").focus(function () {
            //         display_d.area_01 = ''
            //     });
            // },
        },
        created(){

        },
        beforeMount(){

        },
        mounted(){
            this.$nextTick(function () {
                this.swiperSlide()
            })
        },
        beforeUpdate(){
            // $("input").focus(function () {
            //     var val_num = " ";
            //     $(this).val(val_num);
            // });
        },
        methods: {
            tabRadio: function(tab_radio, index){
                if(index == 0){
                    $(".title_group").find(".tab_radio").checked = false;
                    $(".title_group").eq(index).find(".tab_radio").checked = true;
                    $(".calc_panel .panel_info").eq(index).show().siblings(".panel_info").hide();
                }else if(index == 1){
                    $(".title_group").find(".tab_radio").checked = false;
                    $(".title_group").eq(index).find(".tab_radio").checked = true
                    $(".calc_panel .panel_info").eq(index).show().siblings(".panel_info").hide();
                }
                // $(".calc_panel .panel_info").eq(index).show().siblings(".panel_info").hide();
            },
            btn_submit_m: function () {
                var selected_radio =  parseInt(this.selected_radio)+1;
                //验证
                var area_01 = parseInt(this.area_01);
                var area_02 = parseInt(this.area_02);
                var area_w = parseInt(this.area_w);
                var area_h = parseInt(this.area_h);

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
                if(selected_radio==1){
                    if (!isNum(area_01) || !isNum(area_02)){
                        var content = '<div class="f_c_666 pop_error_txt">请填写完整的拼接屏数量！</div>';
                        error_obj(content);
                        return false;
                    }else{
                        this.btn_submit_com(selected_radio);
                    }
                }else if(selected_radio==2){
                    if (!isNum(area_w) || !isNum(area_h)){
                        var content = '<div class="f_c_666 pop_error_txt">请填写完整的预拼接宽度/高度！</div>';
                        error_obj(content);
                        return false;
                    }else{
                        this.btn_submit_com(selected_radio);
                    }
                };
            },
            btn_reset: function () {
                this.size_val=0;
                this.area_01='';
                this.area_02='';
                this.area_03=0;
                this.area_04=0;
                this.area_w='';
                this.area_h='';
                this.total_number=0;
                $(".calc_floor").hide();
            },
            btn_submit_com: function (selected_radio) {
                $(".calc_floor:not(.calc_floor_none)").show();
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
                    display_d.$data.total_number = result;
                });
            },
            btn_goods: function (slide) {
                window.open("../product_list_info.html?infoId="+slide.id);
            },
            swiperSlide: function () {
                var dataRcom = {
                    num: 6,
                    catId: 73
                }
                var display_url = menuUrl+"cat_goods&num="+dataRcom.num+"&cat_id="+dataRcom.catId+"&t_id=1";
                com.executeAjax(display_url, dataRcom, "GET", function (result) {
                    display_d.slides = result.content;
                    var swiper = new Swiper('.swiper-container', {
                        slidesPerView : 4,
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
    })
})
