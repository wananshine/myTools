var express = require('express');
var app = express();


var index = require('./routes/index');
var users = require('./routes/users');
var goods = require('./routes/goods');


app.use('/',index);
app.use('/users',users);
app.use('/goods',goods);

app.use(function(req, res, next){
	var err = new Error('Not Found');
	next(err);
})

module.exports = app;