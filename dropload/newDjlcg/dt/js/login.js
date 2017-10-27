/**
 * Created by Administrator on 2016/11/28.
 */

$('#btnFirmRegister').click(function(){
    window.location = '/frim_register.html';
});

$('#btnDTApply').click(function(){
    window.location = '/center/index.html';
});


$('#btn_login').click(function(){
    var data = {
        username:$('#txt_username').val(),
        //psw: $('#txt_pwd').val()
        psw: $.md5($('#txt_pwd').val())
    };
    com.executeAjax(dtServiceUrl.site_login, data, "POST", function (result) {
        if(result.code!=0){
            $('.login_error_text1').show();
        }else{
            location.href = "index.html";
        }
    });
});
