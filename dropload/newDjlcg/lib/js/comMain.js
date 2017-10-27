/**
 * Created by Gold on 2016/10/17.
 */


/****** page_title.html ******/
function page_title(){
    var cookieUserName =  $.cookie("ECS[username]");
    if(cookieUserName){
        global.isLogin = true;
    }else{
        global.isLogin = false;
        $(".dl,.ce").show();
        $(".dlSuccess").hide();
        $(".UserName").text("");
    }
    if(global.isLogin){
        $(".dl,.ce").hide();
        $(".dlSuccess").show();
        $(".UserName").text(cookieUserName);
    }

    $("#login").click(function () {
        location.href = "/login.html";
        //$("#loginMask").load("lib/temp/loginTemp.html");
        //$("#loginMask").removeAttr("class");
        //
        //setTimeout(function () {
        //    $('.closeMask').click(function(){
        //        $("#loginMask").addClass("Nhide");
        //    });
        //},100)
    });

    $("#exitUser").click(function () {

        com.executeAjax(userLoginUrl+orderServiceUrl.logout, {username:cookieUserName}, "POST", function (result) {
            if(result == 3){
                location.href = "/login.html";
            }
        })
    });
    $(".text2 li").mouseenter(function(){
        $(this).find(".isShow").show();
    });
    $(".text2 li").mouseleave(function(){
        $(this).find(".isShow").hide();
    });

    $("#login").mouseenter(function(){
        $(this).find(".login_bg").css("background","#c43737");
        $(this).find(".login_bg_text").css("color","#fff");
    });
    $("#login").mouseleave(function(){
        $("#login").find(".login_bg").removeAttr("style");
        $("#login").find(".login_bg_text").removeAttr("style");
    });
}


/****** page_title2.html ******/
function page_title2(){
    var cookieUserName =  $.cookie("ECS[username]");

    $("#toMain").click(function () {
        location.href = "/main.html"
    });

    $(".title2_menu ul li:not(.pos_three)").click(function () {
        var liIndex = $(this).index();
        // var wechats=document.getElementsByClassName('wechatimg')[0];
        switch (liIndex)
        {
            case 1:
                location.href = '/main.html';
                break;
            case 2:
                window.open('/BrandZone_More.html');
                break;
            // case 3:
            //     // window.open('/spike.html');
            //     break;
            case 3:
                window.open('http://djlzix.com/');
                break;
            case 4:
                window.open('/recruit_partner.html');
                break;
            /*case 6:
             window.open('/cityPartner.html');
             break;*/
            case 5:
                var userName = $.cookie("ECS[username]");
                if(userName){
                    window.open('/cityPartner.html');
                }else{
                    window.open('/dt/login.html');
                }
                break;
            case 6:
                window.open('/sell_hot.html');
                break;
        }
    });

    $(".title2_menu ul .pos_three .house_cen").click(function () {
        $(".listcenter").toggle();
    });

    $(".title2_input input").on("input propertychange",function(){
        var text = $(this).val();
        if(text.length > 0){
            //搜索列表
            com.executeAjax(suggestUrl+text, "", "GET", function (result) {
                var text1 = document.getElementById("search");
                var _success = function (text1) {
                    if(text1 !== ""){
                        com.executeAjax(searchUrl+text, "", "GET", function () {
                            location.href = '/product_list.html?keywords='+ text1;
                        });
                    }
                }
                var autoComplete=new AutoComplete('search', 'search_result', result, _success);
                text1.onkeyup = function(event) {
                    autoComplete.start(event);
                }
            });
            $(".search_result").show();
        }
    });


    $("#searchInput").click(function () {
        var searchText = $("#search").val();
        if(searchText !== ""){
            com.executeAjax(searchUrl+searchText, "", "GET", function (result) {
                location.href = '/product_list.html?keywords='+ searchText;
            });
        }
    });

    if(cookieUserName){
        //我的进货单
        com.executeAjax(cartUrl + orderServiceUrl.cart_get, "", "GET", function (result) {   //360未知原因，调取两次接口才会刷新数据
            com.executeAjax(cartUrl + orderServiceUrl.cart_get, "", "GET", function (result) {
                var app1 = new Vue({
                    el: '#my_orders',
                    data: {list : result.data},
                    methods:{
                        nowBuy:function () {
                            window.open('/purchase_orders.html');
                        },
                        toInfo:function (id) {
                            window.open('/product_list_info.html?infoId='+id);
                        },
                        remove:function(rec_id){
                            //购物车商品列表
                            com.executeAjax(cartUrl + orderServiceUrl.cart_drop, {cart_id:rec_id}, "POST", function (result) {
                                location.reload();
                            });
                        }
                    }
                });
                var app2 = new Vue({
                    el: '#my_orders2',
                    data: {list : result.data}
                });
            });
        });
    }else{
        $("#my_orders2").text(0);
        $(".pay_orders,.orders_list").hide();
        $(".orders_null").show();
    }

    var listId = 0;
    var listData = false;
    var lisText = 0;
    moveMenu();
    function moveMenu() {
        var title2_menu     = $(".title2_menu ul li");
        var title2_menu_con = $(".title2_menu_con dl dt");

        title2_menu.mouseenter(function(){
            title2_menu.removeAttr("class");
            $(this).addClass("red");
        });
        title2_menu.mouseleave(function(){
            title2_menu.removeAttr("class");
        });

        title2_menu_con.mouseenter(function(){
            // var $this = $(this);
            title2_menu_con.removeAttr("class");
            //$(".title2_menu_con dl dt a").removeClass("white");
            $(this).addClass("bg_light_huise");
            //$(this).find("a").addClass("white");
            var listId   = $(this).find("a").eq(0).attr('id');
            var firstId   = $(this).find("a").eq(1).attr('id');

            // listData = $(this).find("a").attr('data');
            lisText = $(this).find("a").text();
            $("#menuList2").hide();
            $("#menuList2").show();
            /*$(".title2_menu_con dl dt span").css("background-position-x","-2px");
            $(this).find("span").css("background-position-x","-23px");*/

            var menuData2 = {
                tree_id : listId +"_"+ firstId,
                level   : 3
            };
            // if(listData === "false"){
                com.executeAjax(menuUrl+orderServiceUrl.trees, menuData2, "GET", function (result) {
                    var res = '<div class="fl" style="width: 580px;">'+
                        '<ol class="menu_con_list over_hide fl" id="menuListLi" v-for="b in result2.content">' +
                        '<p class="fs_14px f_c_333 f_b li_he_40px fl right mar_r_15px" style="width: 110px;"><a class="curP" v-on:click="toList(b.url)">{{b.name}}&nbsp;&gt;</a></p>' +
                        '<p class="menu_con_list_con fs_12px f_c_666 li_he_40px over_hide border_b">' +
                        '<span v-for="cat in b.cat_id"><a class="curP text_hover_red" v-on:click="toList(cat.url)">{{cat.name}}</a></span>' +
                        '</p>' +
                        '</ol>'+
                        '</div>'+
                        '<div class="fl" style="width: 310px;margin-left: 35px">'+
                        '<ul class="mar_t_20px">'+
                        '<ol class="fl" v-for = "a in result2.brand"><a class="curP" v-on:click="toList1(a.url)"><img class="hot_img" :src="a.logo"/></a></ol>'+
                        '</ul>'+
                        '</div>';
                    $("#menuList2").html(res);
                    var app = new Vue({
                        el: '#menuList2',
                        data: {result2 : result},
                        methods:{
                            toList:function (url) {
                                url = url.split("=");
                                url = url[1];
                                window.open('product_list.html?id='+ url);
                            },
                            toList1:function (url) {
                                window.open('NewBrandZone.html?id='+ url);
                            }
                        }
                    });
                    // $this.find("a").attr('data','true');
                });
            // }

        });
        $("#menu_bg").mouseleave(function(){
            $(".title2_menu_con dl li").hide();
            title2_menu_con.removeClass("bg_light_huise");
            $(".title2_menu_con dl dt a").removeClass("white");
            //$(".title2_menu_con dl dt span").css("background-position-x","-2px");
        });
    }

    $(".my_orders,.goods_order").mouseenter(function(){
        var ordersList = $(".goods_order ul li").length;
        $(".goods_order").show().addClass("box_s");
        $(".title2_input .orders_hr").show();
        $(this).addClass("my_orange_orders box_s");
        if(ordersList == 0){
            $(".pay_orders").hide();
            $(".orders_null").show();
        }
    });

    $(".orders_hr").mouseenter(function(){
        $(".goods_order").show().addClass("box_s");
        $(".title2_input .orders_hr").show();
        $(".my_orders").addClass("my_orange_orders box_s");
    });

    $(".my_orders,.goods_order").mouseleave(function(){
        $(".title2_input .orders_hr").hide();
        $(".goods_order").hide().removeClass("box_s");
        $(this).removeClass("my_orange_orders box_s");
    });

    $(".goods_order").mouseleave(function(){
        $(".title2_input .orders_hr").hide();
        $(".goods_order").hide().removeClass("box_s");
        $(".my_orders").removeClass("my_orange_orders box_s");
    });

    $(".orders_del").click(function(){
        var ordersList = $(".goods_order ul li").length;
        $(this).parent().parent().parent(".orders_list").remove();
        if(ordersList == 1){
            $(".pay_orders").hide();
            $(".orders_null").show();
        }
    });

    var version = com.browserVersion();
    version = version.split(":");
    version = version[1];
    version = version.substr(0,3);
    if (version == 53){
        $(".unread_message2").css("line-height","18px");
    }

    //首页菜单分类
    var menuData = {
        // n     : 0,    //列表条数 1就一条
        m     : 0    //列表条数下面数据开始的位置  *这个参数是数组下标
        // level : 3     //列表下面的分类数据  *从2级分类开始
    }
    com.executeAjax(menuUrl+orderServiceUrl.cat, menuData, "GET", function (result) {
        var app = new Vue({
            el: '#menuList',
            data: {result : result.content}
        });
        moveMenu();
    });
}


/****** page_sidebar.html ******/
function page_sidebar(){
    $(".bottom_main ul li:first-child").addClass("fs_16px f_c_333");

    $(".change_bg").mouseenter(function(){
        $(this).addClass("bg_light_dd3e3e change_red");
        $(this).find("i").addClass("change_red");
        $(this).find("span").css("color","#fff");
        $(this).prev().attr("id","trans_sidebar_list");
        $(this).prev(".browse_state").css({
            left: '-155px'
        })
    });
    $(".change_bg").mouseleave(function(){
        $(this).removeClass("bg_light_dd3e3e change_red");
        $(this).find("i").removeClass("change_red");
        $(this).find("span").css("color","#666");
        $(this).prev(".sidebar_list").removeAttr("id");
        $(this).prev(".sidebar_list").removeAttr("style");
        // $(this).prev(".browse_state").css({
        //     left: '0px'
        // })
    });
    $(".change_bg3").mouseenter(function(){
        $(this).prev(".sidebar_list3").attr("id","trans_sidebar_list3");
    });
    $(".change_bg3").mouseleave(function(){
        $(this).prev(".sidebar_list3").removeAttr("id");
    });

    $(".sidebar_list").mouseenter(function(){
        $(this).attr("id","trans_sidebar_list");
    });
    $(".sidebar_list").mouseleave(function(){
        $(".sidebar_list").removeAttr("id");
    });
    $(".browse_state").mouseenter(function(){
        $(this).css({
            left: '-155px'
        })
    });
    $(".browse_state").mouseleave(function(){
        $(this).removeAttr("style");
    });

    $(".sidebar_list3").mouseenter(function(){
        $(this).attr("id","trans_sidebar_list3");
    });
    $(".sidebar_list3").mouseleave(function(){
        $(".sidebar_list3").removeAttr("id");
    });


    /* 浏览量 */
    $("#browse_num").mouseenter(function () {

    })
    var liulan_url = menuUrl+"page_view";
    com.executeAjax(liulan_url, '', "GET", function (res) {
        var y_page_view = res.y_page_view;
        var new_user = res.new_user+"%";
        var old_user = res.old_user+"%";
        var browseHtml = '<em class="browse_no">昨日浏览量</em>'+
            '<em class="browse_no">'+ y_page_view +' <small class="red" style="font-size: 22px;font-weight: bold;">&#11014;</small></em>'+
            '<em class="browse_no"> 新访客: '+ new_user +'</em>'+
            '<em class="browse_no"> 老访客: '+ old_user +'</em>';
        $("#browse_num").html(browseHtml);
    })


    //左侧双12图片
    $(".sidebar_img_text ol,.sidebar_img_text2 ol").click(function () {
        var text = $(this).index();
        if(text == "0"){
            window.open("/double12.html");
        }
        if(text == "1"){
            window.open("/special_district.html");
        }
        if(text == "2"){
            window.open("/BrandZone_More.html");
        }
    });

    //意见反馈
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
               
                function Length(jsonObj) {
				        var Length = 0;
				        for (var item in jsonObj) {
				            Length++;
				        }
				        return Length;
				}
                var count =Length(data);
               
                var success_callback = function (obj) {
                    if ( obj == 3) {
                    com.maskSuccess($("#alertMask"), "非常感谢，您的意见我们已经收到！");
                }
            }
                success_callback(count);
                com.executeAjax(url, data, "POST", success_callback);
            }

        });
    });
}


/****** loginTemp.html ******/
function login(){
    document.onkeydown = function (event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode == 13) {
            $('.login').click();
        }
    };

    $(".closeMask").click(function () {
        $(".login_mask").hide();
    });

    $('.login').click(function(){
        var userName = $(".userName").val();
        var userPwd  = $(".userPwd").val();

        var remember = 0;
        var isChecked = $("#remember").is(":checked");
        if(isChecked){
            remember = 1;
        }
        if(userName != "" || userPwd != ""){
            var url  = userLoginUrl+orderServiceUrl.login;
            var data = {
                username : userName,
                psw : $.md5(userPwd),
                remember : remember
            }
            var success_callback = function(obj){
                setTimeout(function () {
                    if(obj.msg == ""){
                        $(".login_error").show();
                        $(".login_error_text1").hide();
                        location.reload(true);
                    }else{
                        $(".login_error,.userNull").hide();
                        $(".login_error_text1").show();
                    }
                },1500);
                com.loading($("#f_change_div"), $("#f_changeText"));
            };
            com.executeAjax(url, data, "POST", success_callback);

        }else{
            $(".login_error,.login_error_text1").hide();
            $(".userNull").show();
        }
    });
};


/****** login.html ******/
function login_page(){
    document.onkeydown = function (event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode == 13) {
            $('.login').click();
        }
    };

    $('.login').click(function(){
            var userName = $(".userName").val();
            var userPwd  = $(".userPwd").val();
            //var userPwd = $.md5("Pwd");
            var remember = 0;
            var isChecked = $("#remember").is(":checked");
            if(isChecked){
                remember = 1;
            }
            if(userName != "" || userPwd != ""){
                var url  = userLoginUrl+orderServiceUrl.login;
                var data = {
                    username : userName,
                    psw : $.md5(userPwd),
                    remember : remember
                };
                var success_callback = function(obj){
                    setTimeout(function () {
                        if(obj.msg == ""){
                            $(".login_error").show();
                            $(".login_error_text1").hide();
                            var URL     = document.referrer;
                            var URLName = URL.split("/");
                            URLName = URLName[3];
                            if(URL == "" || !URL){
                                location.href = "/main.html";
                            }
                            if(URLName == "login.html" || URLName == "register.html" || URLName == "frim_register.html" || URLName == "frim_register_success.html"){
                                location.href = "/main.html";
                            }else{
                                self.location=document.referrer;
                            }
                         }else{
                             $(".login_error,.userNull").hide();
                             $(".login_error_text1").show();
                         }
                    },1500);
                    com.loading($(".change_div"), $(".changeText"));
                };
                com.executeAjax(url, data, "POST", success_callback);

            }else{
                $(".login_error").hide();
                $(".userNull").show();
            }
    });
};
/****** header add  Qr code changes ******/

