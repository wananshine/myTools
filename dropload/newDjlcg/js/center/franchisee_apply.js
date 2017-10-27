/**
 * Created by Administrator on 2016/12/1 0001.
 */
function verificationNext(){
    var arr = [];
    var i = 0;
    var j = 0;
    /*next判断*/
    $(".noNull").each(function(){
        if($(this).val()!=""){
            arr.push($(this).val())
        }else{
            $(this).parent().siblings().removeClass("Nhide")
        }
        i++;
    })
    if(arr.length == i){
        save_apply_info();
    }

    ///*setcookie*/
    //$(".noNull").each(function(){
    //    $.cookie("username"+j, $(".noNull").eq(j).val(),{expires: 7});
    //    j++;
    //})
}
$(function(){
    /*getcookie*/
    var j = 0;
    $(".noNull").each(function(){
        $(".noNull").eq(j).val($.cookie("username"+j))
        j++;
    });
    com.executeAjax(userInfoUrl+orderServiceUrl.is_company_user, {}, "get", function (result) {
        if(result.data.is_company==0){
            $('#alert_zhezhao').removeClass('Nhide');
        }else if(result.data.dt_status==2){
            location.href = '/center/franchisee_verify.html?infoid=13';
        }else{
            get_apply_info();
        }
    });
});

var vm_personnel = new Vue({
    el: '#personnel_container',
    data: {personnel1_list:[],personnel2_list:[]}
});
function get_apply_info(){
    com.executeAjax(dtServiceUrl.get_apply_info, {}, "get", function (result) {
        if(result.data.dt_status==0){
            vm_personnel.personnel1_list.slice(result.data.personnel1_list.length);
            vm_personnel.personnel2_list.slice(result.data.personnel2_list.length);

            vm_personnel.personnel1_list = result.data.personnel1_list;
            vm_personnel.personnel2_list = result.data.personnel2_list;
        }

    });
}

//第一步
function save_apply_info(){
    var data = {
        personnel1_list: JSON.stringify(vm_personnel.personnel1_list),
        personnel2_list: JSON.stringify(vm_personnel.personnel2_list)
    };
    com.executeAjax(dtServiceUrl.save_apply_info, data, "POST", function (result) {
        location.href="/center/franchisee_protocol.html"
    });
}
setTimeout(function(){
    obtainDivHeight();
},249)
