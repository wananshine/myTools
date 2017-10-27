/**
 * Created by Administrator on 2017/2/7.
 */
/**
 * Created by Gold on 2017/1/18.
 */
$(function () {
    var url = '/newapi/mobile/user.php?act=user_coupon_list';
    com.executeAjax(url, '', 'GET', function (result) {
        if(result.data.length==0){
            $('#noCoupon').show();
        }
        var list = new Vue({
            el   : '#couponReceive',
            data : {list:result.data},
            methods:{
                coupon:function (infoId) {
                    var url2 = '/newapi/mobile/cash_coupon.php';
                    var data = {
                        id  : infoId,
                        add : 1
                    };
                    com.executeAjax(url2, data, 'POST', function (object) {
                        if(object.status === 0){
                            //mui.toast('购物劵领取成功');
                            setTimeout(function () {
                                location.reload(true);
                            },1000);
                        }
                    });
                },
                toInfoPage:function (infoId) {
                    window.location = '/product_list_info.html?infoId='+infoId;
                }
            }
        });

        $.each(result.data, function (index, obj) {
            /* 倒计时 */
            var success = function (result) {
                $("#"+obj.goods_id).text(result.Minute);
                console.log(result.Minute);
                console.log(obj);
            };
            var error = function (result) {

            };
            com.countDown2(obj.rest_time, success, error);
        });
    });
});
