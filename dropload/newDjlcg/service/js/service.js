/**
 * Created by Gold on 2016/11/24.
 */

var imgSrcData = "";  // 上传文件返回的参数
$(function () {
    $("#titleTemp_main").load("/lib/temp/page_title.html");

    var userName =  $.cookie("ECS[username]");
    if(userName){
        $(".submit_main_title").hide();
    }

    $(".more_service").mouseenter(function () {
        $(".Box_main").fadeIn(300);
        $(this).children("img").addClass("rotate_90");
    });

    $(".Box_main").mouseleave(function () {
        $(".Box_main").fadeOut(300);
        $(".more_service").children("img").removeClass("rotate_90");
    });

    //上传图片
    /*var success_callback = function () {
        $(".upload_bg img").removeAttr("style");
        $(".upload_bg").css("z-index","2");
        $(".update p").hide();
        $(".upload_bg").show();
        $(".del_img").removeClass("Nhide");

        $(".update").mouseenter(function () {
            $(this).find(".del_img").css("bottom","0");
        });
        $(".update").mouseleave(function () {
            $(".del_img").removeAttr("style");
        });

        $(".del_img").click(function(){
            $(this).siblings(".upload_bg").html('');
            $(this).siblings("p").show();
            $(".upload_bg,.del_img").hide();
            $(".del_img").addClass("Nhide");
            $(this).hide();
        });
    };
    com.updateImages("#file1", "#image_wrap1", success_callback);*/

    $("#agreement").click(function () {
        var a = $(this).is(':checked');
        if(a){
            $(".error").eq(3).attr("data","true").hide();
            $(this).removeAttr("checked");
        }else{
            $(".error").eq(3).attr("data","false").show();
        }
    });

    $("#val1").on("change",function () {
        var text = $(this).val();
        if(text === "选择询价类型"){
            $(".error").eq(0).attr("data","false").show();
        }else{
            $(".error").eq(0).attr("data","true").hide();
        }
    });

    var timeText1 = "1267";
    var timeText2 = [];
    for(var i=0; i<timeText1.length; i++){
        timeText2.push(timeText1.substr(i,1));
        $("#time").append('<b>'+timeText2[i]+'</b>');
    }

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

});


function submitService(Type) {
    var val1 = $("#val1");
    var val2 = $("#val2");
    var val3 = $("#val3");
    var val4 = $("#valName");
    var valImg = $("#file1");
    var valData = $(".error");
    // if(Type===2){
    //     var val5=$("#val5");
    // }


    inputText(val2, $(".error").eq(1), 2);
    inputText(val3, $(".error").eq(2), 11);
    inputText(val4, $(".error").eq(0), 2);
    // if(Type=== 2){
    //     checkEmail($(".error2").eq(0));
    // };
    function inputText($class, $class2,number){
        $class.on("input",function(){
            var text = $(this).val();
            if(text.length < number || text.length > 20){
                $class2.show();
                $class2.attr("data","false");
            }else{
                $class2.hide();
                $class2.attr("data","true");
            }
        });
    }
   /* //邮箱验证
    function checkEmail($class5) {
        //var state = false;
        val5.focus(function () {
            var text = $(this).val();
            if(text.length === 0){
                $(this).attr('placeholder','请填写您的邮箱')
            }else{
                $(this).attr('placeholder','')
            }
        })
        val5.blur(function () {
            if ($(this).val() == '') {
                $class5.show();
                $class5.attr("data","false");
                //console.log('用户没填');
            }
            else {
                if (/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+(com|cn)$/.test($(this).val()) == false) {
                    $class5.show();
                    $class5.attr("data","false");
                    //console.log('用户错误');
                }
                else if(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+(com|cn)$/.test($(this).val()) ==true){
                    $class5.attr("data","true");
                    $class5.hide();
                    //console.log('用户正确');

                }
            }
        })
    };*/
    $(".login").click(function () {
        if(!userName){
            com.maskLogin($("#alert_mask"));
            return false;
        }
        var isTrue = [];
        for(var i=0; i<valData.length; i++){
            var a = valData.eq(i).attr("data");
            isTrue.push(a);
        }
        if(val1.val() === '选择询价类型'){
            $(".error").eq(0).show();
        }
        if(val2.val() === ''){
            $(".error").eq(1).show();
        }
        if(val3.val() === ''){
            $(".error").eq(2).show();
        }
        if(val4.val() === ''){
            $(".error").eq(0).show();
        }
        // if(Type===2){
        //     if(val5.val() === ''){
        //         $(".error2").eq(0).show();
        //         return;
        //     }
        // }

        if(isTrue.indexOf("false") == -1){
            setTimeout(function () {
                if(imgSrcData.code >= 0){
                    var data = {
                        user_name    : val4.val(),
                        phone        : val3.val(),
                        msg_type     : Type,           //类型1=反馈留言;2=免费询价;3=施工服务;4=工程检测;5=安装服务;6=资质合作;7=项目设计
                        msg_sub_type : val1.val(),     //子类型:21=单品询价,22=项目的清单询价;23=根据招标文件配置设备清单及报价
                        msg_content  : val2.val(),
                        // msg_email     :val5.val(),
                        message_file : imgSrcData.data
                    };
                }else{
                    var data = {
                        user_name    : val4.val(),
                        phone        : val3.val(),
                        msg_type     : Type,
                        msg_sub_type : val1.val(),
                        msg_content  : val2.val(),
                        // msg_email     :val5.val()
                    };
                };
                com.executeAjax(serviceUrl, data, "POST", function (result) {
                    alert(result.data);
                });
            },2000);
            com.loading($("#s_change_div"), $("#s_changeText"));
        }
    });

    var userName =  $.cookie("ECS[username]");
    if(!userName){
        com.maskLogin($("#alert_mask"));
    }

    $("#alert_agreement").click(function () {
        var content = "<div id='agree' style='height: 450px;overflow-y: scroll'></div><p class='agreeInput white bg_light_dd3e3e'>同意并继续</p>";
        var object = {
            getid        : $("#alert_mask"),
            text_title   : "提示",
            text_content : content
        }
        com.mask(object);
        $("#agree").load("/agreement/agreement_02.html");
        $(".mask_main").css({"width":"800px","padding":"60px 0px 30px 20px"});
        $(".mask_input").hide();

        $(".agreeInput").click(function () {
            var isAgree = $("#agreement").is(":checked");
            $(".bg_mask,.mask_main").hide();
            if(!isAgree){
                $("#agreement").click();
            }
        });

        var DivHeight = $(".mask_main").outerHeight();
        var DivWidth = $(".mask_main").outerWidth();
        $(".mask_main").css({'margin': '-'+parseInt(DivHeight)/2 +'px ' + '-'+parseInt(DivWidth)/2 +'px'});
    });
}

function engineer_info(){
    $.ajax({
        url:"http://djlzix.com/index_article.php",
        dataType:'jsonp',
        data:'engineers',
        jsonp:'callback',
        timeout:3000,
        success:function(result) {
            User(result[0].id);
            var articleF = new Vue({
                el: '#engineers_info',
                data: {list : result},
                methods:{
                    toDetail:function (url) {
                        User(url);
                    },
                }
            });
        }
    });



        $(".photo li").click(function () {
            var text = $(this).index();
            switch (text)
            {
                case 0:
                    $(".triangle1,.triangle2").css("left","10%");
                    break;
                case 1:
                    $(".triangle1,.triangle2").css("left","30%");
                    break;
                case 2:
                    $(".triangle1,.triangle2").css("left","50%");
                    break;
                case 3:
                    $(".triangle1,.triangle2").css("left","70%");
                    break;
                case 4:
                    $(".triangle1,.triangle2").css("left","90%");
                    break;
            }
        });

    function User(id){
        var data = {
            engineer_detail: 'engineer_detail',
            aid: id
        };
        $.ajax({
            url:"http://djlzix.com/index_article.php",
            dataType:'jsonp',
            data:data,
            jsonp:'callback',
            timeout:3000,
            success:function(result) {
                var text = com.htmldecode(result.body);
                $("#tab").html(text);
            }
        });

    }
}
/*
 com.executeAjax(zxwUrl, data, "GET", function (result) {
 var text = com.htmldecode(result.body);
 $("#tab").html(text);
 });
 */