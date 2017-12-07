var express = require('express');
var utils = require('./utils');
var app = express();
var url = require('url');
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/lmyData';

app.use(express.static('public'));


//  /user 页面响应
app.get('/user', function (req, res) {

  //查询数据
  var selectData = function(db, callback) {
    //连接到表
    var collection = db.collection('site');
    //查询数据
    var params = url.parse(req.url, true).query;
    //从浏览器获得的参数
    var name = params['name'];  
    var whereStr = {};
    whereStr.name = name;
    collection.find(whereStr).toArray(function(err, result) {
      if(err)
      {
        console.log(err);
        return;
      }
      callback(result);
    });
  }

  MongoClient.connect(DB_CONN_STR, function(err, db) {
    console.log("连接成功！");
    selectData(db, function(result) {
    //  console.log(result);
      if(utils.isEmptyObject(result)){
          res.end("name不存在");
      }else{
        res.end(JSON.stringify(result));
      }
      db.close();
    });
  });
})

var server = app.listen(7272,"0.0.0.0", function () {
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})