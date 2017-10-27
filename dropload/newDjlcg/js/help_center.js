/**
 * Created by Administrator on 2016/11/23 0023.
 */
//tab切换
function helpHeader2(name){
    if(name=='index'){
        $(".top_nav a").eq(0).addClass("active");
    }else if(name=='issues'){
        $(".top_nav a").eq(1).addClass("active");
    }else if(name=='contact'){
        $(".top_nav a").eq(2).addClass("active");
    }
}






