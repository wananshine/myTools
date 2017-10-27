/**
 * Created by Administrator on 2016/12/15 0015.
 */

var id = getQueryString('orderid');
com.executeAjax(dtServiceUrl.distributor_order_detail, {orderid:id}, "GET", function(result){
    new Vue({
        el: '#order_detail_container',
        data: result.data,
        methods: {
            goodsDetail:function(id){
                window.open("/product_list_info.html?infoId="+id);
            }
        }
    });
});