var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');

//连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/dumall');

mongoose.connection.on("connected", function () {
  console.log("MongoDB connected success.")
});

mongoose.connection.on("error", function () {
  console.log("MongoDB connected fail.")
});

mongoose.connection.on("disconnected", function () {
  console.log("MongoDB connected disconnected.")
});

//连接数据库
//127.0.0.1:27017
//var DB_CONN_STR = 'mongodb://localhost:27017/dumall';
//var DB_CONN_STR = '127.0.0.1:27017/dumall';
mongoose.connect('mongodb://127.0.0.1:27017/dumall');

mongoose.connection.on("connected", function(){
	console.log("Mongodb connected success.")
})

mongoose.connection.on("error", function(){
	console.log("Mongodb connected fail.")
})

mongoose.connection.on("disconnected", function(){
	console.log("Mongodb connected disconnected.")
})


router.get("/", function(req, res, next){
	let page = parseInt(req.param("page"));
	let pageSize = parseInt(req.param("pageSize"));
	let sort = req.param("sort");
	let skip = (page-1)*pageSize;
	let param = {};
	let goodsModel = Goods.find(param).skip(skip).limit(pageSize);
	goodsModel.sort({ 'salePrie': sort });
	goodsModel.exec({}, function(err, doc){
		if(err){
			res.json({
				status: '1',
				msg: err.message
			})
		}else{
			res.json({
				status: '0',
				msg: '',
				result: {
					count: doc.length,
					list: doc,
				}
			})
		}
	})
	//res.send('hello');
})


module.exports = router;