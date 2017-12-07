var express = require('express');
var app = express();
var fs = require("fs");

/********************************分割线********************************/
//添加的新用户数据
var user = {
   "user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
}

//添加用户
app.get('/addUser', function (req, res) {
   // 读取已存在的数据
   fs.readFile( __dirname + "/" + "users.json", 'utf-8', function (err, data) {
       data = JSON.parse( data );
       data["user4"] = user["user4"];
       console.log( data );
       res.end( JSON.stringify(data));
   });
})


//获取floors列表
app.get('/floors', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", '', function (err, data) {
       console.log( data );
       res.end( data );
   });
})


//获取用户列表
app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf-8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})


//显示用户详情
app.get('/:id', function (req, res) {
   // 首先我们读取已存在的用户
   fs.readFile( __dirname + "/" + "users.json", 'utf-8', function (err, data) {
       data = JSON.parse( data );
       var user = data["user" + req.params.id] 
       console.log( user );
       res.end( JSON.stringify(user));
   });
})


//删除用户
var id = 2;
app.get('/deleteUser', function (req, res) {

   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data["user" + 2];
       
       console.log( data );
       res.end( JSON.stringify(data));
   });
})

//http://127.0.0.1:7373/listUsers

/********************************分割线********************************/

// var appData = require('../db.json');
// var sites=appData.sites;
// var notes=appData.notes;
// var apiRoutes = express.Router();


var apiDate = require('./users.json');
var goodsList = apiDate.goodsList;
var banners = apiDate.banners;
var floors = apiDate.floors;
var apiRoutes = express.Router();


//banner列表
apiRoutes.get('/banners',function(req, res){
	res.json({
		errno:0,
    	data:banners
	})
})

//floors列表
apiRoutes.get('/floors',function(req, res){
	res.json({
		errno:0,
    	data:floors
	})
})

//商品列表
apiRoutes.get('/goodslist',function(req, res){
	res.json({
		errno:0,
    	data:goodsList
	})
})


//商品详情
apiRoutes.get('/:goods_id', function (req, res) {
   // 首先我们读取已存在的用户
   res.json({
		errno:0,
    	data : goodsList[req.params.goods_id] 
	})
   res.end( JSON.stringify(user));
})

app.use('/api',apiRoutes);

//http://127.0.0.1:7373/api/goodslist

/*******************************分割线*************************************/

var server = app.listen(7373, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})