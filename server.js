var http = require('http');//kemi hhtp
var express = require('express');
var socket_io = require('socket.io');//therasim librarine e socetio

var app = express();
app.use(express.static('public')); //marrim index.html nga frontendi

var server = http.Server(app);
var io = socket_io(server);

io.on('connection',function(socket){//e dergova nga main.js me socket.emit dhe e marr perme stagut 'draw'
	socket.on('draw',function(position) {
		socket.broadcast.emit('draw',position);
	});

	socket.on('guess',function(guessBox){
		socket.broadcast.emit('guess',guessBox);
	});
});

server.listen(process.env.PORT || 8080);