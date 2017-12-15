module.exports = { 
	cartList: localStorage.getItem('vuex_cart') ? JSON.parse(localStorage.getItem('vuex_cart')) : [],
    
    count: 0,

    signinDefault: false,
};