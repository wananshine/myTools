/**
 * Created by Administrator on 2016/11/4.
 */
function get_address_list(){
    com.executeAjax(orderServiceUrl.user_address_list, '', "GET", function (result) {
        new Vue({
            el: '#list_template',
            data: result,
            methods:{
                edit:function(address_id){
                    location.href = "update_address_list.html?id="+address_id;
                },
                remove:function(address_id, event){
                    var el = event.currentTarget;
                    var data = {
                        'address_id' : address_id //收货地址id
                    };
                    com.executeAjax(userAddressUrl+orderServiceUrl.cart_drop, data, "POST", function (result) {
                        $(el).parent().parent().remove();
                    });
                }
            }
        });
        if(result.data == ""){
            $(".notData").show();
        }
    });
}

function add_address() {
    var input1 = $(".basic_input li").eq(1).find(".input");
    var input2 = $(".basic_input li").eq(2).find(".input");
    var input3 = $(".basic_input li").eq(3).find(".input");
    var input4 = $(".basic_input li").eq(4).find(".input");
    var data = {
        Province : "#Province",
        City   : "#City",
        Area   : "#Area",
        isShow : true
    }
    com.provinceCityArea(data);

    $("#saveAddress").click(function () {
        var text     = $(".basic_input li");
        var province = $("#s_province").val();
        var city     = $("#s_city").val();
        var county   = $("#s_county").val();
        var input_5=document.querySelector(".checks");
        var is_default = 0;
        var isTrue = [];
        var inputVal = [];
        inputVal.push(province, city, county);
        for(var i=0; i<text.length; i++){
            var a = $(".basic_input li:not('.company-n')").eq(i).find(".error").attr("data");
            var b = $(".basic_input li").eq(i).find(".input").val();
            isTrue.push(a);
            inputVal.push(b);
        }

        if(isTrue.indexOf("false") == -1 ){
            if(input_5.checked==true){
                is_default = 1;
            }
            var data = {
                'address_id'     : 'add',              //收货地址id 大于0为编辑，其他为新增
                'province'       : inputVal[0],         //省id
                'city'           : inputVal[1],          //地级市id
                'district'       : inputVal[2],         //县区id
                'address'        : inputVal[4],         //详细地址
                "company_name"  : inputVal[5],           //公司名称
                'consignee'      : inputVal[6],         //收货人
                'mobile'         : inputVal[7],          //手机
                'is_default' : is_default
            };
            com.executeAjax(userAddressUrl + orderServiceUrl.address_save, data, "POST", function (result) {
                if(result.code == 0){
                    location.href = "/center/address_list.html";
                }
            });
        }
    });
    var is_default = 0;
    inputText(input1,2);
    inputText(input2,0);
    inputText(input3,2);
    inputText(input4,11);

    function inputText($class,number){
        $class.on("input",function(){
            var text = $(this).val();
            if(text.length < number || text.length > 20){
                $(this).siblings(".error").show();
                $(this).siblings(".error").attr("data","false");
            }else{
                $(this).siblings(".error").hide();
                $(this).siblings(".error").attr("data","true");
            }
        });
    }
}

function update_address() {

    var addressId = getQueryString("id");
    var url = userAddressUrl + orderServiceUrl.cart_get+"&address_id="+addressId;

    com.executeAjax(url, "", "POST", function (result) {
        var app = new Vue({
            el   : "#update",
            data : result.data
        });
        var data = {
            Province : "#Province",
            City   : "#City",
            Area   : "#Area",
            isShow : true,
            typeOf : "update",
            provinceCode : result.data.province,
            cityCode     : result.data.city,
            areaCode     : result.data.district
        }
        com.provinceCityArea(data);

        var input1 = $(".basic_input li").eq(1).find(".input");
        var input2 = $(".basic_input li").eq(2).find(".input");
        var input3 = $(".basic_input li").eq(3).find(".input");
        var input4 = $(".basic_input li").eq(4).find(".input");
        //我添加
//      var input5=$(".checks");
//      console.log(input5)
        var is_default = 0;
        inputText(input1,2);
        inputText(input2,0);
        inputText(input3,2);
        inputText(input4,11);

        $("#saveAddress2").click(function () {
            var text     = $(".basic_input li");
            var province = $("#s_province").val();
            var city     = $("#s_city").val();
            var county   = $("#s_county").val();
            var input5=document.querySelector(".checks");
            var is_default = 0;
            var isTrue = [];
            var inputVal = [];
            inputVal.push(province, city, county);
            for(var i=0; i<text.length; i++){
                var a = $(".basic_input li").eq(i).find(".error").attr("data");
                var b = $(".basic_input li").eq(i).find(".input").val();
                isTrue.push(a);
                inputVal.push(b);
            }



            if(isTrue.indexOf("false") == -1){
                if(input5.checked==true){
                    is_default = 1;
                }
                var data = {
                    'address_id'  : addressId,              //收货地址id 大于0为编辑，其他为新增
                    'province'    : inputVal[0],        //省id
                    'city'        : inputVal[1],        //地级市id
                    'district'    : inputVal[2],        //县区id
                    'address'     : inputVal[4],        //详细地址
                    "company_name"  : inputVal[5],      //公司名称
                    'consignee'   : inputVal[6],        //收货人
                    'mobile'      : inputVal[7],         //手机
                    'is_default' : is_default
                };
                com.executeAjax(userAddressUrl + orderServiceUrl.address_save, data, "POST", function (result) {
                    if(result.code == 0){
                        location.href = "/center/address_list.html";
                    }
                });
            }
        });

    });

    function inputText($class,number){
        $class.on("input",function(){
            var text = $(this).val();
            if(text.length < number || text.length > 20){
                $(this).siblings(".error").show();
                $(this).siblings(".error").attr("data","false");
            }else{
                $(this).siblings(".error").hide();
                $(this).siblings(".error").attr("data","true");
            }
        });
    }
}