var express = require('express');
var app = express();
var SerialPort = require('serialport');

var port = process.argv[2];
var message = process.argv[3];

var myPort = new SerialPort(port, {
	baudRate: 2400
	
});



console.log(message.length);

var bytes = Array(message.length + 17);

console.log(bytes.length);

bytes[0] = 0; // 00
			bytes[1] = 0xFF; // FF
			bytes[2] = 0xFF; // FF
			bytes[3] = 0; // 00
			bytes[4] = 11; // 0Bmmm
			bytes[5] = 1; // 01
			bytes[6] = 0xFF; // FF
			bytes[7] = 1; // 01
			bytes[8] = 48; // 30
			bytes[9] = 49; // 31
			bytes[10] = 0xEF; // EF
			bytes[11] = 0xB0; // B0
			bytes[12] = 0xEF; // EF
			bytes[13] = 0xA2; // A2
			
			var messageArray = new Array(message.length);
			
			for(var i = 0; i < message.length; i++){
				bytes[14+i] = message.charCodeAt(i);
				
			}
			
			//Set Message
			
			bytes[bytes.length -3] = 0xFF;
			bytes[bytes.length -2] = 0xFF;
			bytes[bytes.length -1] = 0;
			

			console.log(bytes);
	

myPort.on('open', showPortOpen);
myPort.on('data', sendSerialData);
myPort.on('close', showPortClose);
myPort.on('error', showError);


function showPortOpen() {
   console.log('port open. Data rate: ' + myPort.options.baudRate);
   myPort.write(bytes);
   myPort.close();
}
 
function sendSerialData(data) {
   console.log(data);
}
 
function showPortClose() {
   console.log('port closed.');
}
 
function showError(error) {
   console.log('Serial port error: ' + error);
}




/*
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
*/