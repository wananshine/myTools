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
	res.send('hello');
})


module.exports = router;