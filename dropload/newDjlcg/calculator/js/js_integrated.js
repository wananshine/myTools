/**
 * Created by haiping on 2017/8/11.
 */

//综合布线

$(function () {
    $(".nav_list_con").eq(4).addClass("nav_list_current").siblings().removeClass("nav_list_current");
    //综合布线
    var integrated = new Vue({
        el: "#calc_wiring",
        data: {
            bridge_W: '',
            bridge_H: '',
            group_radio: 0,
            selected_radio: 0,
            rule_val: "22.05",
            total_number: '',
            options: [],
            tab_radios: [
                { id: "cable_0", checked: true ,  tab_txt: "网线",         val: '0'},
                { id: "cable_1", checked: false , tab_txt: "室内光缆",     val: '1'},
                { id: "cable_2", checked: false , tab_txt: "室外光缆",     val: '2'},
                { id: "cable_3", checked: false , tab_txt: "大对数电缆",   val: '3'},
                { id: "cable_4", checked: false , tab_txt: "视频线缆",     val: '4'},
                { id: "cable_5", checked: false , tab_txt: "射频发泡线缆", val: '5'},
                { id: "cable_6", checked: false , tab_txt: "电源线",       val: '6'},
                { id: "cable_7", checked: false , tab_txt: "控制线缆",     val: '7'}
            ],
            resolutions: [
                { text: '720', value: '720' },
                { text: '960', value: '960' },
                { text: '1080', value: '1080' }
            ],
            slides: []
        },
        watch: {
            selected_radio: function () {
                var selected_radio =  this.selected_radio;
                data = {
                    wire_type: selected_radio
                };
                var selected_radio_url = calculateUrl+"get_wire_type";
                com.executeAjax(selected_radio_url, data, "POST", function (result) {
                    integrated.$data.options = result;
                    integrated.$data.rule_val = result[0].type_val;
                    return;
                });
            },
        },
        beforeCreate(){
        },
        created(){
            this.btn_selected();
        },
        beforeMount(){
            // this.btn_selected();
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
        beforeDestroy(){

        },
        destroyed(){

        },
        methods: {
            tabRadio: function(tab_radio, index){
            },
            btn_submit_m: function () {

                //验证
                var bridge_W = parseInt(this.bridge_W);
                var bridge_H = parseInt(this.bridge_H);

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
                if (!isNum(bridge_W) || !isNum(bridge_H)){
                    var content = '<div class="f_c_666 pop_error_txt">请填写完整的桥架宽度和桥架高度！</div>';
                    error_obj(content);
                    return false;
                }else{
                    $(".calc_floor").show();
                    var data = {
                        width : this.bridge_W,
                        height: this.bridge_H,
                        acreage: this.rule_val,
                    }
                    var video_url = calculateUrl+"wire_calculate";
                    com.executeAjax(video_url, data, "POST", function (result) {
                        integrated.$data.total_number = result;
                    });
                }
            },
            btn_reset: function () {
                $(".calc_floor").hide();
                this.bridge_W='',
                this.bridge_H= '',
                this.group_radio= 0,
                this.selected_radio= 0,
                this.rule_val= "22.05",
                this.total_number=0

            },
            btn_selected: function () {
                var selected_radio =  this.selected_radio;
                data = {
                    wire_type: selected_radio
                };
                var selected_radio_url = calculateUrl+"get_wire_type";
                com.executeAjax(selected_radio_url, data, "POST", function (result) {
                    integrated.$data.options = result;
                    return;
                });
            },
            btn_goods: function (slide) {
                window.open("../product_list_info.html?infoId="+slide.id);
            },
            swiperSlide: function () {
                var dataRcom = {
                    num: 6,
                    catId: 3
                }
                var integrated_url = menuUrl+"cat_goods&type=1&num="+dataRcom.num+"&cat_id="+dataRcom.catId+"&t_id=1";
                com.executeAjax(integrated_url, dataRcom, "GET", function (result) {
                    integrated.slides = result.content;
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
