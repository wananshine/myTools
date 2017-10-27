/**
 * Created by Administrator on 2017/2/17 0017.
 */
var animateTime = 700,
    step_item = 2;
//开始
$(function() {
    var scrlObj = $("body > div.myScroll");
    scrlObj.scrollTop(0);
    if (browerObj.name == "firefox") {
        window.addEventListener('DOMMouseScroll', wheel, false);
    } else {
        document.onmousewheel = wheel;
    }
    resizeHeight();
    markEvent();
    $(window).bind("resize",function() {
        resizeHeight();
    });
    $("body").bind("mousewheel",function() {//chrome会设置body的scrollTop值
        return;
    });

    $(document).bind("keyup",function(event) {
        var e = event || window.event;
        keyEvent(e);
    });
});
//上下箭头控制翻页
function keyEvent(e) {
    var code = e.keyCode;

    if(code == 40) {
        handle(-1);
    } else if(code == 38) {
        handle(1);
    }
}

function setMarginForIe8(zoom) {
    var scrW = $("body > .myScroll").width()*zoom,
        cW = $(window).width();

    $("body > .myScroll").css("margin-left",(cW - scrW)/2+"px");
}

function resizeHeight() {
    var cH = $(window).height(),
        cW = $(window).width(),
        name = browerObj.name,
        ver = browerObj.version,
        zoom = cH/1080,
        scrlObj = $("body > div.myScroll > div.wrap > div"),
        divObj = $("body > div.myScroll > div.wrap"),
        onObj = $("body > div.myScroll > div.on"),
        index = divObj.index(onObj);

    $("body").css('height',cH);
    if(name == "firefox") {
        scrlObj.css({"-moz-transform":"scale(" + zoom + ")","-moz-transform-origin":"0% 0% 0"});//firefox
        //setMarginForIe8(zoom);
    } else {
        scrlObj.css({"zoom":zoom}); //
    }

    scrlObj.css("width",cW/zoom+"px");
    $("body > div.myScroll").scrollTop(index * cH);
}

//mark
function markEvent() {
    var mA = $("body > .nav > a");
    len = mA.length,
        onM = $("body > .nav > span.on");
    mA.bind("click",function() {
        var index = mA.index($(this)),
            scrlDiv = $("body > div.myScroll"),
            sH = scrlDiv.scrollTop(),
            cH = scrlDiv.height(),
            pos = index - mA.index(mA.filter(".active")),
            times = Math.abs(pos);

        if(!scrlDiv.is(":animated")) {
            $("div.weixin_pop").hide();
            $(this).addClass("active").siblings().removeClass("active");
            onM.css("top",index*42+"px");
            scrlDiv.animate({scrollTop:(sH + pos*cH) + "px"},animateTime,function() {
                scrlDiv.children("div:eq("+index+")").addClass("on css3").siblings("div").removeClass("on");
                if(index == 0) {
                    step_item = 2;
                    scrlDiv.children("div").removeClass("css3").filter(":eq(3)").find(".min4_bd > .min4_step").removeClass("step_item2_on step_item3_on step_item4_on step_item5_on step_item6_on step_item7_on step_item8_on");
                }
            });
        }
    });
}

function unBindScroll(delay) {
    if (browerObj.name == "firefox") {
        window.removeEventListener('DOMMouseScroll', wheel, false);
    } else {
        document.onmousewheel = null;
    }
    setTimeout(function() {
        if (browerObj.name == "firefox") {
            window.addEventListener('DOMMouseScroll', wheel, false);
        } else {
            document.onmousewheel = wheel;
        }
    },delay);
}

//scroll
function handle(delta) {
    var scrlDiv = $("body > div.myScroll"),
        divObj = scrlDiv.children("div"),
        onObj = divObj.filter(".on"),
        len = divObj.length,
        index = divObj.index(onObj),
        sH = scrlDiv.scrollTop(),
        cH = scrlDiv.height(),
        onM = $("body > .nav > span.on");

    if (delta <0) {//down
        if(index <= len - 2 && !scrlDiv.is(":animated")) {
            index++;
            $("body > .nav > a:eq("+index+")").addClass("active").siblings().removeClass("active");
            onM.css("top",index*42+"px");
            scrlDiv.animate({scrollTop:(sH + cH) + "px"},animateTime,function() {
                onObj.removeClass("on").next("div").addClass("on css3");
                unBindScroll(800);
            });
        }
    } else {//up
        $("div.weixin_pop").hide();
        if(index > 0 && !scrlDiv.is(":animated")) {
            index--;
            $("body > .nav > a:eq("+index+")").addClass("active").siblings().removeClass("active");
            onM.css("top",index*42+"px");
            scrlDiv.animate({scrollTop:(sH - cH) + "px"},animateTime,function() {
                onObj.removeClass("on").prev("div").addClass("on css3");
                unBindScroll(800);
                if(index == 0) {
                    step_item = 2;
                    divObj.removeClass("css3").filter(":eq(3)").find(".min4_bd > .min4_step").removeClass("step_item2_on step_item3_on step_item4_on step_item5_on step_item6_on step_item7_on step_item8_on");
                }
            });
        }
    }
}
//ensure direction
function wheel(event){
    var delta = 0;
    if (!event) event = window.event;
    if (event.wheelDelta) {
        delta = event.wheelDelta/120;
        if (window.opera) delta = -delta;
    } else if (event.detail) {
        delta = -event.detail/3;
    }
    if (delta) {
        handle(delta);
    }
}