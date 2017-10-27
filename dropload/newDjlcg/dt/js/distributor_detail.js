/**
 * Created by Administrator on 2016/11/22.
 */
$(function () {
    getDetail();
});

function getDetail(){
    var id = getQueryString('id');
    com.executeAjax(dtServiceUrl.distributor_my_dt_detail, {id:id}, "GET", function(result){
        new Vue({
            el: '#dt_info',
            data: result.data
        });


        new Vue({
            el: '#personnel_list',
            data: result.data,
        });
    });
}