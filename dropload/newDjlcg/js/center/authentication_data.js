/**
 * Created by Gold on 2016/11/8.
 */
$(function () {

    var infoUrl = userInfoUrl+orderServiceUrl.get_identif;
    var infoData = {
        info : 'identif'
    };
    com.executeAjax(infoUrl, infoData, "GET", function (result) {
        var isShow = result.company_verify_status;
        var province_id = result.province;
        var city_id = result.city;
        var district_id = result.district;

        switch (isShow)
        {
            case "0":
                $("#page1").removeClass("Nhide").addClass("content_main");
                break;
            case "1":
                $("#page2").removeClass("Nhide").addClass("content_main");
                break;
            case "2":
                $("#page3").removeClass("Nhide").addClass("content_main");
                break;
            case "3":
                $("#page4").removeClass("Nhide").addClass("content_main");
                var data = {
                    Province : "#Province2",
                    City  : "#City2",
                    Area  : "#Area2",
                    isShow: true,
                    typeOf: "update",
                    provinceCode : province_id,
                    cityCode     : city_id,
                    areaCode     : district_id
                }
                com.provinceCityArea(data);
                setTimeout(function () {
                    var a = $("#certificates_imgs dd").length;
                    for(var i=0; i<a; i++){
                        var imgWidth = $("#certificates_imgs dd").eq(i).find(".images");
                        imgWidth.css("margin-left","-"+ imgWidth.outerWidth()/2 +"px");
                    }
                },100);
                break;
            default:
                $("#page1").removeClass("Nhide").addClass("content_main");
        }
        obtainDivHeight();

        var items =  new Vue({
            el: '#companyname',
            data: {list:result}
        });
        var items2 =  new Vue({
            el: '#addr2',
            data: {list:result}
        });
        var items3 =  new Vue({
            el: '#firmNumber2',
            data: {list:result}
        });
        var items3 =  new Vue({
            el: '#info',
            data: {list:result}
        });
        var items3 =  new Vue({
            el: '#info2',
            data: {list:result}
        });
        var items3 =  new Vue({
            el: '#info3',
            data: {list:result}
        });

        $("#backUpdate").click(function () {
            $("#page3").removeClass("content_main").addClass("Nhide");
            $("#page1").removeClass("Nhide").addClass("content_main");
        });

        $(".now_save").click(function () {
            var addr2 = $("#addr2").val();
            var firmNumber2 = $("#firmNumber2").val();
            if(addr2 !== "" && firmNumber2 !== ""){
                var url  = userInfoUrl+orderServiceUrl.edit_company_info;
                var data = {
                    province : $('#s_province2').val(),
                    city : $('#s_city2').val(),
                    county : $('#s_county2').val(),
                    province_name :$('#s_province2').find('option:selected').text(),
                    city_name : $('#s_city2').find('option:selected').text(),
                    county_name : $('#s_county2').find('option:selected').text(),
                    addr : addr2,
                    office_num : firmNumber2
                }
                var success_callback = function(obj){
                     if( obj === 3){					 
						 com.maskSuccess($("#alertMask"), "修改成功！");
					 }
                }
                com.executeAjax(url, data, "POST", success_callback);
            }
        });

        $(".certificates").click(function(){
            $(".certificates").removeClass("f_c_333 border_green").addClass("f_c_999");
            $(this).removeClass("f_c_999").addClass("f_c_333 border_green");
            $(".certificates img").hide();
            $(this).find("img").show();
            $(".certificates").attr("data","false");
            $(this).attr("data","true");
            if($(this).index() == 2){
                $(".certificates_imgs1 dd").eq(1).hide().find(".upload_file").attr("data","true");
                $(".certificates_imgs1 dd").eq(2).attr("class","mar_l_20px");
                $(".certificates_imgs1 dd").eq(3).hide().find(".upload_file").attr("data","true");
                $(".cer_imgs_text2").hide();
            }else{
                $(".certificates_imgs1 dd").eq(1).show().find(".upload_file").attr("data","false");
                $(".certificates_imgs1 dd").eq(2).attr("class","mar_t_20px");
                $(".certificates_imgs1 dd").eq(3).show().find(".upload_file").attr("data","false");
                $(".cer_imgs_text2").show();
            }
        });

        inputText($("#addr2"),2);
        inputText($("#firmNumber2"),2);

        clickInput($("#addr2"));
        clickInput($("#firmNumber2"));

        var address = $("#addr2");
        var number  = $("#firmNumber2");
        if(address.val().length >= 2){
            address.siblings("span").eq(1).hide();
            address.siblings(".chose_color").show();
            address.siblings("span").eq(1).attr("data","true");
            address.removeClass("border_red");
        }
        if(number.val().length >= 2){
            number.siblings("span").eq(1).hide();
            number.siblings(".chose_color").show();
            number.siblings("span").eq(1).attr("data","true");
            number.removeClass("border_red");
        }
    });


    // $("#page1 .order_schedule2 ul li hr").eq(0).css("width","50%");
    // $("#page1 .order_schedule2 ul li hr").eq(2).css({"width":"50%","right":"50%"});
    // $("#page1 .order_schedule2 ul li img").eq(0).attr("src","img/icon_01.png");

    /*if(text === "2"){
        switch(status)
        {
            case "1":
                $(".order_schedule ul li hr").eq(1).css("border-color","#89ca55");
                $(".order_schedule ul li img").eq(1).attr("src","img/icon_01.png");
                break;
            case "1":
            case "2":
            default:
        }
    }*/

    $(".right_menu ul li").find("span").click(function(){
        var activeTab = $(this).attr("href");
        $("#content_main").load(activeTab);

        $("#menu_chk_text").text($(this).text());
        $(".right_menu ul li").find("span").removeClass("red");
        $(this).addClass("red");

        obtainDivHeight();
    });

    com.numAndEng("pwd1");
    com.numAndEng("pwd2");
    // com.number("bankCard1");
    com.number("bankCard2");

    var input1 = $(".login_main_content ul li").eq(0).find("input");
    var input2 = $(".login_main_content ul li").eq(1).find("input");
    var input3 = $(".login_main_content ul li").eq(2).find("input");
    var input4 = $(".login_main_content ul li").eq(3).find("input");
    var input5 = $(".login_main_content ul li").eq(4).find("input");
    var input6 = $(".login_main_content ul li").eq(5).find("input");
    var input7 = $(".login_main_content ul li").eq(6).find("input");
    var input8 = $(".login_main_content ul li").eq(7).find("input");
    var input9 = $(".login_main_content ul li").eq(8).find("input");
    var input10 = $(".login_main_content ul li").eq(9).find("input");
    var input11 = $(".login_main_content ul li").eq(10).find("input");
    var input12 = $(".login_main_content ul li").eq(11).find("input");
    var input13 = $(".login_main_content ul li").eq(12).find("input");
    var input14 = $(".login_main_content ul li").eq(13).find("input");
    var input15 = $(".login_main_content ul li").eq(14).find("input");

    inputText(input1,4);    //限制长度
    inputText(input2,6);
    inputText(input4,2);
    inputText(input5,1);
    inputText(input8,2);
    inputText(input9,2);
    inputText(input12,2);

    clickInput(input1);     //获取、失去焦点
    clickInput(input2);
    clickInput(input3);
    clickInput(input4);
    clickInput(input5);
    clickInput(input6);
    clickInput(input7);
    clickInput(input8);
    clickInput(input9);
    clickInput(input10);
    //clickInput(input11);
    clickInput(input12);
    clickInput(input13);
    clickInput(input14);
    clickInput(input15);

    function inputText($class,number){
        $class.on("input",function(){
            $(this).siblings("span").eq(0).hide();
            var text = $(this).val();
            if(text.length < number || text.length > 20){
                $(this).siblings("span").eq(1).show();
                $(this).siblings(".chose_color").hide();
                $(this).siblings("span").eq(1).attr("data","false");
                $(this).addClass("border_red");
            }else{
                $(this).siblings("span").eq(1).hide();
                $(this).siblings(".chose_color").show();
                $(this).siblings("span").eq(1).attr("data","true");
                $(this).removeClass("border_red");
            }
        });
    }

    function clickInput($input){
        $input.focus(function(){
            $(this).siblings("span").eq(0).show();
            $(this).addClass("border_green");
            $(this).siblings("span").eq(1).hide();
        })
        $input.blur(function(){
            $(this).siblings("span").eq(0).hide();
            $(this).removeClass("border_green");
            var text = $(this).siblings("span").eq(1).attr("data");
            if(text === "false"){
                $(this).siblings("span").eq(1).show();
            }
        })
    }

    input3.on("input",function(){
        var text = $(this).val();
        $(this).siblings("span").eq(0).hide();
        if(text !== input2.val()){
            $(this).siblings("span").eq(1).attr("data","false");
            $(this).siblings("span").eq(1).show();
            $(this).siblings(".chose_color").hide();
            $(this).addClass("border_red");
        }else{
            $(this).siblings("span").eq(1).attr("data","true");
            $(this).siblings("span").eq(1).hide();
            $(this).siblings(".chose_color").show();
            $(this).removeClass("border_red");
        }
    });

    input6.on("input",function(){
        var text = $(this).siblings("span").eq(1).attr("data");
        var index = $(this).parent("li").index();
        $(this).siblings("span").eq(0).hide();
        if($(this).val().length > 0){
            $(this).siblings("span").eq(1).attr("data","true");
            $(this).siblings("span").eq(1).hide();
            $(this).siblings(".chose_color").show();
            $(this).removeClass("border_red");
        }else{
            $(this).siblings("span").eq(1).attr("data","false");
            $(this).siblings("span").eq(1).show();
            $(this).siblings(".chose_color").hide();
            $(this).addClass("border_red");
        }
    });

    input7.on("input",function(){
        com.firmNumber($(this).val(),$(this).siblings("span").eq(1),"请填写公司座机");
        var text = $(this).siblings("span").eq(1).attr("available");
        var index = $(this).parent("li").index();
        $(this).siblings("span").eq(0).hide();

        if(text === "false"){
            $(this).siblings("span").eq(1).attr("data","false");
            $(this).siblings("span").eq(1).show();
            $(this).siblings(".chose_color").hide();
            $(this).addClass("border_red");
        }else{
            $(this).siblings("span").eq(1).attr("data","true");
            $(this).siblings("span").eq(1).hide();
            $(this).siblings(".chose_color").show();
            $(this).removeClass("border_red");
        }
    });

    // bank_Card(input9,"请填写开户银行");
    bank_Card(input10,"请填写对公银行账号");
    function bank_Card($input,text){
        $input.on("input",function(){
            com.bankCard($(this).val(),$(this).siblings("span").eq(1),text);
            var text = $(this).siblings("span").eq(1).attr("available");
            var index = $(this).parent("li").index();
            $(this).siblings("span").eq(0).hide();

            if(text === "false"){
                $(this).siblings("span").eq(1).attr("data","false");
                $(this).siblings("span").eq(1).show();
                $(this).siblings(".chose_color").hide();
                $(this).addClass("border_red");
            }else{
                $(this).siblings("span").eq(1).attr("data","true");
                $(this).siblings("span").eq(1).hide();
                $(this).siblings(".chose_color").show();
                $(this).removeClass("border_red");
            }
        });
    }

    input13.on("input",function(){
        com.Phone_Number($(this).val(),$(".numberError"),"格式不正确");
        var text = $(this).siblings("span").eq(1).attr("available");
        var index = $(this).parent("li").index();
        $(this).siblings("span").eq(0).hide();

        if(text === "false"){
            $(this).siblings("span").eq(1).attr("data","false");
            $(this).siblings("span").eq(1).show();
            $(this).siblings(".chose_color").hide();
            $(this).addClass("border_red");
        }else{
            $(this).siblings("span").eq(1).attr("data","true");
            $(this).siblings("span").eq(1).hide();
            $(this).siblings(".chose_color").show();
            $(this).removeClass("border_red");
        }
    });

    input15.on('input',function(){
        $(this).siblings("span").eq(0).hide();
        var text = $(this).val();
        if(text == yzm){
            $(this).siblings("span").eq(1).attr("data","true");
            $(this).siblings("span").eq(1).hide();
        }else{
            $(this).siblings("span").eq(1).attr("data","false");
            $(this).siblings("span").eq(1).show();
        }
    });

    $("#agreementInput").click(function(){
        var text = $(this).is(':checked');
        if(text === true){
            $(this).attr("data","true");
            $(this).siblings("span").eq(1).hide();
        }else{
            $(this).attr("data","false");
            $(this).siblings("span").eq(1).show();
        }
    });

    input1.blur(function(){
        var text = $(this).siblings("span").eq(1).attr("data");
        if(text === "true"){
            var url  = userLoginUrl+orderServiceUrl.check_name;
            var data = {
                username : $('#username').val(),
            };
            var success_callback = function(obj){
                if(obj.data === 1){
                    $(".login_main_content ul li").eq(0).find("span").eq(1).show();
                    $(".login_main_content ul li").eq(0).find("span").eq(1).attr("data","false");
                    $(".login_main_content ul li").eq(0).siblings(".chose_color").hide();
                    $(".login_main_content ul li").eq(0).find("span").eq(1).text("用户名已注册");
                }else{
                    $(".login_main_content ul li").eq(0).siblings("span").eq(1).attr("data","true");
                    $(".login_main_content ul li").eq(0).find("span").eq(1).hide();
                    $(".login_main_content ul li").eq(0).siblings(".chose_color").show();
                    $(".login_main_content ul li").eq(0).find("span").eq(1).text("格式不正确");
                }
            };

            com.executeAjax(url, data, "POST", success_callback);
        }
    })

    input13.blur(function(){
        var text = $(this).siblings("span").eq(1).attr("data");
        if(text === "true"){
            var url  = userLoginUrl+orderServiceUrl.check_mobile;
            var data = {
                mobile: $('#phoneNumber').val(),
            };
            var success_callback = function(obj){
                if(obj.data === 1){
                    $(".numberError").attr("data","false");
                    $(".numberError").show();
                    $(".numberError").siblings(".chose_color").hide();
                    $(".numberError").text("手机号码已注册");
                }else{
                    $(".numberError").siblings("span").eq(1).attr("data","true");
                    $(".numberError").siblings("span").eq(1).hide();
                    $(".numberError").siblings(".chose_color").show();
                    $(".numberError").text("格式不正确");
                }
            };

            com.executeAjax(url, data, "POST", success_callback);
        }
    });

    $("#showSample").click(function () {
        $(".show_sample").toggle();
    });

    $("#now_login1").click(function(){
        var text = $("#rzUpDate ul li");
        var text2 = $("#upDateImg .upload .upload_file");
        //var text3 = $("#upDateProvince .province select");
        var isTrue = [];
        for(var i=0; i<text.length; i++){
            var a = text.eq(i).find("span").eq(1).attr("data");
            isTrue.push(a);
        }
        for(var i=0; i<text2.length; i++){
            var b = text2.eq(i).attr("data");
            isTrue.push(b);
        }
        //for(var i=0; i<text3.length; i++){
        //    var d = text3.eq(i).attr("data");
        //    isTrue.push(d);
        //}
        //var c = $("#agreementInput").attr("data");
        //isTrue.push(c);

        consoleLog(isTrue);
        if(isTrue.indexOf("false") == -1){
            var url  = userInfoUrl+orderServiceUrl.edit_identif;
            var data = {
                company_name : $('#firmName').val(),
                office_num : $('#firmNumber').val(),
                province : $('#s_province').val(),
                city : $('#s_city').val(),
                county : $('#s_county').val(),
                province_name :$('#s_province').find('option:selected').text(),
                city_name : $('#s_city').find('option:selected').text(),
                county_name : $('#s_county').find('option:selected').text(),
                addr : $('#addr').val(),
                bossname : $('#bossname').val(),
                bankname : $('#bankCard1').val(),
                bankcode : $('#bankCard2').val(),
                yyzz    : $('#image_wrap1 img').attr("src"),
                swdjz   : $('#image_wrap2 img').attr("src"),
                sfz     : $('#image_wrap3 img').attr("src"),
                zzjgdmz : $('#image_wrap4 img').attr("src")

            }
            var success_callback = function(obj){
                location.reload();
            };
            com.executeAjax(url, data, "POST", success_callback);
        }
    });

    var yzm  = 123456;			//验证码值
    var wait = 100;				//倒计时时间
    var yzmInput = $("#hqyzm");	//input对象

    var a1 = $(".login_main_content ul li").eq(13).find("span").eq(1).attr("data");
    var a2 = $(".login_main_content ul li").eq(14).find("span").eq(1).attr("data");
    if(a1 === "false" || a2 === "false"){
        $("#hqyzm").css("color","#d0d0d0");
    }

    // var pwdString = 0;
    // var url  = "/newapi/user_login.php?act=my";
    // var data = {
    //     code : 'my'
    // };
    // var success_callback = function(obj){
    //     pwdString = obj;
    //     pwdString = JSON.stringify(pwdString);
    //     pwdString = pwdString.replace('"','');
    //     pwdString = pwdString.replace('"','')
    // };
    // com.executeAjax(url, data, "POST", success_callback);

    yzmInput.click(function(){

        var b1 = $(".login_main_content ul li").eq(13).find("span").eq(1).attr("data");
        var b2 = $(".yzmError").attr("data");
        if(b1 === "false" || b2 === "false"){
            return false;
        }else{

            var data = {
                captcha: $('#inputCode').val(),
                mobile: $('#phoneNumber').val(),
                cc: "e10"+ pwdString +"*@^",
            };
            var success_callback = function(obj){
                yzm = obj;
            };
            time(this);
            com.executeAjax(getMobilecodeUrl, data, "POST", success_callback);
        }
    });

    function time(o) {
        if (wait == 0) {
            o.removeAttribute("disabled");
            o.value="获取验证码";
            wait = 60;
        } else {
            o.setAttribute("disabled", true);
            o.value = wait + "后重新获取";
            wait--;
            setTimeout(function() {
                time(o)
            },1000)
        }
    }

    //上传图片
    var success_callback = function () {
        var imgWidth = $(".images");
        imgWidth.css("margin-left","-"+ imgWidth.outerWidth()/2 +"px");
    }
    com.updateImages("#file1", "#image_wrap1", success_callback);
    com.updateImages("#file2", "#image_wrap2", success_callback);
    com.updateImages("#file3", "#image_wrap3", success_callback);
    com.updateImages("#file4", "#image_wrap4", success_callback);

    $(".clear_img").click(function(){
        $(this).siblings(".upload_bg").html('<p>添加图片</p>').removeAttr("style");
        $(this).hide();
        $(this).siblings("input").attr("data","false");
        $(this).parent().siblings("p").eq(1).show();
    });

    var province = $(".province select");
    province.on("change",function(){
        for(var i=0; i<province.length; i++){
            var d = province.eq(i).val();
            if(province.eq(0).val() === "省份"){
                province.eq(0).attr("data", "false");
            }else{
                province.eq(0).attr("data", "true");
            }

            if(province.eq(1).val() === "地级市"){
                province.eq(1).attr("data", "false");
            }else{
                province.eq(1).attr("data", "true");
            }

            if(province.eq(2).val() === "市、县级市"){
                province.eq(2).attr("data", "false");
            }else{
                province.eq(2).attr("data", "true");
            }
        }
    });

    //省份、城市、市区
    com.executeAjax(regionUrl + orderServiceUrl.region_get, "", "GET", function (result) {
        var vm1 = new Vue({
            el: '#Province',
            data: {options : result.data}
        });

        //初始化
        City_fun(result.data[0].region_id, true);

        var province = $("#Province select");
        province.on("change",function(){
            var ProId = $(this).val();
            City_fun(ProId,true);
        });
        var City = $("#City select");
        City.on("change",function(){
            var ProId = $(this).val();
            Area_fun(ProId);
        });
    });
    var vm2 = new Vue({
        el: '#City',
        data: {options: []}
    });
    function City_fun(ProId, isShow) {
        com.executeAjax(regionUrl + orderServiceUrl.region_get, {pid: ProId}, "GET", function (result) {

            vm2.options.splice(result.data.length);
            vm2.options = result.data;
            if(isShow){
                Area_fun(result.data[0].region_id);
            }
        });
    }
    var vm3 = new Vue({
        el: '#Area',
        data: {options: []}
    });
    function Area_fun(ProId) {
        com.executeAjax(regionUrl + orderServiceUrl.region_get, {pid: ProId}, "GET", function (result) {

            vm3.options.splice(result.data.length);
            vm3.options = result.data;
            if(result.data == ''){
                $("#Area").css({"display":"none"})
            }else{
                $("#Area").css({"display":"block"})
            }
        });
    }

    //推荐人
    /*com.executeAjax(userLoginUrl + orderServiceUrl.tuijian_list, {name:'tjr'}, "GET", function (result) {
        var vm4 = new Vue({
            el: '#tuijian',
            data: {options: {tuijians:[]}}
        });
        vm4.options.tuijians.splice(result.data.tuijians.length);
        vm4.options.tuijians = result.data.tuijians;
        consoleLog('========='+JSON.stringify(result.data.tuijians));
    });*/

    $("#agreement").click(function () {
        var content = '<div class="f_c_666 fs_14px" style="height: 240px"></div>';
        var object = {
            getid        : $("#basic_data_mask"),
            text_title   : "修改手机号码",
            text_content : content,
            text_input1  : '下一步'
        }
        com.mask(object);
    });


    /****** 验证码 ******/
    /*var inp  = document.getElementById('inputCode');
    var code = document.getElementById('code');

    var c = new KinerCode({
        len: 4,//需要产生的验证码长度
//        chars: ["1+2","3+15","6*8","8/4","22-15"],//问题模式:指定产生验证码的词典，若不给或数组长度为0则试用默认字典
        chars: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 0,
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
        ],//经典模式:指定产生验证码的词典，若不给或数组长度为0则试用默认字典
        question:false,//若给定词典为算数题，则此项必须选择true,程序将自动计算出结果进行校验【若选择此项，则可不配置len属性】,若选择经典模式，必须选择false
        copy: false,//是否允许复制产生的验证码
        bgColor:"",//背景颜色[与背景图任选其一设置]
//            bgImg:"bg.jpg",//若选择背景图片，则背景颜色失效
        randomBg : false,//若选true则采用随机背景颜色，此时设置的bgImg和bgColor将失效
        inputArea: inp,//输入验证码的input对象绑定【 HTMLInputElement 】
        codeArea: code,//验证码放置的区域【HTMLDivElement 】
        click2refresh:true,//是否点击验证码刷新验证码
        false2refresh:true,//在填错验证码后是否刷新验证码
        validateEven : "blur",//触发验证的方法名，如click，blur等
        validateFn : function(result,code){//验证回调函数
            var b1 = $(".numberError").attr("data");
            var b2 = $(".yzmError").attr("data");
            if(result){
                // consoleLog('验证成功');
                $("#hqyzm").css("color","#666");
                $(".yzmError").attr("data","true");
                $(".yzmError").hide();
            }else{
                if(this.opt.question){
                    //consoleLog('验证失败:'+code.answer);
                    // $(".yzmError").show();
                    // $(".yzmError").attr("data","false");
                }else{
                    //consoleLog('验证失败:'+code.strCode);
                    //consoleLog('验证失败:' + code.arrCode);
                    $("#hqyzm").css("color","#d0d0d0");
                    $(".yzmError").show();
                    $(".yzmError").attr("data","false");
                }
            }
        }
    });*/
});