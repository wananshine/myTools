import axios from 'axios'
let base = '';

export const banners = params => {                //banners 请求
    return axios.get('/api/banners', {params: params}).then(res => {
        return res.data;
    }, err => {
        reject(err);
    }).catch((error) => {
        reject(error)
    });
};

export const floors = params => {                //floors 楼层 请求
    return axios.get('/api/floors', {params: params}).then(res => {
        return res.data;
    }, err => {
        reject(err);
    }).catch((error) => {
        reject(error)
    });
};



export const albums = params => {                //albums 最后一个楼层&&音乐专辑 请求
    return axios.get('/api/albums', {params: params}).then(res => {
        return res.data;
    }, err => {
        reject(err);
    }).catch((error) => {
        reject(error)
    });
};

export const albumProduct = params => {           //albumProduct 最后一个楼层&&音乐专辑的其他商品 请求
    return axios.get('/api/albumProduct', {params: params}).then(res =>{
        return res.data;
    }, err=>{
        reject(err);
    }).catch(error => {
        reject(error)
    });
};


export const getshot = params => {                   //getshot  热门商品 请求
    return axios.get('/api/getshot', {params: params}).then(res =>{
        console.log('getshot',res)
        return res.data;
    }, err=>{
        reject(err);
    }).catch(error => {
        reject(error)
    });
};


export const getPtDetail = params => {                   //getPtDetail  获取商品详情 请求
    return axios.get('/api/getshot/'+params).then(res =>{
        return res.data;
    }, err=>{
        reject(err);
    }).catch(error => {
        reject(error)
    });
};


export const welfareInfo = params =>{                  // welfareInfo  福利社  请求
    return axios.get('/api/welfareInfo', {params: params }).then(res =>{
        return res.data;
    }, err =>{
        reject(error)
    }).catch(error =>{
        reject(error)
    });
};


export const typesList = params =>{                  // typesList  分类  请求
    return axios.get('/api/typesList', {params: params }).then(res =>{
        return res.data;
    }, err =>{
        reject(error)
    }).catch(error =>{
        reject(error)
    });
};

export const shopingCart = params =>{                  // shopingCart  购物车  请求
    return axios.get('/api/shopingCart', {params: params }).then(res =>{
        return res.data;
    }, err =>{
        reject(error)
    }).catch(error =>{
        reject(error)
    });
};


export const topay = params =>{                  // topay  待支付  请求
    return axios.get('/api/topay', {params: params }).then(res =>{
        return res.data;
    }, err =>{
        reject(error)
    }).catch(error =>{
        reject(error)
    });
};





