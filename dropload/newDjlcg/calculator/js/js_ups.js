/**
 * Created by haiping on 2017/8/11.
 */

$(function () {
    $(".nav_list_con").eq(1).addClass("nav_list_current").siblings().removeClass("nav_list_current");

    var ups = new Vue({
        el: "#calc_ups",
        data: {
            power_val: '' ,
            time_val: 1,
            total_number: '',
            options: [
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' },
                { text: '5', value: '5' },
                { text: '6', value: '6' },
                { text: '7', value: '7' }
            ],
            resolutions: [
                { text: '720', value: '720' },
                { text: '960', value: '960' },
                { text: '1080', value: '1080' }
            ],
            slides: []
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
                $("input")
                this.swiperSlide();
            })
        },
        beforeUpdate(){
        },
        updated(){
        },
        filters:{
            formatMoney: function (value){
                return value.toFixed(2);
            }
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
                var data = {
                    power: this.power_val,
                    time : this.time_val,
                }

                //验证
                var power_val = parseInt(this.power_val);

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
                if (!isNum(power_val)){
                    var content = '<div class="f_c_666 pop_error_txt">请填写正确的UPS负载功率！</div>';
                    error_obj(content);
                    return false;
                }else{
                    $(".calc_floor:not(.calc_floor_none)").show();
                }

                //精品推荐
                var usp_url = calculateUrl+"power_supply_calculate";
                com.executeAjax(usp_url, data, "POST", function (result) {
                    ups.$data.total_number = result;
                });
            },
            btn_reset: function () {
                $(".calc_floor").hide();
                this.power_val= '',
                this.time_val=1;
                this.total_number=0;
            },
            btn_goods: function (slide) {
                window.open("../product_list_info.html?infoId="+slide.id);
            },
            swiperSlide: function () {
                var dataRcom = {
                    num: 6,
                    catId: 18
                }
                var usp_url = menuUrl+"cat_goods&type=1&num="+dataRcom.num+"&cat_id="+dataRcom.catId+"&t_id=1";
                com.executeAjax(usp_url, dataRcom, "GET", function (result) {
                    ups.slides = result.content;
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
