/**
 * Created by Administrator on 2016/12/1 0001.
 */

$(function(){
    get_payment();
});

function verificationNext(){
    var arr = [];
    var i = 0;
    $(".noNull").each(function(){
        if($(this).val()!=""){
            arr.push($(this).val())
        }else{
            $(this).siblings("b").find("span").removeClass("Nhide")
        }
        i++;
    });
    if(arr.length == i){
        //location.href="/center/franchisee_verify.html"
        save_payment();
    }
}

var vm_payment = new Vue({
    el: '#dt_payment',
    data: {info:{}}
});

function get_payment(){
    com.executeAjax(dtServiceUrl.get_payment, {}, "get", function (result) {
        vm_payment.info = result.data;
    });
}

//第三步
function save_payment(){
    var data = vm_payment.info;
    com.executeAjax(dtServiceUrl.save_payment, data, "POST", function (result) {
        location.href="/center/franchisee_verify.html"
    });
}
