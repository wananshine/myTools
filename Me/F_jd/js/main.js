/**
 * Created by Administrator on 2017/4/26.
 */


define(function(require, exports, module){

    var zeptojs = require("./zepto");
    var swiperjs = require("./swiper");

    module.exports = function(){

//         //banner轮播
//         var swiper = new Swiper('.swiper-container', {
//             pagination: '.swiper-pagination',
//             paginationClickable: true,
//             prevButton:'.swiper-button-prev',
//             nextButton:'.swiper-button-next',
//             loop : true,
//             autoplay: 3000,
//         });
//
//         //jd秒杀
//         var sk_list_r = new Swiper('.sk-list-r', {
//             slidesPerView : 5,
//             slidesPerGroup : 5,
// //            pagination: '.swiper-pagination',
//             paginationClickable: true,
//             prevButton:'.swiper-button-prev',
//             nextButton:'.swiper-button-next',
//             loop : true,
// //            autoplay: 3000,
//         });

        $(".sk-list-pic").mouseover(function(){
            $(this).find(".sk-list-pic-lk>img").addClass("translatey-1").removeClass("translatey-0");
        });
        $(".sk-list-pic").mouseout(function(){
            $(this).find(".sk-list-pic-lk>img").removeClass("translatey-1").addClass("translatey-0");
        });
    }

})