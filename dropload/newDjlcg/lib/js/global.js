/**
 * Created by Gold on 2016/10/11.
 */

// 公共变量
var global = {
    isLogin       : false,
    isLoginRZ     : false,
    productNumber : 0
}

//Url根目录
// var Url = 'http://djlcg.com/bb/newapi/';               //服务器测试地址
// var Url = 'http://192.168.1.54/newapi/';               //服务器测试地址
// var Url = 'http://localhost/newdjlcg3.0/newapi/';               //本地测试地址
var Url = '/newapi/';
var zxwUrl = 'http://djlzix.com/index_article.php';

//商城订单地址
var orderUrl        = Url+'order.php?act=';
var menuUrl         = Url+'index.php?act=';
var cartUrl         = Url+'cart.php?act=';
var regionUrl       = Url+'region.php?act=';
var userAddressUrl  = Url+'user_address.php?act=';
var categoryUrl     = Url+'category.php?';
var userInvUrl      = Url+'inv.php?act=';
//用户登录、注册地址
var userLoginUrl    = Url+'user_login.php?act=';
var getMobilecodeUrl= Url+'get_mobilecode.php';
var onlyMobilecodeUrl= Url+'only_mobile_code.php';
var userCenterUrl   = Url+'User.php?act=';
var userInfoUrl     = Url+'user_info.php?act=';
var resetPswUrl     = Url+'reset_password.php?act=';
var goodsUrl        = Url+'goods.php?id=';
var goodsUrl2       = Url+'goods.php?act=price&attr=';
var searchUrl       = Url+'search.php?keywords=';
var suggestUrl      = Url+'suggest.php?term=';
//帮助中心
var articleUrl      = Url+'help_center?act=';
var brandUrl        = Url+'brand.php?';
//特价区
var promote1Url     = Url+'promote.php?act=';
var promote2Url     = Url+'promote.php?act=';
var helpCenterUrl   = Url+'help_center.php?act=';
//服务板块
var serviceUrl      = Url+'service.php?act=inquiry';
var service1Url      = Url+'service_project_design.php?act=';
//双12
var topicUrl        = Url+'topic.php?act=';
//物流
var logisticsUrl    = Url+'logistics_query.php?a=';
//秒杀
var seckillUrl      = Url+'seckill.php?act=';
//拼单
var spellorderUrl      = Url+'group_buy.php';
//热销
var sellhotUrl     = Url+'recommend.php';
//计算器
var calculateUrl     = Url+'calculate.php?act=';


var orderServiceUrl = {

    //订单接口地址
    status_count : 'status_count',
    list         : 'list',
    latest_list  : orderUrl+'latest_list',
    cancel       : 'cancel',
    detail       : 'detail',
    pay_status   : 'pay_status',
    confirm_receive           : 'confirm_receive',
    confirm_receive_goods     : 'confirm_receive_goods',
    apply_after_service       : 'apply_after_service',
    save_apply_after_service  : 'save_apply_after_service',
    get_current_after_service : 'get_current_after_service',
    get_after_service_list    : 'get_after_service_list',
    //发票接口
    save_user_inv           : 'save_user_inv',
    get_user_inv            : 'get_user_inv',
    get_orders_for_inv      :'get_orders_for_inv',
    init_apply_data         :'init_apply_data',
    save_apply              : 'save_apply',
    cancel_apply            : 'cancel_apply',
    cancel_goods            : 'cancel_goods',

    //首页接口地址
    cat           : 'cat',
    trees         : 'trees',
    banner        : 'banner',
    cat_goods     : 'cat_goods',      // 1: 推荐   2：新品  3：热销  4：特价
    recommend     : 'recommend',
    brand         : 'brand',
    news          : 'news',

    //购物车接口
    cart_add            : 'add',            //添加到购物车
    cart_set_count      : 'set_count',      //修改商品数量
    cart_drop           : 'drop',           //移出购物车
    cart_set_select     : 'set_select',     //勾选或取消勾选单种商品
    cart_set_select_all : 'set_select_all', //勾选或取消勾选所有商品
    cart_get            : 'get',            //获取购物车商品列表
    cart_get_count      : 'get_count',      //获取购物车商品总数量
    checkout            : 'checkout',       //获取结算数据
    be_dt_create        : 'be_dt_create',   //潜在合伙人创建订单
    create              : 'create',         //创建订单
    order_for_pay       : 'order_for_pay',  //支付页面获取订单信息

    region_get          : 'get',
    address_save        : 'save',
    user_address_list   : userAddressUrl+'list',//用户收货地址

    addshoping          : 'addshoping',  //线下商品自定义

    //用户、会员接口
    login               : 'login',
    my                  : 'my',
    register            : 'register',
    company_register    : 'company_register',
    check_name          : 'check_name',
    check_mobile        : 'check_mobile',
    send_mobile_code    : 'send_mobile_code',
    check_mobile_captcha: 'check_mobile_captcha',
    tuijian_list        : 'tuijian_list',
    user_index          : 'user_index',
    collection_list     : 'collection_list',
    del_collection      : 'del_collection',
    user_info           : 'user_info',
    edit_mobile         : 'edit_mobile',
    confirm_user        : 'confirm_user',
    reset_password      : 'reset_password',
    edit_info           : 'edit_info',
    get_identif         : 'get_identif',
    edit_identif        : 'edit_identif',
    edit_company_info   : 'edit_company_info',
    history_list        : 'history_list',
    add_collection      : 'add_collection',
    logout              : 'logout',
    add_message         : 'add_message',
    message_list        : 'message_list',
    forget_password     : 'forget_password',
    is_company_user     : 'is_company_user',

    //帮助中心
    list                : 'list',
    detail              : 'detail',
    get_aboutme         : 'get_aboutme',
    forget_password     : 'forget_password',

    //特价区
    goods               : 'goods',
    brand               : 'brand',

    //项目设计
    project_design        : 'project_design',
    project_article       : 'project_article',
    project_article_id    : 'project_article_id',
    article_by_industry   : 'article_by_industry'
};


var dtServiceUrl = {
    my_service_station          : Url + 'dt/user_center.php?act=my_service_station',
    available_station           : Url + 'dt/user_center.php?act=available_station',
    save_my_service_station     : Url + 'dt/user_center.php?act=save_my_service_station',
    get_apply_info               :Url + 'dt/user_center.php?act=get_apply_info',
    save_apply_info               :Url + 'dt/user_center.php?act=save_apply_info',
    get_payment                     :Url + 'dt/user_center.php?act=get_payment',
    save_payment                    :Url + 'dt/user_center.php?act=save_payment',
    get_apply_status               :Url + 'dt/user_center.php?act=get_apply_status',
    dt_area_list                    :Url+'dt/common.php?act=area_list',
    dt_list                         :Url+'dt/common.php?act=dt_list',
    search_one_dt                   :Url+'dt/common.php?act=search_one_dt'
};
