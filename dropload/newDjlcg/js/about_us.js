/**
 * Created by Administrator on 2016/12/7 0007.
 */

com.executeAjax(helpCenterUrl+orderServiceUrl.get_aboutme,'', "GET", function (result) {
    var items = new Vue({
        el: '#about_list',
        data: {get_aboutme : result.data}
    });



    // console.log(items.data);
   // console.log(getQueryString("infoid"))
    var url = helpCenterUrl+orderServiceUrl.get_aboutme+"&id="+2;
    com.executeAjax(url, "", "GET", function (result) {
        $.each(result.data,function(i,obj){
            var $html = '<li class="Nhide">'+ obj.content +'</li>';
            $("#list_content").append($html);
            // console.log(obj.content);
        });

        if(getQueryString("infoid")==2){
            $("#contact_floor").show();
        }
        var oBtn = $("#about_list a");
        oBtn.click(function(){
            oBtn.removeClass("active");
            $(this).addClass("active");
            $("#contact_floor").hide();
            var index = $(this).index();
            if (index==1){
                $("#contact_floor").show();
            }
            $("#list_content li").addClass("Nhide");
            $("#list_content li").eq(index).removeClass("Nhide");
        });
        var TabId = getQueryString("infoid");
        oBtn.eq(TabId-1).addClass("active");
        $("#list_content li").eq(TabId-1).removeClass("Nhide");
    });
});