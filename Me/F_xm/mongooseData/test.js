var mongoose = require("mongoose");
var db = mongoose.connect('mongodb://127.0.0.1:27017/test');


db.connection.on('error', function(error){
  console.log('数据库test连接失败：' + error);
});
db.connection.on('open', function(){
  console.log('数据库test连接成功');
});

/*************************************/

// var TestSchema = new mongoose.Schema({
//     name : { type:String },
//     age  : { type:Number, default:0 },
//     email: { type:String },
//     time : { type:Date, default:Date.now }
// });
// var TestModel = db.model("test1", TestSchema );
// var TestEntity = new TestModel({
//     name : "helloworld",
//     age  : 28,
//     email: "helloworld@qq.com"
// });
// TestEntity.save(function(error,doc){
//   if(error){
//      console.log("error :" + error);
//   }else{
//      console.log(doc);
//   }
// });

/*****************************************/


var testSchema = new mongoose.Schema({
  name: {type: String},
  age: {type: Number, default: 0},
  email: {type: String},
  time: {type: Date, default: Date.now}
});
var testModel = db.model('test1', testSchema); // 集合名称；集合的结构对象
// Document文档（关联数组式的对象） < Collection集合 < 数据库
// 插入保存一段数据
testModel.create([
  {name: "test1", age: 8},
  {name: "test2", age: 18},
  {name: "test3", age: 28},
  {name: "test4", age: 38},
  {name: "test5", age: 48},
  {name: "test6", age: 58, email:"tttt@qq.com"},
  {name: "test7", age: 68, email:"ssss@qq.com"},
  {name: "test8", age: 18},
  {name: "test9", age: 18, email:"rrrr@qq.com"},
  {name: "test10",age: 18}
], function (error, docs) {
  if(error) {
    console.log(error);
  } else {
    console.log('save ok');
    console.log(docs);
  }
});