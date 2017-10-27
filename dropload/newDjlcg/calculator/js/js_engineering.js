/**
 * Created by haiping on 2017/8/11.
 */

//工程线缆

$(function () {
    $(".nav_list_con").eq(5).addClass("nav_list_current").siblings().removeClass("nav_list_current");
    // enginnring >>> 工程线缆
    var engineering = new Vue({
        el: "#calc_cable",
        data: {
            Lmax_val: '',
            Lmin_val: '',
            box_len_val: 305,
            points_val: '',
            capacity_val: 0,
            total_number: '',
            options: [
                { text: '305  米/箱', value: '305', disabled: false },
                { text: '200  米/卷', value: '200', disabled: false }
            ],
            resolutions: [
                { text: '720', value: '720' },
                { text: '960', value: '960' },
                { text: '1080', value: '1080' }
            ],
            slides: []
        },
        watch:{
            Lmax_val: function () {
                var Lmax_val = parseInt(this.Lmax_val);
                var Lmin_val = parseInt(this.Lmin_val);
                if(Lmax_val>90 || Lmin_val>90){
                    engineering.box_len_val = 200
                    this.options[0].disabled = true;
                }else{
                    this.options[0].disabled = false;
                }
            },
            Lmin_val: function () {
                var Lmax_val = parseInt(this.Lmax_val);
                var Lmin_val = parseInt(this.Lmin_val);
                var box_len_val = parseInt(this.box_len_val);
                if(Lmax_val>90 || Lmin_val>90){
                    engineering.box_len_val = 200
                    this.options[0].disabled = true;
                }else{
                    this.options[0].disabled = false;
                }
            }
        },
        beforeCreate(){
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
        },
        updated(){
        },
        methods: {
            btn_submit_m: function () {

                //验证
                var Lmax_val = parseInt(this.Lmax_val);
                var Lmin_val = parseInt(this.Lmin_val);
                var box_len_val = parseInt(this.box_len_val);
                var points_val = parseInt(this.points_val);

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
                if (!isNum(Lmax_val) || !isNum(Lmin_val) || !isNum(points_val)){
                    var content = '<div class="f_c_666 pop_error_txt">请填写完整的设备离弱电电井的距离和信息点数！</div>';
                    error_obj(content);
                    return false;
                }else{
                    $(".calc_floor:not(.calc_floor_none)").show();
                    var data = {
                        Lmax: this.Lmax_val,
                        Lmin : this.Lmin_val,
                        lenght: this.box_len_val,
                        points: this.points_val,
                        capacity: this.capacity_val
                    }
                    var video_url = calculateUrl+"engineering_cable_calculate";
                    com.executeAjax(video_url, data, "POST", function (result) {
                        engineering.$data.total_number = result;
                    });
                }

            },
            btn_reset: function () {
                this.Lmax_val='';
                this.Lmin_val='';
                this.box_len_val=305;
                this.points_val='';
                this.capacity_val=0;
                this.total_number=0;
            },
            btn_goods: function (slide) {
                window.open("../product_list_info.html?infoId="+slide.id);
            },
            swiperSlide: function () {
                var dataRcom = {
                    num: 6,
                    catId: 9
                }
                var engineering_url = menuUrl+"cat_goods&num="+dataRcom.num+"&cat_id="+dataRcom.catId+"&t_id=1";
                com.executeAjax(engineering_url, dataRcom, "GET", function (result) {
                    engineering.slides = result.content;
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
        }
    })
})
