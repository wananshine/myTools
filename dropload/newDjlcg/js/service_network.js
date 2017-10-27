/**
 * Created by Gold on 2016/10/26.
 */

var vmAgencyList = new Vue({
    el: '#agency_container',
    data: {agency_list:[]}
});
/*var vmServiceList = new Vue({
    el: '#service_container',
    data: {dt_list:[]}
});*/

$(function () {
    //分别加载页眉，头部，页脚，侧边栏
    $("#titleTemp_main").load("lib/temp/page_title.html");
    $("#titleTemp2_main").load("lib/temp/page_title2.html");
    $("#bottomTemp_main").load("lib/temp/page_bottom.html");
    $("#sidebarTemp_main").load("lib/temp/page_sidebar.html");

    get_dt_area_list();
    get_dt_list();
});


function get_dt_area_list(){
    com.executeAjax(dtServiceUrl.dt_area_list,{}, "GET", function (result) {
        new Vue({
            el: '#area_container',
            data: result,
            methods:{
                onAreaSelected:function(areaId,event){
                    set_title_select(event.target);
                    get_dt_list(areaId);
                },
            }
        });
    });
}

function set_title_select(obj){
    $("#content .content_nav span").removeClass("active");
    $(obj).addClass("active");
}

function get_dt_list(areaId) {
    areaId = areaId ? areaId : 0;
    com.executeAjax(dtServiceUrl.dt_list, {area_id: areaId}, "GET", function (result) {
        vmAgencyList.agency_list.splice(result.data.agency_list.length);
        vmAgencyList.agency_list = result.data.agency_list;

        /*vmServiceList.dt_list.splice(result.data.dt_list.length);
        vmServiceList.dt_list = result.data.dt_list;*/
    });
}


