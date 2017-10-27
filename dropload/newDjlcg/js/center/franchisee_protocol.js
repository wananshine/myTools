/**
 * Created by Administrator on 2016/12/1 0001.
 */
function verificationNext(){
    $("#content_body input").click(function(){
        if($("#content_body input").is(":checked")){
            $("#protocol_hide").addClass("Nhide")
        }
    })
    if($("#content_body input").is(":checked")){
        location.href="/center/franchisee_payment.html"
    }else{
        $("#protocol_hide").removeClass("Nhide")
    }
}
