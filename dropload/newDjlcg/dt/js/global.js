/**
 * Created by Administrator on 2016/11/22.
 */
var baseApiUrl = '/newapi/dt/';
var dtServiceUrl = {
    //登录
    site_login                              : baseApiUrl + 'site.php?act=login',                        //登录
    user_login_logout                       : '/newapi/user_login.php?act=logout',                                             //登出
    distributor_basic_info                  : baseApiUrl + 'distributor.php?act=basic_info',         //分销商基本资料
    distributor_top_sales_rank              : baseApiUrl + 'distributor.php?act=top_sales_rank',    //全国分销商前10排名
    distributor_sales_rank                  : baseApiUrl + 'distributor.php?act=sales_rank',        //全国分销商销售排名
    distributor_achievement                 : baseApiUrl + 'distributor.php?act=achievement',       //获取时间段内销售+渠道业绩和利润
    distributor_sales_achievement          : baseApiUrl + 'distributor.php?act=sales_achievement',       //获取时间段内销售业绩和利润
    distributor_channel_achievement        : baseApiUrl + 'distributor.php?act=channel_achievement',       //获取时间段内渠道业绩和利润
    //distributor_top_policy                  : baseApiUrl + 'distributor.php?act=top_policy',        //分销政策前3条
    //distributor_policy_list                 : baseApiUrl + 'distributor.php?act=policy_list',       //分销政策
    //distributor_top_notice                  : baseApiUrl + 'distributor.php?act=top_notice',        //分销公告前10条
    //distributor_top_policy                  : baseApiUrl + 'distributor.php?act=top_policy',        //分销政策前3条
    distributor_user_list                   : baseApiUrl + 'distributor.php?act=user_list',         //获取时间段注册会员
    distributor_order_list                  : baseApiUrl + 'distributor.php?act=order_list',        //获取时间段交易明细
    distributor_my_dt_list                  : baseApiUrl + 'distributor.php?act=my_dt_list',        //下级分销商列表
    distributor_my_dt_sales                 : baseApiUrl + 'distributor.php?act=my_dt_sales',       //下级分销商销售业绩
    distributor_available_users_for_take  : baseApiUrl + 'distributor.php?act=available_users_for_take',//可领取会员列表
    distributor_save_take_user              : baseApiUrl + 'distributor.php?act=save_take_user',    //保存领取会员列表
    distributor_available_parent_dt        : baseApiUrl + 'distributor.php?act=available_parent_dt',//更改上级分销商，有效分销商列表
    distributor_save_parent_dt              : baseApiUrl + 'distributor.php?act=save_parent_dt',    //保存上级
    distributor_my_dt_detail                : baseApiUrl + 'distributor.php?act=my_dt_detail',       //我的子级分销商详情
    distributor_personnel_list                : baseApiUrl + 'distributor.php?act=personnel_list',       //分销商人员信息
    distributor_save_personnel                : baseApiUrl + 'distributor.php?act=save_personnel',       //保存人员信息
    distributor_delete_personnel                : baseApiUrl + 'distributor.php?act=delete_personnel',       //删除人员信息
    distributor_init_date_range                : baseApiUrl + 'distributor.php?act=init_date_range',       //初始化时间范围
    distributor_order_detail                : baseApiUrl + 'distributor.php?act=order_detail',       //订单详情
    distributor_brand_list               : baseApiUrl + 'distributor.php?act=brand_list',       //商品资料 - 品牌列表
    distributor_goods_list               : baseApiUrl + 'distributor.php?act=goods_list',       //商品资料 - 商品列表

    //文章
    article_list                                :'/newapi/article.php?act=list',    //获取文章列表(有分页)
    article_top                                :'/newapi/article.php?act=top',      //获取最新文章列表
    article_detail                             :'/newapi/article.php?act=detail'   //获取文章详情
}
