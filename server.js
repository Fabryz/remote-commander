var http = require('http'),
    express = require('express');

/*
* HTTP Server
*/

var app = express.createServer();

app.use(express.logger(':remote-addr - :method :url HTTP/:http-version :status :res[content-length] - :response-time ms'));
app.use(express.static(__dirname + '/public'));
app.use(express.favicon());

app.set('view engine', 'jade');
app.set('view options', { layout: false });
app.set('views', __dirname + '/views');

app.get('/', function(req, res) {
    res.render('index.html');
});

controlled_id = '';

app.get('/rc/:id', function(req, res) { // req.params.id
	controlled_id = req.params.id;
	
    res.render('rc', { id: controlled_id });
	io.sockets.sockets[controlled_id].emit("welcome");
});


app.listen(8080);

console.log('Server started at '+ app.address().address +':'+ app.address().port +' with Node '+ process.version +', platform '+ process.platform +'.');

/*
* Web Sockets
*/

var io = require('socket.io').listen(app);
	
io.configure(function(){ 
	io.enable('browser client minification');
	//io.enable('browser client etag'); 
	io.set('log level', 1); 
	io.set('transports', [ 
			'websocket',
			'flashsocket',
			'htmlfile',
			'xhr-polling',
			'jsonp-polling'
	]);
}); 


var chat = io.sockets.on('connection', function(client) {
	
	client.emit("nick", { nick: client.id });
	
	if (controlled_id != '') {
		io.sockets.sockets[controlled_id].emit("controlled_id", { controlled_id: controlled_id });
	}
	
	client.on("command", function(data) {		
		//console.dir(data);
		io.sockets.sockets[data.to].emit("execute", { msg: data.msg });
	});

	client.on('disconnect', function() {
		if (controlled_id != '') {
			io.sockets.sockets[controlled_id].emit("quit");
		}
	});
});

