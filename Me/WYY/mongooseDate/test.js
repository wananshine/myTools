// var mongoose = require("mongoose");
// var db = mongoose.connect("127.0.0.1:27017/test");

// db.connection.on('error', function(error){
// 	console.log('数据库test连接失败：'+error);
// })
// db.connection.on("open",function(){
// 	console.log("数据库test连接成功");
// })

// var TestSchema = new mongoose.Schema({
// 	name : { type: String },
// 	age  : { type: Number, default:0 },
// 	email: { type: String },
// 	time : { type: Date, default:Date.now }
// })

// var TestModel = db.model("login", TestSchema);
// // var TestEntity = new TestModel({
// // 	   name : "helloworld",
// //     age  : 28,
// //     email: "helloworld@qq.com"
// // })
// TestModel.create([
// 	  {name: "test1", age: 8},
// 	  {name: "test2", age: 18},
// 	  {name: "test3", age: 28},
// 	  {name: "test4", age: 38},
// 	  {name: "test5", age: 48},
// 	  {name: "test6", age: 58, email:"tttt@qq.com"},
// 	  {name: "test7", age: 68, email:"ssss@qq.com"},
// 	  {name: "test8", age: 18},
// 	  {name: "test9", age: 18, email:"rrrr@qq.com"},
// 	  {name: "test10",age: 18}
// 	],function(error, docs){
// 		if(error){
// 			console.log(error);
// 		}else {
// 		    console.log('save ok');
// 		    console.log(docs);
// 		}
// 	})


var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/runoob';
//插入数据到表
var insertData = function(db, callback) {
    //连接到表 site
    var collection = db.collection('site');
    //插入数据
    var data = [{"name":"菜鸟教程","url":"www.runoob.com","likes":100},{"name":"菜鸟工具","url":"c.runoob.com","likes":100}];
    collection.insert(data, function(err, result) {
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }
        callback(result);
    });
}

MongoClient.connect(DB_CONN_STR, function(err, db) {
    console.log("连接成功！");
    insertData(db, function(result) {
        console.log(result);
        //db.close();
    });
});