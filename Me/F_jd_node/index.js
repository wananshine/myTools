var path = require('path');
var express = require('express');

// var base = require("./public/css/base.css");
// var style = require("./public/css/style.css");


var app = express();
// var jq = require('./js/jquery.min.js');




var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');
var demoRouter = require('./routes/demo');

//挂载静态资源处理中间件(三种写法)
// app.use(express.static(__dirname+"/public"));
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public/'));
// app.use(express.static('public/images/'));


app.set('views', path.join(__dirname, 'views'));// 设置存放模板文件的目录
app.set('view engine', 'ejs');// 设置模板引擎为 ejs

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/demo', demoRouter);

app.listen(3000);