/**
 * Created by Administrator on 2017/6/28.
 */


$(function () {
    //分别加载页眉，头部，页脚，侧边栏
    $("#titleTemp_main").load("/lib/temp/page_title.html");
    $("#titleTemp2_main").load("/lib/temp/page_title2.html");
    $("#bottomTemp_main").load("/lib/temp/page_bottom.html");
    $("#sidebarTemp_main").load("/lib/temp/page_sidebar.html");

    var url  = service1Url+orderServiceUrl.project_article_id;
    var id = getQueryString("id")
    var data = {
        'id': id
    }
    com.executeAjax(url,data,"GET",function(response){
        response.data.content = htmldecode(response.data.content);
        $("#info").html(response.data.content);

        function htmldecode(s){
            var div = document.createElement('div');
            div.innerHTML = s;
            return div.innerText || div.textContent;
        }
        new Vue({
            el   : "#exam_container",
            data: {
                goodslist: [],
                bannerurl: "../img/exam_bannner_01.png?t=201706280925",
                imgurl_r:"../img/exam_01.png?t=201706280925",
                floors: [ response.data
/*{
                        bigtitle: "深圳北站旅客智能分析系统",
                        exam_list: [
                            {
                                e_title: "设计说明",
                                e_info: [
                                    {
                                        e_state:"",
                                        e_img:"",
                                        e_txt: "住宅的所有者是一户五口之家，他们热爱艺术，极具创造力，希望拥有一间充满阳光的住宅  住宅的所有者是一户五口之家，他们热爱艺术，极具创造力，希望拥有一间充满阳光的住宅住宅的所有者是一户五口之家，他们热爱艺住宅的所有者是一户五口之家，他们热爱艺术，极具创造力，希望拥有一间充满阳光的住宅术，极具创造力，希望拥有一间充满阳光的住宅"
                                    },
                                    {
                                        e_state:"",
                                        e_img:"",
                                        e_txt: "住宅的所有者是一户五口之家，他们热爱艺术，极具创造力，希望拥有一间充满阳光的住宅  住宅的所有者是一户五口之家，他们热爱艺术，极具创造力，希望拥有一间充满阳光的住宅住宅的所有者是一户五口之家，他们热爱艺住宅的所有者是一户五口之家，他们热爱艺术，极具创造力，希望拥有一间充满阳光的住宅术，极具创造力，希望拥有一间充满阳光的住宅"
                                    }
                                ]
                            },
                            {
                                e_title: "项目分析",
                                e_info: [
                                    {
                                        e_state:"",
                                        e_img:"",
                                        e_txt: "住宅的所有者是一户五口之家，他们热爱艺术，极具创造力，希望拥有一间充满阳光的住宅  住宅的所有者是一户五口之家，他们热爱艺术，极具创造力，希望拥有一间充满阳光的住宅住宅的所有者是一户五口之家，他们热爱艺住宅的所有者是一户五口之家，他们热爱艺术，极具创造力，希望拥有一间充满阳光的住宅术，极具创造力，希望拥有一间充满阳光的住宅"
                                    }
                                ]
                            },
                            {
                                e_title: "图解案例",
                                e_info: [
                                    {
                                        e_state:"▼艺术融于生活的居住空间，live with art",
                                        e_img:"../img/exam_02.png?t=201706280925",
                                        e_txt: ""
                                    },
                                    {
                                        e_state:"▼艺术融于生活的居住空间，live with art",
                                        e_img:"../img/exam_03.png?t=201706280925",
                                        e_txt: ""
                                    },
                                    {
                                        e_state:"▼艺术融于生活的居住空间，live with art",
                                        e_img:"../img/exam_04.png?t=201706280925",
                                        e_txt: ""
                                    }
                                ]

                        ]
                    }}*/
                ]
            },
            methods: {
                couget: function(item, index){
                    // console.log(item.goods_id)
                    window.open("product_list_info.html?infoId="+item.goods_id);
                }
            },
        });
    });



})