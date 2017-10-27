/*tab切换*/
function tabHeader(name){
    if(name=='index'){
        $(".view-tab a").eq(0).addClass("selected");
    }else if(name=='account'){
        $(".view-tab a").eq(1).addClass("selected");
    }else if(name=='member'){
        $(".view-tab a").eq(2).addClass("selected");
    }else if(name=='moving'){
        $(".view-tab a").eq(3).addClass("selected");
    }else if(name=='policy'){
        $(".view-tab a").eq(4).addClass("selected");
    }
}
function dtAside(name){
    /*显示隐藏*/
    $("#aside .nav").children("li").children("a").click(function(){
        $(this).siblings("ul").toggle();
    })
    /*点击切换*/
    if(name=="member"){
        $("#aside .nav").children("li").children("ul").children("li").eq(0).addClass("pro-overview-selected").find("a").addClass("active").find("span").addClass("trend");
    }else if(name=="purchase" || name=="purchase_detail"){
        $("#aside .nav").children("li").children("ul").children("li").eq(1).addClass("pro-overview-selected").find("a").addClass("active").find("span").addClass("trend");
        $(".view-tab a").eq(2).addClass("selected");
    }else if(name=="distributor"||name=="distributor_detail"){
        $("#aside .nav").children("li").children("ul").children("li").eq(2).addClass("pro-overview-selected").find("a").addClass("active").find("span").addClass("trend");
        $(".view-tab a").eq(2).addClass("selected");
    }else if(name=="distribution"){
        $("#aside .nav").children("li").children("ul").children("li").eq(3).addClass("pro-overview-selected").find("a").addClass("active").find("span").addClass("trend");
        $(".view-tab a").eq(2).addClass("selected");
    }else if(name=="resource"){
        $("#aside .nav").children("li").eq(2).addClass("pro-overview-selected").find("a").addClass("active").find("span").addClass("trend");
        $(".view-tab a").eq(2).addClass("selected");
    }else if(name=="goods"){
        $("#aside .nav").children("li").eq(3).addClass("pro-overview-selected").find("a").addClass("active").find("span").addClass("trend");
        $(".view-tab a").eq(2).addClass("selected");
    }
}