/**
 * Created by Administrator on 2016/12/16.
 */

var vmList = new Vue({
    el: '#my_list',
    data: {items:[]},
    methods:{
        goodsDetail:function(id){
            window.open("/product_list_info.html?infoId="+id);
        }
    }
});

var vmBrand = new Vue({
    el: '#selBrand',
    data: {brandObj:[]}
});

$(function () {
    getBrand();
    getList();
    $("#selClass").change(function(){
        var recommend = $("#selClass").val();
        getBrand(recommend);
    })
});

function getBrand(recommend){
    com.executeAjax(dtServiceUrl.distributor_brand_list, {is_recommend:recommend}, "GET", function(result){
        vmBrand.brandObj.splice(result.data.length);
        vmBrand.brandObj = result.data;
    });
}

function pageSelectCallback(page_index, jq) {
    getList(page_index);
    return false;
}

function getList(page){
    page = page?page+1:1;
    var size = 20;
    var data = {
        page : page,
        page_size : size,
        brandId:$('#selBrand').val(),
        keyword : $('#txtKeyword').val()
    };
    com.executeAjax(dtServiceUrl.distributor_goods_list,data, "GET", function(result){
        $("#Pagination").pagination(result.data.total, {
            num_edge_entries: 1, //边缘页数
            num_display_entries: 4, //主体页数
            callback: pageSelectCallback,
            items_per_page:size, //每页显示个数项
            prev_text: "前一页",
            next_text: "后一页",
            current_page:page-1
        });
        vmList.items.splice(result.data.items.length);
        vmList.items = result.data.items;
    });
}