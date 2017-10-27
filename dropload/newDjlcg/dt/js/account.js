/**
 * Created by Administrator on 2016/11/25.
 */
var vmInfo = new Vue({
    el: '#user_info',
    data: {info:{},dtList:[]},
    methods:{
        switchParent:function(){
            com.executeAjax(dtServiceUrl.distributor_available_parent_dt,{}, "GET", function (result) {
                vmInfo.dtList.splice(result.data.length);
                vmInfo.dtList = result.data;
                /*更改上级*/
                setTimeout(function(){
                    $(".hide ul li").mouseenter(function(){
                        $(this).find('input').removeClass('Nhide');
                    }).mouseleave(function(){
                        $(this).find('input').addClass('Nhide');
                    })
                },100);
            });
            $('.hide').toggle();
        },
        saveParent:function(parent_dt_id){
            com.executeAjax(dtServiceUrl.distributor_save_parent_dt,{parent_dt_id:parent_dt_id}, "POST", function (result) {
                window.location.reload();
            });
        }
    }
});

var vmPersonnel = new Vue({
    el: '#personnel_list',
    data: {personnel1_list:[],personnel2_list:[],personnel3_list:[],personnel_id:[]},
    methods:{
        save_personnel:function(){
            var data = {
                personnel1_list:JSON.stringify(vmPersonnel.personnel1_list),
                personnel2_list:JSON.stringify(vmPersonnel.personnel2_list)
            }
            com.executeAjax(dtServiceUrl.distributor_save_personnel,data, "POST", function (result) {
                alert('保存成功');
            });
        },
        add_business_personnel:function(){
            var distributor_personnel_id=new Date().getTime()+'_'+Math.floor(10000);
            //var newRow = {"distributor_personnel_id":distributor_personnel_id,"position":"","name":"","phone":"","mobile":"","email":""};
            vmPersonnel.personnel3_list.push({distributor_personnel_id:distributor_personnel_id,"position":"","name":"","phone":"","mobile":"","email":""});
        },
        remove_business_personnel:function(){
            if(confirm("确定要删除数据吗？")) {
                var isArr = [];
                $('input[name="distributor_personnel_id"]:checked').each(function () {
                    for (var j = 0; j < vmPersonnel.personnel3_list.length; j++) {
                        if (vmPersonnel.personnel3_list[j].distributor_personnel_id == $(this).val()) {
                            vmPersonnel.personnel3_list.splice(j, 1);
                            break;
                        }
                    }
                    var value = $(this).val();
                    isArr.push(value);
                });
                var data1 = {
                    personnel_id : JSON.stringify(isArr)
                }
                com.executeAjax(dtServiceUrl.distributor_delete_personnel,data1, "POST", function (result) {
                    alert('删除成功');
                });
            }
        },
        save_business_personnel:function(){
            var arr = vmPersonnel.personnel3_list;
            //JSON.stringify(arr);
            var arr1= [];
            for(var i=0;i<arr.length;i++){
                if(arr[i].position =='' || arr[i].name =='' || arr[i].phone =='' || arr[i].mobile =='' || arr[i].email ==''){
                    arr[i]={};
                }else{
                    arr1.push(arr[i]);
                }
                var data = {
                    personnel3_list:JSON.stringify(arr1)
                }
            }

            com.executeAjax(dtServiceUrl.distributor_save_personnel,data, "POST", function (result) {
                alert('保存成功');
                //window.location.reload();
            });
        }
    }
});

$('#personnel_checkall').click(function(){
    $("input[name='distributor_personnel_id']").prop("checked",$(this).is(':checked'));
    if($(this).is(':checked')){
        $("#account-item2 .search button:eq(1)").removeClass('active')
        $("#account-item2 .search button:eq(1)").attr("disabled", false);
    }else{
        $("#account-item2 .search button:eq(1)").addClass('active')
        $("#account-item2 .search button:eq(1)").attr("disabled", true);
    }
    if($("#account-item2 table tr").length <= 1){
        $("#account-item2 .search button:eq(1)").addClass('active')
        $("#account-item2 .search button:eq(1)").attr("disabled", true);
    }
});

//获取基本信息
com.executeAjax(dtServiceUrl.distributor_basic_info,{}, "GET", function (result) {
    vmInfo.info = result.data;
});
//获取基本信息
com.executeAjax(dtServiceUrl.distributor_personnel_list,{}, "GET", function (result) {
    vmPersonnel.personnel1_list.splice(result.data.personnel1_list.length);
    vmPersonnel.personnel2_list.splice(result.data.personnel2_list.length);
    vmPersonnel.personnel3_list.splice(result.data.personnel3_list.length);

    vmPersonnel.personnel1_list = result.data.personnel1_list;
    vmPersonnel.personnel2_list = result.data.personnel2_list;
    vmPersonnel.personnel3_list = result.data.personnel3_list;
});
$(function(){
    /*table切换*/
    $('#tabs ul li').click(function(){
        $(this).addClass('selected').siblings('li').removeClass('selected');
        $('.content-bottom .table').eq($(this).index()).show().siblings('.table').hide();
    })
})
/*删除勾选按钮状态*/
function distributor_lable(obj){
    if($(obj).is(':checked')){
        $("#account-item2 .search button:eq(1)").removeClass('active')
        $("#account-item2 .search button:eq(1)").attr("disabled", false);
    }else{
        $("#account-item2 .search button:eq(1)").addClass('active')
        $("#account-item2 .search button:eq(1)").attr("disabled", true);
    }
    console.log($(obj).parents('tr'))
    if($(obj).parents('tr').siblings('tr').find('lable').find('input').is(':checked')){
        $("#account-item2 .search button:eq(1)").removeClass('active')
        $("#account-item2 .search button:eq(1)").attr("disabled", false);
    }
}