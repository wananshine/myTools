/**
 * Created by Administrator on 2017/6/14 0014.
 */
$(function(){
    //分别加载页眉，头部，页脚，侧边栏
    $("#titleTemp_main").load("/lib/temp/page_title.html");
    $("#bottomTemp_main").load("/lib/temp/page_bottom.html");
});
function serviceItem(){
    var industryUrl  = service1Url+orderServiceUrl.article_by_industry;
    var data = {
        'industry': 0
    }
    $(".more_case").css({ display:"none" })
    com.executeAjax(industryUrl, data, "GET", function (response) {
        var slideUl = '';
        $.each(response.data, function(i, item){
            var ref = 'example.html?id=';
             var slideUl = ' <li><a target=" " href="'+ref+item.article_id+'"><p>'+item.title+'</p><img src="'+item.file_url+'"/></a></li>';
             // console.log(slideUl)
            $("#slideUl").append(slideUl)
        })
        $(".btn_top").on("click",function(){
            $("#slideUl").html("");
            var tit_top = $("#tit_top").offset().top;
            // console.log(tit_top)
            $('body,html').animate({
                    scrollTop: tit_top
                },
                1000);
            var industryUrl = service1Url+orderServiceUrl.article_by_industry;
            var no = $(this).attr("data-swiper-slide-index");
            var data = {
                'industry': no
            };
            // var marLeft = $(".service_tit_list .list_cell").eq(no).offset().left;
            // marLeft = marLeft - 364.34;
            $(".current").animate({
                marginLeft: no * 12.5 + "%"
            },1000)
            com.executeAjax(industryUrl, data, "GET", function (response) {
                // console.log(response)
                var slideUl = '';
                $.each(response.data, function(i, item){
                    var ref = 'example.html?id=';
                    var slideUl = ' <li><a target="_blank" href="'+ref+item.article_id+'"><p>'+item.title+'</p><img src="'+item.file_url+'"/></a></li>';
                    $("#slideUl").append(slideUl)
                })
            },false)

        })

        $(".service_tit_list .list_cell").mouseover(function(){
            $("#slideUl").html("");
            var industryUrl = service1Url+orderServiceUrl.article_by_industry;
            var index = $(this).index();
            var data = {
                'industry': index
            }

            // var marLeft = $(this).offset().left;
            // marLeft = marLeft - 364.34;
            $(".current").animate({
                marginLeft: index * 12.5 + "%"
            })
            // $.ajax({
            //     beforeSend:function(){
            //         $("#showMes").html('loading...');
            //     },
            //     completed:function(){
            //         $("#showMes").html('');
            //     }
            // });
            com.executeAjax(industryUrl, data, "GET", function (response) {
                // var slideUl = '';
                $.each(response.data, function(i, item){
                    var ref = 'example.html?id=';
                    var slideUl = ' <li><a target="_blank" href="'+ref+item.article_id+'"><p>'+item.title+'</p><img src="'+item.file_url+'"/></a></li>';
                    $("#slideUl").append(slideUl)
                })
            })
        });

        // $("#tab").
        // var uuu = 'example.html?id=';
        // var ul = ' <ul class="swiper-slide swiper-no-swiping"><li><a href="'+uuu+response.data[0].article_id+'"><p>'+response.data.title+'</p><img src="'+response.data.file_url+'"/></a></li> </ul>';

    });



    com.executeAjax(service1Url+orderServiceUrl.project_article, "", "GET", function (result) {
        var items = new Vue({
            el: '#tab',
            data: result
        });

        // var industryUrl  = service1Url+orderServiceUrl.article_by_industry;
        // com.executeAjax(industryUrl, data, "GET", function (res) {
        //     // var items = new Vue({
        //     //     el: '#tab',
        //     //     data: result
        //     // });
        //     console.log(res)
        // });
        // $(".swiper-slide").click(function(){
        //     var index = $(this).index();
        //     console.log(index)
        // })

    });
    var userName = $.cookie("ECS[username]");
    var swiper1 = new Swiper('.swiper-container1', {
        loop:true,
        speed: 2000,
        autoplay : 1000,
        grabCursor: false,
        noSwiping : true,
        slidesPerView : 4,
        slidesPerGroup : 1,
        prevButton:'.swiper-button-prev',
        nextButton:'.swiper-button-next',
    });

    /*$(".swiper-container1").mouseenter(function(){
        swiper1.stopAutoplay();
    });
    $(".swiper-container1").mouseleave(function(){
        swiper1.startAutoplay();
    });*/

    var swiper2 = new Swiper('.swiper-container2', {
        loop:true,
        speed: 300,
        //autoplay : 3000,
        //grabCursor: false,
        noSwiping : true
    });
    $('.more_case').click(function(){
        swiper2.slideNext();
    })

    $(".service_tit_list li").mouseover(function(){
        var index = $(this).index();
        console.log(index)
    });


    $(".demand").click(function () {
        if(userName){
            window.location = '/service/service_item_sub.html';
        }else{
            com.maskLogin($("#alert_mask"));
        }
    })

    var service_title_top = $(".service_title").eq(0).offset().top;
    function doctop() {
        if ($("body").scrollTop() == 0){
            var top = $("html").scrollTop();
            return top;
        }else{
            var top = $('body').scrollTop();
            return top;
        }
    }
    
    // $(".Map0707 area").eq(0).click(function () {
    //     if(userName){
    //         window.location = '/service/service_item_sub.html';
    //     }else{
    //         com.maskLogin($("#alert_mask"));
    //     }
    // })

    $(window).scroll(function () {
        var htl_top = doctop();
        if (htl_top>service_title_top){
            $(".right_item").show();
        }else{
            $(".right_item").hide();
        }
    });



}

function serviceSub(){
    $("#val1").focus(function(){
        $(this).removeClass("f_c_999");
        $("#val1 option:first").remove();
        $("#err").addClass("hide");
    });

    var imgSrcData = "";  // 上传文件返回的参数
    // 文件上传
    jQuery(function() {
        var $ = jQuery,
            $list = $('#thelist'),
            $btn = $('#ctlBtn'),
            state = 'pending',
            uploader;

        uploader = WebUploader.create({
            // 不压缩image
            resize: false,

            // swf文件路径
            swf: '/img/Uploader.swf',

            // 文件接收服务端。
            server: Url+'upload.php',

            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: '#picker'
        });

        // 当有文件添加进来的时候
        uploader.on('fileQueued', function(file) {
            $list.html('<div id="' + file.id + '" class="item">' +
            '<h4 class="info">' + file.name + '</h4>' +
            '<p class="state">等待上传...</p>' +
            '</div>');
            $("#ctlBtn").click();
        });

        // 文件上传过程中创建进度条实时显示。
        uploader.on('uploadProgress', function(file, percentage) {
            var $li = $('#' + file.id),
                $percent = $li.find('.progress .progress-bar');

            // 避免重复创建
            if(!$percent.length) {
                $percent = $('<div class="progress progress-striped active">' +
                '<div class="progress-bar" role="progressbar" style="width: 0%">' +
                '</div>' +
                '</div>').appendTo($li).find('.progress-bar');
                // $("#picker").hide();
                $(".webuploader-pick").text("");
            }

            $li.find('p.state').text('上传中');

            $percent.css('width', percentage * 100 + '%');
        });

        uploader.on('uploadSuccess', function(file, response) {
            if(response.code < 0){
                $('#' + file.id).find('p.state').text('上传出错');
            }else{
                imgSrcData = response;
                $('#' + file.id).find('p.state').text('已上传');
            }
        });

        uploader.on('uploadError', function(file) {
            $('#' + file.id).find('p.state').text('上传出错');
        });

        uploader.on('uploadComplete', function(file) {
            $('#' + file.id).find('.progress').fadeOut();
        });

        uploader.on('all', function(type) {
            if(type === 'startUpload') {
                state = 'uploading';
            } else if(type === 'stopUpload') {
                state = 'paused';
            } else if(type === 'uploadFinished') {
                state = 'done';
            }

            if(state === 'uploading') {
                $btn.text('暂停上传');
            } else {
                $btn.text('开始上传');
            }
        });

        $btn.on('click', function() {
            if(state === 'uploading') {
                uploader.stop();
            } else {
                uploader.upload();
            }
        });
    });
    com.number("phone");

    inputText($("#name"));
    inputText($("#company"));
    inputText($("#phone"));

    function inputText($class){
        $class.on("input",function(){
            $("#err").addClass("hide");
        });
    }
    $(".demand_sub").click(function(){
        var val1 = $("#val1").val();
        var val2 = $("#val2").find("input");
        var val3 = $("#val3").val();
        var val4 = $("#val4").val();
        var check = $("#check").find("input");
        var radioCheck = $("input[name='fruit']:checked").val();
        var radioCheck1 = $("input[name='fruit1']:checked").val();
        var textVal = $("#text").val();
        var name = $("#name").val();
        var company = $("#company").val();
        var phone = $("#phone").val();
        var strVal2 = "";
        $.each(val2,function(){
            if($(this).is(":checked")){//选中
                strVal2 += $(this).val() + "/";
            }
        });
        if(strVal2.length > 0){
            strVal2 = strVal2.substr(0,strVal2.length - 1);
        }
        var strCheck = "";
        $.each(check,function(){
            if($(this).is(":checked")){//选中
                strCheck += $(this).val() + "/";
            }
        });
        if(strCheck.length > 0){
            strCheck = strCheck.substr(0,strCheck.length - 1);
        }
        if(val1 == "请填写行业" || strVal2 == "" || name == "" || company == "" || phone == ""){
            $("#err").removeClass("hide");
        }else{
            setTimeout(function () {
                if(imgSrcData.code >= 0){
                    var data = {
                        'company'      : company,
                        'user_name'    : name,
                        'mobile'       : phone,
                        'industry'     : val1,
                        'project_type' : strVal2,
                        'project_place': val4,
                        'budget'       : val3,
                        'offer_help'   : strCheck,
                        'is_build'     : radioCheck,
                        'grade'        : radioCheck1,
                        'description'  : textVal,
                        'attachment'   : imgSrcData.data
                    };
                }else{
                    var data = {
                        'company'      : company,
                        'user_name'    : name,
                        'mobile'       : phone,
                        'industry'     : val1,
                        'project_type' : strVal2,
                        'project_place': val4,
                        'budget'       : val3,
                        'offer_help'   : strCheck,
                        'is_build'     : radioCheck,
                        'grade'        : radioCheck1,
                        'description'  : textVal
                    };
                };
                com.executeAjax(service1Url+orderServiceUrl.project_design, data, "POST", function (result) {

                });
            },200);
        }
    });
 }