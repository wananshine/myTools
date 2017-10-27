/**
 * Created by Administrator on 2017/8/18 0017.
 */
//$(document).ready(function(){
//  $("#send").click(function(){
//      var titles=$("#title").val();
//      var name=$("#name").val();
//      var tel=$("#tel").val();
//      var email=$("#email").val();
//      var sounds=$("#sounds").val();
//      var msg1="*请填写一个标题";
//      var msg2="*请填写您的公司名称";
//      var msg3="*请留下您的联系方式";
//      var msg4="*请填写您的邮箱地址";
//      var msg5="*请填写您的宝贵意见";
//      if(titles===""){
//         $(this).parent().children().eq(0).children().eq(2).text(msg1);
//          return false;
//      }
//      else{
//          $(this).parent().children().eq(0).children().eq(2).hide();
//      }
//      if(name===""){
//          $(this).parent().children().eq(1).children().eq(2).text(msg2);
//          return false;
//      }
//      else{
//          $(this).parent().children().eq(1).children().eq(2).hide();
//      }
//      if(tel===""){
//          $(this).parent().children().eq(2).children().eq(2).text(msg3);
//          return false;
//      }
//      else{
//          $(this).parent().children().eq(2).children().eq(2).hide();
//      }
//      if(email===""){
//          $(this).parent().children().eq(3).children().eq(2).text(msg4);
//          return false;
//      }
//      else{
//          $(this).parent().children().eq(3).children().eq(2).hide();
//      }
//      if(sounds===""){
//          $(this).parent().children().eq(4).children().eq(2).text(msg5);
//          return false;
//      }
//      else{
//          $(this).parent().children().eq(4).children().eq(2).hide();
//      }
//     if(titles!=""&&name!=""&&tel!=""&&email!=""&&sounds!=""){
//         // $(".form1").submit();
//          alert("提交成功！感谢您的宝贵意见！");
//      }
//  })
//});
//////////////////////////////////////

////////////////////////////////

 $(function(){
        var ok1=false;
        var ok2=false;
        var ok3=false;
        var ok4=false;
        var ok5=false;
        // 标题
        $('#titles').focus(function(){
            $(this).next().text('请填写一个标题');
        }).blur(function(){
            if($(this).val()!=="" ){
                $(this).next().text('');
                ok1=true;
            }else{
                $(this).next().text('请填写一个标题');
            }
        });
        // 公司名称
        $('#name').focus(function(){
            $(this).next().text('请填写贵公司名称');
        }).blur(function(){
            if($(this).val()!=="" ){
                $(this).next().text('');
                ok2=true;
            }else{
                $(this).next().text('请填写贵公司名称');
            }
        });
        //邮箱
        $('#email').focus(function(){
            $(this).next().text('请填写您的邮箱地址');
        }).blur(function(){
            if($(this).val()!=="" ){
                $(this).next().text('');
                ok3=true;
            }else{
                $(this).next().text('请填写您的邮箱地址');
            }
        });
        //电话
        $('#tel').focus(function(){
            $(this).next().text('请填写您的联系电话');
        }).blur(function(){
            if($(this).val()!=="" ){
                $(this).next().text('');
                ok4=true;
            }else{
                $(this).next().text('请填写您的联系电话');
            }
        });
        //意见
        $('#sounds').focus(function(){
            $(this).next().text('请留下您的宝贵意见');
        }).blur(function(){
            if($(this).val()!=="" ){
                $(this).next().text('');
                ok5=true;
            }else{
                $(this).next().text('请留下您的宝贵意见');
            }
        });
        //提交按钮,所有验证通过方可提交
        //$('#send').click(function(){
        //    if(ok1 && ok2 && ok3 && ok4 && ok5){
        //        $("form").submit();
        //        alert("提交成功！");
        //        }else{
        //        return false;
        //    }
        //});
     //提交按钮,所有验证通过方可提交
     $('#send').click(function () {
         if(ok1 && ok2 && ok3 && ok4 && ok5){
             var url = userLoginUrl + orderServiceUrl.add_message;
             var content = $("#titles").val();
             var company_name = $("#name").val();
             var back_phone = $("#tel").val();
             var data = {
                 msg_content : content,
                 user_name : company_name,
                 back_phone : back_phone
             }
             com.executeAjax(url, data, "POST", function (result) {
                 if ( result == 3) {
                     alert("非常感谢，您的意见我们已经收到！");
                     location.reload() ;
                 }
             });
         }
     });
    });


