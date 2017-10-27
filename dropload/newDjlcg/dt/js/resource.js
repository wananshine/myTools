/**
 * Created by Administrator on 2016/11/25.
 */
$(function () {
    getList();
});

var vmList = new Vue({
    el: '#my_list',
    data: {items:[]},
    methods:{
        saveTake:function(userId){
            var data = {'be_take_id':userId}
            com.executeAjax(dtServiceUrl.distributor_save_take_user, data, "POST", function(result){
                alert(result.msg);
                location.reload();
            });
        }
    }
});

function pageSelectCallback(page_index, jq) {
    getList(page_index);
    return false;
}

function getList(page) {
    page = page?page+1:1;
    var data = {
        page : page,
        size : 10
    };
    com.executeAjax(dtServiceUrl.distributor_available_users_for_take, data, "GET", function(result){
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