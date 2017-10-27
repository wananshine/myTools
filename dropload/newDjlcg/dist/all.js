/**
 * Created by Gold on 16/9/7.
 */
$(function () {
    //分别加载页眉，页脚
    $("#titleTemp_main").load("lib/temp/page_title.html");
    $("#bottomTemp_main").load("lib/temp/page_bottom.html");

    //产品筛选列表
    $(".main_title ul li").mouseenter('mouseover',function(){
        $("#main_tab dl").hide();
        var $li = $(this).attr("href");
        $($li).show();
        $(this).find("img").addClass("tran_180deg");
    });
    $("#main_tab dl,.main_title,.blur").mouseleave(function(){
        $("#main_tab dl").hide();
        $(".main_title ul li").find("img").removeClass("tran_180deg");
    });
    $(".blur").mouseenter(function(){
        $("#main_tab dl").hide();
        $(".main_title ul li").find("img").removeClass("tran_180deg");
    });

    //判断滚动距离
    //function backTop(){
    //    $(document).scroll(function(){
    //        var top = $(document).scrollTop();
    //        if(top === 0){
    //            $(".BackTop").hide();
    //        }else{
    //            $(".BackTop").show();
    //        }
    //    });
    //}
    //    backTop();

    $("#Taggle_title li").click(function(){
        $("#Taggle_title li").removeClass("b_b_blue");
        $(this).addClass("b_b_blue");
    });

    //top浮动点击事件
    $(".brandBox li").click(function(){
        var list    = $(this).index();
        var divPos1 = $(".Detail_content1").offset().top;
        var divPos2 = $(".Detail_content2").offset().top;
        var divPos3 = $(".Detail_content3").offset().top;

        switch (list)
        {
            case 0:
                $('body,html').animate({scrollTop:divPos1-55},300);
                break;
            case 1:
                $('body,html').animate({scrollTop:divPos2-55},300);
                break;
            case 2:
                $('body,html').animate({scrollTop:divPos3-55},300);
                break;
            case 3:
                window.location.href = 'NewBrandZone.html';
                break;
        }
    });

    $(".title_input_main input").focus(function(){
        var text = $(this).val();
        if(text.length > 0){
            $(".search_result").show();
        }
    });

    $("#searchInput").click(function () {
        var searchText = $("#search").val();
        com.executeAjax(searchUrl+searchText, "", "GET", function (result) {
            location.href = 'product_list.html?keywords='+ searchText;
        });
    });
});

/* 品牌区首页 */
function CtrBrandZone() {
    var BrandId = getQueryString("id");
    var url = brandUrl+"id="+BrandId;

    var success_callback = function (result) {
        if(result.brand_gallery === ""){
            $(".brand_title_ad").hide();
            $(".brand_introduce").css("height","280px");
        }
        var app1 = new Vue({
            el   : "#BrandVue1",
            data : {list:result}
        });
        var app2 = new Vue({
            el   : "#BrandVue2",
            data : {list:result},
            methods:{
                toNext:function (id) {
                    window.open("NewBrandZone_Detail.html?id="+id+"&Detail="+BrandId);
                }
            }
        });

        $.each(result.content, function (i, result) {
            var name = result.goods_name.length;
            if(name > 30){
                result.goods_name = result.goods_name.substr(0,30)+"...";
            }
        });
        var app3 = new Vue({
            el   : "#BrandVue3",
            data : {list:result},
            methods:{
                toInfo:function (id) {
                    location.href = "product_list_info.html?infoId="+id;
                }
            }
        });

        //轮播图
        var mySwiper1 = new Swiper('.swiper-container',{
            speed: 300,
            autoplay : 3000,
            grabCursor: true,
            paginationClickable: true
        });
        $('.arrow-left').on('click', function(e){
            e.preventDefault();
            mySwiper1.swipePrev();
        });
        $('.arrow-right').on('click', function(e){
            e.preventDefault();
            mySwiper1.swipeNext();
        });

        // js 奇数偶数显示不同颜色
        var trs = document.getElementsByClassName("main_list_but");
        for(var i=0; i<trs.length; i++){
            if(i%2===0){
                trs[i].className = "main_list_but bg_blue";
            }else{
                trs[i].className = "main_list_but bg_red";
            }
        }

        // IE9及其以下都不支持 :even :odd
        // 奇数偶数显示不同颜色
        // $(".main_list_but:even").addClass("bg_blue");
        // $(".main_list_but:odd").addClass("bg_red");

        //产品列表样式
        $(".main_list").mouseenter(function(){
            $(this).addClass("box_s");
        });
        $(".main_list").mouseleave(function(){
            $(".main_list").removeClass("box_s");
        });

        //左边菜单的查看更多和返回头部样式
        var $fixedList = $(".fixed_move");
        $fixedList.mouseenter(function(){
            $(this).addClass("bg_blue").css("color","#FFF");
            $(this).find(".move_img2").show();
            $(this).find(".not_move_img2").hide();
        });
        $fixedList.mouseleave(function(){
            $fixedList.removeClass("bg_blue").css("color","#333");
            $(".move_img2").hide();
            $(".not_move_img2").show();
        });

        $(".BackTop").click(function(){
            com.backTop();
        });
    };
    com.executeAjax(url, "", "POST", success_callback);

    var url2 = brandUrl+"act=brand&num=10";
    var success_callback2 = function (result) {
        var app4 = new Vue({
            el   : "#BrandVue4",
            data : {list:result},
            methods:{
                refresh:function (id) {
                    location.href = "NewBrandZone.html?id="+id;
                }
            }
        });

        //左边悬浮的菜单
        $(".brand_fixed_list").mouseenter(function(){
            $(this).children(".brand_fixed_move").show();
        });
        $(".brand_fixed_move").mouseleave(function(){
            $(".brand_fixed_move").hide();
        });

        //左边菜单不固定高度居中
        var height = $(".brand_fixed").outerHeight();
        $(".brand_fixed").css("margin-top","-"+height / 2 +"px");
    };
    com.executeAjax(url2, "", "POST", success_callback2);
}

/* 品牌区详情页 */
function CtrBrandZone2() {
    /* 根据点的哪个页面滚动到相应的位置 */
    var divPos2 = $(".Detail_content2").offset().top;
    var divPos3 = $(".Detail_content3").offset().top;
    var infoId = getQueryString("id");
    var DetailId = getQueryString("Detail");

    switch (infoId)
    {
        case "2":
            $('body,html').animate({scrollTop:divPos2-20},300);
            $("#Taggle_title li").removeClass("b_b_blue");
            $("#Taggle_title li").eq(1).addClass("b_b_blue");
            break;
        case "3":
            $('body,html').animate({scrollTop:divPos3-10},300);
            $("#Taggle_title li").removeClass("b_b_blue");
            $("#Taggle_title li").eq(2).addClass("b_b_blue");
            break;
    }

    var url = brandUrl+"id="+DetailId;

    var success_callback = function (result) {
        var app1 = new Vue({
            el   : "#BrandDetail1",
            data : {list:result}
        });
        var app2 = new Vue({
            el   : "#BrandDetail2",
            data : {list:result}
        });
        var app3 = new Vue({
            el   : "#BrandDetail3",
            data : {list:result}
        });
        var app4 = new Vue({
            el   : "#BrandDetail4",
            data : {list:result},
            methods:{
                toMore:function (id) {
                    location.href = "NewBrandZone_More.html?id="+id+"&Detail="+DetailId;
                }
            }
        });
    };
    com.executeAjax(url, "", "POST", success_callback);
}

/* 品牌区更多页 */
function CtrBrandZone3() {
    var infoId = getQueryString("id");
    var DetailId = getQueryString("Detail");
    var url = brandUrl+"act=cases&cases_id="+infoId+"&id="+DetailId;

    var success_callback = function (result) {
        result.content = com.htmldecode(result.content);
        $("#content").html(result.content);
        var app1 = new Vue({
            el   : "#BrandMore1",
            data : {list:result}
        });
        var app2 = new Vue({
            el   : "#BrandMore2",
            data : {list:result}
        });
    };
    com.executeAjax(url, "", "POST", success_callback);
}

/* 品牌区首页 */
function BrandZone_main() {
    var url = brandUrl+"act=brand";
    var success_callback2 = function (result) {
        var app = new Vue({
            el   : "#BrandZoneMore",
            data : {list:result.brand},
            methods:{
                refresh:function (id) {
                    window.open("NewBrandZone.html?id="+id);
                }
            }
        });

        $(".BrandZone_More li").mouseenter(function () {
            $(this).find("img").hide();
            $(this).find("a").removeClass("hide");
        });
        $(".BrandZone_More li").mouseleave(function () {
            $(this).find("img").show();
            $(this).find("a").addClass("hide");
        });
    };
    com.executeAjax(url, "", "POST", success_callback2);
}

/**
 * Created by Administrator on 2016/12/7 0007.
 */

com.executeAjax(helpCenterUrl+orderServiceUrl.get_aboutme,'', "GET", function (result) {
    var items = new Vue({
        el: '#about_list',
        data: {get_aboutme : result.data}
    });

    var url = helpCenterUrl+orderServiceUrl.get_aboutme+"&id="+2;
    com.executeAjax(url, "", "GET", function (result) {
        $.each(result.data,function(i,obj){
            var $html = '<li class="Nhide">'+ obj.content +'</li>';
            $("#list_content").append($html);
        });
        var oBtn = $("#about_list a");
        oBtn.click(function(){
            oBtn.removeClass("active");
            $(this).addClass("active");
            var index = $(this).index();
            $("#list_content li").addClass("Nhide");
            $("#list_content li").eq(index).removeClass("Nhide");
        });
        var TabId = getQueryString("infoid");
        oBtn.eq(TabId-1).addClass("active");
        $("#list_content li").eq(TabId-1).removeClass("Nhide");
    });
});
/**
 * Created by Gold on 2016/11/8.
 */
$(function () {
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
    com.number("bankCard1");
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
    inputText(input12,2);

    inputText($("#addr2"),2);
    inputText($("#firmNumber2"),2);

    clickInput($("#addr2"));
    clickInput($("#firmNumber2"));

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
        });
        $input.blur(function(){
            $(this).siblings("span").eq(0).hide();
            $(this).removeClass("border_green");
            var text = $(this).siblings("span").eq(1).attr("data");
            if(text === "false"){
                $(this).siblings("span").eq(1).show();
            }
        });
    }


    $(".now_save").click(function () {
        var addr2 = $("#addr2").val();
        var firmNumber2 = $("#firmNumber2").val();
        if(addr2 !== "" && firmNumber2 !== ""){

        }
    });

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

    bank_Card(input9,"请填写开户银行");
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
                if(obj === 1){
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
    });

    input13.blur(function(){
        var text = $(this).siblings("span").eq(1).attr("data");
        if(text === "true"){
            var url  = userLoginUrl+orderServiceUrl.check_mobile;
            var data = {
                mobile: $('#phoneNumber').val(),
            };
            var success_callback = function(obj){
                if(obj === 1){
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

    $(".now_login").click(function(){
        var text = $(".login_main_content ul li");
        var text2 = $(".upload .upload_file");
        var text3 = $(".province select");
        var isTrue = [];
        for(var i=0; i<text.length; i++){
            var a = $(".login_main_content ul li").eq(i).find("span").eq(1).attr("data");
            isTrue.push(a);
        }
        for(var b=0; b<text2.length; b++){
            var b = $(".upload .upload_file").eq(b).attr("data");
            isTrue.push(b);
        }
        for(var c=0; c<text3.length; c++){
            var d = $(".province select").eq(c).attr("data");
            isTrue.push(d);
        }
        var d = $("#agreementInput").attr("data");
        isTrue.push(d);

        if(isTrue.indexOf("false") == -1){
            var url  = userLoginUrl+orderServiceUrl.company_register;
            var data = {

                username : $('#username').val(),
                psw : $('#pwd1').val(),
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
                realname : $('#real_name').val(),
                mobile : $('#phoneNumber').val(),
                tuijian : $('#tuijian').val(),
                yyzz    : $('#image_wrap1 img').attr("src"),
                swdjz   : $('#image_wrap2 img').attr("src"),
                sfz     : $('#image_wrap3 img').attr("src"),
                zzjgdmz : $('#image_wrap4 img').attr("src")

            };
            var success_callback = function(obj){

            };
            var error_callback = function(){

            };
            com.executeAjax(url, data, "POST", success_callback, error_callback);
        };
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
        if (wait === 0) {
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
        };
    };

    $(".certificates").click(function(){
        $(".certificates").removeClass("f_c_333 border_green").addClass("f_c_999");
        $(this).removeClass("f_c_999").addClass("f_c_333 border_green");
        $(".certificates img").hide();
        $(this).find("img").show();
        $(".certificates").attr("data","false");
        $(this).attr("data","true");
    });

    //上传图片
    var success_callback = function () {

    };
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


    /****** 验证码 ******/

    var inp = document.getElementById('inputCode');
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
            var City = $("#City select");
            City.on("change",function(){
                var ProId = $(this).val();
                Area_fun(ProId);
            });

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
        });
    }

    //推荐人
    com.executeAjax(userLoginUrl + orderServiceUrl.tuijian_list, {name:'tjr'}, "GET", function (result) {
        var vm4 = new Vue({
            el: '#tuijian',
            data: {options: {tuijians:[]}}
        });
        vm4.options.tuijians.splice(result.data.tuijians.length);
        vm4.options.tuijians = result.data.tuijians;
        consoleLog('========='+JSON.stringify(result.data.tuijians));
    });

    $("#agreement").click(function () {
        var content = '<div class="f_c_666 fs_14px" style="height: 240px"></div>';
        var object = {
            getid        : $("#basic_data_mask"),
            text_title   : "修改手机号码",
            text_content : content,
            text_input1  : '下一步'
        };
        com.mask(object);
    });
});
/**
 * Created by Gold on 2016/11/8.
 */
$(function () {
    $("#update_phone_number").click(function () {
        var content = '<div class="f_c_666 fs_14px" style="height: 240px">' +
            '<p class="blue center">已验证手机：159****1759</p>' +
                '<ul class="basic_input">' +
                    '<li id="basic_yzm">' +
                        '<span class="fs_14px basic_text1 fl">手机验证码</span>' +
                        '<input class="input fl" style="width: 170px" placeholder="请填写手机验证码" type="text">' +
                        '<input class="time f_c_666 curP" id="hqyzm_basic" value="获取验证码">'+
                    '</li>' +
                '</ul>' +
            '</div>';
        var object = {
            getid        : $("#basic_data_mask"),
            text_title   : "修改手机号码",
            text_content : content,
            text_input1  : '下一步'
        };
        com.mask(object);
        $(".mask_confirm").removeClass("bg_line_gray").addClass("bg_line_red2 white").css("margin-left","50px");
        $(".mask_cancel").hide();
        $("#hqyzm_basic").click(function () {
            time(this);
        });
        $(".mask_confirm").click(function () {
            var content2 = '<div class="f_c_666 fs_14px" style="height: 240px">' +
                '<ul class="basic_input" style="margin-left: 55px;">' +
                '<li style="margin-top: 0px">' +
                    '<span class="fs_14px basic_text3 fl">手机号：</span>' +
                    '<input class="input fl" maxlength="11"  style="width: 170px" placeholder="请填写新的手机号码"><br/>' +
                    '<p class="fs_12px basic_text4 red Nhide" data="false" available="false">请填写正确的手机号</p>' +
                '</li>'+
                '<li>' +
                    '<span class="fs_14px basic_text3 fl">手机验证码：</span>' +
                    '<input class="input fl" style="width: 170px" placeholder="请填写手机验证码" type="text">' +
                    '<input class="time f_c_666 curP" id="hqyzm_basic" value="获取验证码">'+
                    '<p class="fs_12px basic_text4 red Nhide" data="false" available="false">请填写正确的手机验证码</p>' +
                '</li>' +
                '<li>' +
                    '<span class="fs_14px basic_text3 fl">验证码：</span>' +
                    '<input class="input fl" maxlength="4" id="inputCode" style="width: 170px" placeholder="请填写验证码" type="text"><i id="code" class="mycode"></i>' +
                    '<p class="fs_12px basic_text4 red yzmError Nhide" data="false" available="false">请填写正确的验证码</p>' +
                '</li>' +
                '</ul>' +
                '</div>';
            var object2 = {
                getid        : $("#basic_data_mask"),
                text_title   : "修改手机号码",
                text_content : content2,
                text_input1  : '提交'
            };
            com.mask(object2);
            $(".mask_confirm").removeClass("bg_line_gray").addClass("bg_line_red2 white");
            yzm();
            $(".mask_confirm").click(function () {
                var content3 = '<div class="f_c_666 fs_14px" style="height: 240px">' +
                    '<div>' +
                        '<img class="basic_icon_success" src="img/icon_submit_ok.png" />'+
                        '<p class="fs_18px f_c_666 center">你的手机号 186****2437 修改成功</p>' +
                    '</div>' +
                    '</div>';
                var object3 = {
                    getid        : $("#basic_data_mask"),
                    text_title   : "修改手机号码",
                    text_content : content3,
                    text_input1  : '确认'
                };
                com.mask(object3);
                $(".mask_confirm").removeClass("bg_line_gray").addClass("bg_line_red2 white");
                $(".mask_confirm").click(function () {
                    $("#basic_data_mask").hide();
                });
            });
        });
    });

    //获取验证码
    var wait = 100;  //倒计时时间
    function time(o) {
        if (wait === 0) {
            o.removeAttribute("disabled");
            o.value="获取验证码";
            wait = 60;
        } else {
            o.setAttribute("disabled", true);
            o.value = wait + "后重新获取";
            wait--;
            setTimeout(function() {
                time(o);
            },1000);
        }
    }

    var imgWidth = $("#image_wrap").outerWidth();
    var imgHeight = $("#image_wrap").outerHeight();

    $("#updateImg").click(function () {
        $("#image").click();
    });

    var success_callback = function () {
        var thisImgWidth = $("#image_wrap img").outerWidth();
        var thisImgHeight = $("#image_wrap img").outerHeight();
        if(thisImgWidth < imgWidth){
            $("#image_wrap img").css("max-height","none");
        }else{
            $("#image_wrap img").css("max-height","100%");
        }
        if(thisImgHeight < imgHeight){
            $("#image_wrap img").css("max-width","none");
        }else{
            $("#image_wrap img").css("max-width","100%");
        }
    };

    //上传图片
    com.updateImages("#image","#image_wrap", success_callback);

    var input1 = $(".basic_input li").eq(0).children("input");
    var input3 = $(".basic_input li").eq(2).children("input");

    clickInput(input1);
    clickInput(input3);
    inputText(input1,4);
    inputText(input3,2);

    //省市区
    var data = {
        Province : "#Province",
        City  : "#City",
        Area  : "#Area",
        isShow: false
    };
    com.provinceCityArea(data);

    //失去光标提示文字
    function clickInput($input){
        $input.focus(function(){
            $(this).siblings("p").eq(0).show();
            $(this).siblings("p").eq(1).hide();
        });
        $input.blur(function(){
            $(this).siblings("p").eq(0).hide();
            var text = $(this).siblings("p").eq(1).attr("data");
            if(text === "false"){
                $(this).siblings("p").eq(1).show();
            }
        });
    }

    //限制输入的字符长度
    function inputText($class,number){
        $class.on("input",function(){
            $(this).siblings("p").eq(0).hide();
            var text = $(this).val();
            if(text.length < number || text.length > 20){
                $(this).siblings("p").eq(1).show();
                $(this).siblings("p").eq(1).attr("data","false");
            }else{
                $(this).siblings("p").eq(1).hide();
                $(this).siblings("p").eq(1).attr("data","true");
            }
        });
    }

    /****** 验证码 ******/
    function yzm(){
        var inp = document.getElementById('inputCode');
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
                if(result){
                    $(".yzmError").attr("data","true");
                    $(".yzmError").hide();
                    var b1 = $(".login_main_content ul li").eq(4).find("span").eq(1).attr("data");
                    var b2 = $(".yzmError").attr("data");
                    // if(b1 === "true" && b2 === "true"){
                    //     $("#hqyzm").css("color","#666");
                    // }else{
                    //     $("#hqyzm").css("color","#d0d0d0");
                    // }
                }else{

                    if(this.opt.question){
                        $(".yzmError").show();
                        $(".yzmError").attr("data","false");
                    }else{
                        $(".yzmError").show();
                        $(".yzmError").attr("data","false");
                    }
                }
            }
        });
    }
});
/**
 * Created by Gold on 2016/11/29.
 */
$(function () {
    //分别加载页眉，头部，页脚，侧边栏
    $("#titleTemp_main").load("lib/temp/page_title.html");
    $("#titleTemp2_main").load("lib/temp/page_title2.html");
    $("#bottomTemp_main").load("lib/temp/page_bottom.html");
    $("#sidebarTemp_main").load("lib/temp/page_sidebar.html");
    com.isTitleMenuShow(false);
    // var Width = $("body").outerWidth();
    // $(".img_banner").css("min-width", 1190+"px");
    com.executeAjax(topicUrl+orderServiceUrl.brand, "", "POST", function (result) {
        var app1 = new Vue({
            el   : "#floor",
            data : {list:result.brand},
            methods:{
                toList:function (id) {
                    location.href = "double12_f.html?id="+id;
                }
            }
        });
    });
});

function double12() {
    com.executeAjax(topicUrl+orderServiceUrl.goods+"&amount=1", "", "POST", function (result) {
        limitText(result);
        var app2 = new Vue({
            el   : "#double_list1",
            data : {list:result.goods.goods},
            methods:{
                toInfo:function (id) {
                    window.open("product_list_info.html?infoId="+id);
                }
            }
        });
    });
    com.executeAjax(topicUrl+orderServiceUrl.goods, "", "POST", function (result) {
        limitText(result);
        var app3 = new Vue({
            el   : "#double_list2",
            data : {list:result.goods.goods},
            methods:{
                toInfo:function (id) {
                    window.open("product_list_info.html?infoId="+id);
                }
            }
        });
    });
}

function double12_f() {
    var getId = getQueryString("id");
    com.executeAjax(topicUrl+orderServiceUrl.goods+"&id="+getId, "", "POST", function (result) {
        limitText(result);
        var app4 = new Vue({
            el   : "#double_list3",
            data : {list:result.goods},
            methods:{
                toInfo:function (id) {
                    window.open("product_list_info.html?infoId="+id);
                }
            }
        });
    });
}

function limitText(result) {
    $.each(result.goods.goods, function (i, obj) {
        var name = obj.act_name.length;
        if(name > 30){
            obj.act_name = obj.act_name.substr(0,30)+"...";
        }
    });
}
/**
 * Created by Gold on 2016/11/15.
 */

/* 确认账号 */
$(function () {
    var phoneNumber = $("#phoneNumber");
    var phoneCode   = $("#phoneCode");
    var password1   = $("#password1");
    var password2   = $("#password2");

    clickInput(phoneNumber);
    clickInput(phoneCode);
    clickInput(password1);
    clickInput(password2);

    /* 验证码 */
    var imgData = {
        inputCode : 'phoneCode',
        code : 'code',
        yzmError : $(".yzmError"),
        getYzm   : $("#hqyzm")
    };
    com.imgCode(imgData);

    function clickInput($input){
        $input.focus(function(){
            $(this).siblings("span").eq(0).show();
            $(this).addClass("bk2");
            $(this).siblings("span").eq(1).hide();
            $(this).siblings("span").eq(2).hide();
        });
        $input.blur(function(){
            $(this).siblings("span").eq(0).hide();
            $(this).removeClass("bk2");
            var text = $(this).siblings("span").eq(1).attr("data");
            if(text === "false"){
                $(this).siblings("span").eq(1).show();
            }
        });
    }

    $("#phoneNumber").blur(function(){
            var url  = userLoginUrl+orderServiceUrl.check_name;
            var data = {
                username : $("#phoneNumber").val(),
            };
            var success_callback = function(obj){
                if(obj !== 1){
                    $("#phoneNumber").siblings(".numberError").hide();
                    $("#error").show();
                    $("#error").show();
                    $("#error").attr("data","false");
                }else{
                    $("#error").hide();
                    $("#error").attr("data","true");
                }
            };
            com.executeAjax(url, data, "POST", success_callback);
    });

    phoneNumber.on("input", function () {

        com.Phone_Number($(this).val(),$(".numberError"));
        var text = $(this).siblings("span").eq(1).attr("available");
        if(text == "true"){

            $(this).siblings("span").eq(1).attr("data","true");
            $(this).siblings("span").eq(0).show();
            $(this).siblings("span").eq(1).hide();
        }else{

            $(this).siblings("span").eq(1).attr("data","false");
            $(this).siblings("span").eq(0).hide();
            $(this).siblings("span").eq(1).show();
        }
    });

    var yzmInput = $("#getYzm");	//input对象
    var wait = 100;				    //倒计时时间
    $("#next").click(function () {
        var isTrue = [];
        var data1 = phoneNumber.siblings("span").eq(1).attr("data");
        var data2 = phoneCode.siblings("span").eq(1).attr("data");
        var data3 = $("#error").attr("data");
        isTrue.push(data1,data2,data3);
        if(isTrue.indexOf("false") == -1){
            $("#page1").addClass("Nhide");
            $("#page2").removeClass("Nhide");

            var username = $('#phoneNumber').val();
            var mobileCode;
            var data = {
                username : username
            };
            var success_callback = function (result) {
                var items1 = new Vue({
                    el: '#setNumber',
                    data: {list:result}
                });
                var mobile_phone = result.mobile_phone;
                var pwdString = result.my;
                if ( mobile_phone !== '') {
                    var data ={
                        mobile: $('#phoneNumber').val(),
                        cc: "e10"+ pwdString +"*@^",
                    };
                    com.executeAjax(getMobilecodeUrl, data, "POST", function (result) {
                        mobileCode = result;
                    });

                }
                time(yzmInput);

                /* 安全验证 */
                yzmInput.click(function(){
                    time(yzmInput);
                });

                $("#messageCode").on('input',function(){
                    $(this).siblings("span").eq(0).hide();
                    var text = $(this).val();
                    if(text == mobileCode){
                        $(this).siblings("span").eq(1).attr("data","true");
                        $(this).siblings("span").eq(1).hide();
                    }else{
                        $(this).siblings("span").eq(1).attr("data","false");
                        $(this).siblings("span").eq(1).show();
                    }
                });

                function time(o) {
                    if (wait === 0) {
                        o.attr("disabled");
                        o.val("获取验证码");
                        wait = 100;
                    } else {
                        o.attr("disabled", true);
                        o.val(wait + "后重新获取");
                        wait--;
                        setTimeout(function() {
                            time(o);
                        },1000);
                    }
                }
            };
            com.executeAjax(userLoginUrl + orderServiceUrl.forget_password,data,"POST", success_callback);

        }
    });

    $("#next2").click(function () {
        var isTrue = [];
        var data1 = $("#messageCode").siblings("span").eq(1).attr("data");
        isTrue.push(data1);
        if(isTrue.indexOf("false") == -1){
            $("#page2").addClass("Nhide");
            $("#page3").removeClass("Nhide");
        }
    });

    /* 密码重置 */
    password1.on("input", function () {
        var text = $(this).val();
        if(text.length < 6){
            $(this).siblings("span").eq(1).attr("data","false");
            $(this).siblings("span").eq(0).hide();
            $(this).siblings("span").eq(1).show();
            $(this).addClass("border_red");
        }else{
            $(this).siblings("span").eq(1).attr("data","true");
            $(this).siblings("span").eq(0).show();
            $(this).siblings("span").eq(1).hide();
            $(this).removeClass("border_red");
        }
        if(password2.val() !== ""){
            if(text === password2.val()){
                password2.siblings("span").eq(1).attr("data","true");
                password2.siblings("span").eq(0).hide();
                password2.siblings("span").eq(1).hide();
                password2.removeClass("border_red");
            }else{
                password2.siblings("span").eq(1).attr("data","false");
                password2.siblings("span").eq(0).hide();
                password2.siblings("span").eq(1).show();
                password2.addClass("border_red");
            }
        }
    });

    password2.on("input", function () {
        var text = $(this).val();
        if(text !== password1.val()){
            $(this).siblings("span").eq(1).attr("data","false");
            $(this).siblings("span").eq(0).hide();
            $(this).siblings("span").eq(1).show();
            $(this).addClass("border_red");
        }else{
            $(this).siblings("span").eq(1).attr("data","true");
            $(this).siblings("span").eq(0).hide();
            $(this).siblings("span").eq(1).hide();
            $(this).removeClass("border_red");
        }
    });

    $("#next3").click(function () {
        // $(this).addClass("icon_gif");
        // $(this).text("");
        var isTrue = [];
        var pwdError1= $(".pwdError1").attr("data");
        var pwdError2= $(".pwdError2").attr("data");
        isTrue.push(pwdError1,pwdError2);
        if(isTrue.indexOf("false") == -1){
            var user_id = $('#user_id').val();
            var new_pwd = $('#password2').val();

            if( new_pwd !== '' ){
                var data = {
                    uid : user_id,
                    new_password : $.md5(new_pwd)
                };
                var success_callback = function (result) {
                    $("#page3").addClass("Nhide");
                    $("#page4").removeClass("Nhide");
                };
                com.executeAjax(userLoginUrl+orderServiceUrl.reset_password, data, "POST", success_callback);
            }

        }
    });

});
/**
 * Created by Gold on 2016/10/19.
 */
$(function(){
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
        });
        $input.blur(function(){
            $(this).siblings("span").eq(0).hide();
            $(this).removeClass("border_green");
            var text = $(this).siblings("span").eq(1).attr("data");
            if(text === "false"){
                $(this).siblings("span").eq(1).show();
            }
        });
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

    //$("#selProvince").click(function(){
    //    var text = $(this).text();
    //    provinceChange(text)
    //});
	
    input1.blur(function(){		
		var text = $(this).siblings("span").eq(1).attr("data");
		if(text === "true"){			
			var url  = userLoginUrl+orderServiceUrl.check_name;		    			
			var data = {								
				username : $('#username').val(),               					    
			};			
			var success_callback = function(obj){
				if(obj === 1){
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
	});
	
	input13.blur(function(){
		var text = $(this).siblings("span").eq(1).attr("data");
		if(text === "true"){
			var url  = userLoginUrl+orderServiceUrl.check_mobile;		    
			var data = {								
				mobile: $('#phoneNumber').val(),               		
			};			
			var success_callback = function(obj){
				if(obj === 1){
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
	
    $(".now_login").click(function(){
        var text = $(".login_main_content ul li");
        var text2 = $(".upload .upload_file");
        var text3 = $(".province select");
        var isTrue = [];
        for(var i=0; i<text.length; i++){
            var a = $(".login_main_content ul li").eq(i).find("span").eq(1).attr("data");
            isTrue.push(a);
        }
        for(var a=0; a<text2.length; a++){
            var b = $(".upload .upload_file").eq(a).attr("data");
            isTrue.push(b);
        }
        for(var b=0; b<text3.length; b++){
            var d = $(".province select").eq(b).attr("data");
            isTrue.push(d);
        }
        var c = $("#agreementInput").attr("data");
        isTrue.push(c);

        consoleLog(isTrue);
        if(isTrue.indexOf("false") == -1){			
            var url  = userLoginUrl+orderServiceUrl.company_register;
			var data = {
				username : $('#username').val(),
				psw : $.md5($('#pwd1').val()),
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
				realname : $('#real_name').val(),
				mobile : $('#phoneNumber').val(),				
				tuijian : $('#tuijian').val(),
				yyzz    : $('#image_wrap1 img').attr("src"),
				swdjz   : $('#image_wrap2 img').attr("src"),
				sfz     : $('#image_wrap3 img').attr("src"),
				zzjgdmz : $('#image_wrap4 img').attr("src")
							    
			};
			var success_callback = function(obj){
				location.href = 'register_success.html';
			};
			var error_callback = function(){

			};
			com.executeAjax(url, data, "POST", success_callback, error_callback);
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
	
	var pwdString = 0;
    var url  = userLoginUrl+orderServiceUrl.my;
    var data = {
        code : 'my'
    };
    var success_callback = function(obj){
           pwdString = obj;
		   pwdString = JSON.stringify(pwdString);
           pwdString = pwdString.replace('"','');
		   pwdString = pwdString.replace('"','');
   };
    com.executeAjax(url, data, "POST", success_callback);
	
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
        if (wait === 0) {
            o.removeAttribute("disabled");
            o.value="获取验证码";
            wait = 60;
        } else {
            o.setAttribute("disabled", true);
            o.value = wait + "后重新获取";
            wait--;
            setTimeout(function() {
                time(o);
            },1000);
        }
    }

    $(".certificates").click(function(){
        $(".certificates").removeClass("f_c_333 border_green").addClass("f_c_999");
        $(this).removeClass("f_c_999").addClass("f_c_333 border_green");
        $(".certificates img").hide();
        $(this).find("img").show();
        $(".certificates").attr("data","false");
        $(this).attr("data","true");
        if($(this).index() == 2){
            $(".certificates_imgs dd").eq(1).hide().find(".upload_file").attr("data","true");
            $(".certificates_imgs dd").eq(2).attr("class","mar_l_20px");
            $(".certificates_imgs dd").eq(3).hide().find(".upload_file").attr("data","true");
            $(".cer_imgs_text2").hide();
        }else{
            $(".certificates_imgs dd").eq(1).show().find(".upload_file").attr("data","false");
            $(".certificates_imgs dd").eq(2).attr("class","mar_t_20px");
            $(".certificates_imgs dd").eq(3).show().find(".upload_file").attr("data","false");
            $(".cer_imgs_text2").show();
        }
    });

    //上传图片
    var success_callback2 = function () {

    };
    com.updateImages("#file1", "#image_wrap1", success_callback2);
    com.updateImages("#file2", "#image_wrap2", success_callback2);
    com.updateImages("#file3", "#image_wrap3", success_callback2);
    com.updateImages("#file4", "#image_wrap4", success_callback2);

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


    /****** 验证码 ******/

    var inp = document.getElementById('inputCode');
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
            if(result){
//                    consoleLog('验证成功');
                $(".yzmError").attr("data","true");
                $(".yzmError").hide();
                var b1 = $(".login_main_content ul li").eq(13).find("span").eq(1).attr("data");
                var b2 = $(".yzmError").attr("data");
                if(b1 === "true" && b2 === "true"){
                    $("#hqyzm").css("color","#666");
                }else{
                    $("#hqyzm").css("color","#d0d0d0");
                }
            }else{

                if(this.opt.question){
                    //consoleLog('验证失败:'+code.answer);
                    $(".yzmError").show();
                    $(".yzmError").attr("data","false");
                }else{
                    //consoleLog('验证失败:'+code.strCode);
                    //consoleLog('验证失败:' + code.arrCode);
                    $(".yzmError").show();
                    $(".yzmError").attr("data","false");
                }
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
            var City = $("#City select");
            City.on("change",function(){
                var ProId = $(this).val();
                Area_fun(ProId);
            });

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
        });
    }

    var isAgree = true;
    $("#agreement").click(function () {
        var content = "<div id='agree' style='height: 450px;overflow-y: scroll'></div><p class='agreeInput white bg_light_dd3e3e'>同意并继续</p>";
        var object = {
            getid        : $("#alert_mask"),
            text_title   : "提示",
            text_content : content
        };
        com.mask(object);
        $("#agree").load("/agreement/agreement_01.html");
        $(".mask_main").css({"width":"800px","padding":"60px 0px 30px 20px"});
        $(".mask_input").hide();

        $(".agreeInput").click(function () {
            $(".bg_mask,.mask_main").hide();
            if(isAgree){
                $("#agreementInput").click();
                isAgree = false;
            }
        });

        var DivHeight = $(".mask_main").outerHeight();
        var DivWidth = $(".mask_main").outerWidth();
        $(".mask_main").css({'margin': '-'+parseInt(DivHeight)/2 +'px ' + '-'+parseInt(DivWidth)/2 +'px'});
    });
});
/**
 * Created by Administrator on 2016/11/23 0023.
 */
//tab切换
function helpHeader2(name){
    if(name=='index'){
        $(".top_nav a").eq(0).addClass("active");
    }else if(name=='issues'){
        $(".top_nav a").eq(1).addClass("active");
    }else if(name=='contact'){
        $(".top_nav a").eq(2).addClass("active");
    }
}







/**
 * Created by Administrator on 2016/11/23 0023.
 */

com.executeAjax(helpCenterUrl+orderServiceUrl.list,'', "GET", function (result) {
    var items = new Vue({
        el: '#help_side_list',
        data: {list : result.data},
        methods:{
            toList:function(Id){
                var url = helpCenterUrl+orderServiceUrl.detail+"&id="+Id;
                com.executeAjax(url, "", "GET", function (result) {
                    $("#content").html(result.data.content);
                });
            }
        }
    });
});

//获取右边菜单div的高度
function obtainDivHeight(){
    var isTrue = true;
    var $div = $("#content_main,.content_main");
    $div.removeAttr("style");
    div1Hight = $(".right_menu").outerHeight(true);
    function DivHeight() {
        if(isTrue){
            div2Hight = $div.outerHeight(true);
            if(div1Hight > div2Hight){
                $div.css("height",div1Hight-1);
                isTrue = false;
            }else{
                $div.removeAttr("style");
                isTrue = false;
            }

            /* 判断浏览器版本号，适配 */
            var version = com.browserVersion();
            version = version.split(":");
            version = version[1];
            version = version.substr(0,3);
            if (version == 53){
                $(".unread_message").css("line-height","18px");
            }
            // clearInterval(DivHeight);
        }
    }
    // setInterval(DivHeight,10);
    for(var i=0; i<5; i++){
        setTimeout(DivHeight,0);
    }
}



//菜单栏切换
function helpSide(){
    var sideId = [];
    com.executeAjax(helpCenterUrl+orderServiceUrl.list,'', "GET", function (result) {
        $.each(result.data.one_article, function(i, obj){
            sideId.push(obj.article_id);
            var TabId = getQueryString("id");
            if(TabId){
                var infoId= getQueryString("infoid");
                var url = helpCenterUrl+orderServiceUrl.detail+"&id="+TabId;
                com.executeAjax(url, "", "GET", function (result) {
                    $("#content").html(result.data.content);
                    var items = new Vue({
                        el: '#content_main',
                        data: {list : result.data}
                    });
                });
                setTimeout(function(){
                    $('.right_menu ul li').removeClass('active');
                    $('.right_menu ul li').eq(infoId-1).addClass('active');
                },50);
            }else{
                var actId = sideId[0];
                var url = helpCenterUrl+orderServiceUrl.detail+"&id="+actId;
                com.executeAjax(url, "", "GET", function (result) {
                    $("#content").html(result.data.content);
                    var items = new Vue({
                        el: '#content_main',
                        data: {list : result.data}
                    });
                });
            }
            setTimeout(function(){
                obtainDivHeight();
            },100);
            $('.right_menu ul li').find('a').click(function(){
                $('.right_menu ul li').removeClass('active');
                $(this).parent('li').addClass('active');
                setTimeout(function(){
                    obtainDivHeight();
                },100);
            })
        });
    });
}







/**
 * Created by Gold on 2016/12/1.
 */
$(function () {
    //分别加载页眉，头部，页脚，侧边栏
    $("#titleTemp_main").load("lib/temp/page_title.html");
    $("#titleTemp2_main").load("lib/temp/page_title2.html");
    $("#bottomTemp_main").load("lib/temp/page_bottom.html");

    var queryInput = $(".Query");
    com.number("Query");

    var Query = $('#Query');
    var QueryInput = $(".query_input");

    Query.keydown(function(e){
        if(e.keyCode==13){
            QueryInput.click();
        }
    });

    QueryInput.click(function () {
        var text = Query.val();
        if(text === ""){
            $(".error1,#query_table").hide();
            $(".error2").show();
        }else{
            var success_callback = function(result){
                if(result.result !== null){
                    if(result.result.goodsTraceInfos !== ""){
                        $("#query_table").show();
                        $(".error1,.error2").hide();
                        var app = new Vue({
                            el   : "#query_table",
                            data : {list:result.result.goodsTraceInfos}
                        });
                        app.list.splice(result.result.goodsTraceInfos.length);
                        app.list = result.result.goodsTraceInfos;

                        var listLength = result.result.goodsTraceInfos.length-1;
                        $("#query_table tr").eq(listLength).addClass("orange");
                    }else{
                        $(".error1,#query_table").hide();
                        $(".error2").show();
                    }
                }else{
                    $(".error1,#query_table").hide();
                    $(".error2").show();
                }
            };
            com.executeAjax(logisticsUrl+text, "", "POST", success_callback);
        }
    });
});
/**
 * Created by Gold on 2016/10/14.
 */
$(function(){

    //分别加载页眉，头部，页脚，侧边栏
    $("#titleTemp_main").load("lib/temp/page_title.html");
    $("#titleTemp2_main").load("lib/temp/page_title2.html");
    $("#bottomTemp_main").load("lib/temp/page_bottom.html");
    $("#sidebarTemp_main").load("lib/temp/page_sidebar.html");

    var cookieUserName =  $.cookie("ECS[username]");
    if(cookieUserName){
        global.isLogin = true;
        $("#userName").text(cookieUserName);

        //订单首页未收货和付款数量
        /*com.executeAjax(orderUrl+orderServiceUrl.status_count, "", "GET", function (result) {
            new Vue({
                el: '#myOrderSumTemp',
                data: result.data,
                methods:{
                    statusFilter:function(statusName){
                        inited = false;
                        productList(0,statusName);
                        obtainDivHeight();
                    }
                }
            });
        });*/

        //会员认证接口
        var infoUrl = userInfoUrl+orderServiceUrl.user_info;
        var infoData = {
            info : 'identif'
        };
        com.executeAjax(infoUrl, infoData, "GET", function (result) {   //0 是未认证用户   1 是待审核    2是审核未通过    3是审核通过
            if(result.user_rank == "2"){
                global.isLoginRZ = true;
                $(".login_true_rz").show();
                $(".login_false_rz").hide();
                new Vue({
                    el: '#identif',
                    data: {list:result}
                });
            }
            //订单首页未收货和付款数量
            com.executeAjax(orderUrl+orderServiceUrl.status_count, "", "GET", function (result) {
                var msgUrl = userCenterUrl+orderServiceUrl.message_list;
                com.executeAjax(msgUrl, "", "GET", function (obj) {
                    result.data['sum'] = obj.data.length;
                    new Vue({
                        el: '#login_temp',
                        data: {list:result.data}
                    });
                });
            });

            $(".login_help").click(function(){
                $(".login_img_help").toggle();
            });
        });
    }

    //首页文章列表接口			
    $.ajax({
        url:"http://djlzix.com/index_article.php",
        dataType:'jsonp',
        data:'indexTop',
        jsonp:'callback',
        timeout:3000,
        success:function(result) {
            var articleT = new Vue({
                el: '#login_tab',
                data: {result : result}
            });
        }
    });

    $.ajax({
        url:"http://djlzix.com/index_article.php",
        dataType:'jsonp',
        data:'indexFoot',
        jsonp:'callback',
        timeout:3000,
        success:function(result) {
            consoleLog("index_article："+JSON.stringify(result));
            var article1 = new Vue({
                el: '#artL',
                data: {result : result}
            });
            var articleF2 = new Vue({
                el: '#artL2',
                data: {result : result}
            });
            var articleF3 = new Vue({
                el: '#artR',
                data: {result : result}
            });

            var mySwiper1 = new Swiper('.swiper-container2',{
                loop:true,
                speed: 500,
                autoplay : 5000,
                grabCursor: true,
                paginationClickable: true
            });
            $('.arrow-left2').on('click', function(e){
                e.preventDefault();
                mySwiper1.swipePrev();
            });
            $('.arrow-right2').on('click', function(e){
                e.preventDefault();
                mySwiper1.swipeNext();
            });
        }
    });


    //登陆公告切换
    $(".login_bulletin p").mouseenter(function(){
        $(".login_bulletin p").removeClass("border_b_red");
        $(this).addClass("border_b_red");

        $(".login_bulletin_content").hide();
        var activeTab = $(this).attr("data-url");
        $(activeTab).show();
    });

    tabShow(".main_content li",".main_content_img");
    today(4, '#main_con_tab1');

    //tab选项卡切换
    function tabShow(getClass,getshow){
        $(getClass).mouseenter(function(){
            $(getClass).removeClass("border_b2_red");
            $(this).addClass("border_b2_red");

            $(getshow).hide();
            var activeTab = $(this).attr("data-url");
            $(activeTab).show();

            var res = $(this).attr("data");
            today(res, activeTab);
        });
    }

    function today(res, getId) {
        //今日推荐
        var data = {
            type : res,
            num  : 6
        };
        com.executeAjax(menuUrl+orderServiceUrl.cat_goods, data, "GET", function (result) {

            $.each(result.content, function (i, result) {
                var name = result.name.length;
                if(name > 25){
                    result.name = result.name.substr(0,25)+"...";
                }
            });

            var app = new Vue({
                el: getId,
                data: {result : result.content},
                methods:{
                    toList:function (url) {
                        url = url.split("=");
                        url = url[1];
                        window.open('product_list_info.html?infoId='+ url);
                    }
                }
            });
            app.result.splice(result.content.length);
            app.result = result.content;
            gzButton();
        });
    }

    forListLenght("#login_tab1 li",3);
    forListLenght("#login_tab2 li",3);
    forListLenght("#login_tab3 li",3);

    //超出4条数据隐藏
    function forListLenght(id,size){
        var a = $(id);
        for(var i=0; i< a.length; i++){
            if(i>size){
                $(id).eq(i).addClass("hide");
            }
        }
    }

    //品牌区
    com.executeAjax(menuUrl+orderServiceUrl.brand, "", "GET", function (result) {
        var app = new Vue({
            el: "#brandTemp",
            data: {result : result.content, maxImg : result.content[0].logo},
            methods:{
                toBrand:function (id) {
                    window.open("NewBrandZone.html?id="+id);
                }
            }
        });
        app.result.splice(result.content.length);
        app.result = result.content;

        //品牌专区
        $(".main_brand_zone li").mouseenter(function(){
            $(this).find(".brand_list_mask").css("top","0");
        });
        $(".main_brand_zone li").mouseleave(function(){
            $(".main_brand_zone li").find(".brand_list_mask").removeAttr("style");
        });

        //品牌专区
        $(".brand_main_more").mouseenter(function(){
            $(this).addClass("bg_light_dd3e3e").find("a").addClass("white");
            $(this).find("i").css("background-position","-57px -143px");
        });
        $(".brand_main_more").mouseleave(function(){
            $(".brand_main_more").removeClass("bg_light_dd3e3e").removeAttr("style");
            $(".brand_main_more a").removeClass("white").removeAttr("style");
            $(".brand_main_more").find("i").removeAttr("style");
        });
    });

    $(".main_content").eq(0).addClass("mar_t_40px");

    //楼层奇数偶数border-top颜色
    $(".main_floor:even").css("border-top","2px solid");
    $(".main_floor:odd").css("border-top","2px solid #c43737");

    $(window).scroll(function(){
        scr($(this));
    });
    function scr($obj) {
        if($obj.scrollTop()>600) {
            $(".scroll_top").css({"opacity":"1","top":"0"});
            $(".left_floor").show();
        }else{
            $(".scroll_top").css({"opacity":"0","top":"-60px"});
            $(".left_floor").hide();
        }
    }

    // var data = {
    //     inputName      : ".title3_input input",
    //     search_div     : ".search_result3",
    //     search_result  : ".search_result3 li"
    // }
    // com.searchList(data);

    //登陆状态
    if(global.isLogin){
        $(".login_true").show();
        $(".login_false").hide();
        $(".menu_login_title").removeClass("over_hide");
        if(global.isLoginRZ){
            $(".login_true_rz").show();
            $(".login_false_rz").hide();
        }else{
            $(".login_true_rz").hide();
            $(".login_false_rz").show();
        }
    }else{
        $(".menu_login_title").addClass("over_hide");
        $(".login_true").hide();
        $(".login_false").show();
    }

    var main_content2 = $(".main_content2");
    for(var i=0; i<main_content2.length; i++){
        var text = main_content2.eq(i).find("li");
        if(text.length > 4){
            text.eq(4).text("更多");
        }
    }

    //banner广告图
    com.executeAjax(menuUrl+orderServiceUrl.banner, {ad_id : 1}, "GET", function (result) {
        var app = new Vue({
            el: '#bannerImgTemp',
            data: {result : result}
        });
        var mySwiper1 = new Swiper('.swiper-container1',{
            pagination: '.pagination1',
            loop:true,
            speed: 500,
            autoplay : 5000,
            grabCursor: true,
            paginationClickable: true
        });
        $('.arrow-left').on('click', function(e){
            e.preventDefault();
            mySwiper1.swipePrev();
        });
        $('.arrow-right').on('click', function(e){
            e.preventDefault();
            mySwiper1.swipeNext();
        });

        var swiper = new Swiper('.swiper-container3', {
            loop:true,
            speed: 300,
            autoplay : 3000,
            grabCursor: true,
            paginationClickable: true
        });
        $(".swiper_clear").click(function () {
            $(".swiper-container3").hide();
        });
    });

    //侧边楼层分类
    var menuData = {
        // n     : 0,    //列表条数 1就一条
        m     : 0    //列表条数下面数据开始的位置  *这个参数是数组下标
        // level : 3     //列表下面的分类数据  *从2级分类开始
    };
    com.executeAjax(menuUrl+orderServiceUrl.cat, menuData, "GET", function (result) {
        var floorVal = [];
        $.each(result.content, function (i, obj) {
            var a = obj.name.split("、");
            obj.name = a[0];
            floorVal.push(obj);
        });
        var app = new Vue({
            el: '#main_floor',
            data: {result : floorVal}
        });
    });

    //楼层模板
    var floorData = {
        level : 1,
        n     : 13,
        num   : 1
    };
    com.executeAjax(menuUrl+orderServiceUrl.cat, floorData, "GET", function (result) {

        $.each(result.content, function (i, result) {
            $.each(result.goods, function (i, result) {
                var name = result.name.length;
                // var brief = result.brief.length;
                if(name > 25){
                    result.name = result.name.substr(0,25)+"...";
                }
                /*if(brief > 25){
                    result.brief = result.brief.substr(0,25)+"...";
                }*/
            });
        });

        var app = new Vue({
            el: '#floorTemp',
            data: {result : result.content},
            methods:{
                toListInfo:function (url) {
                    url = url.split("=");
                    url = url[1];
                    window.open('product_list.html?id='+ url);
                },
                toListInfo2:function (url) {
                    url = url.split("=");
                    url = url[1];
                    window.open('product_list_info.html?infoId='+ url);
                },
                toList:function (url) {
                    window.open('product_list.html?keywords='+url);
                }
            }
        });
        gzButton();

        var floor      = $(".floor");
        var clickFloor = [];
        for(var i=0; i<floor.length; i++){
            var text = $(".floor").eq(i).offset().top;
            clickFloor.push(text - 50);
        }

        $(".left_floor li").click(function(){
            var text = $(this).index();
            $('html,body').animate({
                scrollTop : clickFloor[text-1]
            },500);
        });

        /*$(".backTop").click(function(){
            com.backTop();
        });*/
    });

    //搜索
    com.executeAjax(suggestUrl+"a", "", "GET", function (result) {
        var text = document.getElementById("scroll_top_input");
        var _success = function (text) {
            if(text !== ""){
                com.executeAjax(searchUrl+text, "", "GET", function () {
                    location.href = '/product_list.html?keywords='+ text;
                });
            }
        };
        var autoComplete=new AutoComplete('scroll_top_input', 'search_result3', result, _success);
        text.onkeyup = function(event) {
            autoComplete.start(event);
        };
    });

    $(".title2_input input").focus(function(){
        var text = $(this).val();
        if(text.length > 0){
            $("#search_result3").show();
        }
    });

    $("#searchInput").click(function () {
        var searchText = $("#scroll_top_input").val();
        if(searchText !== "") {
            com.executeAjax(searchUrl + searchText, "", "GET", function (result) {
                location.href = 'product_list.html?keywords=' + searchText;
            });
        }
    });


    function gzButton() {
    //关注按钮
    $(".main_content_img li,.main_content_img2 li").mouseenter(function(){
        $(this).find(".main_con_img_gz").show();
    });
    $(".main_content_img li,.main_content_img2 li").mouseleave(function(){
        $(".main_content_img li,.main_content_img2 li").find(".main_con_img_gz").hide();
    });

    $(".main_con_img_gz").click(function(){
            var text = $(this).text();
            var $this = $(this);
            var dataUrl = $(this).attr("url");

            //global.productNumber = global.productNumber+1;
            //$(".product_number").text(global.productNumber);
            //consoleLog(global.productNumber);

            if(cookieUserName){
                if(text == "关注"){
                    var data = {
                        'goods_id':dataUrl
                    };
                    com.executeAjax(userCenterUrl+orderServiceUrl.add_collection,data, "POST", function (result) {
                        if(result.data == '添加成功'){
                            $this.text("取消关注");
                            $this.removeClass("bg_line_red white bor_rad_5px");
                            $this.addClass("f_c_999");
                        }
                    });
                }else{
                    var data2 = {
                        'goods_id':dataUrl
                    };
                    com.executeAjax(userCenterUrl+orderServiceUrl.del_collection,data2, "POST", function (result) {
                        if(result.data == '取消成功'){
                            $this.text("关注");
                            $this.addClass("bg_line_red white bor_rad_5px");
                            $this.removeClass("f_c_999");
                        }
                    });
                }
            }else{
                com.maskLogin($("#login_mask"));
            }
        });
    }
});



/**
 * Created by Gold on 2016/10/26.
 */
$(function () {

    //订单首页未收货和付款数量
    com.executeAjax(orderUrl+orderServiceUrl.status_count, "", "GET", function (result) {
        new Vue({
            el: '#myOrderSumTemp',
            data: result.data
        });
    });

    productList();

    function pageselectCallback(page_index, jq) {
        if (inited) {
            productList(page_index);
        }
        inited = true;
        return false;
    }
    var inited = false;//是否已初始化过
    var vm = new Vue({
        el: '#myOrderListTemp',
        data: {items:[]}
    });

    function productList(page) {
        page = page?page+1:1;

        //订单首页商品列表
        var data = {
            page : page,
            size : 5
        };
        com.executeAjax(orderUrl+orderServiceUrl.list, data, "GET", function(result){
            if(!inited){
                $("#Pagination").pagination(result.data.total, {
                    num_edge_entries: 1, //边缘页数
                    num_display_entries: 4, //主体页数
                    callback: pageselectCallback,
                    items_per_page:data.size, //每页显示1项
                    prev_text: "前一页",
                    next_text: "后一页"
                });
            }
            vm.items.splice(result.data.length);
            vm.items = result.data.items;
            //菜单栏切换
            $(".order_info_input p").find("c").click(function(){
                var activeTab = $(this).attr("href");
                $("#content_main").load(activeTab);
                obtainDivHeight();
            });

            //商品订单首页的切换筛选按钮
            $(".order_con_title .tab").click(function(){
                var searchResult = $(this).find(".teb_text").text();
                $(".order_con_title .tab").find(".teb_text").removeClass("border_b_red");
                $(this).find(".teb_text").addClass("border_b_red");

                $(".order_con_list").css({"display": "none"});
                $(".order_con_list .status:contains(" + searchResult + ")").parent().parent().parent().css({"display": "block"});
                obtainDivHeight();
                var index = $(this).index();
                if(index === 0) $(".order_con_list").css({"display": "block"});
            });
        });
    }

    var text   = $(".order_info_list");
    var text2  = $(".order_info_logistics");
    var isTrue = true;

    //一个列表两个商品时按钮左侧显示一根线
    var orderList = $(".order_con_list").length;
    for(var i=0; i<orderList; i++){
        var text3 = $(".order_con_list").eq(i).find(".order_info_list").length;
        if(text3 == 1){
            $(".order_con_list").eq(i).find(".info_input").css("border-left","transparent");
        }
    }

    if(isTrue){
        for(var a=0; a< $(".order_info_list").length; a++){
            var order_info_logistics = text2.eq([a]).outerHeight(true);
            text2.eq([a]).css("margin-top","-"+order_info_logistics/2+"px");
        }
        isTrue = false;
    }
    $(".order_schedule ul li hr").eq(0).css("width","50%");
    $(".order_schedule ul li hr").eq(4).css({"width":"50%","right":"50%"});


    //点击查看详情和取消订单
    function orderInput($input){
        var text   = $input.attr("ng-id");  //2:查看详情  3:取消订单
        var temp1  = $("#temp1");
        var temp2  = $("#temp2");
        var status = $input.attr("status");

        if(text === "3"){
            var content = '<div class="f_c_666" style="height: 255px;"><p class="f_c_333">订单取消申请</p><p class="fs_14px red mar_t_25px">*请选择取消原因：</p><ul class="mask_con_text"><li><input class="mar_t_20px" type="checkbox" value="不想买了">&nbsp;&nbsp;<span>不想买了</span></li><li><input class="mar_t_20px" type="checkbox" value="重复下单/误下单">&nbsp;&nbsp;<span>重复下单/误下单</span></li><li><input class="mar_t_20px" type="checkbox" value="其他渠道价格更低">&nbsp;&nbsp;<span>其他渠道价格更低</span></li><li><input class="mar_t_20px" type="checkbox" value="商品买错了（颜色、尺寸、数量等)">&nbsp;&nbsp;<span>商品买错了（颜色、尺寸、数量等)</span></li><li><input class="mar_t_20px" type="checkbox" value="支付方式有误/无法支付">&nbsp;&nbsp;<span>支付方式有误/无法支付</span></li><li><input class="mar_t_20px" type="checkbox" value="订单不能按预计时间送达">&nbsp;&nbsp;<span>订单不能按预计时间送达</span></li></ul></div>';
            var object = {
                getid        : $("#cancel_orders_mask"),
                text_title   : "提示",
                text_content : content
            };
            com.mask(object);

            //弹出窗确定按钮
            $(".mask_confirm").click(function(){
                //获取订单号码
                var text = $input.parent().parent().parent().find(".orderNum").text();
                var value =[];
                $('.mask_con_text li input:checked').each(function(){
                    value.push($(this).val());

                    //取消订单接口
                    com.executeAjax(orderUrl+orderServiceUrl.cancel, {'orderid':text}, "POST", function (result) {
                        if(result.code === 0){
                            alert('操作成功');
                            $(".bg_mask,.mask_main").hide();
                            productList();
                        }else{
                            alert(result.msg);
                        }
                    });
                });
            });
        }
        if(text === "2"){
            switch(status)  // 1: 提交订单  2: 正在出库  3: 等待收货  4: 完成  5: 取消
            {
                case "0":
                    $(".order_status li div p").eq(2).hide();
                    $(".order_status li div").removeClass("li_he_25px").addClass("li_he_40px");
                    $(".order_schedule ul li hr").eq(0).css("border-color","#89ca55");
                    $(".order_schedule ul li img").eq(0).attr("src","img/icon_01.png");
                    $(".order_status li img").attr("src","img/waitBuy.png");
                    $(".wldh,.wl,.wlfw,.wlfh,.wlwc,.yjfk").hide();
                    break;
                case "1":
                case "2":
                case "3":
                    var a = 3;
                    for(var i=0; i<a; i++){
                        $(".order_schedule ul li hr").eq(i).css("border-color","#89ca55");
                        $(".order_schedule ul li img").eq(i).attr("src","img/icon_01.png");
                    }
                    $(".wlfw,.wlze,.wldh,.wl,.wldd_fk,.wlwc,.yjfk").hide();
                    $(".wldd_qx").removeClass("mar_l_15px");
                    break;
                case "4":
                    var c = 4;
                    for(var d=0; d<c; d++){
                        $(".order_schedule ul li hr").eq(d).css("border-color","#89ca55");
                        $(".order_schedule ul li img").eq(d).attr("src","img/icon_01.png");
                    }
                    $(".wlfw,.wlze,.wlfh,.wlwc,.yjfk").hide();
                    break;
                case "5":
                    var b = 5;
                    for(var i=0; i<b; i++){
                        $(".order_schedule ul li hr").eq(i).css("border-color","#89ca55");
                        $(".order_schedule ul li img").eq(i).attr("src","img/icon_01.png");
                    }
                    $(".order_status li img").attr("src","img/success.png");
                    $(".wlfw,.wlze,.wldh,.wl,.wldd_fk,.wldd_qx,.wlfh,.order_info_money .money").hide();
                    $(".order_info_money").removeClass("mar_t_20px");
                    $(".wlwc_gm").removeClass("Nhide mar_t_5px");
                    break;
                case "8":
                case "9":
                case "10":
                    $(".order_status li img").attr("src","img/error.png");
                    $(".wlfw,.wlze,.wldh,.wl,.wldd_fk,.wlwc,.yjfk,.wlfh,.order_schedule").hide();
                    $(".wldd_qx").removeClass("mar_l_15px");
                    $(".wlqx").removeClass("Nhide");
                    break;
                default:
                    $(".order_status li div p").eq(2).hide();
                    $(".order_status li div").removeClass("li_he_25px").addClass("li_he_40px");
                    $(".order_schedule ul li hr").eq(0).css("border-color","#89ca55");
                    $(".order_schedule ul li img").eq(0).attr("src","img/icon_01.png");
                    $(".order_status li img").attr("src","img/waitBuy.png");
                    $(".wldh,.wl,.wlfw,.wlfh,.wlwc,.yjfk").hide();
            }
            temp1.hide();
            temp2.removeClass("Nhide");
            obtainDivHeight();
        }
    }
});
/**
 * Created by Gold on 2016/11/9.
 */
$(function () {
    //关注商品删除
    $(".history_list_del").click(function(){
        $(this).parents(".history_list").remove();
    });

    //关注商品鼠标移上去显示删除按钮
    $(".history_list").mouseenter(function(){
        $(this).find(".history_list_del,.history_list_info").removeClass("vis_hide");
    });
    $(".history_list").mouseleave(function(){
        $(this).find(".history_list_del,.history_list_info").addClass("vis_hide");
    });
});
/**
 * Created by Gold on 2016/11/9.
 */
$(function () {
    var listConHeight = $(".message_li_con");
    for(var i=0; i<listConHeight.length; i++){
        var BrandDivHeight = listConHeight.eq(i).children("p").outerHeight();
        if(BrandDivHeight > 15){
            listConHeight.eq(i).find(".open_text").show();
            listConHeight.eq(i).addClass("");
        }
    }

    var isShow = true;
    $(".open_text").click(function () {
        $(this).parent().parent().toggleClass("mes_max_height");
        if(isShow){
            $(this).text("收起");
            isShow = false;
        }else{
            $(this).text("展开");
            isShow = true;
        }
    });

    $("#gorz").click(function () {
        // alert(1);
        // $(".right_menu ul").eq(2).children("li").eq(2).trigger("click");
        // alert($(".right_menu ul").eq(2).children("li").eq(2).text());
    });
});
/**
 * Created by Gold on 2016/11/9.
 */
$(function () {
    var default_pwd = $("#default_pwd");
    var pwd1 = $("#pwd1");
    var pwd2 = $("#pwd2");

    inputText(default_pwd, 6);
    inputText(pwd1, 6);

    clickInput(default_pwd);
    clickInput(pwd1);
    clickInput(pwd2);

    //输入框的字数
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

    //获取焦点切换显示文字
    function clickInput($input){
        $input.focus(function(){
            $(this).siblings("span").eq(0).show();
            $(this).addClass("border_green");
            $(this).siblings("span").eq(1).hide();
        });
        $input.blur(function(){
            $(this).siblings("span").eq(0).hide();
            $(this).removeClass("border_green");
            var text = $(this).siblings("span").eq(1).attr("data");
            if(text === "false"){
                $(this).siblings("span").eq(1).show();
            }
        });
    }

    pwd2.on("input",function(){
        $(this).siblings("span").eq(0).hide();
        var text = $(this).val();
        if(text !== pwd1.val() ||text.length < 6 || text.length > 20){
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

    $("#confirmUpdate").click(function(){
        var old_pwd = $("#default_pwd").val();
        var new_pwd = $("#pwd2").val();
		var isTrue =[];
        var text = $(".login_main_content3 ul li");
        for(var i=0; i<text.length; i++){
            var a = $(".login_main_content3 ul li").eq(i).find("span").eq(1).attr("data");
            isTrue.push(a);
        }

        if(isTrue.indexOf("false") == -1) {
            var data = {
			  old_password : old_pwd,
              new_password : new_pwd
            };
            var success_callback = function (result) {
                // $("#page1").addClass("Nhide");
                // $("#page2").removeClass("Nhide");
            };
            com.executeAjax(resetPswUrl+orderServiceUrl.reset_password, data, "POST", success_callback);
        }
    });

    $("#confirm").click(function(){
        location.href = '../personal_main.html';
    });
});
/**
 * Created by Administrator on 2016/11/8.
 */

var orderid = getQueryString('out_trade_no');
var total_fee = getQueryString('total_fee');

var vm = new Vue({
    el: '#pay_info_template',
    data: {orderid:orderid,total_fee:total_fee},
    methods:{
        goOn:function(){
            window.location = '/main.html';
        },
        orderDetail:function(){
            window.location = '/center/order_info.html?orderid='+orderid;
        }
    }
});

com.executeAjax(menuUrl + orderServiceUrl.cat_goods+'&type=1', '', "GET", function (result) {
    new Vue({
        el: '#goods_list_template',
        data: result,
        methods:{
            toInfo:function (Id) {
                location.href = "product_list_info.html?infoId="+Id;
            }
        }
    });

    $(".main_content_img li").mouseenter(function(){
        $(this).removeClass("rem_shadow_5px");
        $(this).addClass("shadow_5px");
    });
    $(".main_content_img li").mouseleave(function(){
        $(this).removeClass("shadow_5px");
        $(this).addClass("rem_shadow_5px");
    });
});

/**
 * Created by Gold on 2016/10/10.
 */

var div1Hight = 0;
var div2Hight = 0;

/****** personal_main.js ******/
//function personal_main(){
//    //分别加载页眉，头部，页脚
//    $("#titleTemp_main").load("lib/temp/page_title.html");
//    $("#titleTemp2_main").load("lib/temp/page_title2.html");
//    $("#bottomTemp_main").load("lib/temp/page_bottom.html");
//
//    //菜单栏切换
//    $("#menu_chk_text").text($(".right_menu ul li").eq(0).text());
//    $(".right_menu ul li").find("span").click(function(){
//        var activeTab = $(this).attr("href");
//        $("#content_main").load(activeTab);
//
//        $("#menu_chk_text").text($(this).text());
//        $(".right_menu ul li").find("span").removeClass("red");
//        $(this).addClass("red");
//
//        obtainDivHeight();
//    });
//    $(".right_menu ul li").find("span").eq(0).trigger("click");
//
//    obtainDivHeight();
//
//    $("#Feedback").click(function () {
//        var object = {
//            getid        : $("#alertMask"),
//            text_title   : "意见反馈",
//            text_content : $("#feedBackMask").html(),
//            text_input1  : "提交"
//        }
//        com.mask(object);
//        $(".mask_main").css({'margin': '-240px -312.5px'});
//
//        $(".mask_main").attr("id","feed_back_mask");
//        $(".mask_title").css("background","#FFF");
//        $(".mask_input").hide();
//
//        $("#back_textarea").on("input", function () {
//            var text = $(this).val().length;
//            if(text < 151){
//                $(".numberSize").text(150-parseInt(text));
//            }
//            if(text >= 1){
//                $("#back_text1").attr("data","true").hide();
//            }else{
//                $("#back_text1").attr("data","false").show();
//            }
//        });
//
//        $("#back_phone").on("input", function () {
//            var text = $(this).val().length;
//            if(text >= 1){
//                $("#back_text2").attr("data","true").hide();
//            }else{
//                $("#back_text2").attr("data","false").show();
//            }
//        });
//
//        //提交意见反馈
//        $(".feedBack_submit").click(function () {
//            var text1 = $("#back_text1").attr("data");
//            var text2 = $("#back_text2").attr("data");
//            if(text1 === "true" && text2 === "true") {
//                var url = userLoginUrl + orderServiceUrl.add_message;
//
//                var content = $("#back_textarea").val();
//                var company_name = $("#company_name").val();
//                var back_phone = $("#back_phone").val();
//
//                var data = {
//                    msg_content : content,
//                    user_name : company_name,
//                    back_phone : back_phone
//                }
//                var success_callback = function (obj) {
//                    if ( obj == 3) {
//                        com.maskSuccess($("#alertMask"), "非常感谢，您的意见我们已经收到！");
//                    }
//                }
//                com.executeAjax(url, data, "POST", success_callback);
//            }
//        });
//    });
//}

$("#Feedback").click(function () {
    var object = {
        getid        : $("#alertMask"),
        text_title   : "意见反馈",
        text_content : $("#feedBackMask").html(),
        text_input1  : "提交"
    }
    com.mask(object);
    $(".mask_main").css({'margin': '-240px -312.5px'});

    $(".mask_main").attr("id","feed_back_mask");
    $(".mask_title").css("background","#FFF");
    $(".mask_input").hide();

    $("#back_textarea").on("input", function () {
        var text = $(this).val().length;
        if(text < 151){
            $(".numberSize").text(150-parseInt(text));
        }
        if(text >= 1){
            $("#back_text1").attr("data","true").hide();
        }else{
            $("#back_text1").attr("data","false").show();
        }
    });

    $("#back_phone").on("input", function () {
        var text = $(this).val().length;
        if(text >= 1){
            $("#back_text2").attr("data","true").hide();
        }else{
            $("#back_text2").attr("data","false").show();
        }
    });

    //提交意见反馈
    $(".feedBack_submit").click(function () {
        var text1 = $("#back_text1").attr("data");
        var text2 = $("#back_text2").attr("data");
        if(text1 === "true" && text2 === "true") {
            var url = userLoginUrl + orderServiceUrl.add_message;

            var content = $("#back_textarea").val();
            var company_name = $("#company_name").val();
            var back_phone = $("#back_phone").val();

            var data = {
                msg_content : content,
                user_name : company_name,
                back_phone : back_phone
            }
            var success_callback = function (obj) {
                if ( obj == 3) {
                    com.maskSuccess($("#alertMask"), "非常感谢，您的意见我们已经收到！");
                }
            }
            com.executeAjax(url, data, "POST", success_callback);
        }
    });
});

//获取右边菜单div的高度
function obtainDivHeight(){
    var isTrue = true;
    var $div = $("#content_main,.content_main");
    $div.removeAttr("style");
    div1Hight = $(".right_menu").outerHeight(true);
        function DivHeight() {
            if(isTrue){
                div2Hight = $div.outerHeight(true);
                if(div1Hight > div2Hight){
                    $div.css("height",div1Hight-1);
                    isTrue = false;
                }else{
                    $div.removeAttr("style");
                    isTrue = false;
                }

                /* 判断浏览器版本号，适配 */
                var version = com.browserVersion();
                version = version.split(":");
                version = version[1];
                version = version.substr(0,3);
                if (version == 53){
                    $(".unread_message").css("line-height","18px");
                }
                clearInterval(DivHeight);
            }
        }
    // setInterval(DivHeight,10);
    for(var i=0; i<5; i++){
        setTimeout(DivHeight,0);
    }
}


/****** personal_center.js ******/
function personal_center(){
    //关注商品与历史记录tab卡
    $(".order_con_title").find("c").click(function(){
        $(".order_con_title .tab").removeClass("border_b_red");
        $(this).parent("span").addClass("border_b_red");

        $(".history_record ul").hide();
        var activeTab = $(this).attr("href");
        $(activeTab).toggle();
        obtainDivHeight();
    });

    //关注商品删除
    $(".history_list_del").click(function(){
        $(this).parents(".history_list").remove();
    });

    //关注商品鼠标移上去显示删除按钮
    $(".history_list").mouseenter(function(){
        $(this).find(".history_list_del,.history_list_info").removeClass("vis_hide");
        $(this).find(".main_con_img_gz").show();
    });
    $(".history_list").mouseleave(function(){
        $(this).find(".history_list_del,.history_list_info").addClass("vis_hide");
        $(this).find(".main_con_img_gz").hide();
    });
}

//tab切换
function centerLeft() {
    var TabId = getQueryString("infoid");
    $(".right_menu ul li").find("a").removeClass("red");
    $(".right_menu ul li").find("a").eq(TabId-1).addClass("red");
}
/**
 * Created by Gold on 2016/10/26.
 */
$(function () {
    //分别加载页眉，头部，页脚，侧边栏
    $("#titleTemp_main").load("lib/temp/page_title.html");
    $("#titleTemp2_main").load("lib/temp/page_title2.html");
    $("#bottomTemp_main").load("lib/temp/page_bottom.html");
    $("#sidebarTemp_main").load("lib/temp/page_sidebar.html");

    var proId = getQueryString('id');
    var urlData = categoryUrl + "id=" +proId;
    if(!proId){
        proId = getQueryString('keywords');
        urlData = searchUrl +proId;
    }

    com.executeAjax(urlData, "", "GET", function (result) {
        var keywords = getQueryString('keywords');
        if(keywords){
            $("#search_title").show();
            $("#search_title").html("<em> > </em>"+result.ur_here.str+"&nbsp;&nbsp;"+keywords);
            $("#search").val(keywords);
        }
        if(result.content == ""){
            // var text = result.ur_here.str.split("_");
            // text = text[1];
            $("#notData").show();
            $("#text").text(keywords);
            $("#goods_sort_temp,#Pagination").hide();
        }
        $.each(result.content, function (i, result) {
            var name = result.goods_name.length;
            var brief = result.goods_brief.length;
            if(name > 25){
                result.goods_name = result.goods_name.substr(0,30)+"...";
            }
            if(brief > 25){
                result.goods_brief = result.goods_brief.substr(0,30)+"...";
            }
        });

        if(result.all_attr_list == ""){
            $(".brand_title_con,.more_options").hide();
        }
        //页面title
        var app1 = new Vue({
            el: '#productListTemp1',
            data: result
        });

        //类型 价格之类排序
        var app_goods_sort = new Vue({
            el: '#goods_sort_temp',
            data: {list:{goods_sort:[]}},
            methods:{
                toSort:function (data) {
                    com.executeAjax(Url+data, "", "GET", function (result) {

                        $.each(result.content, function (i, result) {
                            var name = result.goods_name.length;
                            var brief = result.goods_brief.length;
                            if(name > 25){
                                result.goods_name = result.goods_name.substr(0,30)+"...";
                            }
                            if(brief > 25){
                                result.goods_brief = result.goods_brief.substr(0,30)+"...";
                            }
                        });

                        app2.list.content.splice(result.content.length);
                        app2.list = result;
                    });
                }
            }
        });
        app_goods_sort.list.goods_sort.splice(result.goods_sort.length);
        app_goods_sort.list = result;
        setTimeout(function () {
            var conTitleText = $(".content_title li");
            conTitleText.click(function(){
                // var dataUrl = $(this).attr("href");
                conTitleText.removeClass("red");
                conTitleText.find(".listAndInfo2").removeAttr("style");
                $(this).addClass("red");
                $(this).find(".listAndInfo2").css("background-position","-26px -5px");

                /*com.executeAjax(Url+dataUrl, "", "GET", function (result) {

                });*/
            });
            conTitleText.eq(0).click();
            conTitleText.eq(0).find(".listAndInfo2").remove();
        },100);

        //商品列表
        var app2 = new Vue({
            el: '#pro_list',
            data: {list:{content:[]}},
            methods:{
                toListInfo1:function (url) {
                    url = url.split("=");
                    url = url[1];
                    window.open("product_list_info.html?infoId="+url);
                },
                concern:function (id, $event) {
                    var el       = event.currentTarget;
                    var UserName =  $.cookie("ECS[username]");
                    var text     = $(el).text();

                    if(UserName){
                        if(text == "关注"){
                            var data = {
                                'goods_id':id
                            };
                            com.executeAjax(userCenterUrl+orderServiceUrl.add_collection,data, "POST", function (result) {
                                if(result.data == '添加成功'){
                                    $(el).text("取消关注");
                                }
                            });
                        }else{
                            var data = {
                                'goods_id':id
                            };
                            com.executeAjax(userCenterUrl+orderServiceUrl.del_collection,data, "POST", function (result) {
                                if(result.data == '取消成功'){
                                    $(el).text("关注");
                                }
                            });
                        }
                    }else{
                        com.maskLogin($("#login_mask"));
                    }
                }
            }
        });
        app2.list.content.splice(result.content.length);
        app2.list = result;

        //分页
        /*var pageSelectCallback = function () {
            com.executeAjax(Url+url, "", "GET", function (result) {
                app2.list.content.splice(result.content.length);
                app2.list = result;
            });
        };

        var pageLength = result.pager.page_number.length;
        $("#Pagination").pagination(pageLength, {
            num_edge_entries    : 1, //边缘页数
            num_display_entries : 4, //主体页数
            callback            : pageSelectCallback,
            items_per_page      : 1, //每页显示1项
            prev_text           : "前一页",
            next_text           : "后一页",
            current_page        : 0
        });

        var pageTabWidth = $("#Pagination").outerWidth();
        $("#Pagination").css("margin-left", "-"+pageTabWidth/2+"px");*/

        //分页
        var page = new Vue({
            el: '#Pagination',
            data: {list :{page_number:[]}},
            methods:{
                toList:function (url) {
                    com.executeAjax(Url+url, "", "GET", function (result) {

                        $.each(result.content, function (i, result) {
                            var name = result.goods_name.length;
                            var brief = result.goods_brief.length;
                            if(name > 25){
                                result.goods_name = result.goods_name.substr(0,25)+"...";
                            }
                            if(brief > 25){
                                result.goods_brief = result.goods_brief.substr(0,25)+"...";
                            }
                        });

                        app2.list.content.splice(result.content.length);
                        app2.list = result;

                        // consoleLog(JSON.stringify(page.list.page_number));
                        page.list.page_number.splice(result.pager.page_number.length);
                        page.list = result.pager;
                    });
                },
                toListPrev:function (url) {
                    com.executeAjax(Url+url, "", "GET", function (result) {

                        $.each(result.content, function (i, result) {
                            var name = result.goods_name.length;
                            var brief = result.goods_brief.length;
                            if(name > 25){
                                result.goods_name = result.goods_name.substr(0,25)+"...";
                            }
                            if(brief > 25){
                                result.goods_brief = result.goods_brief.substr(0,25)+"...";
                            }
                        });

                        app2.list.content.splice(result.content.length);
                        app2.list = result;
                    });
                },
                toListNext:function (url) {
                    com.executeAjax(Url+url, "", "GET", function (result) {

                        $.each(result.content, function (i, result) {
                            var name = result.goods_name.length;
                            var brief = result.goods_brief.length;
                            if(name > 25){
                                result.goods_name = result.goods_name.substr(0,25)+"...";
                            }
                            if(brief > 25){
                                result.goods_brief = result.goods_brief.substr(0,25)+"...";
                            }
                        });

                        app2.list.content.splice(result.content.length);
                        app2.list = result;
                    });
                }
            }
        });
        page.list.page_number.splice(result.pager.page_number.length);
        page.list = result.pager;

        setTimeout(function () {
            var pageTabWidth = $("#Pagination").outerWidth();
            $("#Pagination").css("margin-left", "-"+pageTabWidth/2+"px");

            $("#Pagination a").click(function () {
                // var url = $(this).attr("data-url");
                if($(this).text() == "上一页"){
                    $(".current").parent("a").prev("a").find("span").addClass("current");
                    $(".current").parent("a").next("a").find("span").removeClass("current");
                }
                if($(this).text() == "下一页"){
                    $(".current").parent("a").next("a").find("span").addClass("current");
                    $(".current").parent("a").prev("a").find("span").removeClass("current");
                }
                if($(this).text() == "下一页" || $(this).text() == "上一页"){
                    return
                }else{
                    $("#Pagination a span").removeClass("current");
                    $(this).find("span").addClass("current");
                }

                var listTop = $("#goods_sort_temp").offset().top;
                $('html,body').animate({scrollTop:listTop},300);
            });
        },100);


        var pageTitle = new Vue({
            el: '#pageTitle',
            data: {list:result}
        });
        var addPageTitle = new Vue({
            el: '#addPageTitle',
            data: {list:[]},
            methods:{
                removeBrand:function (url) {
                    com.executeAjax(Url+url, "", "GET", function (result) {

                        $.each(result.content, function (i, result) {
                            var name = result.goods_name.length;
                            var brief = result.goods_brief.length;
                            if(name > 25){
                                result.goods_name = result.goods_name.substr(0,25)+"...";
                            }
                            if(brief > 25){
                                result.goods_brief = result.goods_brief.substr(0,25)+"...";
                            }
                        });

                        app2.list.content.splice(result.content.length);
                        app2.list = result;

                        page.list.page_number.splice(result.pager.page_number.length);
                        page.list = result.pager;

                        addPageTitle.list.splice(result.selected.length);
                        addPageTitle.list = result.selected;

                        app3.list.all_attr_list.splice(result.all_attr_list.length);
                        app3.list = result;

                        app4.list.brands.value.splice(result.brands.value.length);
                        app4.list = result;
                    });
                }
            }
        });
        //品牌属性
        var app4 = new Vue({
            el: '#titleBrandList',
            data: {list:{brands:{name:'',value:[]}}},
            methods: {
                toList1: function (data) {
                    com.executeAjax(Url+data, "", "GET", function (result) {
                        $("#addPageTitle").removeClass("Nhide");

                        app2.list.content.splice(result.content.length);
                        app2.list = result;

                        page.list.page_number.splice(result.pager.page_number.length);
                        page.list = result.pager;

                        addPageTitle.list.splice(result.selected.length);
                        addPageTitle.list = result.selected;

                        app3.list.all_attr_list.splice(result.all_attr_list.length);
                        app3.list = result;

                        app4.list.brands.value.splice(result.brands.value.length);
                        app4.list = result;
                    });
                }
            }
        });
        app4.list.brands.value.splice(result.brands.value.length);
        app4.list = result;

        var app3 = new Vue({
            el: '#brandList',
            data: {list:{all_attr_list:[]}},
            methods: {
                toList2: function (data) {
                    com.executeAjax(Url+data, "", "GET", function (result) {
                        $("#addPageTitle").removeClass("Nhide");

                        app2.list.content.splice(result.content.length);
                        app2.list = result;

                        page.list.page_number.splice(result.pager.page_number.length);
                        page.list = result.pager;

                        addPageTitle.list.splice(result.selected.length);
                        addPageTitle.list = result.selected;

                        app3.list.all_attr_list.splice(result.all_attr_list.length);
                        app3.list = result;
                    });
                }
            }
        });
        app3.list.all_attr_list.splice(result.all_attr_list.length);
        app3.list = result;

        var $html = {};
        // $("#Pagination").append('<a data-url='+ result.pager.page_prev +'><span class="prev ban_prev">上一页</span></a>');
        // $.each(result.pager.page_number,function (index, object) {
        //     var url = JSON.stringify(object);
        //     $html = '<a data-url='+ url +'><span>'+ index +'</span></a>';
        //     $("#Pagination").append($html);
        // });
        // $("#Pagination").append('<a data-url='+ result.pager.page_next +'><span class="next">下一页</span></a>');

        $(".navigation_bar li:last-child").find("span").hide();
        // $("#Pagination a").eq(1).find("span").addClass("current");

        // if(result.pager.page_prev == ""){
        //     $("#Pagination a:first-child").removeAttr("data-url");
        // }
        // if(result.pager.page_next == ""){
        //     $("#Pagination a:last-child").removeAttr("data-url");
        // }

        var brand_title_con = $(".brand_title_con div").length;
        for(var i=0; i<brand_title_con; i++){
            var BrandDivHeight = $(".brand_title_con div").eq(i).find("ul").outerHeight();
            if(BrandDivHeight > 36){
                $(".brand_title_con div").eq(i).find(".brand_more").show();
            }
        }

        var isShow = true;
        $(".brand_more").click(function () {
            $(this).parent().toggleClass("brand_maxHeight");
            $(this).children("i").toggleClass("rotate_180");
            if(isShow){
                $(this).children("span").text("收起");
                isShow = false;
            }else{
                $(this).children("span").text("更多");
                isShow = true;
            }
        });

        moreOptions();
        function moreOptions() {
            var listLength = $(".brand_title_con div").length;
            for(var i=0; i<listLength; i++){
                if(i > 4){
                    $(".brand_title_con").children(".brand_ul").eq(i).hide();
                }
            }
        }
        var isShow2 = true;
        $(".more_options").click(function () {
            $(this).children("i").toggleClass("rotate_180");
            if(isShow2){
                $(this).children("p").text("精简选项");
                $(".brand_title_con .brand_ul").show();
                isShow2 = false;
            }else{
                $(this).children("p").text("更多选项");
                moreOptions();
                isShow2 = true;
            }
        });

        //热门推荐
        var data = {
            type : 3,  //类型
            num  : 5   //限制数量
        }
        com.executeAjax(menuUrl+orderServiceUrl.cat_goods, data, "GET", function (result) {
            var sellWell = new Vue({
                el: "#sellWellPro",
                data: {list:{content:[]}},
                methods:{
                    toListInfo2:function (url) {
                        window.open("product_list_info.html?infoId="+url);
                    }
                }
            });
            sellWell.list.content.splice(result.content.length);
            sellWell.list = result.content;
            setTimeout(function () {
                divShadow();
            },10)
        });
    });

    divShadow();
    function divShadow() {
        $(".main_content_img li").mouseenter(function(){
            $(this).removeClass("rem_shadow_5px");
            $(this).addClass("shadow_5px");
            $(this).find(".content_img_text").addClass("img_text_hove");
        });
        $(".main_content_img li").mouseleave(function(){
            $(this).removeClass("shadow_5px");
            $(this).addClass("rem_shadow_5px");
            $(this).find(".content_img_text").removeClass("img_text_hove");
        });
    }

});
/**
 * Created by Gold on 2016/10/26.
 */
$(function () {

    var infoId = getQueryString('infoId');

    //分别加载页眉，头部，页脚，侧边栏
    $("#titleTemp_main").load("lib/temp/page_title.html");
    $("#titleTemp2_main").load("lib/temp/page_title2.html");
    $("#bottomTemp_main").load("lib/temp/page_bottom.html");
    $("#sidebarTemp_main").load("lib/temp/page_sidebar.html");

    //判断是什么用户登录的
    var userName = $.cookie("ECS[username]");
    if(userName){
        var infoUrl = userInfoUrl+orderServiceUrl.user_info;
        var infoData = {
            info : userName
        };
        com.executeAjax(infoUrl, infoData, "GET", function (result) {
            switch(result.company_verify_status)  //0 是未认证用户   1 是待审核    2是审核未通过    3是审核通过
            {
                case "0":
                case "1":
                case "2":
                    $(".Register").show();
                    break;
                case "3":
                    $(".FirmsUser").show();
                    break;
            }
        });
    }else {
        $(".NotRegister").show();
    }
    //浏览记录
    com.executeAjax(userLoginUrl+orderServiceUrl.history_list, "", "GET", function (result) {
        var items = new Vue({
            el: '#history_tab',
            data: {list: result},
            methods:{
                toListInfo:function (id) {
                    location.href = "/product_list_info.html?infoId="+id;
                }
            }
        });
    });

    //推荐商品
    com.executeAjax(menuUrl+orderServiceUrl.cat_goods, {type:1}, "GET", function (result) {
        var recommendList = new Vue({
            el: "#recommend_list",
            data: {list:{content:[]}},
            methods:{
                toListInfo:function (id) {
                    window.open("/product_list_info.html?infoId="+id);
                }
            }
        });
        recommendList.list.content.splice(result.content.length);
        recommendList.list = result.content;
    });

    com.executeAjax(goodsUrl+infoId, "", "GET", function (obj) {
        if(obj.goods.is_promote == "1"){
            obj.goods.shop_price = obj.goods.promote_price;
        }
        if(obj.properties == ""){
            $("#NotData").show();
        }
        if(obj.promotion != ""){
            $(".double12IsShow,#notStart,.double12_right,.double12_left").show();
            $("#ordinary_price").hide();

            var date1 = obj.now_time; //现在时间
            var date2 = obj.promotion.start_time; //开始时间
            var date3 = obj.promotion.end_time; //结束时间

            var successFun = function (result) {
                $(".Countdown").text("距离开始："+result.Day+"天"+result.Hour+"时"+result.Minute+"分"+result.Second+"秒");
            };
            var errorFun = function () {
                $("#notStart").hide();
                $("#start").show();
                com.executeAjax(goodsUrl+infoId, "", "GET", function (obj) {
                    date1 = obj.now_time; //现在时间
                    date3 = obj.promotion.end_time; //结束时间

                    var successFun2 = function (result) {
                        $(".Countdown").text("距离结束："+result.Day+"天"+result.Hour+"时"+result.Minute+"分"+result.Second+"秒");
                    };
                    var errorFun2 = function () {
                        $(".Countdown").text("活动已结束");
                    };
                    com.countDown(date1, date3, successFun2, errorFun2);
                });
            };
            com.countDown(date1, date2, successFun, errorFun);
            // com.countdown(obj.now_time, ".Countdown");
        }
        /*if(obj.goods.is_promote == "1"){
            $(".specialIsShow").show();
            $("#ordinary_price").hide();
        }*/

        var title = new Vue({
            el: "#title",
            data: {title : obj.page_title}
        });
        var listTitle1 = new Vue({
            el: "#listTitle1",
            data: {list : obj}
        });
        var listTitle2 = new Vue({
            el: "#listPro",
            data: {list : obj}
        });
        var listTitle3 = new Vue({
            el: "#proAttr",
            data: {list : obj}
        });
        var listTitle4 =  new Vue({
            el: "#gundong",
            data: {list : obj}
        });
        var pageTitle = new Vue({
            el: '#pageTitle',
            data: {list:obj}
        });
        obj.goods.goods_desc = htmldecode(obj.goods.goods_desc);
        $("#product_info1").html(obj.goods.goods_desc);

        function htmldecode(s){
            var div = document.createElement('div');
            div.innerHTML = s;
            return div.innerText || div.textContent;
        }

        var text = $(".shopPrice").text();
        if(text == "面议" || text == "面议面议" || text == "面议面议面议"){
            $("#Order").hide();
            $("#notOrder").show();
        }

        /* 库存限制个数 */
        var Numbers = 1;
        var Stock = 1;
        if(obj.promotion != ""){
            Stock = obj.promotion.stock;
        }else{
            Stock = obj.goods.goods_number;
        }

        var imgToggle = $(".product_info_text2 li .attr_list .text2");
        var imgToggleSpan = $(".product_info_text2 li");
        for(var i=0; i<imgToggleSpan.length; i++){
            imgToggleSpan.eq(i).find(".text2").eq(0).addClass("border_red").attr("data","true").children("img").addClass("show");
        }
        setTimeout(function () {
            $(".product_info_text2 li").eq(0).find(".text2").eq(0).click();
        },200);
        imgToggle.click(function () {
            $(this).parent().parent("li").find(".text2").removeClass("border_red").addClass("border").find("img").removeAttr("class");
            $(this).removeClass("border").addClass("border_red").find("img").addClass("show");
            $(this).parent().parent("li").find(".text2").attr("data","false");
            $(this).attr("data","true");
            var spanId = ListAttr();
            var ArraySpanId = "";
            for(var i=0; i<spanId.length; i++){
                ArraySpanId += spanId[i]+"_";
            }
            ArraySpanId = ArraySpanId.substring(0, ArraySpanId.length-1);
            var url    = ArraySpanId+"&id="+obj.goods.goods_id;
            url = url.toString();
            com.executeAjax(goodsUrl2+url, "", "POST", function (result) {
                $(".shopPrice").html("￥"+result.shop_price+"元");
                Stock = result.store_count;
                var text = $(".amount_num").val();
                if (text > Stock) {
                    $(".overNumber").show();
                }else{
                    $(".overNumber").hide();
                }
            })
        });

        $("#ljdg").click(function () {
            var spanId = ListAttr();
            var number = $(".content_amount .amount_num").val();
            var data = {
                goods_id : obj.goods.goods_id,
                number   : number,
                spec     :spanId
            };
            buyNow(data);
        });
        function ListAttr() {
            var spanId = [];  //每次点击初始化存放的id值
            var text = 0;     //初始化属性span的个数
            for(var i=0; i<imgToggleSpan.length-1; i++){    //循环属性span的个数
                var a = $(".product_info_text2 li").eq(i).find(".Attr").length;
                text = a+a;
            }
            for(var i=0; i<text; i++){     //拿到属性个数后，再循环拿到data 为true 的id
                var data = $(".product_info_text2 li .Attr").eq(i).attr("data");
                if(data === "true"){
                    var a = $(".product_info_text2 li .Attr").eq(i).attr("id");
                    spanId.push(a);
                }
            }
            // spanId.push(number);
            function sortNumber(a,b){
                return a - b;
            }
            spanId.sort(sortNumber);
            return spanId;
        }

        $("#imageMenu ul li").eq(0).attr("id","onlickImg");
        $("#midimg").attr("src", obj.pictures[0].img_url);

        /* 加减 库存数量 */
        $("#amount_num").on("input", function(){
            var text = $(this).val();
            if (text > Stock) {
                $(".overNumber").show();
            }else{
                $(".overNumber").hide();
            }
            Numbers = text;
        });
        $("#amount_num").blur(function(){
            var text = $(this).val();
            if(text <= 0 || text == ""){
                $(this).val(1);
            }
        });
        $(".amount_max").click(function(){
            if(obj.promotion != ""){
                if(Numbers <= Stock-1){
                    Numbers++;
                }
            }else{
                if(Numbers <= Stock-1){
                    Numbers++;
                }
            }
            $(this).siblings(".amount_num").val(Numbers);
            $(this).siblings(".amount_min").removeAttr("style");
            var text = $(this).siblings(".amount_num").val();
            if (text > Stock) {
                $(".overNumber").show();
            }else{
                $(".overNumber").hide();
            }
            if(text == Stock){
                $(this).css("color","#c5c5c5");
            }else{
                $(this).removeAttr("style");
            }
        });
        $(".amount_min").click(function(){
            var text = $(this).siblings(".amount_num").val();
            if(text > 1){
                Numbers--;
                $(this).siblings(".amount_num").val(Numbers);
            }
            text = $(this).siblings(".amount_num").val();
            if (text > Stock) {
                $(".overNumber").show();
            }else{
                $(".overNumber").hide();
            }
            if(text == 1){
                $(this).css("color","#c5c5c5");
            }
            $(this).siblings(".amount_max").removeAttr("style");
        });

        var text = $(".amount_num");
        for(var i=0; i<text.length; i++){
            if(text.eq(i).text() == 1){
                $(".amount_min").eq(i).css("color","#c5c5c5");
            }
        }

        //列表菜单切换
        tab("#menuTab");
        function tab(getId) {
            var menuTab = $(getId +" .product_info_title li");
            menuTab.click(function(){
                var tabId = $(this).attr("id");
                menuTab.removeAttr("class");
                $(this).addClass("red");

                $(".tabMenu").hide();
                var activeTab = $(this).attr("data-url");
                $(activeTab).show();
                $('html,body').animate({scrollTop: 713},500);
            });
        }

        $(window).scroll(function(){
            if($(this).scrollTop()>713) {
                $("#menuTab .product_info_title").addClass("scroll_top_text");
                $(".scroll_top").removeClass("Nhide").css({"opacity":"1","top":"0"});
                // $(".left_floor").show(300);
                // $("#menuTab2").html($("#menuTab").html());
                // tab("#menuTab2");
            }else{
                $("#menuTab .product_info_title").removeClass("scroll_top_text");
                $(".scroll_top").css({"opacity":"0"}).addClass("Nhide");
                // $(".left_floor").hide(300);
                // $("#menuTab").html($("#menuTab2").html());
                // tab("#menuTab");
            }
        });

        $(".jrjhd").click(function(){
            var number = $(".content_amount .amount_num").val();
            var goods = {
                'goods_id': obj.goods.goods_id,
                'number'  : number,
                'spec'    : ''
            };
            var data = {'goods':JSON.stringify(goods)};
            com.executeAjax(cartUrl + orderServiceUrl.cart_add, data, "POST", function (result) {
                var content = '<div class="f_c_666 center" style="height: 115px;margin-top: 15px">商品已成功加入进货单！</div>';
                var object = {
                    getid        : $("#orders_mask"),
                    text_title   : "提示",
                    text_content : content,
                    text_input2  : "继续购物",
                    text_input1  : "去结算"
                };
                com.mask(object);
                $("#titleTemp2_main").load("lib/temp/page_title2.html");
                $(".mask_confirm").click(function () {
                    window.location = '/purchase_orders.html';
                })
            });
        });
        setTimeout(function () {
            MoveImg();
        },100)
    });

    function buyNow(data){
        var data = {'goods':JSON.stringify(data)};
        com.executeAjax(cartUrl + orderServiceUrl.cart_add, data, "POST", function (result) {
            window.location = '/purchase_orders.html';
        });
    }
});

/**
 * Created by Gold on 2016/10/20.
 */

//分别加载页眉，页脚
$("#titleTemp_main").load("lib/temp/page_title.html");
$("#bottomTemp_main").load("lib/temp/page_bottom.html");

function orders_one_init(){
    //购物车商品列表
    // com.executeAjax(cartUrl + orderServiceUrl.cart_get, "", "GET", function () {
        com.executeAjax(cartUrl + orderServiceUrl.cart_get, "", "GET", function (result) {
            var res = result.data.list;
            var app = new Vue({
                el: '#list_template',
                data: {list: []},
                methods: {
                    remove: function (obj) {
                        removeOrder(obj.rec_id, obj.goods_id);
                    },
                    toInfo: function (Id) {
                        window.open("product_list_info.html?infoId=" + Id);
                    }
                }
            });
            app.list.splice(result.data.list.length);
            app.list = result.data.list;

            var app2 = new Vue({
                el: '#sum_template',
                methods: {
                    gotoCheckout: function (event) {
                        var cookieUserName = $.cookie("ECS[username]");
                        if (cookieUserName) {
                            window.location = 'purchase_orders_info.html';
                        } else {
                            com.maskLogin($("#del_orders_mask"));
                        }
                    }
                }
            });

            setTimeout(function () {
                var a = 0;
                $.each(res, function (i, object) {
                    if (object.selected) {
                        a++;
                        $(".radioInput").eq(i).find("input").siblings(".copy_input").find("img").show();
                        $(".radioInput").eq(i).find("input").attr("checked", "checked");
                        var value = $(".radioInput").eq(i).find("input").val();
                        //单选按钮接口
                        var data = {
                            cart_id: parseInt(value),
                            select: 1    //是否勾选 0=否；1=是
                        };
                        com.executeAjax(cartUrl + orderServiceUrl.cart_set_select, data, "POST", function (result) {
                            $("#Amount").text(result.data.total_amount);
                            $("#number").text(result.data.total_count);
                        });
                    }
                    if (res.length == a) {
                        $("#allSelect").siblings(".copy_input").find("img").show();
                        $("#allSelect").attr("checked", "checked");
                        var data = {
                            select: 1    //是否勾选 0=否；1=是
                        };
                        com.executeAjax(cartUrl + orderServiceUrl.cart_set_select_all, data, "POST", function (result) {
                            $("#Amount").text(result.data.total_amount);
                            $("#number").text(result.data.total_count);
                        });
                    }
                });

                if (result.data.total_count <= 0) {
                    $("#bupInput1,#notData").show();
                    $("#bupInput2").hide();
                } else {
                    $("#bupInput1,#notData").hide();
                    $("#bupInput2").show();
                }

                orders_one();
            }, 100);

            /*var version = com.browserVersion();
             version = version.split(":");
             version = version[0];
             if(version === "IE"){
             setTimeout(function () {
             if(!window.name){
             window.name = 'test';
             window.location.reload();
             }
             },300);
             }*/

        });
    // });
};

function orders_one(){

    var productNumber = 0;
    $("#number").text(productNumber);

    //单选
    $(".classInput").click(function(){
        var  isChecked = $(this).attr("checked");
        var  inputValue = $(this).val();
        if(isChecked === undefined){
            selectInput(1, inputValue);
            $(this).siblings(".copy_input").find("img").show();
            $(this).attr("checked","checked");
        }else{
            selectInput(0, inputValue);
            $(this).siblings(".copy_input").find("img").hide();
            $(this).removeAttr("checked","checked");
        }

        var isTrue = [];
        var $moneyAll = $(".content table tr");
        for(var i=1; i<$moneyAll.length; i++){
            var a = $(".content table tr").eq(i).find("input").attr("checked");
            isTrue.push(a);
        }

        /*consoleLog(isTrue);
         consoleLog(isTrue.indexOf(undefined));*/
        if(isTrue.indexOf(undefined) === -1){
            $(".content table tr th .copy_input").find("img").show();
            $(".content table tr th input").attr("checked","checked");
        }else{
            $(".content table tr th .copy_input").find("img").hide();
            $(".content table tr th input").removeAttr("checked","checked");
        }

        //单选按钮接口
        function selectInput(isSelect, inputValue) {
            var data = {
                cart_id : parseInt(inputValue),
                select  : isSelect    //是否勾选 0=否；1=是
            };
            com.executeAjax(cartUrl + orderServiceUrl.cart_set_select, data, "POST", function (result) {
                $("#Amount").text(result.data.total_amount);
                $("#number").text(result.data.total_count);
                if(result.data.total_count <= 0){
                    $("#bupInput1").show();
                    $("#bupInput2").hide();
                }else{
                    $("#bupInput1").hide();
                    $("#bupInput2").show();
                }
            });
        }
    });


    //全选
    $("#allSelect").click(function(){
        var number = [];
        var $money = $(".content table tr");
        var text3 = $(this).attr("checked");
        for(var i=1; i<$money.length; i++){
            var a = $(".content table tr").eq(i).find("input").attr("checked");
            number.push(a);
            if(a === undefined){
                selectAllInput(1);
                $(this).siblings(".copy_input").find("img").show();
                $(".content table tr td .copy_input").find("img").show();
                $(".content table tr th input").attr("checked","checked");
                $(".content table tr").eq(i).find("input").attr("checked","checked");
                productNumber++;
                $("#number").text(productNumber);
            }else if(text3 === "checked"){
                var $money = $(".content table tr");
                for (var i = 1; i < $money.length; i++) {
                    selectAllInput(0);
                    // $("#Amount").text("0.00");
                    $(this).siblings(".copy_input").find("img").hide();
                    $(".content table tr td .copy_input").find("img").hide();
                    $(".content table tr td input,.content table tr th input").removeAttr("checked");
                    productNumber=0;
                    $("#number").text(productNumber);
                }
            }
        }

        //全选按钮接口
        function selectAllInput(isSelect) {
            var data = {
                select  : isSelect    //是否勾选 0=否；1=是
            };
            com.executeAjax(cartUrl + orderServiceUrl.cart_set_select_all, data, "POST", function (result) {
                $("#Amount").text(result.data.total_amount);
                $("#number").text(result.data.total_count);
                if(result.data.total_count <= 0){
                    $("#bupInput1").show();
                    $("#bupInput2").hide();
                }else{
                    $("#bupInput1").hide();
                    $("#bupInput2").show();
                }
            });
        }
    });

    $(".amount_max").click(function(){
        var inputValue = $(this).parent().parent().parent().find(".classInput").val();
        var text = $(this).siblings(".amount_num").text();
        text++;
        $(this).siblings(".amount_num").text(text);
        $(this).siblings(".amount_min").removeAttr("style");
        update(inputValue, $(this).siblings(".amount_num").text(), this);
    });
    $(".amount_min").click(function(){
        var inputValue = $(this).parent().parent().parent().find(".classInput").val();
        var text = $(this).siblings(".amount_num").text();
        if(text > 1){
            text--;
            $(this).siblings(".amount_num").text(text);
        }
        text = $(this).siblings(".amount_num").text();
        if(text == 1){
            $(this).css("color","#c5c5c5");
        }
        update(inputValue, $(this).siblings(".amount_num").text(), this);
    });

    //修改商品数量接口
    function update(inputValue, number, money) {
        var isCheckbox = $('input[type=checkbox]').is(':checked');
        consoleLog(isCheckbox);
        var data = {
            cart_id : parseInt(inputValue),
            count  : number    //是否勾选 0=否；1=是
        };
        com.executeAjax(cartUrl + orderServiceUrl.cart_set_count, data, "POST", function (result) {
            if(isCheckbox){
                $("#Amount").text(result.data.total_amount);
                $("#number").text(result.data.total_count);
            }
            // $(money).parent().parent().parent().find(".money").text(result.data.total_amount);
        });
    }

    var text = $(".amount_num");
    for(var i=0; i<text.length; i++){
        if(text.eq(i).text() == 1){
            $(".amount_min").eq(i).css("color","#c5c5c5");
        }
    }



}

function removeOrder(rec_id, goods_id) {
    //删除订单
    var content = '<div class="mask_content"><i class="icon_warning fl"></i><p class="orange fs_24px">删除商品？</p><p class="fs_14px li_he_30px">您可以选择移动关注，或删除商品。</p></div>';
    var object = {
        getid        : $("#del_orders_mask"),
        text_title   : "提示",
        text_content : content,
        text_input1 : "删除",
        text_input2 : "移到我的关注"
    }
    com.mask(object);
    $(".mask_cancel").addClass("bg_line_red bor_rad_5px white addConcern").removeClass("bg_line_gray mask_cancel").css("border","none");

    $(".addConcern").click(function () {
        var data = {
            'goods_id':goods_id
        };
        com.executeAjax(userCenterUrl+orderServiceUrl.add_collection,data, "POST", function (result) {
            $("#del_orders_mask").hide();
        });
    });

    $(".mask_confirm").click(function () {
        com.executeAjax(cartUrl + orderServiceUrl.cart_drop, {cart_id:rec_id}, "POST", function (result) {
            $("#del_orders_mask").hide();
            location.reload();
            orders_one_init();
        });
    });
}

function orders_two_init(){
    var selected_addr = {},isShow = true;
    //购物车商品列表
    com.executeAjax(orderUrl + orderServiceUrl.checkout, "", "GET", function (result) {
        new Vue({
            el: '#addrs_template',//收货地址
            data: result.data,
            methods:{
                remove:function(rec_id){
                    var content2 = '<div class="mask_content"><i style="margin-top: -5px;margin-left: 30px" class="icon_warning fl"></i><p class="orange fs_24px">删除收货地址？</p></div>';
                    var object2 = {
                        getid        : $("#orders_mask"),
                        text_title   : "提示",
                        text_content : content2
                    };
                    com.mask(object2);
                    $(".mask_confirm").click(function(){
                        $(".bg_mask,.mask_main").hide();

                        //购物车商品列表
                        com.executeAjax(userAddressUrl + orderServiceUrl.cart_drop, {address_id:rec_id}, "GET", function (result) {
                            location.reload();
                            orders_two_init();
                        });

                        $(".toggle_card").eq(0).click();
                    });
                },
                update:function (data) {
                    addAddress('update', data.province, data.city, data.district, data.address_id);
                    var updateVm = new Vue({
                        el: '#dataUpdate',//订单信息
                        data: {list:data}
                    });
                    var updateVm2 = new Vue({
                        el: '#dataUpdate2',//订单信息
                        data: {list:data}
                    });
                },
                toggleCard:function (data) {
                    isShow = false;
                    selected_addr = selected_addr = data;
                    $("#name").text(data.consignee);
                    $("#mobileNumber").text(data.mobile);
                    $("#selected_address").text(data.province_name + data.city_name + data.district_name + data.address);
                    // orderAddAddress(data);
                }
            }
        });

        var order = new Vue({
            el: '#order_goods_template',//订单商品
            data: result.data,
            methods:{
                remove:function(rec_id){
                    alert(rec_id);
                }, 
                toInfo:function (Id){
                    window.open("product_list_info.html?infoId="+Id);
                }
            }
        });

        /*var update1 = new Vue({
            el: '#confirmAddress',//订单商品
            data: {addr:result.data.address_list[0]},
            methods:{
                UpDate2:function () {
                    alert(1);
                    // addAddress('update', data.province, data.city, data.district, data.address_id);
                    // var updateVm = new Vue({
                    //     el: '#dataUpdate',//订单信息
                    //     data: {list:data}
                    // });
                    // var updateVm2 = new Vue({
                    //     el: '#dataUpdate2',//订单信息
                    //     data: {list:data}
                    // });
                }
            }
        });*/

        //订单信息
        if(isShow){
            if(result.data.address_list.length>0){
                selected_addr = result.data.address_list[0];
            }
        }
        result.data.selected_addr = selected_addr;
        var order_two_vue = new Vue({
            el: '#order_sum_template',//订单信息
            data: result.data,
            methods:{
                submitOrder:function(event){
                    var data = {
                        address_id : selected_addr.address_id,
                        postscript : $('#postscript').val()
                    };
                    com.executeAjax(orderUrl + orderServiceUrl.create, data, "POST", function (result) {
                        window.location = 'purchase_orders_buy.html?orderid='+ result.data;
                    });
                },
                update:function (data) {
                    addAddress('update', selected_addr.province, selected_addr.city, selected_addr.district, selected_addr.address_id);
                    var updateVm = new Vue({
                        el: '#dataUpdate',//订单信息
                        data: {list:selected_addr}
                    });
                    var updateVm2 = new Vue({
                        el: '#dataUpdate2',//订单信息
                        data: {list:selected_addr}
                    });
                }
            }
        });
        orders_two();
    });
}
function orders_two(){

    $(".toggle_card").eq(0).addClass('border_red').removeClass('border').find('img').show();

    $(".toggle_card").click(function () {
        $(".toggle_card").removeClass("border_red").addClass("border_e7").attr("data","false").find("img").hide();
        $(this).addClass("border_red").removeClass("border_e7").attr("data","true").find("img").show();
    });

    var input1 =  $(".change_address li").eq(0).find("input");

    $(".upload_bg").click(function(){
        addAddress('add');
    });
}

function addAddress(typeOf, provinceCode, cityCode, areaCode, addressId){

    var object = {
        getid        : $("#orders_mask"),
        text_title   : "编辑收货人信息",
        text_content : $("#update_Address").html(),
        text_input1 : "保存收货人信息",
        text_input2 : ""
    };

    if(typeOf == 'add'){
        object.text_title = "添加收货人信息";
        object.text_input1 = "添加收货人信息";
        object.text_content = $("#orders_mask_con").html();
    }

    com.mask(object);
    $(".mask_cancel").hide();
    $(".mask_input").css({"left":"95px","margin-left":"0px","bottom":"30px"});

    com.executeAjax(regionUrl + orderServiceUrl.region_get, "", "GET", function (result) {
        var vm1 = new Vue({
            el: '#Province',
            data: {options : result.data}
        });

        if(typeOf == 'update'){
            $("#s_province option[value="+ provinceCode +"]").attr("selected", true);
            City_fun(provinceCode);
            setTimeout(function () {
                $("#s_city option[value="+ cityCode +"]").attr("selected", true);
            },100);
            Area_fun(cityCode);
            setTimeout(function () {
                $("#s_county option[value="+ areaCode +"]").attr("selected", true);
            },100);
        }

        if(typeOf == 'add'){
            //初始化
            City_fun(result.data[0].region_id, true);
        }

        var province = $("#Province select");
        province.on("change",function(){
            var ProId = $(this).val();
            City_fun(ProId,true);
            var City = $("#City select");
            City.on("change",function(){
                var ProId = $(this).val();
                Area_fun(ProId);
            });

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
        });
    }

    $("#input1").on("input",function(){
        var text = $(this).val();
        if(text.length < 2 || text.length > 20){
            $(".ErrorText").eq(0).show().attr("data","false");
        }else{
            $(".ErrorText").eq(0).hide().attr("data","true");
        }
    });

    var $input1 = $(".change_address li").eq(0).find("input");
    var $input2 = $("#phoneNumber");
    var $input3 = $(".change_address li").eq(4).find("input");

    isTextNull($input3);
    com.number("phoneNumber");

    function isTextNull($input1){
        $input1.on("input", function(){
            if($(this).val() == ""){
                $(this).siblings(".ErrorText").show();
                $(this).siblings(".ErrorText").attr("data","false");
            }else{
                $(this).siblings(".ErrorText").hide();
                $(this).siblings(".ErrorText").attr("data","true");
            }
        });
    }

    $input2.on("input",function(){
        com.Phone_Number($(this).val(),$(".ErrorText").eq(1),"请填写正确的手机号码");
        var text = $(".ErrorText").eq(1).attr("available");
        if(text === "false"){
            $(".ErrorText").eq(1).show().attr("data","false");
        }else{
            $(".ErrorText").eq(1).hide().attr("data","true");
        }
    });

    var isAdd;
    $(".mask_confirm").click(function(){
        var input1Val1 = $(".change_address li").eq(0).find("input").val();
        var input1Val2 = $("#phoneNumber").val();
        var input1Val3 = $(".change_address li").eq(4).find("input").val();
        var input1Val4 = $(".change_address li").eq(1).find("input").val();
        var input1Val5 = $(".change_address li").eq(5).find("input").val();
        var select1 = $(".province select").eq(0).val();
        var select2 = $(".province select").eq(1).val();
        var select3 = $(".province select").eq(2).val();
        var phone1  = $("#phoneNumber").val();
        var phone2  = $("#tel").val();

        if(input1Val1.length < 2){
            $(".ErrorText").eq(0).show();
        }else{
            $(".ErrorText").eq(0).hide();
        }if(input1Val2 === ""){
            $(".ErrorText").eq(1).show();
        }else{
            $(".ErrorText").eq(1).hide();
        }if(select1 === "省份" || select2 === "地级市" || select3 === "市、县级市"){
            $(".ErrorText").eq(2).show();
        }else{
            $(".ErrorText").eq(2).hide();
        }if(input1Val3 == ""){
            $(".ErrorText").eq(3).show();
        }else{
            $(".ErrorText").eq(3).hide();
        }

        var isTrue = [];
        var a = $("#orders_mask").find(".ErrorText").length;
        for(var i=0; i<a; i++){
            var b = $("#orders_mask").find(".ErrorText").eq(i).attr("data");
            isTrue.push(b);
            consoleLog(b);
        }
        if(isTrue.indexOf("false") == -1){
            if(typeOf == 'add'){
                isAdd = -1;
            }else{
                isAdd = addressId;
            }
                var data = {
                    'address_id'  : isAdd,               //收货地址id 大于0为编辑，其他为新增
                    'address_name': input1Val4,        //公司名称,别名
                    'province'    : select1,                  //省id
                    'city'        : select2,                   //地级市id
                    'district'    : select3,              //县区id
                    'address'     : input1Val3,        //详细地址
                    'consignee'   : input1Val1,            //收货人
                    'mobile'      : phone1,       //手机
                    'tel'         : phone2,        //固定电话
                    'email'       : input1Val5    //邮箱
                };
                com.executeAjax(userAddressUrl + orderServiceUrl.address_save, data, "POST", function (result) {
                    $("#orders_mask").hide();
                    // orders_two_init();
                    location.reload();
                });
        }
    });

}

var money = 0;
function orders_three_init(){
    var orderid = getQueryString('orderid');
    if(!orderid){
        alert('支付订单不存在');
        return ;
    }
    //购物车商品列表
    com.executeAjax(orderUrl + orderServiceUrl.order_for_pay, {orderid:orderid}, "GET", function (result) {
        if(result.code == "1000"){
            com.maskError($("#del_orders_mask"), result.msg);
            setTimeout(function () {
                self.location=document.referrer;
            },2800);
        }else{
            money = result.data.order_amount;
        }
        new Vue({
            el: '#order_info_template',//订单基本信息
            data: result.data
        });

        var date1 = result.data.server_time; //现在时间
        var date2  = result.data.pay_expire_time2; //距离结束时间

        var $input = $("#remainTime");
        var successFun2 = function (result) {
            $input.text(result.Hour+"时"+result.Minute+"分"+result.Second+"秒");
        };
        var errorFun2 = function () {
            $("#text1,#text2").hide();
            $input.text("你的订单超时，已自动取消");
            $("#text3").text("订单已取消");
            $(".success_img").attr("src","/img/icon_rz_error.png");
            $(".submit_order").css({"background":"#999","cursor":"auto"});
            $(".submit_order").removeAttr("onclick");
        }
        com.countDown(date1, date2, successFun2, errorFun2);

        orders_three();
    });
}

function orders_three() {
    //切换支付方式
    $(".toggle_buy li").click(function () {
        $(".toggle_buy li").removeAttr("id");
        $(this).attr("id", "toggle_buy_click");

        $(".toggle_buy_content li").hide();
        var activeTab = $(this).attr("data-url");
        $(activeTab).show();
    });

    $("#order_info").click(function () {
        $(".orders_buy_info").toggle();
        $(this).find("i").toggleClass("rotate_180");
    });

    $(".toggle_buy_content").find("ol i").click(function () {
        $(".toggle_buy_content").find("ol input").removeAttr("checked", "checked");
        $(this).siblings("input").attr("checked", "checked");
    });
    // com.countdown(3600 * 2, "#remainTime");
}
function pay_now(type){
    var orderid = getQueryString('orderid');
    if(!orderid){
        alert('支付订单不存在');
        return ;
    }
    var selectVal = '';
    switch (type){
        case 'platform':
            selectVal = $('#tab1 input[name="Pay1"]:checked').val();
            if(selectVal == 'weixin'){
                var wxurl = '/newapi/pay_online.php?type=platform&defaultbank=weixin&orderid='+orderid+'&t='+(new Date().getTime());
                var content2 = '<div class="pos_rel fs_14px" style="width: 730px;"><img width="235" height="233" class="fl wechat_img1" src="'+wxurl+'"/><img class="fr mar_r_10px" src="img/wechat2.png"/><div class="center li_he_20px wechat_text"><p>请使用<span class="orange">&nbsp;微信&nbsp;</span>扫一扫</p><p class="center">二维码完成支付</p></div></div>';
                var object2 = {
                    getid        : $("#del_orders_mask"),
                    text_title   : "微信支付",
                    text_content : content2
                };
                com.mask(object2);
                $(".mask_main").css("width","730px");
                $(".mask_input").hide();
                $(".mask_confirm").click(function () {
                    $(".bg_mask,.mask_main").hide();
                });
                var DivHeight = $(".mask_main").outerHeight();
                var DivWidth = $(".mask_main").outerWidth();
                $(".mask_main").css({'margin': '-'+parseInt(DivHeight)/2 +'px ' + '-'+parseInt(DivWidth)/2 +'px'});

                setInterval(function () {
                    com.executeAjax(orderUrl+orderServiceUrl.pay_status, {orderid:orderid}, "GET", function (result) {
                        if(result.data > 0){
                            location.href = "/pay_success.html?out_trade_no="+orderid+"&total_fee="+money;
                        }
                    });
                },1000);

                return false;
            }
            break;
        case 'bank':
            selectVal = $('#tab2 input[name="Pay2"]:checked').val();
            break;
        case 'credit_card':
            selectVal = $('#tab3 input[name="Pay3"]:checked').val();
            break;
        case 'ent_bank':
            selectVal = $('#tab4 input[name="Pay4"]:checked').val();
        default:
            alert('请选择支付方式');
            return ;
    }
    if(!selectVal){
        alert('请选择支付方式');
        return ;
    }
    window.open('/newapi/pay_online.php?orderid='+orderid+'&type='+type+'&defaultbank='+selectVal);

    setTimeout(function () {
        var content3 = '<div class="pos_rel"><p class="fs_18px f_c_333 center mar_t_30px"><b>请您在新打开的网上银行页面进行支付，支付完成后选择：</b></p><p class="fs_14px f_c_333 center mar_t_25px"><img src="img/pay_success1.png" class="pay1" />若您支付成功：<a href="/center/orders.html?infoid=2"><span class="green curP">查看订单</span></a><a href="/main.html"><span class="green mar_l_10px curP">继续购物</span></a></p><p class="fs_14px f_c_333 center mar_t_13px"><img src="img/pay_success2.png" class="pay2" />若您支付失败：<span class="orange curP" id="shuaXin">重新支付</span><span class="orange mar_l_10px curP">联系在线客服</span></p></div>';
        var object3 = {
            getid        : $("#del_orders_mask"),
            text_title   : "支付反馈",
            text_content : content3
        };
        com.mask(object3);
        $(".mask_input").hide();
        $("#shuaXin").click(function () {
            location.reload();
        })
        $(".mask_main").css("height","200px");
        var DivHeight = $(".mask_main").outerHeight();
        var DivWidth = $(".mask_main").outerWidth();
        $(".mask_main").css({'margin': '-'+parseInt(DivHeight)/2 +'px ' + '-'+parseInt(DivWidth)/2 +'px'});

    },300);

}
/**
 * Created by Gold on 2016/10/19.
 */
$(function(){
    com.numAndEng("pwd1");
    com.numAndEng("pwd2");
    com.number("phoneNumber");

    var input1 = $(".login_main_content ul li").eq(0).find("input");
    var input2 = $(".login_main_content ul li").eq(1).find("input");
    var input3 = $(".login_main_content ul li").eq(2).find("input");
    var input5 = $(".login_main_content ul li").eq(3).find("input");
    var input6 = $(".login_main_content ul li").eq(4).find("input");
    var input7 = $(".login_main_content ul li").eq(5).find("input");

    inputText(input1,4);
    inputText(input2,6);

    clickInput(input1);
    clickInput(input2);
    clickInput(input3);
    clickInput(input5);
    clickInput(input6);
    clickInput(input7);

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
            $(this).siblings("span").eq(2).hide();
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
	
	input1.blur(function(){
		var text = $(this).siblings("span").eq(1).attr("data");	
		if(text === "true"){			
			var url  = userLoginUrl+orderServiceUrl.check_name;		    			
			var data = {			
				username : $('#username').val(),               					    
			};			
			var success_callback = function(obj){
				if(obj === 1){
					$(".login_main_content ul li").eq(0).find("span").eq(2).show();
					$(".login_main_content ul li").eq(0).find("span").eq(1).attr("data","false");
				}
			};
					
			com.executeAjax(url, data, "POST", success_callback);
		}
	})
	
	input5.blur(function(){
		var text = $(this).siblings("span").eq(1).attr("data");
		if(text === "true"){
			var url  = userLoginUrl+orderServiceUrl.check_mobile;		    
			var data = {								
				mobile: $('#phoneNumber').val(),                
			};			
			var success_callback = function(obj){
				if(obj === 1){
					$(".login_main_content ul li").eq(3).find("span").eq(2).show();
					$(".login_main_content ul li").eq(3).find("span").eq(2).attr("data","false");
				}
			};
			com.executeAjax(url, data, "POST", success_callback);
		}
	});
    
    input3.on("input",function(){
        var text = $(this).val();
        $(this).siblings("span").eq(0).hide();
        var a = input2.siblings("span").eq(1).attr("data");
        if(a === "true"){
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
        }else{
            $(this).siblings("span").eq(1).attr("data","false");
            $(this).siblings("span").eq(1).show();
            $(this).siblings(".chose_color").hide();
            $(this).addClass("border_red");
        }
    });

    input3.on("input",function(){
        var text = $(this).val();
        $(this).siblings("span").eq(0).hide();
        var a = input2.siblings("span").eq(1).attr("data");
        if(a === "true"){
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
        }else{
            $(this).siblings("span").eq(1).attr("data","false");
            $(this).siblings("span").eq(1).show();
            $(this).siblings(".chose_color").hide();
            $(this).addClass("border_red");
        }
    });

    input5.on("input",function(){
        com.Phone_Number($(this).val(),$(".numberError"));
        var text = $(this).siblings("span").eq(1).attr("available");
        if(text == "true"){
            $(this).siblings("span").eq(1).attr("data","true");
            $(this).siblings("span").eq(1).hide();
        }else{
            $(this).siblings("span").eq(1).attr("data","false");
            $(this).siblings("span").eq(1).show();
        }
        var index = $(this).parent("li").index();
        $(this).siblings("span").eq(0).hide();
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

    $("#selProvince").click(function(){
        var text = $(this).text();
        provinceChange(text)
    });

    $(".now_login").click(function(){
        var text = $(".login_main_content ul li");
        var isTrue = [];
        for(var i=0; i<text.length; i++){
            var a = $(".login_main_content ul li").eq(i).find("span").eq(1).attr("data");
            isTrue.push(a);
        }
        var c = $("#agreementInput").attr("data");
        isTrue.push(c);

        consoleLog(isTrue);
        if(isTrue.indexOf("false") == -1){
			var url  = userLoginUrl+orderServiceUrl.register;
			var data = {
				username : $('#username').val(),
				psw      : $.md5($('#pwd1').val()),
				realname : $('#real_name').val(),
				mobile   : $('#phoneNumber').val(),
				province : $('#selProvince').val(),
			    city     : $('#selCity').val(),
                province_name :$('#selProvince').find('option:selected').text(),
                city_name : $('#selCity').find('option:selected').text(),
                tuijian : $('#tuijian').val()
			}
			var success_callback = function(obj){
				location.href = 'register_success.html';
			}
			com.executeAjax(url, data, "POST", success_callback);
        }
    });

    var yzm;			//验证码值
    var wait = 100;				//倒计时时间
    var yzmInput = $(".time");	//input对象

    var a1 = $(".login_main_content ul li").eq(4).find("span").eq(1).attr("data");
    var a2 = $(".login_main_content ul li").eq(5).find("span").eq(1).attr("data");
    if(a1 === "false" || a2 === "false"){
        $("#hqyzm").css("color","#d0d0d0");
    }

	var pwdString = 0;
    var url  = userLoginUrl+orderServiceUrl.my;
    var data = {
        code : 'my'
    };
    var success_callback = function(obj){
           pwdString = obj;
		   pwdString = JSON.stringify(pwdString);
           pwdString = pwdString.replace('"','');
		   pwdString = pwdString.replace('"','')
   };
    com.executeAjax(url, data, "POST", success_callback);

    yzmInput.click(function(){
        var b1 = $(".login_main_content ul li").eq(3).find("span").eq(1).attr("data");
        var b2 = $(".login_main_content ul li").eq(4).find("span").eq(1).attr("data");
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

    input7.on('input',function(){
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

    /****** 验证码 ******/

    var inp = document.getElementById('inputCode');
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
            if(result){
//                    consoleLog('验证成功');
                $(".yzmError").attr("data","true");
                $(".yzmError").hide();
                $("#hqyzm").css("color","#666");
            }else{

                if(this.opt.question){
//                        consoleLog('验证失败:'+code.answer);
//                     $(".yzmError").show();
//                     $(".yzmError").attr("data","false");
                }else{
//                        consoleLog('验证失败:'+code.strCode);
//                        consoleLog('验证失败:' + code.arrCode);
                    $("#hqyzm").css("color","#d0d0d0");
                    $(".yzmError").show();
                    $(".yzmError").attr("data","false");
                }
            }
        }
    });

    var data = {
        Province : "#Province",
        City  : "#City",
        isShow: false
    };
    com.provinceCityArea(data);


    var isAgree = true;
    $("#agreement").click(function () {
        var content = "<div id='agree' style='height: 450px;overflow-y: scroll'></div><p class='agreeInput white bg_light_dd3e3e'>同意并继续</p>";
        var object = {
            getid        : $("#alert_mask"),
            text_title   : "提示",
            text_content : content
        }
        com.mask(object);
        $("#agree").load("/agreement/agreement_01.html");
        $(".mask_main").css({"width":"800px","padding":"60px 0px 30px 20px"});
        $(".mask_input").hide();

        $(".agreeInput").click(function () {
            $(".bg_mask,.mask_main").hide();
            if(isAgree){
                $("#agreementInput").click();
                isAgree = false;
            }
        });

        var DivHeight = $(".mask_main").outerHeight();
        var DivWidth = $(".mask_main").outerWidth();
        $(".mask_main").css({'margin': '-'+parseInt(DivHeight)/2 +'px ' + '-'+parseInt(DivWidth)/2 +'px'});
    });
})
/**
 * Created by Gold on 2016/11/21.
 */

$(function () {
    //分别加载页眉，头部，页脚，侧边栏
    $("#titleTemp_main").load("lib/temp/page_title.html");
    $("#titleTemp2_main").load("lib/temp/page_title2.html");
    $("#bottomTemp_main").load("lib/temp/page_bottom.html");
    $("#sidebarTemp_main").load("lib/temp/page_sidebar.html");
    com.isTitleMenuShow(false);
    // var Width = $("body").outerWidth();
    // $(".img_banner").css("min-width", 1190+"px");
});

function special_district() {
    var url2  = promote1Url+orderServiceUrl.brand;
    var BrandId   = []; //品牌id
    var BrandName = []; //品牌name
    var isScr = true;

    com.executeAjax(url2, "", "GET", function (result) {
        var app = new Vue({
            el   : "#floorBrand",
            data : {list:result.brand}
        });

        var p=0;
        var stop=true;    //触发开关，防止多次调用事件

        //循环Brand id 存放
        $.each(result.brand, function (i, obj) {
            BrandId.push(obj.brand_id);
            BrandName.push(obj.brand_name);
        });

        ScrollData(p);
        p=p+1;  //当前要加载的页码
        $(window).scroll(function() {
            //当内容滚动到底部时加载新的内容 100当距离最底部100个像素时开始加载.
            if ($(this).scrollTop() + $(window).height() + 410 >= $(document).height() && $(this).scrollTop() > 410) {
                if(stop){
                    stop=false;
                    // $(".loading").show();

                    //滚动一次加载一次  p 是用数组下标到BrandId去拿id
                    ScrollData(p);
                    p=p+1;  //当前要加载的页码
                    stop=true;
                }
            }
        });

        $(".floor li").click(function(){
            if(!stop){
                return false;
            }
            var text2 = $(this).index();    //点击当前的下标
            for(var i=0; i<text2; i++){     //循环点的第几个，就加载多少次
                setTimeout(function () {
                    ScrollData(p);
                    p=p+1;//当前要加载的页码
                },i*100);
            }

            if(isScr){
                setTimeout(function () {
                    scr();
                    isScr = false;
                },100*text2);
            }else{
                scr();
            }

            function scr() {
                var floor      = $(".title_text");
                var clickFloor = [];
                for(var i=0; i<floor.length; i++){
                    var text = $(".title_text").eq(i).offset().top;
                    clickFloor.push(text);
                    clickFloor[0] = 1135;
                }
                $('html,body').animate({
                    scrollTop : clickFloor[text2-1]
                },300);
            }
        });

        var floorHeight = $(".floor").outerHeight();
        $(".floor").css("margin-top","-"+floorHeight/2+"px");

        $("#backTop").click(function () {
            com.backTop();
        });

        $("#top1").click(function () {
            var top = $(".background").offset().top;
            $('html,body').animate({
                scrollTop : top+30
            },300);
        });


        function ScrollData(p) {
            // consoleLog("+++++++++++++"+p);
            var Type = typeof BrandId[p] == "string";
            if(!Type){
                return false;
            }

            var url  = promote1Url+orderServiceUrl.goods+"&id="+BrandId[p];

            com.executeAjax(url, "", "POST", function (result) {
                /*$.each(result.goods, function (i, result) {
                    var name   = result.name.length;
                    var number = 33;

                    if(name > number){
                        result.name = result.name.substr(0,number)+"...";
                    }
                });*/
                isScr = false;
                // consoleLog("==========="+BrandId);
                // consoleLog("==========="+BrandName);
                // setTimeout(function () {
                // $(".loading").hide();
                var $html1 = '<p class="fs_24px white center title_text">【'+BrandName[p]+'】</p><ul class="over_hide special_list" id="list'+p+'"></ul>';
                $("#special_list").append($html1);
                $.each(result.goods, function (i, obj) {
                    var $html = '<li class="special_list_li"> ' +
                        '<div class="img"> ' +
                        '<img src="'+obj.thumb+'" /> ' +
                        '</div> ' +
                        '<p class="li_he_20px f_c_333 textHide fs_14px mar_t_15px" title="'+obj.name+'">'+obj.name+'</p> ' +
                        '<div class="over_hide pay_div">' +
                        '<div class="over_hide">' +
                        '<span class="red2 fl"><p class="fs_24px">'+obj.shop_price+'</p></span> ' +
                        '<div class="fr li_he_15px"> ' +
                        '<s class="fs_12px f_c_999">'+obj.promote_price+'</s> ' +
                        '<p class="fs_12px">已售<span class="red2">'+obj.cum_sales+'</span>件</p> ' +
                        '</div> ' +
                        '</div> ' +
                        '<span class="panic_buying toInfo" id='+ obj.id +'>立即抢购</span> ' +
                        '</div> ' +
                        '</li> ';
                        $("#list"+p).append($html);
                });
                // },1000);
                $(".toInfo").click(function () {
                    var Id = $(this).attr("id");
                    location.href = "product_list_info.html?infoId="+Id;
                });
            });
        }
    });

    Scroll();
    window.onscroll = function() {
        Scroll();
    }
    function Scroll() {
        var floor = $(".floor");
        var top   = $(".background").offset().top;
        var bottom   = $("#bottomTemp_main").offset().top-360;
        if($(document).scrollTop() > top) {
            floor.show();
        }else{
            floor.hide();
        }
        if($("body").scrollTop() > bottom) {
            floor.hide();
        }
    }

    var url3  = promote1Url+orderServiceUrl.goods+"&is_hot=1";
    com.executeAjax(url3, "", "POST", function (result) {
        var app1 = new Vue({
            el   : "#hotProducts",
            data : {list:result.goods},
            methods:{
                toInfo:function (id) {
                    location.href = "product_list_info.html?infoId="+id;
                }
            }
        })
    });
}