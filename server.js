var http = require('http'),
    express = require('express');

/*
* HTTP Server
*/

var app = express.createServer()
	remote_id = '',
	commander_id = '';

app.use(express.logger(':remote-addr - :method :url HTTP/:http-version :status :res[content-length] - :response-time ms'));
app.use(express.static(__dirname + '/public'));
app.use(express.favicon());

app.set('view engine', 'jade');
app.set('view options', { layout: false });
app.set('views', __dirname + '/views');

app.get('/', function(req, res) {
    res.render('remote');
});

app.get('/rc/:remoteid', function(req, res) {
	
	// FIXME no actual checks if req.params.id is reliable
	res.render('commander', { id: req.params.remoteid });
	io.sockets.sockets[req.params.remoteid].emit("join");
});


app.listen(8080);

//console.log('Server started at '+ app.address().address +':'+ app.address().port +' with Node '+ process.version +', platform '+ process.platform +'.');

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


io.sockets.on('connection', function(client) {
	
	console.log('+ '+ client.id +' has connected');
	client.emit("nick", { nick: client.id });
	
	/* client.get('controlled_id', function (err, controlled_id) {
		if (controlled_id != '') {
			io.sockets.sockets[controlled_id].emit("controlled_id", { controlled_id: controlled_id });
		}
	}); */
	
	client.on("command", function(data) {		
		//console.dir(data);
		io.sockets.sockets[data.to].emit("execute", { msg: data.msg });
		//console.log('>'+ client.id +' has sent '+ data.msg +' to '+ controlled_id);
	});

	client.on('disconnect', function() {
		/* client.get('controlled_id', function (err, controlled_id) {
			io.sockets.sockets[controlled_id].emit("quit");
			console.log('- '+ client.id +' has stopped controlling '+ controlled_id);
		}); */

	});
});

