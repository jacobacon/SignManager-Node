var express = require('express');
var app = express();


var fs = require('fs');

app.get('/test',function (req,res) {
	
	console.log('Test');
	res.end("Test");
})

var server = app.listen(8080, function() {
	var host = server.address().address
	var port = server.address().port
	
	console.log("Example app is running");
})