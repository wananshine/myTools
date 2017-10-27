/**
 * Created by Administrator on 2016/11/22.
 */

var my_start_date;
var my_end_date;
var my_interval = 'today';

com.executeAjax(dtServiceUrl.distributor_init_date_range, {}, "GET", function(result){
    //var STATS_START_TIME = '1329148800';
    var dateRange1 = new pickerDateRange('date_demo1', {
        isTodayValid : true,
        startDate : result.data.start_date,
        endDate : result.data.end_date,
        needCompare : false,
        defaultText : ' 至 ',
        target : 'datePicker_demo1',
        calendars : 3,
        success : function(obj) {
            my_start_date = obj.startDate;
            my_end_date = obj.endDate;
            switchDate('custom');
        }
    });
});

$(function () {
    switchDate('today')
});




var vmTotal = new Vue({
    el: '#my_total',
    data: {info:{
        "member_sales": 0,
        "member_profit": 0
    }}
});

var vmList = new Vue({
    el: '#my_list',
    data: {items:[]},
    methods:{
        orderDetail:function(orderid){
            window.location = 'purchase_detail.html?orderid='+orderid;
        }
    }
});

function pageSelectCallback(page_index, jq) {
    getList(page_index);
    return false;
}

function switchDate(interval){
    my_interval = interval?interval:'today';
    getTotal();
    getList(0);
    /*时间范围切换*/
    $(".date-select-bar a").click(function(){
        $(".date-select-bar a").removeClass("cur");
        $(this).addClass("cur");
        $("#date_demo1").removeClass("active");
    })
}

function getTotal(){
    var data = {interval:my_interval};
    if(my_interval=='custom'){
        data.start_date = my_start_date;
        data.end_date = my_end_date;
    }
    
    
    com.executeAjax(dtServiceUrl.distributor_sales_achievement, data, "GET", function(result){
        vmTotal.info = result.data;
    });
}
function getList(page) {
    page = page?page+1:1;
    var data = {
        page : page,
        size : 10,
        keyword : $('#txtKeyword').val(),
        interval:my_interval
    };
    if(my_interval=='custom'){
        data.start_date = my_start_date;
        data.end_date = my_end_date;
    }
    com.executeAjax(dtServiceUrl.distributor_order_list, data, "GET", function(result){
        $("#Pagination").pagination(result.data.total, {
            num_edge_entries: 1, //边缘页数
            num_display_entries: 4, //主体页数
            callback: pageSelectCallback,
            items_per_page:data.size, //每页显示1项
            prev_text: "前一页",
            next_text: "后一页",
            current_page:page-1
        });
        vmList.items.splice(result.data.length);
        vmList.items = result.data.items;
    });
}