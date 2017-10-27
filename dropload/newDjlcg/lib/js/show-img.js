/**
 * Created by Gold on 2016/10/19.
 */
(function($) {
    $.imageFileVisible = function(options) {
        // 默认选项
        var defaults = {
            //包裹图片的元素
            wrapSelector: null,
            //<input type=file />元素
            fileSelector:  null ,
            width : '100%',
            height: 'auto',
            errorMessage: "请选择图片"
        };
        // Extend our default options with those provided.
        var opts = $.extend(defaults, options);
        $(opts.fileSelector).on("change",function(){
            var file = this.files[0];
            var fileSize = this.files[0].size;
            var size = fileSize / 1024 / 1024;
            if (size > 4) {
                alert("附件不能大于4M");
            }else{
                var imageType = /image.*/;
                if (file.type.match(imageType)) {
                    var reader = new FileReader();
                    reader.onload = function(){
                        var img = new Image();
                        img.src = reader.result;
                        console.log(img.src);
                        $(img).width( opts.width);
                        $(img).height( opts.height);
                        $( opts.wrapSelector ).html(img);
                        $(opts.wrapSelector).find("img").addClass("images");
                        var imgWidth = img.width;
                        $(opts.wrapSelector).find("img").css("margin-left","-"+ imgWidth/2 +"px");
                        $(opts.wrapSelector).css("background","#f5f5f5");
                        $(opts.wrapSelector).siblings(".clear_img").show();
                        $(opts.wrapSelector).parent().siblings("p").eq(1).hide();
                        $(opts.fileSelector).attr("data","true");
                        opts.success_callback();
                    };
                    reader.readAsDataURL(file);
                }else{
                    alert(opts.errorMessage);
                }
            }
        });
    };
})(jQuery);