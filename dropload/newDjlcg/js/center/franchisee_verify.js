/**
 * Created by Administrator on 2016/12/8.
 */
$(function(){
    get_apply_status();
});

function get_apply_status(){
    com.executeAjax(dtServiceUrl.get_apply_status, {}, "get", function (result) {
        new Vue({
            el: '#vm_container',
            data:result.data
        });
        if(result.data.grade == -1 && result.data.status == 2){
            window.location = "/center/franchisee_payment.html?infoid=13";
        }
    });
}